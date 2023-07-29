import MockDate from "mockdate";
import { addDays, Authentication, ok, unauthorized, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadAccountController } from "./loadAccountController";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { Controller } from "@/application/infra/contracts";

describe("LoadAccountController", () => {
    let testInstanceParams: any;
    let testInstance: LoadAccountController;
    let loadAccount: jest.Mock;
    let addAccount: jest.Mock;
    let authentication: MockProxy<Authentication>;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        testInstanceParams = {
            query: accountEntityMock,
            userId: "fakeId",
            headers: { refreshtoken: "fakeRefreshToken" },
        };
        MockDate.set(new Date());
        loadAccount = jest.fn();
        loadAccount.mockResolvedValue(accountEntityMock);
        addAccount = jest.fn();
        addAccount.mockResolvedValue(accountEntityMock);
        authentication = mock();
        validation = mock();
        authentication.authRefreshToken.mockResolvedValue({
            accessToken: "fakeAccessToken",
            refreshToken: "fakeRefreshToken",
        });
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        testInstance = new LoadAccountController(
            validation,
            loadAccount,
            addAccount,
            authentication,
        );
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute(testInstanceParams);
        expect(validation.validate).toHaveBeenCalledWith(undefined);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call loadAccount with correct params", async () => {
        await testInstance.execute(testInstanceParams);
        expect(loadAccount).toHaveBeenCalledWith({
            fields: {
                createdById: testInstanceParams.userId,
                refreshToken: testInstanceParams.headers.refreshtoken,
                isFutureexpiresAt: new Date(),
            },
            options: {},
        });
        expect(loadAccount).toHaveBeenCalledTimes(1);
    });
    test("should call authRefreshToken of authentication with correct params", async () => {
        await testInstance.execute(testInstanceParams);
        expect(authentication.authRefreshToken).toHaveBeenCalledWith(testInstanceParams.userId);
        expect(authentication.authRefreshToken).toHaveBeenCalledTimes(1);
    });
    test("should call addAccount with correct params", async () => {
        await testInstance.execute(testInstanceParams);
        expect(addAccount).toHaveBeenCalledWith({
            createdById: testInstanceParams.userId,
            name: accountEntityMock?.name,
            refreshToken: "fakeRefreshToken",
            active: true,
            expiresAt: addDays(new Date(), 1),
        });
        expect(addAccount).toHaveBeenCalledTimes(1);
    });
    test("should return success if authentication loadAccount succeeds", async () => {
        const httpResponse = await testInstance.execute(testInstanceParams);
        expect(httpResponse).toEqual(
            ok({
                accessToken: "fakeAccessToken",
                refreshToken: "fakeRefreshToken",
            }),
        );
    });
    test("should return unauthorized request if account does not exists", async () => {
        loadAccount.mockResolvedValueOnce(null);
        const httpResponse = await testInstance.execute(testInstanceParams);
        expect(httpResponse).toEqual(unauthorized());
    });
    test("should return unauthorized if token is null", async () => {
        authentication.authRefreshToken.mockResolvedValueOnce(null);
        const httpResponse = await testInstance.execute(testInstanceParams);
        expect(httpResponse).toEqual(unauthorized());
    });
});

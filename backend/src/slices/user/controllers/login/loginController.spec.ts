import MockDate from "mockdate";
import {
    addDays,
    Authentication,
    badRequest,
    forbidden,
    ok,
    unauthorized,
    Validation,
} from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoginController } from "./loginController";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { EmailInUseError, MissingParamError } from "@/application/errors";

describe("LoginController", () => {
    let testInstance: LoginController;
    let loadUser: jest.Mock;
    let addAccount: jest.Mock;
    let authentication: MockProxy<Authentication>;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadUser = jest.fn();
        loadUser.mockResolvedValue(userEntityMock);
        addAccount = jest.fn();
        addAccount.mockResolvedValue(accountEntityMock);
        authentication = mock();
        validation = mock();
        authentication.auth.mockResolvedValue({
            accessToken: "fakeAccessToken",
            refreshToken: "fakeRefreshToken",
        });
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        testInstance = new LoginController(validation, loadUser, authentication, addAccount);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(validation.validate).toHaveBeenCalledWith(userEntityMock);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call loadUser with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(loadUser).toHaveBeenCalledWith({
            fields: { email: userEntityMock?.email },
            options: { projection: { password: 0 } },
        });
        expect(loadUser).toHaveBeenCalledTimes(1);
    });
    test("should call auth of authentication with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(authentication.auth).toHaveBeenCalledWith(
            userEntityMock?.email,
            userEntityMock?.password,
        );
        expect(authentication.auth).toHaveBeenCalledTimes(1);
    });
    test("should call addAccount with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(addAccount).toHaveBeenCalledWith({
            createdById: userEntityMock?._id,
            name: userEntityMock?.name,
            refreshToken: "fakeRefreshToken",
            active: true,
            expiresAt: addDays(new Date(), 1),
        });
        expect(addAccount).toHaveBeenCalledTimes(1);
    });
    test("should return success if authentication login succeeds", async () => {
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(
            ok({
                user: userEntityMock,
                accessToken: "fakeAccessToken",
                refreshToken: "fakeRefreshToken",
            }),
        );
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("email")]);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("email")]));
    });
    test("should return forbidden request if user does not exists", async () => {
        loadUser.mockResolvedValueOnce(null);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
    });
    test("should return unauthorized if token is null", async () => {
        authentication.auth.mockResolvedValueOnce(null);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(unauthorized());
    });
});

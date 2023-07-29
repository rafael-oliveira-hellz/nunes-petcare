/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SignupController } from "./signupController";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { EmailInUseError, InvalidParamError, MissingParamError } from "@/application/errors";
jest.mock("deep-email-validator", () => {
    return {
        __esModule: true,
        default: jest
            .fn()
            .mockResolvedValue({
                validators: {
                    regex: { valid: true },
                    typo: { valid: true },
                    disposable: { valid: true },
                    smtp: { valid: true },
                    mx: { valid: true },
                },
            })
            .mockResolvedValueOnce({
                validators: {
                    regex: { valid: false },
                    typo: { valid: true },
                    disposable: { valid: true },
                    smtp: { valid: true },
                    mx: { valid: true },
                },
            })
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({
                validators: { regex: null },
            }),
    };
});
describe("SignUpController", () => {
    let testInstance: SignupController;
    let addUser: jest.Mock;
    let loadUser: jest.Mock;
    let addAccount: jest.Mock;
    let authentication: MockProxy<Authentication>;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addUser = jest.fn();
        addUser.mockResolvedValue(userEntityMock);
        loadUser = jest.fn();
        loadUser.mockResolvedValue(null);
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
        testInstance = new SignupController(
            validation,
            addUser,
            loadUser,
            authentication,
            addAccount,
        );
    });
    test("should return badrequest when email is invalid", async () => {
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(badRequest([new InvalidParamError("email")]));
    });
    test("should return badrequest when email is invalid and validators is null", async () => {
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(badRequest([new InvalidParamError("email")]));
    });
    test("should return badrequest when email is invalid and validators regex and others is null", async () => {
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(badRequest([new InvalidParamError("email")]));
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(validation.validate).toHaveBeenCalledWith(userEntityMock);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call addUser with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(addUser).toHaveBeenCalledWith(userEntityMock);
        expect(addUser).toHaveBeenCalledTimes(1);
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
    test("should return success if authentication signup succeeds", async () => {
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(
            ok({
                user: userEntityMock,
                accessToken: "fakeAccessToken",
                refreshToken: "fakeRefreshToken",
            }),
        );
    });
    test("should return error if authentication signup gots an error", async () => {
        addUser.mockRejectedValueOnce(new Error("fakeError"));
        const httpResponse = testInstance.execute({ body: userEntityMock });
        await expect(httpResponse).rejects.toThrow("fakeError");
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("email")]);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("email")]));
    });
    test("should return forbidden request if user exists", async () => {
        loadUser.mockResolvedValueOnce(userEntityMock);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
    });
    test("should return unauthorized if token is null", async () => {
        authentication.auth.mockResolvedValueOnce(null);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(unauthorized());
    });
});

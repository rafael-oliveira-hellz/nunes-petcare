import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddUserController } from "./addUserController";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";

describe("AddUserController", () => {
    let testInstance: AddUserController;
    let addUser: jest.Mock;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addUser = jest.fn();
        addUser.mockResolvedValue({
            ...userEntityMock,
            createdById: userEntityMock?._id,
        });
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        testInstance = new AddUserController(validation, addUser);
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
        const result = await testInstance.execute({
            body: userEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...userEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(addUser).toHaveBeenCalledWith({
            ...userEntityMock,
            createdById: userEntityMock?._id,
        });
        expect(addUser).toHaveBeenCalledTimes(1);
    });
    test("should throws if addUser throw", async () => {
        addUser.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: userEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
        const httpResponse = await testInstance.execute({ body: userEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
});

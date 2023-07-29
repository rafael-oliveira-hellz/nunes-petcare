import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddOwnerController } from "./addOwnerController";
import { ownerEntityMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("AddOwnerController", () => {
    let testInstance: AddOwnerController;
    let addOwner: jest.Mock;
    let loadOwner: jest.Mock;
    let updateUser: jest.Mock;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addOwner = jest.fn();
        addOwner.mockResolvedValue({
            ...ownerEntityMock,
            createdById: userEntityMock?._id,
        });
        updateUser = jest.fn();
        updateUser.mockResolvedValue({
            ...userEntityMock,
            createdById: userEntityMock?._id,
        });
        loadOwner = jest.fn();
        loadOwner.mockResolvedValue(null);
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        testInstance = new AddOwnerController(validation, addOwner, loadOwner, updateUser);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ body: ownerEntityMock });
        expect(validation.validate).toHaveBeenCalledWith(ownerEntityMock);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call addOwner with correct params", async () => {
        const result = await testInstance.execute({
            body: ownerEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...ownerEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(addOwner).toHaveBeenCalledWith({
            ...ownerEntityMock,
            createdById: userEntityMock?._id,
        });
        expect(addOwner).toHaveBeenCalledTimes(1);
    });
    test("should throws if addOwner throw", async () => {
        addOwner.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: ownerEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should call loadOwner with correct params", async () => {
        const result = await testInstance.execute({
            body: ownerEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...ownerEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(loadOwner).toHaveBeenCalledWith({
            fields: { createdById: userEntityMock?._id },
            options: {},
        });
        expect(loadOwner).toHaveBeenCalledTimes(1);
    });
    test("should return bad request if owner exists", async () => {
        loadOwner.mockResolvedValueOnce(ownerEntityMock);
        const result = await testInstance.execute({
            body: ownerEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            badRequest([{ field: "createdById", message: "Owner already exists" }]),
        );
    });
    test("should throws if loadOwner throw", async () => {
        loadOwner.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: ownerEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
        const httpResponse = await testInstance.execute({ body: ownerEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
});

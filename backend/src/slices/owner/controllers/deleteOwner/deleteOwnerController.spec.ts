import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { DeleteOwnerController } from "./deleteOwnerController";
import { ownerEntityMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("DeleteOwnerController", () => {
    let testInstance: DeleteOwnerController;
    let deleteOwner: jest.Mock;
    let validation: MockProxy<Validation>;
    let fakeQuery: any;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteOwner = jest.fn();
        deleteOwner.mockResolvedValue(true);
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        fakeQuery = { _id: ownerEntityMock._id };
        testInstance = new DeleteOwnerController(validation, deleteOwner);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ query: fakeQuery });
        expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call deleteOwner with correct params", async () => {
        const result = await testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(ok(true));
        expect(deleteOwner).toHaveBeenCalledWith({
            fields: { ...fakeQuery, createdById: userEntityMock?._id },
            options: {},
        });
        expect(deleteOwner).toHaveBeenCalledTimes(1);
    });
    test("should throws if deleteOwner throw", async () => {
        deleteOwner.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
        const httpResponse = await testInstance.execute({ query: fakeQuery });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
    });
});
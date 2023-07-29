import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadCategoryController } from "./loadCategoryController";
import { categoryEntityMock } from "@/slices/category/entities/CategoryEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("LoadCategoryController", () => {
    let testInstance: LoadCategoryController;
    let loadCategory: jest.Mock;
    let validation: MockProxy<Validation>;
    let fakeQuery: any;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategory = jest.fn();
        loadCategory.mockResolvedValue({
            ...categoryEntityMock,
            createdById: userEntityMock?._id,
        });
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        fakeQuery = { _id: categoryEntityMock._id };
        testInstance = new LoadCategoryController(validation, loadCategory);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ query: fakeQuery });
        expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call loadCategory with correct params", async () => {
        const result = await testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...categoryEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(loadCategory).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
        expect(loadCategory).toHaveBeenCalledTimes(1);
    });
    test("should throws if loadCategory throw", async () => {
        loadCategory.mockRejectedValueOnce(new Error("error"));
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

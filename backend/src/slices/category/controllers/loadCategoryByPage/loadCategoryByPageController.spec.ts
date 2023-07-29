import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadCategoryByPageController } from "./loadCategoryByPageController";
import {
    categoryEntityMock,
    categoryEntityPaginatedMock,
} from "@/slices/category/entities/CategoryEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("LoadCategoryByPageController", () => {
    let testInstance: LoadCategoryByPageController;
    let loadCategoryByPage: jest.Mock;
    let validation: MockProxy<Validation>;
    let fakeQuery: any;
    let fakeQueryParams: any;
    let fakeRestQuery: any;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategoryByPage = jest.fn();
        loadCategoryByPage.mockResolvedValue(categoryEntityPaginatedMock);
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        fakeQueryParams = { _id: categoryEntityMock._id };
        fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
        fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
        testInstance = new LoadCategoryByPageController(validation, loadCategoryByPage);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ query: fakeQuery });
        expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call loadCategoryByPage with correct params", async () => {
        const result = await testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(ok(categoryEntityPaginatedMock));
        expect(loadCategoryByPage).toHaveBeenCalledWith({
            fields: fakeQueryParams,
            options: { sort: { [fakeRestQuery?.sortBy]: 1 }, page: fakeRestQuery?.page },
        });
        expect(loadCategoryByPage).toHaveBeenCalledTimes(1);
    });
    test("should call loadCategoryByPage with correct params in desc order", async () => {
        const result = await testInstance.execute({
            query: { ...fakeQuery, typeSort: "desc" },
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(ok(categoryEntityPaginatedMock));
        expect(loadCategoryByPage).toHaveBeenCalledWith({
            fields: fakeQueryParams,
            options: { sort: { [fakeRestQuery?.sortBy]: -1 }, page: fakeRestQuery?.page },
        });
        expect(loadCategoryByPage).toHaveBeenCalledTimes(1);
    });
    test("should call loadCategoryByPage with correct params without http query", async () => {
        const result = await testInstance.execute({
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(ok(categoryEntityPaginatedMock));
    });
    test("should throws if loadCategoryByPage throw", async () => {
        loadCategoryByPage.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("page")]);
        const httpResponse = await testInstance.execute({ query: fakeQuery });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("page")]));
    });
});

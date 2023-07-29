import { Query } from "@/application/types";
import { categoryEntityPaginatedMock } from "@/slices/category/entities/CategoryEntity.spec";
import { LoadCategoryByPageRepository } from "@/slices/category/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadCategoryByPage, LoadCategoryByPage } from "./LoadCategoryByPageUseCase";

describe("loadCategoryByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadCategoryByPage;
    let loadCategoryRepository: MockProxy<LoadCategoryByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategoryRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadCategoryRepository.loadCategoryByPage.mockResolvedValue(categoryEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadCategoryByPage(loadCategoryRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadCategoryByPage of loadCategoryRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadCategoryRepository.loadCategoryByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadCategoryRepository.loadCategoryByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a category when loadCategoryRepository loads it", async () => {
        const category = await testInstance(fakeQuery);

        expect(category).toEqual(categoryEntityPaginatedMock);
    });

    it("should return null when loadCategoryRepository fails to load", async () => {
        loadCategoryRepository.loadCategoryByPage.mockResolvedValue(null);

        const category = await testInstance(fakeQuery);

        expect(category).toBeNull();
    });

    it("should throw an error when loadCategoryRepository throws an error", async () => {
        loadCategoryRepository.loadCategoryByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

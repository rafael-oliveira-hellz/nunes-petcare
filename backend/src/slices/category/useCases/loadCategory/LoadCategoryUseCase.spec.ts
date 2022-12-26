import { Query } from "@/application/@types";
import { categoryEntityMock } from "@/slices/category/entities/CategoryEntity.spec";
import { LoadCategoryRepository } from "@/slices/category/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadCategory, loadCategoryUsecase } from "./LoadCategoryUseCase";

describe("loadCategory", () => {
    let fakeQuery: Query;
    let testInstance: loadCategory;
    let loadCategoryRepository: MockProxy<LoadCategoryRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategoryRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadCategoryRepository.loadCategory.mockResolvedValue(categoryEntityMock);
    });

    beforeEach(() => {
        testInstance = loadCategoryUsecase(loadCategoryRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadCategory of loadCategoryRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadCategoryRepository.loadCategory).toHaveBeenCalledWith(fakeQuery);

        expect(loadCategoryRepository.loadCategory).toHaveBeenCalledTimes(1);
    });

    it("should return a category when loadCategoryRepository loads it", async () => {
        const category = await testInstance(fakeQuery);

        expect(category).toEqual(categoryEntityMock);
    });

    it("should return null when loadCategoryRepository fails to load", async () => {
        loadCategoryRepository.loadCategory.mockResolvedValue(null);

        const category = await testInstance(fakeQuery);

        expect(category).toBeNull();
    });

    it("should throw an error when loadCategoryRepository throws an error", async () => {
        loadCategoryRepository.loadCategory.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

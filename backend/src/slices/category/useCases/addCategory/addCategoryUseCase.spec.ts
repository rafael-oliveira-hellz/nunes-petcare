import { CategoryEntity } from "@/slices/category/entities";
import { categoryEntityMock } from "@/slices/category/entities/CategoryEntity.spec";
import { AddCategoryRepository } from "@/slices/category/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addCategory, addCategoryUsecase } from "./addCategoryUseCase";

describe("addCategory", () => {
    let testInstance: addCategory;
    let addCategoryRepository: MockProxy<AddCategoryRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addCategoryRepository = mock();

        addCategoryRepository.addCategory.mockResolvedValue(categoryEntityMock);
    });

    beforeEach(() => {
        testInstance = addCategoryUsecase(addCategoryRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addCategory of addCategoryRepository with correct values", async () => {
        await testInstance(categoryEntityMock);

        expect(addCategoryRepository.addCategory).toHaveBeenCalledWith(
            new CategoryEntity(categoryEntityMock)
        );

        expect(addCategoryRepository.addCategory).toHaveBeenCalledTimes(1);
    });

    it("should return a new category when addCategoryRepository inserts it", async () => {
        const category = await testInstance(categoryEntityMock);

        expect(category).toEqual(categoryEntityMock);
    });

    it("should return null when addCategoryRepository fails to insert", async () => {
        addCategoryRepository.addCategory.mockResolvedValue(null);

        const category = await testInstance(categoryEntityMock);

        expect(category).toBeNull();
    });

    it("should throw an error when addCategoryRepository throws an error", async () => {
        addCategoryRepository.addCategory.mockRejectedValue(new Error("Error"));

        await expect(testInstance(categoryEntityMock)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/types";
import { categoryEntityMock } from "@/slices/category/entities/CategoryEntity.spec";
import { DeleteCategoryRepository } from "@/slices/category/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteCategory, DeleteCategory } from "./DeleteCategoryUseCase";

describe("deleteCategory", () => {
    let fakeQuery: Query;
    let testInstance: DeleteCategory;
    let deleteCategoryRepository: MockProxy<DeleteCategoryRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteCategoryRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteCategoryRepository.deleteCategory.mockResolvedValue(categoryEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteCategory(deleteCategoryRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteCategory of deleteCategoryRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteCategoryRepository.deleteCategory).toHaveBeenCalledWith(fakeQuery);

        expect(deleteCategoryRepository.deleteCategory).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted category when deleteCategoryRepository deletes it", async () => {
        const category = await testInstance(fakeQuery);

        expect(category).toEqual(categoryEntityMock);
    });

    it("should return null when deleteCategoryRepository fails to insert", async () => {
        deleteCategoryRepository.deleteCategory.mockResolvedValue(null);

        const category = await testInstance(fakeQuery);

        expect(category).toBeNull();
    });

    it("should throw an error when deleteCategoryRepository throws an error", async () => {
        deleteCategoryRepository.deleteCategory.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/types";
import { categoryEntityMock } from "@/slices/category/entities/CategoryEntity.spec";
import { UpdateCategoryRepository } from "@/slices/category/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateCategory, updateCategoryUsecase } from "./UpdateCategoryUseCase";

describe("updateCategory", () => {
    let fakeQuery: Query;
    let testInstance: updateCategory;
    let updateCategoryRepository: MockProxy<UpdateCategoryRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateCategoryRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateCategoryRepository.updateCategory.mockResolvedValue(categoryEntityMock);
    });

    beforeEach(() => {
        testInstance = updateCategoryUsecase(updateCategoryRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateCategory of updateCategoryRepository with correct values", async () => {
        await testInstance(fakeQuery, categoryEntityMock);

        expect(updateCategoryRepository.updateCategory).toHaveBeenCalledWith(
            fakeQuery,
            categoryEntityMock,
        );

        expect(updateCategoryRepository.updateCategory).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted category when updateCategoryRepository deletes it", async () => {
        const category = await testInstance(fakeQuery, categoryEntityMock);

        expect(category).toEqual(categoryEntityMock);
    });

    it("should return null when updateCategoryRepository fails to insert", async () => {
        updateCategoryRepository.updateCategory.mockResolvedValue(null);

        const category = await testInstance(fakeQuery, categoryEntityMock);

        expect(category).toBeNull();
    });

    it("should throw an error when updateCategoryRepository throws an error", async () => {
        updateCategoryRepository.updateCategory.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, categoryEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

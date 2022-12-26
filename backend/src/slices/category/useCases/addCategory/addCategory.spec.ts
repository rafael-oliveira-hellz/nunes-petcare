import { CategoryEntity } from "@/slices/category/entities";
import { categoryEntityMock } from "@/slices/category/entities/CategoryEntity.spec";
import { AddCategoryRepository } from "@/slices/category/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addCategory, addCategoryUsecase } from "./addCategoryUsecase";

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
});

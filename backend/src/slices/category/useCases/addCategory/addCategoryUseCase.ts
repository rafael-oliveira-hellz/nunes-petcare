import { CategoryData, CategoryEntity } from "@/slices/category/entities";
import { AddCategoryRepository } from "@/slices/category/repositories";

export type addCategory = (data: CategoryData) => Promise<CategoryEntity | null>;

export type addCategorySignature = (addCategory: AddCategoryRepository) => addCategory;

export const addCategoryUsecase: addCategorySignature =
    (addCategory: AddCategoryRepository) => (data: CategoryData) => {
        return addCategory.addCategory(new CategoryEntity(data));
    };

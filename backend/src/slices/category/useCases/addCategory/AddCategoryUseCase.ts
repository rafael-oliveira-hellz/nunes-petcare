import { CategoryData, CategoryEntity } from "@/slices/category/entities";
import { AddCategoryRepository } from "@/slices/category/repositories";

export type AddCategory = (data: CategoryData) => Promise<CategoryEntity | null>;

export type addCategorySignature = (addCategory: AddCategoryRepository) => AddCategory;

export const addCategory: addCategorySignature =
    (addCategory: AddCategoryRepository) => (data: CategoryData) => {
        return addCategory.addCategory(new CategoryEntity(data));
    };

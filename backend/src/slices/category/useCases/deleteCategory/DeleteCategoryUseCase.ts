import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";
import { DeleteCategoryRepository } from "@/slices/category/repositories";

export type DeleteCategory = (query: Query) => Promise<CategoryData | null>;

export type deleteCategorySignature = (deleteCategory: DeleteCategoryRepository) => DeleteCategory;

export const deleteCategory: deleteCategorySignature =
    (deleteCategory: DeleteCategoryRepository) => (query: Query) => {
        return deleteCategory.deleteCategory(query);
    };

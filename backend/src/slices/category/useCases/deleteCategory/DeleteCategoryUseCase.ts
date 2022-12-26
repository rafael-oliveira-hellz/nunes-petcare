import { Query } from "@/application/@types";
import { CategoryData } from "@/slices/category/entities";
import { DeleteCategoryRepository } from "@/slices/category/repositories";

export type deleteCategory = (query: Query) => Promise<CategoryData | null>;

export type deleteCategorySignature = (
    deleteCategory: DeleteCategoryRepository
) => deleteCategory;

export const deleteCategoryUsecase: deleteCategorySignature =
    (deleteCategory: DeleteCategoryRepository) => (query: Query) => {
        return deleteCategory.deleteCategory(query);
    };

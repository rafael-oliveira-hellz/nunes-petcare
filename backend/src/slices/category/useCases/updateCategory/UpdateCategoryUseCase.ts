import { Query } from "@/application/@types";
import { CategoryData } from "@/slices/category/entities";
import { UpdateCategoryRepository } from "@/slices/category/repositories";

export type updateCategory = (query: Query) => Promise<CategoryData | null>;

export type updateCategorySignature = (
    updateCategory: UpdateCategoryRepository
) => updateCategory;

export const updateCategoryUsecase: updateCategorySignature =
    (updateCategory: UpdateCategoryRepository) => (query: Query) => {
        return updateCategory.updateCategory(query);
    };

import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";
import { UpdateCategoryRepository } from "@/slices/category/repositories";

export type updateCategory = (query: Query, data: CategoryData) => Promise<CategoryData | null>;

export type updateCategorySignature = (updateCategory: UpdateCategoryRepository) => updateCategory;

export const updateCategoryUsecase: updateCategorySignature =
    (updateCategory: UpdateCategoryRepository) => (query: Query, data: CategoryData) => {
        return updateCategory.updateCategory(query, data);
    };

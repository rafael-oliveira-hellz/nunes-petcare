import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";
import { UpdateCategoryRepository } from "@/slices/category/repositories";

export type UpdateCategory = (query: Query, data: CategoryData) => Promise<CategoryData | null>;

export type updateCategorySignature = (updateCategory: UpdateCategoryRepository) => UpdateCategory;

export const updateCategory: updateCategorySignature =
    (updateCategory: UpdateCategoryRepository) => (query: Query, data: CategoryData) => {
        return updateCategory.updateCategory(query, data);
    };

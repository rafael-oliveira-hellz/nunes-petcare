import { Query } from "@/application/@types";
import { CategoryData } from "@/slices/category/entities";
import { LoadCategoryRepository } from "@/slices/category/repositories";

export type loadCategory = (query: Query) => Promise<CategoryData | null>;

export type loadCategorySignature = (loadCategory: LoadCategoryRepository) => loadCategory;

export const loadCategoryUsecase: loadCategorySignature =
    (loadCategoryRepository: LoadCategoryRepository) => (query: Query) => {
        return loadCategoryRepository.loadCategory(query);
    };

import { Query } from "@/application/types";
import { CategoryPaginatedData } from "@/slices/category/entities";
import { LoadCategoryByPageRepository } from "@/slices/category/repositories";

export type loadCategoryByPage = (query: Query) => Promise<CategoryPaginatedData | null>;

export type loadCategoryByPageSignature = (
    loadCategoryByPage: LoadCategoryByPageRepository,
) => loadCategoryByPage;

export const loadCategoryByPageUsecase: loadCategoryByPageSignature =
    (loadCategoryByPageRepository: LoadCategoryByPageRepository) => (query: Query) => {
        return loadCategoryByPageRepository.loadByPage(query);
    };

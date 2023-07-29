import { Query } from "@/application/types";
import { CategoryPaginatedData } from "@/slices/category/entities";
import { LoadCategoryByPageRepository } from "@/slices/category/repositories";

export type LoadCategoryByPage = (query: Query) => Promise<CategoryPaginatedData | null>;

export type loadCategoryByPageSignature = (
    loadCategoryByPage: LoadCategoryByPageRepository,
) => LoadCategoryByPage;

export const loadCategoryByPage: loadCategoryByPageSignature =
    (loadCategoryByPageRepository: LoadCategoryByPageRepository) => (query: Query) => {
        return loadCategoryByPageRepository.loadCategoryByPage(query);
    };

import { Query } from "@/application/types";
import { ProductPaginatedData } from "@/slices/product/entities";
import { LoadProductByPageRepository } from "@/slices/product/repositories";

export type loadProductByPage = (query: Query) => Promise<ProductPaginatedData | null>;

export type loadProductByPageSignature = (
    loadProductByPage: LoadProductByPageRepository,
) => loadProductByPage;

export const loadProductByPageUsecase: loadProductByPageSignature =
    (loadProductByPageRepository: LoadProductByPageRepository) => (query: Query) => {
        return loadProductByPageRepository.loadByPage(query);
    };

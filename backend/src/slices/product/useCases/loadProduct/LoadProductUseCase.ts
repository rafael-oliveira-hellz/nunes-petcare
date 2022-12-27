import { Query } from "@/application/@types";
import { ProductData } from "@/slices/product/entities";
import { LoadProductRepository } from "@/slices/product/repositories";

export type loadProduct = (query: Query) => Promise<ProductData | null>;

export type loadProductSignature = (loadProduct: LoadProductRepository) => loadProduct;

export const loadProductUsecase: loadProductSignature =
    (loadProductRepository: LoadProductRepository) => (query: Query) => {
        return loadProductRepository.loadProduct(query);
    };

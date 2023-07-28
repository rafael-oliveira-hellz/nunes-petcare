import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";
import { UpdateProductRepository } from "@/slices/product/repositories";

export type updateProduct = (
    query: Query,
    data: ProductData,
) => Promise<ProductData | null>;

export type updateProductSignature = (
    updateProduct: UpdateProductRepository,
) => updateProduct;

export const updateProductUsecase: updateProductSignature =
    (updateProduct: UpdateProductRepository) => (query: Query, data: ProductData) => {
        return updateProduct.updateProduct(query, data);
    };

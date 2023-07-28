import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";
import { DeleteProductRepository } from "@/slices/product/repositories";

export type deleteProduct = (query: Query) => Promise<ProductData | null>;

export type deleteProductSignature = (deleteProduct: DeleteProductRepository) => deleteProduct;

export const deleteProductUsecase: deleteProductSignature =
    (deleteProduct: DeleteProductRepository) => (query: Query) => {
        return deleteProduct.deleteProduct(query);
    };

import { ProductData, ProductEntity } from "@/slices/product/entities";
import { AddProductRepository } from "@/slices/product/repositories";

export type addProduct = (data: ProductData) => Promise<ProductEntity | null>;

export type addProductSignature = (addProduct: AddProductRepository) => addProduct;

export const addProductUsecase: addProductSignature =
    (addProduct: AddProductRepository) => (data: ProductData) => {
        return addProduct.addProduct(new ProductEntity(data));
    };

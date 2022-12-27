import { ProductEntity } from "@/slices/product/entities";
import { productEntityMock } from "@/slices/product/entities/ProductEntity.spec";
import { AddProductRepository } from "@/slices/product/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addProduct, addProductUsecase } from "./AddProductUseCase";

describe("addProduct", () => {
    let testInstance: addProduct;
    let addProductRepository: MockProxy<AddProductRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addProductRepository = mock();

        addProductRepository.addProduct.mockResolvedValue(productEntityMock);
    });

    beforeEach(() => {
        testInstance = addProductUsecase(addProductRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addProduct of addProductRepository with correct values", async () => {
        await testInstance(productEntityMock);

        expect(addProductRepository.addProduct).toHaveBeenCalledWith(
            new ProductEntity(productEntityMock)
        );

        expect(addProductRepository.addProduct).toHaveBeenCalledTimes(1);
    });

    it("should return a new product when addProductRepository inserts it", async () => {
        const product = await testInstance(productEntityMock);

        expect(product).toEqual(productEntityMock);
    });

    it("should return null when addProductRepository fails to insert", async () => {
        addProductRepository.addProduct.mockResolvedValue(null);

        const product = await testInstance(productEntityMock);

        expect(product).toBeNull();
    });

    it("should throw an error when addProductRepository throws an error", async () => {
        addProductRepository.addProduct.mockRejectedValue(new Error("Error"));

        await expect(testInstance(productEntityMock)).rejects.toThrowError("Error");
    });
});

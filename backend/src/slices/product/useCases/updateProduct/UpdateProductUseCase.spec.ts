import { Query } from "@/application/types";
import { productEntityMock } from "@/slices/product/entities/ProductEntity.spec";
import { UpdateProductRepository } from "@/slices/product/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateProduct, updateProductUsecase } from "./UpdateProductUseCase";

describe("updateProduct", () => {
    let fakeQuery: Query;
    let testInstance: updateProduct;
    let updateProductRepository: MockProxy<UpdateProductRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateProductRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateProductRepository.updateProduct.mockResolvedValue(productEntityMock);
    });

    beforeEach(() => {
        testInstance = updateProductUsecase(updateProductRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateProduct of updateProductRepository with correct values", async () => {
        await testInstance(fakeQuery, productEntityMock);

        expect(updateProductRepository.updateProduct).toHaveBeenCalledWith(
            fakeQuery,
            productEntityMock,
        );

        expect(updateProductRepository.updateProduct).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted product when updateProductRepository deletes it", async () => {
        const product = await testInstance(fakeQuery, productEntityMock);

        expect(product).toEqual(productEntityMock);
    });

    it("should return null when updateProductRepository fails to insert", async () => {
        updateProductRepository.updateProduct.mockResolvedValue(null);

        const product = await testInstance(fakeQuery, productEntityMock);

        expect(product).toBeNull();
    });

    it("should throw an error when updateProductRepository throws an error", async () => {
        updateProductRepository.updateProduct.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, productEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

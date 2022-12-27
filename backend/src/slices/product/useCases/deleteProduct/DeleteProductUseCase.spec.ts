import { Query } from "@/application/@types";
import { productEntityMock } from "@/slices/product/entities/ProductEntity.spec";
import { DeleteProductRepository } from "@/slices/product/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteProduct, deleteProductUsecase } from "./DeleteProductUseCase";

describe("deleteProduct", () => {
    let fakeQuery: Query;
    let testInstance: deleteProduct;
    let deleteProductRepository: MockProxy<DeleteProductRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteProductRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteProductRepository.deleteProduct.mockResolvedValue(productEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteProductUsecase(deleteProductRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteProduct of deleteProductRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteProductRepository.deleteProduct).toHaveBeenCalledWith(fakeQuery);

        expect(deleteProductRepository.deleteProduct).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted product when deleteProductRepository deletes it", async () => {
        const product = await testInstance(fakeQuery);

        expect(product).toEqual(productEntityMock);
    });

    it("should return null when deleteProductRepository fails to insert", async () => {
        deleteProductRepository.deleteProduct.mockResolvedValue(null);

        const product = await testInstance(fakeQuery);

        expect(product).toBeNull();
    });

    it("should throw an error when deleteProductRepository throws an error", async () => {
        deleteProductRepository.deleteProduct.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

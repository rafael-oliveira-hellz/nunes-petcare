import { Query } from "@/application/@types";
import { productEntityMock } from "@/slices/product/entities/ProductEntity.spec";
import { LoadProductRepository } from "@/slices/product/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadProduct, loadProductUsecase } from "./LoadProductUseCase";

describe("loadProduct", () => {
    let fakeQuery: Query;
    let testInstance: loadProduct;
    let loadProductRepository: MockProxy<LoadProductRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadProductRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadProductRepository.loadProduct.mockResolvedValue(productEntityMock);
    });

    beforeEach(() => {
        testInstance = loadProductUsecase(loadProductRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadProduct of loadProductRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadProductRepository.loadProduct).toHaveBeenCalledWith(fakeQuery);

        expect(loadProductRepository.loadProduct).toHaveBeenCalledTimes(1);
    });

    it("should return a product when loadProductRepository loads it", async () => {
        const product = await testInstance(fakeQuery);

        expect(product).toEqual(productEntityMock);
    });

    it("should return null when loadProductRepository fails to load", async () => {
        loadProductRepository.loadProduct.mockResolvedValue(null);

        const product = await testInstance(fakeQuery);

        expect(product).toBeNull();
    });

    it("should throw an error when loadProductRepository throws an error", async () => {
        loadProductRepository.loadProduct.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

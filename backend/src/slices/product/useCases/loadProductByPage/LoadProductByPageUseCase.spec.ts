import { Query } from "@/application/@types";
import { productEntityPaginatedMock } from "@/slices/product/entities/ProductEntity.spec";
import { LoadProductByPageRepository } from "@/slices/product/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadProductByPage, loadProductByPageUsecase } from "./LoadProductByPageUseCase";

describe("loadProductByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadProductByPage;
    let loadProductRepository: MockProxy<LoadProductByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadProductRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadProductRepository.loadByPage.mockResolvedValue(productEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadProductByPageUsecase(loadProductRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadProductByPage of loadProductRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadProductRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadProductRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a product when loadProductRepository loads it", async () => {
        const product = await testInstance(fakeQuery);

        expect(product).toEqual(productEntityPaginatedMock);
    });

    it("should return null when loadProductRepository fails to load", async () => {
        loadProductRepository.loadByPage.mockResolvedValue(null);

        const product = await testInstance(fakeQuery);

        expect(product).toBeNull();
    });

    it("should throw an error when loadProductRepository throws an error", async () => {
        loadProductRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

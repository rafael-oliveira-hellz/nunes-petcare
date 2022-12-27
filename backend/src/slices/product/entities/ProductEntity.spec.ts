import MockDate from "mockdate";
import { ProductEntity } from "./ProductEntity";

export const productEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Product name",
    quantity: 10,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const productEntityPaginatedMock = {
    products: [
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
        productEntityMock,
    ],
    total: 15,
};

describe("ProductEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Product entity", () => {
        const productEntity = new ProductEntity(productEntityMock);
        expect(productEntity).toBeTruthy();
        expect(productEntity).toEqual({
            ...productEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

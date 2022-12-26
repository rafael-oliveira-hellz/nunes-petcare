import MockDate from "mockdate";
import { CategoryEntity } from "./CategoryEntity";

export const categoryEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Category name",
    active: true,
    description: "Category description",
    image: "/uploads/image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const categoryEntityPaginatedMock = {
    categories: [
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
        categoryEntityMock,
    ],
    total: 15,
};

describe("CategoryEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a category entity", () => {
        const categoryEntity = new CategoryEntity(categoryEntityMock);
        expect(categoryEntity).toBeTruthy();
        expect(categoryEntity).toEqual({
            ...categoryEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

import MockDate from "mockdate";
import { RequestEntity } from "./RequestEntity";

export const requestEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Request name",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const requestEntityPaginatedMock = {
    requests: [
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
        requestEntityMock,
    ],
    total: 15,
};

describe("RequestEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Request entity", () => {
        const requestEntity = new RequestEntity(requestEntityMock);
        expect(requestEntity).toBeTruthy();
        expect(requestEntity).toEqual({
            ...requestEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

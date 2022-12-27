import MockDate from "mockdate";
import { OwnerEntity } from "./OwnerEntity";

export const ownerEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Owner name",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const ownerEntityPaginatedMock = {
    owners: [
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
        ownerEntityMock,
    ],
    total: 15,
};

describe("OwnerEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Owner entity", () => {
        const ownerEntity = new OwnerEntity(ownerEntityMock);
        expect(ownerEntity).toBeTruthy();
        expect(ownerEntity).toEqual({
            ...ownerEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

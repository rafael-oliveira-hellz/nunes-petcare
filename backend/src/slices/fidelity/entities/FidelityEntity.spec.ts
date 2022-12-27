import MockDate from "mockdate";
import { FidelityEntity } from "./FidelityEntity";

export const fidelityEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Fidelity name",
    requestId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    points: 10,
    customerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ownerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const fidelityEntityPaginatedMock = {
    fidelities: [
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
        fidelityEntityMock,
    ],
    total: 15,
};

describe("FidelityEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Fidelity entity", () => {
        const fidelityEntity = new FidelityEntity(fidelityEntityMock);
        expect(fidelityEntity).toBeTruthy();
        expect(fidelityEntity).toEqual({
            ...fidelityEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

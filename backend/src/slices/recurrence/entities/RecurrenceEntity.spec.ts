import MockDate from "mockdate";
import { RecurrenceEntity } from "./RecurrenceEntity";

export const recurrenceEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Recurrence name",
    type: 1,
    accept: true,
    appointmentsWasInserted: true,
    frequency: 1,
    initDate: new Date(),
    endDate: new Date(),
    professionalId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    requestId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    clientId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ownerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    serviceId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const recurrenceEntityPaginatedMock = {
    recurrences: [
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
        recurrenceEntityMock,
    ],
    total: 15,
};

describe("RecurrenceEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Recurrence entity", () => {
        const recurrenceEntity = new RecurrenceEntity(recurrenceEntityMock);
        expect(recurrenceEntity).toBeTruthy();
        expect(recurrenceEntity).toEqual({
            ...recurrenceEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

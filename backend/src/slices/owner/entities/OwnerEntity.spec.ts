import MockDate from "mockdate";
import { OwnerEntity } from "./OwnerEntity";

export const ownerEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Owner name",
    totalAppointments: 0,
    totalRatings: 0,
    hasDelivery: true,
    typeTax: "fixed",
    costByTimeDriving: 0,
    fidelityTaxPoints: 0,
    fixedTax: 0,
    minimumTimeForRescheduling: 0,
    description: "Owner description",
    daysOne: {
        mondayOne: true,
        tuesdayOne: true,
        wednesdayOne: true,
        thursdayOne: true,
        fridayOne: true,
        saturdayOne: true,
        sundayOne: false,
    },
    daysTwo: [],
    hoursStartOne: "00:00",
    hoursEndOne: "23:59",
    hoursStartTwo: "00:00",
    hoursEndTwo: "00:00",
    hourLunchStartOne: "00:00",
    hourLunchEndOne: "00:00",
    hourLunchStartTwo: "00:00",
    hourLunchEndTwo: "00:00",
    daysThree: [],
    daysFour: [],
    hoursStartThree: "00:00",
    hoursEndThree: "00:00",
    hoursStartFour: "00:00",
    hoursEndFour: "00:00",
    hourLunchStartThree: "00:00",
    hourLunchEndThree: "00:00",
    hourLunchStartFour: "00:00",
    hourLunchEndFour: "00:00",
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

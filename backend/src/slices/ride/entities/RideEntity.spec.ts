import MockDate from "mockdate";
import { RideEntity } from "./RideEntity";

export const rideEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Ride name",
    requestId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    driverUserType: "Ride driverUserType",
    origin: "Ride origin",
    destination: "Ride destination",
    status: 1,
    distance: 1,
    distanceTime: 60,
    maxCostEstimated: 50,
    minCostEstimated: 10,
    finalCost: 20,
    costDefinedByOwner: 20,
    initDate: new Date(),
    endDateEstimated: new Date(),
    endDate: new Date(),
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const rideEntityPaginatedMock = {
    rides: [
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
        rideEntityMock,
    ],
    total: 15,
};

describe("RideEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Ride entity", () => {
        const rideEntity = new RideEntity(rideEntityMock);
        expect(rideEntity).toBeTruthy();
        expect(rideEntity).toEqual({
            ...rideEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

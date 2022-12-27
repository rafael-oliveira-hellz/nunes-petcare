import MockDate from "mockdate";
import { ServiceEntity } from "./ServiceEntity";

export const serviceEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Service name",
    categoryId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    duration: 60,
    description: "Service description",
    productsQuantityNeeded: 1,
    productId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    promotionalPrice: 100,
    price: 200,
    finalPrice: 150,
    comission: 50,
    comissionPercentage: 25,
    hasPromotionalPrice: true,
    hasFidelityGeneration: true,
    generateHowManyFidelityPoints: 10,
    totalAppointmentsDone: 0,
    canPayWithFidelityPoints: true,
    howManyPointsIsNeededToCashOut: 100,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const serviceEntityPaginatedMock = {
    services: [
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
        serviceEntityMock,
    ],
    total: 15,
};

describe("ServiceEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Service entity", () => {
        const serviceEntity = new ServiceEntity(serviceEntityMock);
        expect(serviceEntity).toBeTruthy();
        expect(serviceEntity).toEqual({
            ...serviceEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

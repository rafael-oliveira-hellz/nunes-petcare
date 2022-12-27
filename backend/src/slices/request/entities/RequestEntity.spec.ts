import { fidelityEntityMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { orderEntityMock } from "@/slices/order/entities/OrderEntity.spec";
import { recurrenceEntityMock } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { rideEntityMock } from "@/slices/ride/entities/RideEntity.spec";
import MockDate from "mockdate";
import { RequestEntity } from "./RequestEntity";

export const requestEntityMock = {
    _id: "123",
    createdById: "123",
    name: "fakeRequestEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasDelivery: true,
    hasRecurrence: true,
    hasFidelity: true,
    hasRide: true,
    message: "Olá fulano, gostaria de marcar horário as 10h da manhã",
    serviceId: "fakeServiceId",
    createdForId: "fakeUserId",
    ownerId: "fakeUserId",
    customerId: "fakeUserId",
    customerUserId: "fakeUserId",
    professionalId: "fakeUser2Id",
    status: 1,
    initDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    read: false,
    push: false,
    email: false,
    cancelledAt: null,
    order: orderEntityMock,
    fidelity: fidelityEntityMock,
    recurrence: recurrenceEntityMock,
    ride: rideEntityMock,
    updatedById: "61c1f9d0e399d2917bdff44e",
    updatedByRole: "admin",
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
            status: 0,
            updatedById: null,
            updatedByRole: null,
        });
    });
});

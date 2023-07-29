import MockDate from "mockdate";
import { OrderEntity } from "./OrderEntity";

export const orderEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Order name",
    percentageAdopted: 10,
    paymentForm: "Order paymentForm",
    orderPaidByCustomer: true,
    comissionPaidByOwner: true,
    comissionValue: 10,
    totalValue: 50,
    professionalId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ownerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    requestId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    customerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    extraCost: 0,
    normalCost: 10,
    hasFidelity: true,
    hasDelivery: true,
    pointsUsed: 10,
    appointmentDate: new Date(),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const orderEntityPaginatedMock = {
    orders: [
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
        orderEntityMock,
    ],
    total: 15,
};

describe("OrderEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Order entity", () => {
        const orderEntity = new OrderEntity(orderEntityMock);
        expect(orderEntity).toBeTruthy();
        expect(orderEntity).toEqual({
            ...orderEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

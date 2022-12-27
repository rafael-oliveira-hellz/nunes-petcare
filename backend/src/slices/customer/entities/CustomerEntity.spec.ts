import MockDate from "mockdate";
import { CustomerEntity } from "./CustomerEntity";

export const customerEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Customer name",
    cpf: "12345678901",
    phone: "12345678901",
    userId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ownerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    birthdate: new Date(),
    totalAppointmentsDone: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const customerEntityPaginatedMock = {
    customers: [
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
        customerEntityMock,
    ],
    total: 15,
};

describe("CustomerEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Customer entity", () => {
        const customerEntity = new CustomerEntity(customerEntityMock);
        expect(customerEntity).toBeTruthy();
        expect(customerEntity).toEqual({
            ...customerEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

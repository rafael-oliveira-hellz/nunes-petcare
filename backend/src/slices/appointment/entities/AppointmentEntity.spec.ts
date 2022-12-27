import MockDate from "mockdate";
import { AppointmentEntity } from "./AppointmentEntity";

export const appointmentEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Appointment name",
    requestId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    message: "Appointment message",
    service: "Appointment service",
    ownerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    customerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    professionalId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    serviceId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdForId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    status: "pendente",
    read: true,
    cancelled: true,
    push: true,
    email: true,
    startDate: new Date(),
    endDate: new Date(),
    cancelledAt: new Date(),
    cancelledBy: "5f7b5f9b0b9b9b0b9b0b9b0b",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const appointmentEntityPaginatedMock = {
    appointments: [
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
        appointmentEntityMock,
    ],
    total: 15,
};

describe("AppointmentEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Appointment entity", () => {
        const appointmentEntity = new AppointmentEntity(appointmentEntityMock);
        expect(appointmentEntity).toBeTruthy();
        expect(appointmentEntity).toEqual({
            ...appointmentEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

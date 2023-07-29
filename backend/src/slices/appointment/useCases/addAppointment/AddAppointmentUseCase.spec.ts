import { AppointmentEntity } from "@/slices/appointment/entities";
import { appointmentEntityMock } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { AddAppointmentRepository } from "@/slices/appointment/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addAppointment, AddAppointment } from "./AddAppointmentUseCase";

describe("addAppointment", () => {
    let testInstance: AddAppointment;
    let addAppointmentRepository: MockProxy<AddAppointmentRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addAppointmentRepository = mock();

        addAppointmentRepository.addAppointment.mockResolvedValue(appointmentEntityMock);
    });

    beforeEach(() => {
        testInstance = addAppointment(addAppointmentRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addAppointment of addAppointmentRepository with correct values", async () => {
        await testInstance(appointmentEntityMock);

        expect(addAppointmentRepository.addAppointment).toHaveBeenCalledWith(
            new AppointmentEntity(appointmentEntityMock),
        );

        expect(addAppointmentRepository.addAppointment).toHaveBeenCalledTimes(1);
    });

    it("should return a new appointment when addAppointmentRepository inserts it", async () => {
        const appointment = await testInstance(appointmentEntityMock);

        expect(appointment).toEqual(appointmentEntityMock);
    });

    it("should return null when addAppointmentRepository fails to insert", async () => {
        addAppointmentRepository.addAppointment.mockResolvedValue(null);

        const appointment = await testInstance(appointmentEntityMock);

        expect(appointment).toBeNull();
    });

    it("should throw an error when addAppointmentRepository throws an error", async () => {
        addAppointmentRepository.addAppointment.mockRejectedValue(new Error("Error"));

        await expect(testInstance(appointmentEntityMock)).rejects.toThrowError("Error");
    });
});

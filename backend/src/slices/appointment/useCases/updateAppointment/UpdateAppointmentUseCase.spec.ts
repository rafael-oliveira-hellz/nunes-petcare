import { Query } from "@/application/types";
import { appointmentEntityMock } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { UpdateAppointmentRepository } from "@/slices/appointment/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateAppointment, updateAppointmentUsecase } from "./UpdateAppointmentUseCase";

describe("updateAppointment", () => {
    let fakeQuery: Query;
    let testInstance: updateAppointment;
    let updateAppointmentRepository: MockProxy<UpdateAppointmentRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateAppointmentRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateAppointmentRepository.updateAppointment.mockResolvedValue(appointmentEntityMock);
    });

    beforeEach(() => {
        testInstance = updateAppointmentUsecase(updateAppointmentRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateAppointment of updateAppointmentRepository with correct values", async () => {
        await testInstance(fakeQuery, appointmentEntityMock);

        expect(updateAppointmentRepository.updateAppointment).toHaveBeenCalledWith(
            fakeQuery,
            appointmentEntityMock,
        );

        expect(updateAppointmentRepository.updateAppointment).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted appointment when updateAppointmentRepository deletes it", async () => {
        const appointment = await testInstance(fakeQuery, appointmentEntityMock);

        expect(appointment).toEqual(appointmentEntityMock);
    });

    it("should return null when updateAppointmentRepository fails to insert", async () => {
        updateAppointmentRepository.updateAppointment.mockResolvedValue(null);

        const appointment = await testInstance(fakeQuery, appointmentEntityMock);

        expect(appointment).toBeNull();
    });

    it("should throw an error when updateAppointmentRepository throws an error", async () => {
        updateAppointmentRepository.updateAppointment.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, appointmentEntityMock)).rejects.toThrowError("Error");
    });
});

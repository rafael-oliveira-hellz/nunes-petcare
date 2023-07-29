import { Query } from "@/application/types";
import { appointmentEntityMock } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { DeleteAppointmentRepository } from "@/slices/appointment/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteAppointment, DeleteAppointment } from "./DeleteAppointmentUseCase";

describe("deleteAppointment", () => {
    let fakeQuery: Query;
    let testInstance: DeleteAppointment;
    let deleteAppointmentRepository: MockProxy<DeleteAppointmentRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteAppointmentRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteAppointmentRepository.deleteAppointment.mockResolvedValue(appointmentEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteAppointment(deleteAppointmentRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteAppointment of deleteAppointmentRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteAppointmentRepository.deleteAppointment).toHaveBeenCalledWith(fakeQuery);

        expect(deleteAppointmentRepository.deleteAppointment).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted appointment when deleteAppointmentRepository deletes it", async () => {
        const appointment = await testInstance(fakeQuery);

        expect(appointment).toEqual(appointmentEntityMock);
    });

    it("should return null when deleteAppointmentRepository fails to insert", async () => {
        deleteAppointmentRepository.deleteAppointment.mockResolvedValue(null);

        const appointment = await testInstance(fakeQuery);

        expect(appointment).toBeNull();
    });

    it("should throw an error when deleteAppointmentRepository throws an error", async () => {
        deleteAppointmentRepository.deleteAppointment.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

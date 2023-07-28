import { Query } from "@/application/types";
import { appointmentEntityMock } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAppointmentRepository } from "@/slices/appointment/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadAppointment, loadAppointmentUsecase } from "./LoadAppointmentUseCase";

describe("loadAppointment", () => {
    let fakeQuery: Query;
    let testInstance: loadAppointment;
    let loadAppointmentRepository: MockProxy<LoadAppointmentRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadAppointmentRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadAppointmentRepository.loadAppointment.mockResolvedValue(appointmentEntityMock);
    });

    beforeEach(() => {
        testInstance = loadAppointmentUsecase(loadAppointmentRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadAppointment of loadAppointmentRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadAppointmentRepository.loadAppointment).toHaveBeenCalledWith(fakeQuery);

        expect(loadAppointmentRepository.loadAppointment).toHaveBeenCalledTimes(1);
    });

    it("should return a appointment when loadAppointmentRepository loads it", async () => {
        const appointment = await testInstance(fakeQuery);

        expect(appointment).toEqual(appointmentEntityMock);
    });

    it("should return null when loadAppointmentRepository fails to load", async () => {
        loadAppointmentRepository.loadAppointment.mockResolvedValue(null);

        const appointment = await testInstance(fakeQuery);

        expect(appointment).toBeNull();
    });

    it("should throw an error when loadAppointmentRepository throws an error", async () => {
        loadAppointmentRepository.loadAppointment.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

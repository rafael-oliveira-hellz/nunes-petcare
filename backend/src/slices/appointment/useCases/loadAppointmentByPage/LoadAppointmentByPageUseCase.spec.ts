import { Query } from "@/application/types";
import { appointmentEntityPaginatedMock } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAppointmentByPageRepository } from "@/slices/appointment/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import {
    loadAppointmentByPage,
    loadAppointmentByPageUsecase,
} from "./LoadAppointmentByPageUseCase";

describe("loadAppointmentByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadAppointmentByPage;
    let loadAppointmentRepository: MockProxy<LoadAppointmentByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadAppointmentRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadAppointmentRepository.loadByPage.mockResolvedValue(
            appointmentEntityPaginatedMock,
        );
    });

    beforeEach(() => {
        testInstance = loadAppointmentByPageUsecase(loadAppointmentRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadAppointmentByPage of loadAppointmentRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadAppointmentRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadAppointmentRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a appointment when loadAppointmentRepository loads it", async () => {
        const appointment = await testInstance(fakeQuery);

        expect(appointment).toEqual(appointmentEntityPaginatedMock);
    });

    it("should return null when loadAppointmentRepository fails to load", async () => {
        loadAppointmentRepository.loadByPage.mockResolvedValue(null);

        const appointment = await testInstance(fakeQuery);

        expect(appointment).toBeNull();
    });

    it("should throw an error when loadAppointmentRepository throws an error", async () => {
        loadAppointmentRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

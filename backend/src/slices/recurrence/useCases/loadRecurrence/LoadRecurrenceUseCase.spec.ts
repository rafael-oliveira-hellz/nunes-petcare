import { Query } from "@/application/@types";
import { recurrenceEntityMock } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { LoadRecurrenceRepository } from "@/slices/recurrence/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRecurrence, loadRecurrenceUsecase } from "./LoadRecurrenceUseCase";

describe("loadRecurrence", () => {
    let fakeQuery: Query;
    let testInstance: loadRecurrence;
    let loadRecurrenceRepository: MockProxy<LoadRecurrenceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRecurrenceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRecurrenceRepository.loadRecurrence.mockResolvedValue(recurrenceEntityMock);
    });

    beforeEach(() => {
        testInstance = loadRecurrenceUsecase(loadRecurrenceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRecurrence of loadRecurrenceRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRecurrenceRepository.loadRecurrence).toHaveBeenCalledWith(fakeQuery);

        expect(loadRecurrenceRepository.loadRecurrence).toHaveBeenCalledTimes(1);
    });

    it("should return a recurrence when loadRecurrenceRepository loads it", async () => {
        const recurrence = await testInstance(fakeQuery);

        expect(recurrence).toEqual(recurrenceEntityMock);
    });

    it("should return null when loadRecurrenceRepository fails to load", async () => {
        loadRecurrenceRepository.loadRecurrence.mockResolvedValue(null);

        const recurrence = await testInstance(fakeQuery);

        expect(recurrence).toBeNull();
    });

    it("should throw an error when loadRecurrenceRepository throws an error", async () => {
        loadRecurrenceRepository.loadRecurrence.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

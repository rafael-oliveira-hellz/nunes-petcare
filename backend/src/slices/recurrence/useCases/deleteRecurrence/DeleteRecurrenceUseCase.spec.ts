import { Query } from "@/application/types";
import { recurrenceEntityMock } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { DeleteRecurrenceRepository } from "@/slices/recurrence/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteRecurrence, deleteRecurrenceUsecase } from "./DeleteRecurrenceUseCase";

describe("deleteRecurrence", () => {
    let fakeQuery: Query;
    let testInstance: deleteRecurrence;
    let deleteRecurrenceRepository: MockProxy<DeleteRecurrenceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRecurrenceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteRecurrenceRepository.deleteRecurrence.mockResolvedValue(recurrenceEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteRecurrenceUsecase(deleteRecurrenceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteRecurrence of deleteRecurrenceRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteRecurrenceRepository.deleteRecurrence).toHaveBeenCalledWith(fakeQuery);

        expect(deleteRecurrenceRepository.deleteRecurrence).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted recurrence when deleteRecurrenceRepository deletes it", async () => {
        const recurrence = await testInstance(fakeQuery);

        expect(recurrence).toEqual(recurrenceEntityMock);
    });

    it("should return null when deleteRecurrenceRepository fails to insert", async () => {
        deleteRecurrenceRepository.deleteRecurrence.mockResolvedValue(null);

        const recurrence = await testInstance(fakeQuery);

        expect(recurrence).toBeNull();
    });

    it("should throw an error when deleteRecurrenceRepository throws an error", async () => {
        deleteRecurrenceRepository.deleteRecurrence.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

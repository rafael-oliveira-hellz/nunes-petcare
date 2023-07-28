import { Query } from "@/application/types";
import { recurrenceEntityMock } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { UpdateRecurrenceRepository } from "@/slices/recurrence/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateRecurrence, updateRecurrenceUsecase } from "./UpdateRecurrenceUseCase";

describe("updateRecurrence", () => {
    let fakeQuery: Query;
    let testInstance: updateRecurrence;
    let updateRecurrenceRepository: MockProxy<UpdateRecurrenceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateRecurrenceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateRecurrenceRepository.updateRecurrence.mockResolvedValue(recurrenceEntityMock);
    });

    beforeEach(() => {
        testInstance = updateRecurrenceUsecase(updateRecurrenceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateRecurrence of updateRecurrenceRepository with correct values", async () => {
        await testInstance(fakeQuery, recurrenceEntityMock);

        expect(updateRecurrenceRepository.updateRecurrence).toHaveBeenCalledWith(
            fakeQuery,
            recurrenceEntityMock,
        );

        expect(updateRecurrenceRepository.updateRecurrence).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted recurrence when updateRecurrenceRepository deletes it", async () => {
        const recurrence = await testInstance(fakeQuery, recurrenceEntityMock);

        expect(recurrence).toEqual(recurrenceEntityMock);
    });

    it("should return null when updateRecurrenceRepository fails to insert", async () => {
        updateRecurrenceRepository.updateRecurrence.mockResolvedValue(null);

        const recurrence = await testInstance(fakeQuery, recurrenceEntityMock);

        expect(recurrence).toBeNull();
    });

    it("should throw an error when updateRecurrenceRepository throws an error", async () => {
        updateRecurrenceRepository.updateRecurrence.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, recurrenceEntityMock)).rejects.toThrowError("Error");
    });
});

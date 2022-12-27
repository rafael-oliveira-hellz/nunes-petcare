import { RecurrenceEntity } from "@/slices/recurrence/entities";
import { recurrenceEntityMock } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addRecurrence, addRecurrenceUsecase } from "./AddRecurrenceUseCase";

describe("addRecurrence", () => {
    let testInstance: addRecurrence;
    let addRecurrenceRepository: MockProxy<AddRecurrenceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addRecurrenceRepository = mock();

        addRecurrenceRepository.addRecurrence.mockResolvedValue(recurrenceEntityMock);
    });

    beforeEach(() => {
        testInstance = addRecurrenceUsecase(addRecurrenceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addRecurrence of addRecurrenceRepository with correct values", async () => {
        await testInstance(recurrenceEntityMock);

        expect(addRecurrenceRepository.addRecurrence).toHaveBeenCalledWith(
            new RecurrenceEntity(recurrenceEntityMock)
        );

        expect(addRecurrenceRepository.addRecurrence).toHaveBeenCalledTimes(1);
    });

    it("should return a new recurrence when addRecurrenceRepository inserts it", async () => {
        const recurrence = await testInstance(recurrenceEntityMock);

        expect(recurrence).toEqual(recurrenceEntityMock);
    });

    it("should return null when addRecurrenceRepository fails to insert", async () => {
        addRecurrenceRepository.addRecurrence.mockResolvedValue(null);

        const recurrence = await testInstance(recurrenceEntityMock);

        expect(recurrence).toBeNull();
    });

    it("should throw an error when addRecurrenceRepository throws an error", async () => {
        addRecurrenceRepository.addRecurrence.mockRejectedValue(new Error("Error"));

        await expect(testInstance(recurrenceEntityMock)).rejects.toThrowError("Error");
    });
});

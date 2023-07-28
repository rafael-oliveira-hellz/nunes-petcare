import { Query } from "@/application/types";
import { recurrenceEntityPaginatedMock } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { LoadRecurrenceByPageRepository } from "@/slices/recurrence/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRecurrenceByPage, loadRecurrenceByPageUsecase } from "./LoadRecurrenceByPageUseCase";

describe("loadRecurrenceByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadRecurrenceByPage;
    let loadRecurrenceRepository: MockProxy<LoadRecurrenceByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRecurrenceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRecurrenceRepository.loadByPage.mockResolvedValue(recurrenceEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadRecurrenceByPageUsecase(loadRecurrenceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRecurrenceByPage of loadRecurrenceRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRecurrenceRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadRecurrenceRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a recurrence when loadRecurrenceRepository loads it", async () => {
        const recurrence = await testInstance(fakeQuery);

        expect(recurrence).toEqual(recurrenceEntityPaginatedMock);
    });

    it("should return null when loadRecurrenceRepository fails to load", async () => {
        loadRecurrenceRepository.loadByPage.mockResolvedValue(null);

        const recurrence = await testInstance(fakeQuery);

        expect(recurrence).toBeNull();
    });

    it("should throw an error when loadRecurrenceRepository throws an error", async () => {
        loadRecurrenceRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

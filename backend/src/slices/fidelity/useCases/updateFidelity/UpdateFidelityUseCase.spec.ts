import { Query } from "@/application/types";
import { fidelityEntityMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { UpdateFidelityRepository } from "@/slices/fidelity/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateFidelity, UpdateFidelity } from "./UpdateFidelityUseCase";

describe("updateFidelity", () => {
    let fakeQuery: Query;
    let testInstance: UpdateFidelity;
    let updateFidelityRepository: MockProxy<UpdateFidelityRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateFidelityRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateFidelityRepository.updateFidelity.mockResolvedValue(fidelityEntityMock);
    });

    beforeEach(() => {
        testInstance = updateFidelity(updateFidelityRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateFidelity of updateFidelityRepository with correct values", async () => {
        await testInstance(fakeQuery, fidelityEntityMock);

        expect(updateFidelityRepository.updateFidelity).toHaveBeenCalledWith(
            fakeQuery,
            fidelityEntityMock,
        );

        expect(updateFidelityRepository.updateFidelity).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted fidelity when updateFidelityRepository deletes it", async () => {
        const fidelity = await testInstance(fakeQuery, fidelityEntityMock);

        expect(fidelity).toEqual(fidelityEntityMock);
    });

    it("should return null when updateFidelityRepository fails to insert", async () => {
        updateFidelityRepository.updateFidelity.mockResolvedValue(null);

        const fidelity = await testInstance(fakeQuery, fidelityEntityMock);

        expect(fidelity).toBeNull();
    });

    it("should throw an error when updateFidelityRepository throws an error", async () => {
        updateFidelityRepository.updateFidelity.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, fidelityEntityMock)).rejects.toThrowError("Error");
    });
});

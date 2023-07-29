import { Query } from "@/application/types";
import { fidelityEntityMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { LoadFidelityRepository } from "@/slices/fidelity/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadFidelity, LoadFidelity } from "./LoadFidelityUseCase";

describe("loadFidelity", () => {
    let fakeQuery: Query;
    let testInstance: LoadFidelity;
    let loadFidelityRepository: MockProxy<LoadFidelityRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadFidelityRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadFidelityRepository.loadFidelity.mockResolvedValue(fidelityEntityMock);
    });

    beforeEach(() => {
        testInstance = loadFidelity(loadFidelityRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadFidelity of loadFidelityRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadFidelityRepository.loadFidelity).toHaveBeenCalledWith(fakeQuery);

        expect(loadFidelityRepository.loadFidelity).toHaveBeenCalledTimes(1);
    });

    it("should return a fidelity when loadFidelityRepository loads it", async () => {
        const fidelity = await testInstance(fakeQuery);

        expect(fidelity).toEqual(fidelityEntityMock);
    });

    it("should return null when loadFidelityRepository fails to load", async () => {
        loadFidelityRepository.loadFidelity.mockResolvedValue(null);

        const fidelity = await testInstance(fakeQuery);

        expect(fidelity).toBeNull();
    });

    it("should throw an error when loadFidelityRepository throws an error", async () => {
        loadFidelityRepository.loadFidelity.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

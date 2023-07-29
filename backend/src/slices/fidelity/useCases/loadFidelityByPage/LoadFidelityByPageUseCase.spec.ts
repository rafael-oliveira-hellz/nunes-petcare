import { Query } from "@/application/types";
import { fidelityEntityPaginatedMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { LoadFidelityByPageRepository } from "@/slices/fidelity/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadFidelityByPage, LoadFidelityByPage } from "./LoadFidelityByPageUseCase";

describe("loadFidelityByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadFidelityByPage;
    let loadFidelityRepository: MockProxy<LoadFidelityByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadFidelityRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadFidelityRepository.loadFidelityByPage.mockResolvedValue(fidelityEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadFidelityByPage(loadFidelityRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadFidelityByPage of loadFidelityRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadFidelityRepository.loadFidelityByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadFidelityRepository.loadFidelityByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a fidelity when loadFidelityRepository loads it", async () => {
        const fidelity = await testInstance(fakeQuery);

        expect(fidelity).toEqual(fidelityEntityPaginatedMock);
    });

    it("should return null when loadFidelityRepository fails to load", async () => {
        loadFidelityRepository.loadFidelityByPage.mockResolvedValue(null);

        const fidelity = await testInstance(fakeQuery);

        expect(fidelity).toBeNull();
    });

    it("should throw an error when loadFidelityRepository throws an error", async () => {
        loadFidelityRepository.loadFidelityByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

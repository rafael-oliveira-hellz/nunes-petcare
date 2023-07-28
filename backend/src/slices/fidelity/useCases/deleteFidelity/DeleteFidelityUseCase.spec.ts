import { Query } from "@/application/types";
import { fidelityEntityMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { DeleteFidelityRepository } from "@/slices/fidelity/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteFidelity, deleteFidelityUsecase } from "./DeleteFidelityUseCase";

describe("deleteFidelity", () => {
    let fakeQuery: Query;
    let testInstance: deleteFidelity;
    let deleteFidelityRepository: MockProxy<DeleteFidelityRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteFidelityRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteFidelityRepository.deleteFidelity.mockResolvedValue(fidelityEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteFidelityUsecase(deleteFidelityRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteFidelity of deleteFidelityRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteFidelityRepository.deleteFidelity).toHaveBeenCalledWith(fakeQuery);

        expect(deleteFidelityRepository.deleteFidelity).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted fidelity when deleteFidelityRepository deletes it", async () => {
        const fidelity = await testInstance(fakeQuery);

        expect(fidelity).toEqual(fidelityEntityMock);
    });

    it("should return null when deleteFidelityRepository fails to insert", async () => {
        deleteFidelityRepository.deleteFidelity.mockResolvedValue(null);

        const fidelity = await testInstance(fakeQuery);

        expect(fidelity).toBeNull();
    });

    it("should throw an error when deleteFidelityRepository throws an error", async () => {
        deleteFidelityRepository.deleteFidelity.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

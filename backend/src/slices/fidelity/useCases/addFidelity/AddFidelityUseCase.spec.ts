import { FidelityEntity } from "@/slices/fidelity/entities";
import { fidelityEntityMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addFidelity, addFidelityUsecase } from "./AddFidelityUseCase";

describe("addFidelity", () => {
    let testInstance: addFidelity;
    let addFidelityRepository: MockProxy<AddFidelityRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addFidelityRepository = mock();

        addFidelityRepository.addFidelity.mockResolvedValue(fidelityEntityMock);
    });

    beforeEach(() => {
        testInstance = addFidelityUsecase(addFidelityRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addFidelity of addFidelityRepository with correct values", async () => {
        await testInstance(fidelityEntityMock);

        expect(addFidelityRepository.addFidelity).toHaveBeenCalledWith(
            new FidelityEntity(fidelityEntityMock)
        );

        expect(addFidelityRepository.addFidelity).toHaveBeenCalledTimes(1);
    });

    it("should return a new fidelity when addFidelityRepository inserts it", async () => {
        const fidelity = await testInstance(fidelityEntityMock);

        expect(fidelity).toEqual(fidelityEntityMock);
    });

    it("should return null when addFidelityRepository fails to insert", async () => {
        addFidelityRepository.addFidelity.mockResolvedValue(null);

        const fidelity = await testInstance(fidelityEntityMock);

        expect(fidelity).toBeNull();
    });

    it("should throw an error when addFidelityRepository throws an error", async () => {
        addFidelityRepository.addFidelity.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fidelityEntityMock)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/types";
import { ownerEntityMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { LoadOwnerRepository } from "@/slices/owner/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadOwner, loadOwnerUsecase } from "./LoadOwnerUseCase";

describe("loadOwner", () => {
    let fakeQuery: Query;
    let testInstance: loadOwner;
    let loadOwnerRepository: MockProxy<LoadOwnerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadOwnerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadOwnerRepository.loadOwner.mockResolvedValue(ownerEntityMock);
    });

    beforeEach(() => {
        testInstance = loadOwnerUsecase(loadOwnerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadOwner of loadOwnerRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadOwnerRepository.loadOwner).toHaveBeenCalledWith(fakeQuery);

        expect(loadOwnerRepository.loadOwner).toHaveBeenCalledTimes(1);
    });

    it("should return a owner when loadOwnerRepository loads it", async () => {
        const owner = await testInstance(fakeQuery);

        expect(owner).toEqual(ownerEntityMock);
    });

    it("should return null when loadOwnerRepository fails to load", async () => {
        loadOwnerRepository.loadOwner.mockResolvedValue(null);

        const owner = await testInstance(fakeQuery);

        expect(owner).toBeNull();
    });

    it("should throw an error when loadOwnerRepository throws an error", async () => {
        loadOwnerRepository.loadOwner.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

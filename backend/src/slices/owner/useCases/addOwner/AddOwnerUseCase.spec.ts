import { OwnerEntity } from "@/slices/owner/entities";
import { ownerEntityMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { AddOwnerRepository } from "@/slices/owner/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addOwner, AddOwner } from "./AddOwnerUseCase";

describe("addOwner", () => {
    let testInstance: AddOwner;
    let addOwnerRepository: MockProxy<AddOwnerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addOwnerRepository = mock();

        addOwnerRepository.addOwner.mockResolvedValue(ownerEntityMock);
    });

    beforeEach(() => {
        testInstance = addOwner(addOwnerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addOwner of addOwnerRepository with correct values", async () => {
        await testInstance(ownerEntityMock);

        expect(addOwnerRepository.addOwner).toHaveBeenCalledWith(new OwnerEntity(ownerEntityMock));

        expect(addOwnerRepository.addOwner).toHaveBeenCalledTimes(1);
    });

    it("should return a new owner when addOwnerRepository inserts it", async () => {
        const owner = await testInstance(ownerEntityMock);

        expect(owner).toEqual(ownerEntityMock);
    });

    it("should return null when addOwnerRepository fails to insert", async () => {
        addOwnerRepository.addOwner.mockResolvedValue(null);

        const owner = await testInstance(ownerEntityMock);

        expect(owner).toBeNull();
    });

    it("should throw an error when addOwnerRepository throws an error", async () => {
        addOwnerRepository.addOwner.mockRejectedValue(new Error("Error"));

        await expect(testInstance(ownerEntityMock)).rejects.toThrowError("Error");
    });
});

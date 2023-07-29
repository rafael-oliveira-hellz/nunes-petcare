import { Query } from "@/application/types";
import { ownerEntityMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { DeleteOwnerRepository } from "@/slices/owner/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteOwner, DeleteOwner } from "./DeleteOwnerUseCase";

describe("deleteOwner", () => {
    let fakeQuery: Query;
    let testInstance: DeleteOwner;
    let deleteOwnerRepository: MockProxy<DeleteOwnerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteOwnerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteOwnerRepository.deleteOwner.mockResolvedValue(ownerEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteOwner(deleteOwnerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteOwner of deleteOwnerRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteOwnerRepository.deleteOwner).toHaveBeenCalledWith(fakeQuery);

        expect(deleteOwnerRepository.deleteOwner).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted owner when deleteOwnerRepository deletes it", async () => {
        const owner = await testInstance(fakeQuery);

        expect(owner).toEqual(ownerEntityMock);
    });

    it("should return null when deleteOwnerRepository fails to insert", async () => {
        deleteOwnerRepository.deleteOwner.mockResolvedValue(null);

        const owner = await testInstance(fakeQuery);

        expect(owner).toBeNull();
    });

    it("should throw an error when deleteOwnerRepository throws an error", async () => {
        deleteOwnerRepository.deleteOwner.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

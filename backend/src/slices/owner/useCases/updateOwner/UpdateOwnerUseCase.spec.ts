import { Query } from "@/application/types";
import { ownerEntityMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { UpdateOwnerRepository } from "@/slices/owner/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateOwner, updateOwnerUsecase } from "./UpdateOwnerUseCase";

describe("updateOwner", () => {
    let fakeQuery: Query;
    let testInstance: updateOwner;
    let updateOwnerRepository: MockProxy<UpdateOwnerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateOwnerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateOwnerRepository.updateOwner.mockResolvedValue(ownerEntityMock);
    });

    beforeEach(() => {
        testInstance = updateOwnerUsecase(updateOwnerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateOwner of updateOwnerRepository with correct values", async () => {
        await testInstance(fakeQuery, ownerEntityMock);

        expect(updateOwnerRepository.updateOwner).toHaveBeenCalledWith(
            fakeQuery,
            ownerEntityMock,
        );

        expect(updateOwnerRepository.updateOwner).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted owner when updateOwnerRepository deletes it", async () => {
        const owner = await testInstance(fakeQuery, ownerEntityMock);

        expect(owner).toEqual(ownerEntityMock);
    });

    it("should return null when updateOwnerRepository fails to insert", async () => {
        updateOwnerRepository.updateOwner.mockResolvedValue(null);

        const owner = await testInstance(fakeQuery, ownerEntityMock);

        expect(owner).toBeNull();
    });

    it("should throw an error when updateOwnerRepository throws an error", async () => {
        updateOwnerRepository.updateOwner.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, ownerEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

import { Query } from "@/application/types";
import { ownerEntityPaginatedMock } from "@/slices/owner/entities/OwnerEntity.spec";
import { LoadOwnerByPageRepository } from "@/slices/owner/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadOwnerByPage, LoadOwnerByPage } from "./LoadOwnerByPageUseCase";

describe("loadOwnerByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadOwnerByPage;
    let loadOwnerRepository: MockProxy<LoadOwnerByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadOwnerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadOwnerRepository.loadOwnerByPage.mockResolvedValue(ownerEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadOwnerByPage(loadOwnerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadOwnerByPage of loadOwnerRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadOwnerRepository.loadOwnerByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadOwnerRepository.loadOwnerByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a owner when loadOwnerRepository loads it", async () => {
        const owner = await testInstance(fakeQuery);

        expect(owner).toEqual(ownerEntityPaginatedMock);
    });

    it("should return null when loadOwnerRepository fails to load", async () => {
        loadOwnerRepository.loadOwnerByPage.mockResolvedValue(null);

        const owner = await testInstance(fakeQuery);

        expect(owner).toBeNull();
    });

    it("should throw an error when loadOwnerRepository throws an error", async () => {
        loadOwnerRepository.loadOwnerByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

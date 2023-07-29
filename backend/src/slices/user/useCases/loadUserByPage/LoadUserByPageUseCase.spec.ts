import { Query } from "@/application/types";
import { userEntityPaginatedMock } from "@/slices/user/entities/UserEntity.spec";
import { LoadUserByPageRepository } from "@/slices/user/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { LoadUserByPage, loadUserByPage } from "./LoadUserByPageUseCase";

describe("loadUserByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadUserByPage;
    let loadUserRepository: MockProxy<LoadUserByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadUserRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadUserRepository.loadUserByPage.mockResolvedValue(userEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadUserByPage(loadUserRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadUserByPage of loadUserRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadUserRepository.loadUserByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadUserRepository.loadUserByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a user when loadUserRepository loads it", async () => {
        const user = await testInstance(fakeQuery);

        expect(user).toEqual(userEntityPaginatedMock);
    });

    it("should return null when loadUserRepository fails to load", async () => {
        loadUserRepository.loadUserByPage.mockResolvedValue(null);

        const user = await testInstance(fakeQuery);

        expect(user).toBeNull();
    });

    it("should throw an error when loadUserRepository throws an error", async () => {
        loadUserRepository.loadUserByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

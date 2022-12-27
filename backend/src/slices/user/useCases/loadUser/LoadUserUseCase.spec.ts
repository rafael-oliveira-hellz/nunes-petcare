import { Query } from "@/application/@types";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { LoadUserRepository } from "@/slices/user/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadUser, loadUserUsecase } from "./LoadUserUseCase";

describe("loadUser", () => {
    let fakeQuery: Query;
    let testInstance: loadUser;
    let loadUserRepository: MockProxy<LoadUserRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadUserRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadUserRepository.loadUser.mockResolvedValue(userEntityMock);
    });

    beforeEach(() => {
        testInstance = loadUserUsecase(loadUserRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadUser of loadUserRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadUserRepository.loadUser).toHaveBeenCalledWith(fakeQuery);

        expect(loadUserRepository.loadUser).toHaveBeenCalledTimes(1);
    });

    it("should return a user when loadUserRepository loads it", async () => {
        const user = await testInstance(fakeQuery);

        expect(user).toEqual(userEntityMock);
    });

    it("should return null when loadUserRepository fails to load", async () => {
        loadUserRepository.loadUser.mockResolvedValue(null);

        const user = await testInstance(fakeQuery);

        expect(user).toBeNull();
    });

    it("should throw an error when loadUserRepository throws an error", async () => {
        loadUserRepository.loadUser.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

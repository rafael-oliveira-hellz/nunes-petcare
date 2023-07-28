import { Query } from "@/application/types";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { DeleteUserRepository } from "@/slices/user/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteUser, deleteUserUsecase } from "./DeleteUserUseCase";

describe("deleteUser", () => {
    let fakeQuery: Query;
    let testInstance: deleteUser;
    let deleteUserRepository: MockProxy<DeleteUserRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteUserRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteUserRepository.deleteUser.mockResolvedValue(userEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteUserUsecase(deleteUserRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteUser of deleteUserRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteUserRepository.deleteUser).toHaveBeenCalledWith(fakeQuery);

        expect(deleteUserRepository.deleteUser).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted user when deleteUserRepository deletes it", async () => {
        const user = await testInstance(fakeQuery);

        expect(user).toEqual(userEntityMock);
    });

    it("should return null when deleteUserRepository fails to insert", async () => {
        deleteUserRepository.deleteUser.mockResolvedValue(null);

        const user = await testInstance(fakeQuery);

        expect(user).toBeNull();
    });

    it("should throw an error when deleteUserRepository throws an error", async () => {
        deleteUserRepository.deleteUser.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

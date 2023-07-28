import { Query } from "@/application/types";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { UpdateUserRepository } from "@/slices/user/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateUser, updateUserUsecase } from "./UpdateUserUseCase";

describe("updateUser", () => {
    let fakeQuery: Query;
    let testInstance: updateUser;
    let updateUserRepository: MockProxy<UpdateUserRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateUserRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateUserRepository.updateUser.mockResolvedValue(userEntityMock);
    });

    beforeEach(() => {
        testInstance = updateUserUsecase(updateUserRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateUser of updateUserRepository with correct values", async () => {
        await testInstance(fakeQuery, userEntityMock);

        expect(updateUserRepository.updateUser).toHaveBeenCalledWith(
            fakeQuery,
            userEntityMock,
        );

        expect(updateUserRepository.updateUser).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted user when updateUserRepository deletes it", async () => {
        const user = await testInstance(fakeQuery, userEntityMock);

        expect(user).toEqual(userEntityMock);
    });

    it("should return null when updateUserRepository fails to insert", async () => {
        updateUserRepository.updateUser.mockResolvedValue(null);

        const user = await testInstance(fakeQuery, userEntityMock);

        expect(user).toBeNull();
    });

    it("should throw an error when updateUserRepository throws an error", async () => {
        updateUserRepository.updateUser.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, userEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

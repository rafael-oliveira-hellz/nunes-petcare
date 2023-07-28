import { UserEntity } from "@/slices/user/entities";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { AddUserRepository } from "@/slices/user/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addUser, addUserUsecase } from "./AddUserUseCase";

describe("addUser", () => {
    let testInstance: addUser;
    let addUserRepository: MockProxy<AddUserRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addUserRepository = mock();

        addUserRepository.addUser.mockResolvedValue(userEntityMock);
    });

    beforeEach(() => {
        testInstance = addUserUsecase(addUserRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addUser of addUserRepository with correct values", async () => {
        await testInstance(userEntityMock);

        expect(addUserRepository.addUser).toHaveBeenCalledWith(new UserEntity(userEntityMock));

        expect(addUserRepository.addUser).toHaveBeenCalledTimes(1);
    });

    it("should return a new user when addUserRepository inserts it", async () => {
        const user = await testInstance(userEntityMock);

        expect(user).toEqual(userEntityMock);
    });

    it("should return null when addUserRepository fails to insert", async () => {
        addUserRepository.addUser.mockResolvedValue(null);

        const user = await testInstance(userEntityMock);

        expect(user).toBeNull();
    });

    it("should throw an error when addUserRepository throws an error", async () => {
        addUserRepository.addUser.mockRejectedValue(new Error("Error"));

        await expect(testInstance(userEntityMock)).rejects.toThrowError("Error");
    });
});

import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { UserEntity } from "@/slices/user/entities";
import { AddUserRepository } from "@/slices/user/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addUser } from "../index";
import { Encrypter } from "@/application/infra";

describe("addUser", () => {
    let testInstance: any;
    let addUserRepository: MockProxy<AddUserRepository>;
    let encrypter: MockProxy<Encrypter>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addUserRepository = mock();
        encrypter = mock();
        addUserRepository.addUser.mockResolvedValue(userEntityMock);
        encrypter.encrypt.mockResolvedValue("hashedText");
    });

    beforeEach(() => {
        testInstance = addUser(addUserRepository, encrypter);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addUser of AddUserRepository with correct values", async () => {
        await testInstance(userEntityMock);
        expect(addUserRepository.addUser).toHaveBeenCalledWith(
            new UserEntity({ ...userEntityMock, password: "hashedText" }),
        );

        expect(addUserRepository.addUser).toHaveBeenCalledTimes(1);
    });

    it("should return a new user created when addUserRepository insert it", async () => {
        const user = await testInstance(userEntityMock);
        expect(user).toEqual(userEntityMock);
    });

    it("should return null a new user created when addUserRepository insert it", async () => {
        addUserRepository.addUser.mockResolvedValue(null);
        const user = await testInstance(userEntityMock);
        expect(user).toBeNull();
    });

    it("should rethrow if addUser of AddUserRepository throws", async () => {
        addUserRepository.addUser.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(userEntityMock)).rejects.toThrowError("any_error");
    });
});

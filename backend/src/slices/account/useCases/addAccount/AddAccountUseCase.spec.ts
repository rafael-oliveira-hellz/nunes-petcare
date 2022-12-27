import { AccountEntity } from "@/slices/account/entities";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { AddAccountRepository } from "@/slices/account/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addAccount, addAccountUsecase } from "./AddAccountUseCase";

describe("addAccount", () => {
    let testInstance: addAccount;
    let addAccountRepository: MockProxy<AddAccountRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addAccountRepository = mock();

        addAccountRepository.addAccount.mockResolvedValue(accountEntityMock);
    });

    beforeEach(() => {
        testInstance = addAccountUsecase(addAccountRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addAccount of addAccountRepository with correct values", async () => {
        await testInstance(accountEntityMock);

        expect(addAccountRepository.addAccount).toHaveBeenCalledWith(
            new AccountEntity(accountEntityMock)
        );

        expect(addAccountRepository.addAccount).toHaveBeenCalledTimes(1);
    });

    it("should return a new account when addAccountRepository inserts it", async () => {
        const account = await testInstance(accountEntityMock);

        expect(account).toEqual(accountEntityMock);
    });

    it("should return null when addAccountRepository fails to insert", async () => {
        addAccountRepository.addAccount.mockResolvedValue(null);

        const account = await testInstance(accountEntityMock);

        expect(account).toBeNull();
    });

    it("should throw an error when addAccountRepository throws an error", async () => {
        addAccountRepository.addAccount.mockRejectedValue(new Error("Error"));

        await expect(testInstance(accountEntityMock)).rejects.toThrowError("Error");
    });
});

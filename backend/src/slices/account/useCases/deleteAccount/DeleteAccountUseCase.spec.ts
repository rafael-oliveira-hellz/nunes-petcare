import { Query } from "@/application/@types";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { DeleteAccountRepository } from "@/slices/account/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteAccount, deleteAccountUsecase } from "./DeleteAccountUseCase";

describe("deleteAccount", () => {
    let fakeQuery: Query;
    let testInstance: deleteAccount;
    let deleteAccountRepository: MockProxy<DeleteAccountRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteAccountRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteAccountRepository.deleteAccount.mockResolvedValue(accountEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteAccountUsecase(deleteAccountRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteAccount of deleteAccountRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteAccountRepository.deleteAccount).toHaveBeenCalledWith(fakeQuery);

        expect(deleteAccountRepository.deleteAccount).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted account when deleteAccountRepository deletes it", async () => {
        const account = await testInstance(fakeQuery);

        expect(account).toEqual(accountEntityMock);
    });

    it("should return null when deleteAccountRepository fails to insert", async () => {
        deleteAccountRepository.deleteAccount.mockResolvedValue(null);

        const account = await testInstance(fakeQuery);

        expect(account).toBeNull();
    });

    it("should throw an error when deleteAccountRepository throws an error", async () => {
        deleteAccountRepository.deleteAccount.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

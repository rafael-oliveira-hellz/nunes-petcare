import { Query } from "@/application/types";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { UpdateAccountRepository } from "@/slices/account/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { UpdateAccount, updateAccount } from "./UpdateAccountUseCase";

describe("updateAccount", () => {
    let fakeQuery: Query;
    let testInstance: UpdateAccount;
    let updateAccountRepository: MockProxy<UpdateAccountRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateAccountRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateAccountRepository.updateAccount.mockResolvedValue(accountEntityMock);
    });

    beforeEach(() => {
        testInstance = updateAccount(updateAccountRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateAccount of updateAccountRepository with correct values", async () => {
        await testInstance(fakeQuery, accountEntityMock);

        expect(updateAccountRepository.updateAccount).toHaveBeenCalledWith(
            fakeQuery,
            accountEntityMock,
        );

        expect(updateAccountRepository.updateAccount).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted account when updateAccountRepository deletes it", async () => {
        const account = await testInstance(fakeQuery, accountEntityMock);

        expect(account).toEqual(accountEntityMock);
    });

    it("should return null when updateAccountRepository fails to insert", async () => {
        updateAccountRepository.updateAccount.mockResolvedValue(null);

        const account = await testInstance(fakeQuery, accountEntityMock);

        expect(account).toBeNull();
    });

    it("should throw an error when updateAccountRepository throws an error", async () => {
        updateAccountRepository.updateAccount.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, accountEntityMock)).rejects.toThrowError("Error");
    });
});

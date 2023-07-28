import { Query } from "@/application/types";
import { accountEntityMock } from "@/slices/account/entities/AccountEntity.spec";
import { LoadAccountRepository } from "@/slices/account/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadAccount, loadAccountUsecase } from "./LoadAccountUseCase";

describe("loadAccount", () => {
    let fakeQuery: Query;
    let testInstance: loadAccount;
    let loadAccountRepository: MockProxy<LoadAccountRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadAccountRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadAccountRepository.loadAccount.mockResolvedValue(accountEntityMock);
    });

    beforeEach(() => {
        testInstance = loadAccountUsecase(loadAccountRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadAccount of loadAccountRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadAccountRepository.loadAccount).toHaveBeenCalledWith(fakeQuery);

        expect(loadAccountRepository.loadAccount).toHaveBeenCalledTimes(1);
    });

    it("should return a account when loadAccountRepository loads it", async () => {
        const account = await testInstance(fakeQuery);

        expect(account).toEqual(accountEntityMock);
    });

    it("should return null when loadAccountRepository fails to load", async () => {
        loadAccountRepository.loadAccount.mockResolvedValue(null);

        const account = await testInstance(fakeQuery);

        expect(account).toBeNull();
    });

    it("should throw an error when loadAccountRepository throws an error", async () => {
        loadAccountRepository.loadAccount.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/types";
import { accountEntityPaginatedMock } from "@/slices/account/entities/AccountEntity.spec";
import { LoadAccountByPageRepository } from "@/slices/account/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadAccountByPage, LoadAccountByPage } from "./LoadAccountByPageUseCase";

describe("loadAccountByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadAccountByPage;
    let loadAccountRepository: MockProxy<LoadAccountByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadAccountRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadAccountRepository.loadAccountByPage.mockResolvedValue(accountEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadAccountByPage(loadAccountRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadAccountByPage of loadAccountRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadAccountRepository.loadAccountByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadAccountRepository.loadAccountByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a account when loadAccountRepository loads it", async () => {
        const account = await testInstance(fakeQuery);

        expect(account).toEqual(accountEntityPaginatedMock);
    });

    it("should return null when loadAccountRepository fails to load", async () => {
        loadAccountRepository.loadAccountByPage.mockResolvedValue(null);

        const account = await testInstance(fakeQuery);

        expect(account).toBeNull();
    });

    it("should throw an error when loadAccountRepository throws an error", async () => {
        loadAccountRepository.loadAccountByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

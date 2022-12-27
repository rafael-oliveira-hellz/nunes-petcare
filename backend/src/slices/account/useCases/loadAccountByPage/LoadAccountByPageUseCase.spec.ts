import { Query } from "@/application/@types";
import { accountEntityPaginatedMock } from "@/slices/account/entities/AccountEntity.spec";
import { LoadAccountByPageRepository } from "@/slices/account/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadAccountByPage, loadAccountByPageUsecase } from "./LoadAccountByPageUseCase";

describe("loadAccountByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadAccountByPage;
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

        loadAccountRepository.loadByPage.mockResolvedValue(accountEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadAccountByPageUsecase(loadAccountRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadAccountByPage of loadAccountRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadAccountRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadAccountRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a account when loadAccountRepository loads it", async () => {
        const account = await testInstance(fakeQuery);

        expect(account).toEqual(accountEntityPaginatedMock);
    });

    it("should return null when loadAccountRepository fails to load", async () => {
        loadAccountRepository.loadByPage.mockResolvedValue(null);

        const account = await testInstance(fakeQuery);

        expect(account).toBeNull();
    });

    it("should throw an error when loadAccountRepository throws an error", async () => {
        loadAccountRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

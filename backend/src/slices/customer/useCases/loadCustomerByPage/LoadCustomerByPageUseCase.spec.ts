import { Query } from "@/application/types";
import { customerEntityPaginatedMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { LoadCustomerByPageRepository } from "@/slices/customer/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadCustomerByPage, LoadCustomerByPage } from "./LoadCustomerByPageUseCase";

describe("loadCustomerByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadCustomerByPage;
    let loadCustomerRepository: MockProxy<LoadCustomerByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadCustomerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadCustomerRepository.loadCustomerByPage.mockResolvedValue(customerEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadCustomerByPage(loadCustomerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadCustomerByPage of loadCustomerRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadCustomerRepository.loadCustomerByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadCustomerRepository.loadCustomerByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a customer when loadCustomerRepository loads it", async () => {
        const customer = await testInstance(fakeQuery);

        expect(customer).toEqual(customerEntityPaginatedMock);
    });

    it("should return null when loadCustomerRepository fails to load", async () => {
        loadCustomerRepository.loadCustomerByPage.mockResolvedValue(null);

        const customer = await testInstance(fakeQuery);

        expect(customer).toBeNull();
    });

    it("should throw an error when loadCustomerRepository throws an error", async () => {
        loadCustomerRepository.loadCustomerByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/@types";
import { customerEntityMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { LoadCustomerRepository } from "@/slices/customer/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadCustomer, loadCustomerUsecase } from "./LoadCustomerUseCase";

describe("loadCustomer", () => {
    let fakeQuery: Query;
    let testInstance: loadCustomer;
    let loadCustomerRepository: MockProxy<LoadCustomerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadCustomerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadCustomerRepository.loadCustomer.mockResolvedValue(customerEntityMock);
    });

    beforeEach(() => {
        testInstance = loadCustomerUsecase(loadCustomerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadCustomer of loadCustomerRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadCustomerRepository.loadCustomer).toHaveBeenCalledWith(fakeQuery);

        expect(loadCustomerRepository.loadCustomer).toHaveBeenCalledTimes(1);
    });

    it("should return a customer when loadCustomerRepository loads it", async () => {
        const customer = await testInstance(fakeQuery);

        expect(customer).toEqual(customerEntityMock);
    });

    it("should return null when loadCustomerRepository fails to load", async () => {
        loadCustomerRepository.loadCustomer.mockResolvedValue(null);

        const customer = await testInstance(fakeQuery);

        expect(customer).toBeNull();
    });

    it("should throw an error when loadCustomerRepository throws an error", async () => {
        loadCustomerRepository.loadCustomer.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

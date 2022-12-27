import { CustomerEntity } from "@/slices/customer/entities";
import { customerEntityMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { AddCustomerRepository } from "@/slices/customer/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addCustomer, addCustomerUsecase } from "./AddCustomerUseCase";

describe("addCustomer", () => {
    let testInstance: addCustomer;
    let addCustomerRepository: MockProxy<AddCustomerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addCustomerRepository = mock();

        addCustomerRepository.addCustomer.mockResolvedValue(customerEntityMock);
    });

    beforeEach(() => {
        testInstance = addCustomerUsecase(addCustomerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addCustomer of addCustomerRepository with correct values", async () => {
        await testInstance(customerEntityMock);

        expect(addCustomerRepository.addCustomer).toHaveBeenCalledWith(
            new CustomerEntity(customerEntityMock)
        );

        expect(addCustomerRepository.addCustomer).toHaveBeenCalledTimes(1);
    });

    it("should return a new customer when addCustomerRepository inserts it", async () => {
        const customer = await testInstance(customerEntityMock);

        expect(customer).toEqual(customerEntityMock);
    });

    it("should return null when addCustomerRepository fails to insert", async () => {
        addCustomerRepository.addCustomer.mockResolvedValue(null);

        const customer = await testInstance(customerEntityMock);

        expect(customer).toBeNull();
    });

    it("should throw an error when addCustomerRepository throws an error", async () => {
        addCustomerRepository.addCustomer.mockRejectedValue(new Error("Error"));

        await expect(testInstance(customerEntityMock)).rejects.toThrowError("Error");
    });
});

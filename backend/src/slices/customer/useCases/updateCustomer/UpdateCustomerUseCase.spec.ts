import { Query } from "@/application/types";
import { customerEntityMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { UpdateCustomerRepository } from "@/slices/customer/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateCustomer, UpdateCustomer } from "./UpdateCustomerUseCase";

describe("updateCustomer", () => {
    let fakeQuery: Query;
    let testInstance: UpdateCustomer;
    let updateCustomerRepository: MockProxy<UpdateCustomerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateCustomerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateCustomerRepository.updateCustomer.mockResolvedValue(customerEntityMock);
    });

    beforeEach(() => {
        testInstance = updateCustomer(updateCustomerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateCustomer of updateCustomerRepository with correct values", async () => {
        await testInstance(fakeQuery, customerEntityMock);

        expect(updateCustomerRepository.updateCustomer).toHaveBeenCalledWith(
            fakeQuery,
            customerEntityMock,
        );

        expect(updateCustomerRepository.updateCustomer).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted customer when updateCustomerRepository deletes it", async () => {
        const customer = await testInstance(fakeQuery, customerEntityMock);

        expect(customer).toEqual(customerEntityMock);
    });

    it("should return null when updateCustomerRepository fails to insert", async () => {
        updateCustomerRepository.updateCustomer.mockResolvedValue(null);

        const customer = await testInstance(fakeQuery, customerEntityMock);

        expect(customer).toBeNull();
    });

    it("should throw an error when updateCustomerRepository throws an error", async () => {
        updateCustomerRepository.updateCustomer.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, customerEntityMock)).rejects.toThrowError("Error");
    });
});

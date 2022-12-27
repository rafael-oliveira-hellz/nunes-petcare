import { Query } from "@/application/@types";
import { customerEntityMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { DeleteCustomerRepository } from "@/slices/customer/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteCustomer, deleteCustomerUsecase } from "./DeleteCustomerUseCase";

describe("deleteCustomer", () => {
    let fakeQuery: Query;
    let testInstance: deleteCustomer;
    let deleteCustomerRepository: MockProxy<DeleteCustomerRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteCustomerRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteCustomerRepository.deleteCustomer.mockResolvedValue(customerEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteCustomerUsecase(deleteCustomerRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteCustomer of deleteCustomerRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteCustomerRepository.deleteCustomer).toHaveBeenCalledWith(fakeQuery);

        expect(deleteCustomerRepository.deleteCustomer).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted customer when deleteCustomerRepository deletes it", async () => {
        const customer = await testInstance(fakeQuery);

        expect(customer).toEqual(customerEntityMock);
    });

    it("should return null when deleteCustomerRepository fails to insert", async () => {
        deleteCustomerRepository.deleteCustomer.mockResolvedValue(null);

        const customer = await testInstance(fakeQuery);

        expect(customer).toBeNull();
    });

    it("should throw an error when deleteCustomerRepository throws an error", async () => {
        deleteCustomerRepository.deleteCustomer.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

import {
    customerEntityMock,
    customerEntityPaginatedMock,
} from "@/slices/customer/entities/CustomerEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";

import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { CustomerRepository } from "./customerRepository";

describe("Customer Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: CustomerRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(customerEntityMock);
        repository.getOne.mockResolvedValue(customerEntityMock);
        repository.update.mockResolvedValue(customerEntityMock);
        repository.increment.mockResolvedValue(customerEntityMock);
        repository.getPaginate.mockResolvedValue(customerEntityPaginatedMock?.customers);
        repository.getCount.mockResolvedValue(customerEntityPaginatedMock?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new CustomerRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addCustomer with correct values", async () => {
        await testInstance.addCustomer(customerEntityMock);
        expect(repository.add).toHaveBeenCalledWith(customerEntityMock);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new client created when addCustomer insert it", async () => {
        const result = await testInstance.addCustomer(customerEntityMock);
        expect(result).toEqual(customerEntityMock);
    });
    test("should return null when addCustomer returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addCustomer(customerEntityMock);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addCustomer throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addCustomer(customerEntityMock);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateCustomer throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateCustomer(fakeQuery, customerEntityMock);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateCustomer with correct values", async () => {
        await testInstance.updateCustomer(fakeQuery, customerEntityMock);
        expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, customerEntityMock);
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a client updated when updateCustomer update it", async () => {
        const result = await testInstance.updateCustomer(fakeQuery, customerEntityMock);
        expect(result).toEqual(customerEntityMock);
    });
    test("should return a client updated when updateCustomer update it when i pass null", async () => {
        const result = await testInstance.updateCustomer(null as any, customerEntityMock);
        expect(result).toEqual(customerEntityMock);
    });
    test("should return null when updateCustomer returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateCustomer(fakeQuery, customerEntityMock);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateCustomer throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateCustomer(fakeQuery, customerEntityMock);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if increment of incrementCustomer throws", async () => {
        repository.increment.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.incrementAppointmentsTotal(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call increment of incrementAppointmentsTotal with correct values", async () => {
        await testInstance.incrementAppointmentsTotal(fakeQuery);
        expect(repository.increment).toHaveBeenCalledWith(fakeQuery?.fields, {
            appointmentsTotal: 1,
        });
        expect(repository.increment).toHaveBeenCalledTimes(1);
    });
    test("should return a client incrementd when incrementAppointmentsTotal increment it", async () => {
        const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
        expect(result).toEqual(customerEntityMock);
    });
    test("should return a client incrementd when incrementAppointmentsTotal increment it when i pass null", async () => {
        const result = await testInstance.incrementAppointmentsTotal(null as any);
        expect(result).toEqual(customerEntityMock);
    });
    test("should return null when incrementAppointmentsTotal returns null", async () => {
        repository.increment.mockResolvedValueOnce(null);
        const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if increment of incrementAppointmentsTotal throws", async () => {
        repository.increment.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.incrementAppointmentsTotal(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteCustomer with correct values", async () => {
        await testInstance.deleteCustomer(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new client created when deleteCustomer insert it", async () => {
        const result = await testInstance.deleteCustomer(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteCustomer returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteCustomer(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteCustomer throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteCustomer(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadCustomer with correct values", async () => {
        await testInstance.loadCustomer(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a client when loadCustomer loaded it", async () => {
        const result = await testInstance.loadCustomer(fakeQuery);
        expect(result).toEqual(customerEntityMock);
    });
    test("should return null when loadCustomer returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadCustomer(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadCustomer returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadCustomer(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadCustomer throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadCustomer(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadCustomerByPage with correct values", async () => {
        await testInstance.loadCustomerByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadCustomerByPage with correct values", async () => {
        await testInstance.loadCustomerByPage(fakeQuery);
        expect(repository.getPaginate).toHaveBeenCalledWith(
            0,
            fakeQuery?.fields,
            {
                createdAt: -1,
            },
            10,
            {},
        );
        expect(repository.getPaginate).toHaveBeenCalledTimes(1);
    });
    test("should return a clientByPage when loadCustomerByPage loaded it", async () => {
        const result = await testInstance.loadCustomerByPage(fakeQuery);
        expect(result).toEqual(customerEntityPaginatedMock);
    });
    test("should return null when loadCustomerByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadCustomerByPage(fakeQuery);
        expect(result).toEqual({ clients: null, total: 0 });
    });
    test("should return null when loadCustomerByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadCustomerByPage(null as any);
        expect(result).toEqual({ clients: null, total: 0 });
    });
    test("should rethrow if load of loadCustomerByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadCustomerByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});

import { CustomerData, CustomerEntity } from "@/slices/customer/entities";
import { AddCustomerRepository } from "@/slices/customer/repositories";

export type AddCustomer = (data: CustomerData) => Promise<CustomerEntity | null>;

export type addCustomerSignature = (addCustomer: AddCustomerRepository) => AddCustomer;

export const addCustomer: addCustomerSignature =
    (addCustomer: AddCustomerRepository) => (data: CustomerData) => {
        return addCustomer.addCustomer(new CustomerEntity(data));
    };

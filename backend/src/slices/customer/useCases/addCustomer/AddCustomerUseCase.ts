import { CustomerData, CustomerEntity } from "@/slices/customer/entities";
import { AddCustomerRepository } from "@/slices/customer/repositories";

export type addCustomer = (data: CustomerData) => Promise<CustomerEntity | null>;

export type addCustomerSignature = (addCustomer: AddCustomerRepository) => addCustomer;

export const addCustomerUsecase: addCustomerSignature =
    (addCustomer: AddCustomerRepository) => (data: CustomerData) => {
        return addCustomer.addCustomer(new CustomerEntity(data));
    };

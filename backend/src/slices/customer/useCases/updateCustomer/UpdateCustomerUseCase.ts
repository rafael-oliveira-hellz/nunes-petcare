import { Query } from "@/application/types";
import { CustomerData } from "@/slices/customer/entities";
import { UpdateCustomerRepository } from "@/slices/customer/repositories";

export type UpdateCustomer = (query: Query, data: CustomerData) => Promise<CustomerData | null>;

export type updateCustomerSignature = (updateCustomer: UpdateCustomerRepository) => UpdateCustomer;

export const updateCustomer: updateCustomerSignature =
    (updateCustomer: UpdateCustomerRepository) => (query: Query, data: CustomerData) => {
        return updateCustomer.updateCustomer(query, data);
    };

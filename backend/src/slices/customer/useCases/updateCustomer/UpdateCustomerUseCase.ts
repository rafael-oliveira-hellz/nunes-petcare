import { Query } from "@/application/types";
import { CustomerData } from "@/slices/customer/entities";
import { UpdateCustomerRepository } from "@/slices/customer/repositories";

export type updateCustomer = (query: Query, data: CustomerData) => Promise<CustomerData | null>;

export type updateCustomerSignature = (updateCustomer: UpdateCustomerRepository) => updateCustomer;

export const updateCustomerUsecase: updateCustomerSignature =
    (updateCustomer: UpdateCustomerRepository) => (query: Query, data: CustomerData) => {
        return updateCustomer.updateCustomer(query, data);
    };

import { Query } from "@/application/types";
import { CustomerData } from "@/slices/customer/entities";
import { DeleteCustomerRepository } from "@/slices/customer/repositories";

export type DeleteCustomer = (query: Query) => Promise<CustomerData | null>;

export type deleteCustomerSignature = (deleteCustomer: DeleteCustomerRepository) => DeleteCustomer;

export const deleteCustomer: deleteCustomerSignature =
    (deleteCustomer: DeleteCustomerRepository) => (query: Query) => {
        return deleteCustomer.deleteCustomer(query);
    };

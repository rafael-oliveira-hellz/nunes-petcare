import { Query } from "@/application/@types";
import { CustomerData } from "@/slices/customer/entities";
import { DeleteCustomerRepository } from "@/slices/customer/repositories";

export type deleteCustomer = (query: Query) => Promise<CustomerData | null>;

export type deleteCustomerSignature = (
    deleteCustomer: DeleteCustomerRepository
) => deleteCustomer;

export const deleteCustomerUsecase: deleteCustomerSignature =
    (deleteCustomer: DeleteCustomerRepository) => (query: Query) => {
        return deleteCustomer.deleteCustomer(query);
    };

import { Query } from "@/application/types";
import { CustomerData } from "@/slices/customer/entities";
import { LoadCustomerRepository } from "@/slices/customer/repositories";

export type LoadCustomer = (query: Query) => Promise<CustomerData | null>;

export type loadCustomerSignature = (loadCustomer: LoadCustomerRepository) => LoadCustomer;

export const loadCustomer: loadCustomerSignature =
    (loadCustomerRepository: LoadCustomerRepository) => (query: Query) => {
        return loadCustomerRepository.loadCustomer(query);
    };

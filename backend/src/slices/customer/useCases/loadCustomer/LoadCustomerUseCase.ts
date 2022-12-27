import { Query } from "@/application/@types";
import { CustomerData } from "@/slices/customer/entities";
import { LoadCustomerRepository } from "@/slices/customer/repositories";

export type loadCustomer = (query: Query) => Promise<CustomerData | null>;

export type loadCustomerSignature = (loadCustomer: LoadCustomerRepository) => loadCustomer;

export const loadCustomerUsecase: loadCustomerSignature =
    (loadCustomerRepository: LoadCustomerRepository) => (query: Query) => {
        return loadCustomerRepository.loadCustomer(query);
    };

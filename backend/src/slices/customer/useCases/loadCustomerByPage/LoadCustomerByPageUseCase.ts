import { Query } from "@/application/types";
import { CustomerPaginatedData } from "@/slices/customer/entities";
import { LoadCustomerByPageRepository } from "@/slices/customer/repositories";

export type LoadCustomerByPage = (query: Query) => Promise<CustomerPaginatedData | null>;

export type loadCustomerByPageSignature = (
    loadCustomerByPage: LoadCustomerByPageRepository,
) => LoadCustomerByPage;

export const loadCustomerByPage: loadCustomerByPageSignature =
    (loadCustomerByPageRepository: LoadCustomerByPageRepository) => (query: Query) => {
        return loadCustomerByPageRepository.loadCustomerByPage(query);
    };

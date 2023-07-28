import { Query } from "@/application/types";
import { CustomerPaginatedData } from "@/slices/customer/entities";
import { LoadCustomerByPageRepository } from "@/slices/customer/repositories";

export type loadCustomerByPage = (query: Query) => Promise<CustomerPaginatedData | null>;

export type loadCustomerByPageSignature = (
    loadCustomerByPage: LoadCustomerByPageRepository,
) => loadCustomerByPage;

export const loadCustomerByPageUsecase: loadCustomerByPageSignature =
    (loadCustomerByPageRepository: LoadCustomerByPageRepository) => (query: Query) => {
        return loadCustomerByPageRepository.loadByPage(query);
    };

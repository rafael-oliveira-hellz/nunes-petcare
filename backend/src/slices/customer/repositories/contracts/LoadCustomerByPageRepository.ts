import { Query } from "@/application/types";
import { CustomerPaginatedData } from "@/slices/customer/entities";

export interface LoadCustomerByPageRepository {
    loadCustomerByPage(query: Query): Promise<CustomerPaginatedData | null>;
}

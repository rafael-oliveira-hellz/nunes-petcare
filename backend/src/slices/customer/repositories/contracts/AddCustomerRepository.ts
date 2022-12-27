import { CustomerData } from "@/slices/customer/entities";

export interface AddCustomerRepository {
    addCustomer: (customer: CustomerData) => Promise<CustomerData | null>;
}

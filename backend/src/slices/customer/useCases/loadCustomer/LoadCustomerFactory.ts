import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/customer/repositories";
import { loadCustomer, LoadCustomer } from "@/slices/customer/useCases";

export const makeLoadCustomerFactory = (): LoadCustomer => {
    const repository = new CustomerRepository(new MongoRepository("client"));
    return loadCustomer(repository);
};

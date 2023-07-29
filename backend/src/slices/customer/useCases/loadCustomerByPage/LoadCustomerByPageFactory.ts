import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/customer/repositories";
import { loadCustomerByPage, LoadCustomerByPage } from "@/slices/customer/useCases";

export const makeLoadCustomerByPageFactory = (): LoadCustomerByPage => {
    const repository = new CustomerRepository(new MongoRepository("client"));
    return loadCustomerByPage(repository);
};

import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/customer/repositories";
import { addCustomer, AddCustomer } from "@/slices/customer/useCases";

export const makeAddCustomerFactory = (): AddCustomer => {
    const repository = new CustomerRepository(new MongoRepository("client"));
    return addCustomer(repository);
};

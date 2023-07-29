import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/customer/repositories";
import { updateCustomer, UpdateCustomer } from "@/slices/customer/useCases";

export const makeUpdateCustomerFactory = (): UpdateCustomer => {
    const repository = new CustomerRepository(new MongoRepository("client"));
    return updateCustomer(repository);
};

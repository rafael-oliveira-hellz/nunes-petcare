import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/customer/repositories";
import { deleteCustomer, DeleteCustomer } from "@/slices/customer/useCases";

export const makeDeleteCustomerFactory = (): DeleteCustomer => {
    const repository = new CustomerRepository(new MongoRepository("client"));
    return deleteCustomer(repository);
};

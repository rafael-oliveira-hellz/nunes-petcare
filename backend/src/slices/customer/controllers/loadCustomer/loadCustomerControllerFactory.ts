import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCustomerFactory } from "@/slices/customer/useCases";
import { LoadCustomerController } from "@/slices/customer/controllers";

export const makeLoadCustomerController = (): Controller => {
    const requiredFields = ["_id"];
    return makeLogController(
        "loadCustomer",
        new LoadCustomerController(
            makeValidationComposite(requiredFields),
            makeLoadCustomerFactory(),
        ),
    );
};

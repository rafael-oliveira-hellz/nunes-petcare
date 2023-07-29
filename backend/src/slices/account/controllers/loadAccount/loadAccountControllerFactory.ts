import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadAccountController } from "@/slices/account/controllers";
import { makeLoadAccountFactory, makeAddAccountFactory } from "../../useCases";

export const makeLoadAccountController = (): Controller => {
    const requiredFields: string[] = [];
    return makeLogController(
        "loadAccount",
        new LoadAccountController(
            makeValidationComposite(requiredFields),
            makeLoadAccountFactory(),
            makeAddAccountFactory(),
            makeDbAuthentication(),
        ),
    );
};

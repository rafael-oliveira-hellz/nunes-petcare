import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadUserByPageGeoNearController } from "@/slices/user/controllers";
import { makeLoadUserByPageGeoNearFactory } from "../../useCases/loadUserByPageGeoNear";

export const makeLoadUserByPageGeoNearController = (): Controller => {
    const requiredFields = ["page"];
    return makeLogController(
        "loadUserByPageGeoNear",
        new LoadUserByPageGeoNearController(
            makeValidationComposite(requiredFields),
            makeLoadUserByPageGeoNearFactory(),
        ),
    );
};

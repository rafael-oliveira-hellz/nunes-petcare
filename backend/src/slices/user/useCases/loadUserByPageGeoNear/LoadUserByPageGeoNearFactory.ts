import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { LoadUserByPageGeoNear, loadUserByPageGeoNear } from "./index";

export const makeLoadUserByPageGeoNearFactory = (): LoadUserByPageGeoNear => {
    const repository = new UserRepository(new MongoRepository("user"));
    return loadUserByPageGeoNear(repository);
};

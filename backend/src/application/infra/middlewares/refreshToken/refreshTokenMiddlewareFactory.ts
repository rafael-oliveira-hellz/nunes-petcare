import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases/loadUser/LoadUserFactory";
import { RefreshTokenMiddleware } from "@/application/infra/middlewares";

export const makeRefreshTokenMiddleware = (roles: string[]): Middleware => {
    return new RefreshTokenMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const refreshtokenCustomer = () =>
    adaptMiddleware(makeRefreshTokenMiddleware(["customer", "admin"]));
export const refreshtokenAdmin = () => adaptMiddleware(makeRefreshTokenMiddleware(["admin"]));
export const refreshtokenOwner = () =>
    adaptMiddleware(makeRefreshTokenMiddleware(["owner", "admin"]));
export const refreshtokenProfessional = () =>
    adaptMiddleware(makeRefreshTokenMiddleware(["owner", "professional", "admin"]));
export const refreshtokenGuest = () =>
    adaptMiddleware(
        makeRefreshTokenMiddleware(["owner", "professional", "customer", "guest", "admin"]),
    );
export const refreshtokenLogged = () =>
    adaptMiddleware(makeRefreshTokenMiddleware(["owner", "professional", "customer", "admin"]));

import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases/loadUser/LoadUserFactory";
import { AuthMiddleware } from "@/application/infra/middlewares";
export const makeAuthMiddleware = (roles: string[]): Middleware => {
    return new AuthMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const authCustomer = () => adaptMiddleware(makeAuthMiddleware(["customer", "admin"]));
export const authAdmin = () => adaptMiddleware(makeAuthMiddleware(["admin"]));
export const authOwner = () => adaptMiddleware(makeAuthMiddleware(["owner", "admin"]));
export const authProfessional = () =>
    adaptMiddleware(makeAuthMiddleware(["owner", "professional", "admin"]));
export const authGuest = () =>
    adaptMiddleware(makeAuthMiddleware(["owner", "professional", "customer", "guest", "admin"]));
export const authLogged = () =>
    adaptMiddleware(makeAuthMiddleware(["owner", "professional", "customer", "admin"]));

import { Query } from "@/application/@types";
import { UserData } from "@/slices/user/entities";
import { LoadUserRepository } from "@/slices/user/repositories";

export type loadUser = (query: Query) => Promise<UserData | null>;

export type loadUserSignature = (loadUser: LoadUserRepository) => loadUser;

export const loadUserUsecase: loadUserSignature =
    (loadUserRepository: LoadUserRepository) => (query: Query) => {
        return loadUserRepository.loadUser(query);
    };

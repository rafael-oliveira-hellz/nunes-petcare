import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";
import { LoadUserRepository } from "@/slices/user/repositories";

export type LoadUser = (query: Query) => Promise<UserData | null>;

export type loadUserSignature = (loadUser: LoadUserRepository) => LoadUser;

export const loadUser: loadUserSignature =
    (loadUserRepository: LoadUserRepository) => (query: Query) => {
        return loadUserRepository.loadUser(query);
    };

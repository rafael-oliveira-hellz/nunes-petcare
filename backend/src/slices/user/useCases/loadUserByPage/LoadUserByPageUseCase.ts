import { Query } from "@/application/types";
import { UserPaginatedData } from "@/slices/user/entities";
import { LoadUserByPageRepository } from "@/slices/user/repositories";

export type LoadUserByPage = (query: Query) => Promise<UserPaginatedData | null>;

export type loadUserByPageSignature = (loadUserByPage: LoadUserByPageRepository) => LoadUserByPage;

export const loadUserByPage: loadUserByPageSignature =
    (loadUserByPageRepository: LoadUserByPageRepository) => (query: Query) => {
        return loadUserByPageRepository.loadUserByPage(query);
    };

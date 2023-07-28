import { Query } from "@/application/types";
import { UserPaginatedData } from "@/slices/user/entities";
import { LoadUserByPageRepository } from "@/slices/user/repositories";

export type loadUserByPage = (query: Query) => Promise<UserPaginatedData | null>;

export type loadUserByPageSignature = (
    loadUserByPage: LoadUserByPageRepository,
) => loadUserByPage;

export const loadUserByPageUsecase: loadUserByPageSignature =
    (loadUserByPageRepository: LoadUserByPageRepository) => (query: Query) => {
        return loadUserByPageRepository.loadByPage(query);
    };

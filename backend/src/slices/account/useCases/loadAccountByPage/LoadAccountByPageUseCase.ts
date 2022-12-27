import { Query } from "@/application/@types";
import { AccountPaginatedData } from "@/slices/account/entities";
import { LoadAccountByPageRepository } from "@/slices/account/repositories";

export type loadAccountByPage = (query: Query) => Promise<AccountPaginatedData | null>;

export type loadAccountByPageSignature = (
    loadAccountByPage: LoadAccountByPageRepository
) => loadAccountByPage;

export const loadAccountByPageUsecase: loadAccountByPageSignature =
    (loadAccountByPageRepository: LoadAccountByPageRepository) => (query: Query) => {
        return loadAccountByPageRepository.loadByPage(query);
    };

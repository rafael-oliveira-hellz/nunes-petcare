import { Query } from "@/application/types";
import { AccountPaginatedData } from "@/slices/account/entities";
import { LoadAccountByPageRepository } from "@/slices/account/repositories";

export type LoadAccountByPage = (query: Query) => Promise<AccountPaginatedData | null>;

export type loadAccountByPageSignature = (
    loadAccountByPage: LoadAccountByPageRepository,
) => LoadAccountByPage;

export const loadAccountByPage: loadAccountByPageSignature =
    (loadAccountByPageRepository: LoadAccountByPageRepository) => (query: Query) => {
        return loadAccountByPageRepository.loadAccountByPage(query);
    };

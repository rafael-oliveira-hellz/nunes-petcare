import { Query } from "@/application/@types";
import { AccountData } from "@/slices/account/entities";
import { LoadAccountRepository } from "@/slices/account/repositories";

export type loadAccount = (query: Query) => Promise<AccountData | null>;

export type loadAccountSignature = (loadAccount: LoadAccountRepository) => loadAccount;

export const loadAccountUsecase: loadAccountSignature =
    (loadAccountRepository: LoadAccountRepository) => (query: Query) => {
        return loadAccountRepository.loadAccount(query);
    };

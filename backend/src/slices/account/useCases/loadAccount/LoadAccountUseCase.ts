import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";
import { LoadAccountRepository } from "@/slices/account/repositories";

export type LoadAccount = (query: Query) => Promise<AccountData | null>;

export type loadAccountSignature = (loadAccount: LoadAccountRepository) => LoadAccount;

export const loadAccount: loadAccountSignature =
    (loadAccountRepository: LoadAccountRepository) => (query: Query) => {
        return loadAccountRepository.loadAccount(query);
    };

import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";
import { DeleteAccountRepository } from "@/slices/account/repositories";

export type DeleteAccount = (query: Query) => Promise<AccountData | null>;

export type deleteAccountSignature = (deleteAccount: DeleteAccountRepository) => DeleteAccount;

export const deleteAccount: deleteAccountSignature =
    (deleteAccount: DeleteAccountRepository) => (query: Query) => {
        return deleteAccount.deleteAccount(query);
    };

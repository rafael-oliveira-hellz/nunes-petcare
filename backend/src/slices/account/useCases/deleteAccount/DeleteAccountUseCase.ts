import { Query } from "@/application/@types";
import { AccountData } from "@/slices/account/entities";
import { DeleteAccountRepository } from "@/slices/account/repositories";

export type deleteAccount = (query: Query) => Promise<AccountData | null>;

export type deleteAccountSignature = (
    deleteAccount: DeleteAccountRepository
) => deleteAccount;

export const deleteAccountUsecase: deleteAccountSignature =
    (deleteAccount: DeleteAccountRepository) => (query: Query) => {
        return deleteAccount.deleteAccount(query);
    };

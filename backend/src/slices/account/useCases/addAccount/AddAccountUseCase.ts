import { AccountData, AccountEntity } from "@/slices/account/entities";
import { AddAccountRepository } from "@/slices/account/repositories";

export type AddAccount = (data: AccountData) => Promise<AccountEntity | null>;

export type addAccountSignature = (addAccount: AddAccountRepository) => AddAccount;

export const addAccount: addAccountSignature =
    (addAccount: AddAccountRepository) => (data: AccountData) => {
        return addAccount.addAccount(new AccountEntity(data));
    };

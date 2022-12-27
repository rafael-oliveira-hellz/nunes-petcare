import { AccountData, AccountEntity } from "@/slices/account/entities";
import { AddAccountRepository } from "@/slices/account/repositories";

export type addAccount = (data: AccountData) => Promise<AccountEntity | null>;

export type addAccountSignature = (addAccount: AddAccountRepository) => addAccount;

export const addAccountUsecase: addAccountSignature =
    (addAccount: AddAccountRepository) => (data: AccountData) => {
        return addAccount.addAccount(new AccountEntity(data));
    };

import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";
import { UpdateAccountRepository } from "@/slices/account/repositories";

export type UpdateAccount = (query: Query, data: AccountData) => Promise<AccountData | null>;

export type updateAccountSignature = (updateAccount: UpdateAccountRepository) => UpdateAccount;

export const updateAccount: updateAccountSignature =
    (updateAccount: UpdateAccountRepository) => (query: Query, data: AccountData) => {
        return updateAccount.updateAccount(query, data);
    };

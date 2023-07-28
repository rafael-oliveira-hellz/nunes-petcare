import { Query } from "@/application/types";
import { AccountPaginatedData } from "@/slices/account/entities";

export interface LoadAccountByPageRepository {
    loadByPage(query: Query): Promise<AccountPaginatedData | null>;
}

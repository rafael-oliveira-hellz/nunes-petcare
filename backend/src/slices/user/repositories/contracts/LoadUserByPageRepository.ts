import { Query } from "@/application/@types";
import { UserPaginatedData } from "@/slices/user/entities";

export interface LoadUserByPageRepository {
    loadByPage(query: Query): Promise<UserPaginatedData | null>;
}

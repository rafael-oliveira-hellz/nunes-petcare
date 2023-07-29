import { Query } from "@/application/types";
import { UserPaginatedData } from "@/slices/user/entities";

export interface LoadUserByPageRepository {
    loadUserByPage(query: Query): Promise<UserPaginatedData | null>;
}

import { Query } from "@/application/types";
import { UserPaginatedData } from "@/slices/user/entities";

export interface LoadUserByPageGeoNearRepository {
    loadUserByPageGeoNear(query: Query): Promise<UserPaginatedData | null>;
}

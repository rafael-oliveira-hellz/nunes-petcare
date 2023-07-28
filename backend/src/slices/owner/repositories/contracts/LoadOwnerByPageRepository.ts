import { Query } from "@/application/types";
import { OwnerPaginatedData } from "@/slices/owner/entities";

export interface LoadOwnerByPageRepository {
    loadByPage(query: Query): Promise<OwnerPaginatedData | null>;
}

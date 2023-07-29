import { Query } from "@/application/types";
import { OwnerPaginatedData } from "@/slices/owner/entities";

export interface LoadOwnerByPageRepository {
    loadOwnerByPage(query: Query): Promise<OwnerPaginatedData | null>;
}

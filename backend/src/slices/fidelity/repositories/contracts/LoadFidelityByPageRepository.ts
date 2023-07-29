import { Query } from "@/application/types";
import { FidelityPaginatedData } from "@/slices/fidelity/entities";

export interface LoadFidelityByPageRepository {
    loadFidelityByPage(query: Query): Promise<FidelityPaginatedData | null>;
}

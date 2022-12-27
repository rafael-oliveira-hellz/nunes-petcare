import { Query } from "@/application/@types";
import { FidelityPaginatedData } from "@/slices/fidelity/entities";

export interface LoadFidelityByPageRepository {
    loadByPage(query: Query): Promise<FidelityPaginatedData | null>;
}

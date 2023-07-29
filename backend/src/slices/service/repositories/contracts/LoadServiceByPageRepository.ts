import { Query } from "@/application/types";
import { ServicePaginatedData } from "@/slices/service/entities";

export interface LoadServiceByPageRepository {
    loadServiceByPage(query: Query): Promise<ServicePaginatedData | null>;
}

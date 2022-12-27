import { Query } from "@/application/@types";
import { ServicePaginatedData } from "@/slices/service/entities";

export interface LoadServiceByPageRepository {
    loadByPage(query: Query): Promise<ServicePaginatedData | null>;
}

import { Query } from "@/application/types";
import { RidePaginatedData } from "@/slices/ride/entities";

export interface LoadRideByPageRepository {
    loadByPage(query: Query): Promise<RidePaginatedData | null>;
}

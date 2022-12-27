import { Query } from "@/application/@types";
import { RequestPaginatedData } from "@/slices/request/entities";

export interface LoadRequestByPageRepository {
    loadByPage(query: Query): Promise<RequestPaginatedData | null>;
}

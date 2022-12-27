import { Query } from "@/application/@types";
import { OrderPaginatedData } from "@/slices/order/entities";

export interface LoadOrderByPageRepository {
    loadByPage(query: Query): Promise<OrderPaginatedData | null>;
}

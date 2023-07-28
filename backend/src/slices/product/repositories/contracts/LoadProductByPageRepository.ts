import { Query } from "@/application/types";
import { ProductPaginatedData } from "@/slices/product/entities";

export interface LoadProductByPageRepository {
    loadByPage(query: Query): Promise<ProductPaginatedData | null>;
}

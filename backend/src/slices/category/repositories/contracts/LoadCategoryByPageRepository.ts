import { Query } from "@/application/@types";
import { CategoryPaginatedData } from "@/slices/category/entities";

export interface LoadCategoryByPageRepository {
    loadByPage(query: Query): Promise<CategoryPaginatedData | null>;
}

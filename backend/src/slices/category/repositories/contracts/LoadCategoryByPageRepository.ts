import { Query } from "@/application/types";
import { CategoryPaginatedData } from "@/slices/category/entities";

export interface LoadCategoryByPageRepository {
    loadCategoryByPage(query: Query): Promise<CategoryPaginatedData | null>;
}

import { Query } from "@/application/@types";
import { RatingPaginatedData } from "@/slices/rating/entities";

export interface LoadRatingByPageRepository {
    loadByPage(query: Query): Promise<RatingPaginatedData | null>;
}

import { Query } from "@/application/@types";
import { RatingResultPaginatedData } from "@/slices/ratingResult/entities";

export interface LoadRatingResultByPageRepository {
    loadByPage(query: Query): Promise<RatingResultPaginatedData | null>;
}

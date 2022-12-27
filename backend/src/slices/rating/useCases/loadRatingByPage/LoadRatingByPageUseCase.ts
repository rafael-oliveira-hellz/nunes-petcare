import { Query } from "@/application/@types";
import { RatingPaginatedData } from "@/slices/rating/entities";
import { LoadRatingByPageRepository } from "@/slices/rating/repositories";

export type loadRatingByPage = (query: Query) => Promise<RatingPaginatedData | null>;

export type loadRatingByPageSignature = (
    loadRatingByPage: LoadRatingByPageRepository
) => loadRatingByPage;

export const loadRatingByPageUsecase: loadRatingByPageSignature =
    (loadRatingByPageRepository: LoadRatingByPageRepository) => (query: Query) => {
        return loadRatingByPageRepository.loadByPage(query);
    };

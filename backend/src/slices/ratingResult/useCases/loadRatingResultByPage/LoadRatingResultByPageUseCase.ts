import { Query } from "@/application/@types";
import { RatingResultPaginatedData } from "@/slices/ratingResult/entities";
import { LoadRatingResultByPageRepository } from "@/slices/ratingResult/repositories";

export type loadRatingResultByPage = (query: Query) => Promise<RatingResultPaginatedData | null>;

export type loadRatingResultByPageSignature = (
    loadRatingResultByPage: LoadRatingResultByPageRepository
) => loadRatingResultByPage;

export const loadRatingResultByPageUsecase: loadRatingResultByPageSignature =
    (loadRatingResultByPageRepository: LoadRatingResultByPageRepository) => (query: Query) => {
        return loadRatingResultByPageRepository.loadByPage(query);
    };

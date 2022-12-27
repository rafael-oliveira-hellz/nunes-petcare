import { Query } from "@/application/@types";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { LoadRatingResultRepository } from "@/slices/ratingResult/repositories";

export type loadRatingResult = (query: Query) => Promise<RatingResultData | null>;

export type loadRatingResultSignature = (loadRatingResult: LoadRatingResultRepository) => loadRatingResult;

export const loadRatingResultUsecase: loadRatingResultSignature =
    (loadRatingResultRepository: LoadRatingResultRepository) => (query: Query) => {
        return loadRatingResultRepository.loadRatingResult(query);
    };

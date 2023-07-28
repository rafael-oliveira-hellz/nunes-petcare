import { Query } from "@/application/types";
import { RatingData } from "@/slices/rating/entities";
import { LoadRatingRepository } from "@/slices/rating/repositories";

export type loadRating = (query: Query) => Promise<RatingData | null>;

export type loadRatingSignature = (loadRating: LoadRatingRepository) => loadRating;

export const loadRatingUsecase: loadRatingSignature =
    (loadRatingRepository: LoadRatingRepository) => (query: Query) => {
        return loadRatingRepository.loadRating(query);
    };

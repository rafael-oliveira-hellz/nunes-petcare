import { Query } from "@/application/@types";
import { RatingData } from "@/slices/rating/entities";
import { UpdateRatingRepository } from "@/slices/rating/repositories";

export type updateRating = (query: Query, data: RatingData) => Promise<RatingData | null>;

export type updateRatingSignature = (
    updateRating: UpdateRatingRepository
) => updateRating;

export const updateRatingUsecase: updateRatingSignature =
    (updateRating: UpdateRatingRepository) => (query: Query, data: RatingData) => {
        return updateRating.updateRating(query, data);
    };

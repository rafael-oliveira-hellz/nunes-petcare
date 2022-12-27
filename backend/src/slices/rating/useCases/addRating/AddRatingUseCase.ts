import { RatingData, RatingEntity } from "@/slices/rating/entities";
import { AddRatingRepository } from "@/slices/rating/repositories";

export type addRating = (data: RatingData) => Promise<RatingEntity | null>;

export type addRatingSignature = (addRating: AddRatingRepository) => addRating;

export const addRatingUsecase: addRatingSignature =
    (addRating: AddRatingRepository) => (data: RatingData) => {
        return addRating.addRating(new RatingEntity(data));
    };

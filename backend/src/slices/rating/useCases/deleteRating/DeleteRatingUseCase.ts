import { Query } from "@/application/@types";
import { RatingData } from "@/slices/rating/entities";
import { DeleteRatingRepository } from "@/slices/rating/repositories";

export type deleteRating = (query: Query) => Promise<RatingData | null>;

export type deleteRatingSignature = (
    deleteRating: DeleteRatingRepository
) => deleteRating;

export const deleteRatingUsecase: deleteRatingSignature =
    (deleteRating: DeleteRatingRepository) => (query: Query) => {
        return deleteRating.deleteRating(query);
    };

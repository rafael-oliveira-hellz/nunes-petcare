import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { DeleteRatingResultRepository } from "@/slices/ratingResult/repositories";

export type deleteRatingResult = (query: Query) => Promise<RatingResultData | null>;

export type deleteRatingResultSignature = (
    deleteRatingResult: DeleteRatingResultRepository,
) => deleteRatingResult;

export const deleteRatingResultUsecase: deleteRatingResultSignature =
    (deleteRatingResult: DeleteRatingResultRepository) => (query: Query) => {
        return deleteRatingResult.deleteRatingResult(query);
    };

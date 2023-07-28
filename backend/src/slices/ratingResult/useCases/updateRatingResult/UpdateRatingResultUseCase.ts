import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { UpdateRatingResultRepository } from "@/slices/ratingResult/repositories";

export type updateRatingResult = (
    query: Query,
    data: RatingResultData,
) => Promise<RatingResultData | null>;

export type updateRatingResultSignature = (
    updateRatingResult: UpdateRatingResultRepository,
) => updateRatingResult;

export const updateRatingResultUsecase: updateRatingResultSignature =
    (updateRatingResult: UpdateRatingResultRepository) =>
    (query: Query, data: RatingResultData) => {
        return updateRatingResult.updateRatingResult(query, data);
    };

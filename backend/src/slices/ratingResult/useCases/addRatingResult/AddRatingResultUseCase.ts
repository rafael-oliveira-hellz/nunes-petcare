import { RatingResultData, RatingResultEntity } from "@/slices/ratingResult/entities";
import { AddRatingResultRepository } from "@/slices/ratingResult/repositories";

export type addRatingResult = (
    data: RatingResultData,
) => Promise<RatingResultEntity | null>;

export type addRatingResultSignature = (
    addRatingResult: AddRatingResultRepository,
) => addRatingResult;

export const addRatingResultUsecase: addRatingResultSignature =
    (addRatingResult: AddRatingResultRepository) => (data: RatingResultData) => {
        return addRatingResult.addRatingResult(new RatingResultEntity(data));
    };

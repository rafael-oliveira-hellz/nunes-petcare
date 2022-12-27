import { RatingResultEntity } from "@/slices/ratingResult/entities";
import { ratingResultEntityMock } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { AddRatingResultRepository } from "@/slices/ratingResult/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addRatingResult, addRatingResultUsecase } from "./AddRatingResultUseCase";

describe("addRatingResult", () => {
    let testInstance: addRatingResult;
    let addRatingResultRepository: MockProxy<AddRatingResultRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addRatingResultRepository = mock();

        addRatingResultRepository.addRatingResult.mockResolvedValue(ratingResultEntityMock);
    });

    beforeEach(() => {
        testInstance = addRatingResultUsecase(addRatingResultRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addRatingResult of addRatingResultRepository with correct values", async () => {
        await testInstance(ratingResultEntityMock);

        expect(addRatingResultRepository.addRatingResult).toHaveBeenCalledWith(
            new RatingResultEntity(ratingResultEntityMock)
        );

        expect(addRatingResultRepository.addRatingResult).toHaveBeenCalledTimes(1);
    });

    it("should return a new ratingResult when addRatingResultRepository inserts it", async () => {
        const ratingResult = await testInstance(ratingResultEntityMock);

        expect(ratingResult).toEqual(ratingResultEntityMock);
    });

    it("should return null when addRatingResultRepository fails to insert", async () => {
        addRatingResultRepository.addRatingResult.mockResolvedValue(null);

        const ratingResult = await testInstance(ratingResultEntityMock);

        expect(ratingResult).toBeNull();
    });

    it("should throw an error when addRatingResultRepository throws an error", async () => {
        addRatingResultRepository.addRatingResult.mockRejectedValue(new Error("Error"));

        await expect(testInstance(ratingResultEntityMock)).rejects.toThrowError("Error");
    });
});

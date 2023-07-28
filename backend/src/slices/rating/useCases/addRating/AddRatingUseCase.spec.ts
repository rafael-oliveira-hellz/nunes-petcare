import { RatingEntity } from "@/slices/rating/entities";
import { ratingEntityMock } from "@/slices/rating/entities/RatingEntity.spec";
import { AddRatingRepository } from "@/slices/rating/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addRating, addRatingUsecase } from "./AddRatingUseCase";

describe("addRating", () => {
    let testInstance: addRating;
    let addRatingRepository: MockProxy<AddRatingRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addRatingRepository = mock();

        addRatingRepository.addRating.mockResolvedValue(ratingEntityMock);
    });

    beforeEach(() => {
        testInstance = addRatingUsecase(addRatingRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addRating of addRatingRepository with correct values", async () => {
        await testInstance(ratingEntityMock);

        expect(addRatingRepository.addRating).toHaveBeenCalledWith(
            new RatingEntity(ratingEntityMock),
        );

        expect(addRatingRepository.addRating).toHaveBeenCalledTimes(1);
    });

    it("should return a new rating when addRatingRepository inserts it", async () => {
        const rating = await testInstance(ratingEntityMock);

        expect(rating).toEqual(ratingEntityMock);
    });

    it("should return null when addRatingRepository fails to insert", async () => {
        addRatingRepository.addRating.mockResolvedValue(null);

        const rating = await testInstance(ratingEntityMock);

        expect(rating).toBeNull();
    });

    it("should throw an error when addRatingRepository throws an error", async () => {
        addRatingRepository.addRating.mockRejectedValue(new Error("Error"));

        await expect(testInstance(ratingEntityMock)).rejects.toThrowError("Error");
    });
});

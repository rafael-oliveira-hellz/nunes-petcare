import { Query } from "@/application/@types";
import { ratingEntityMock } from "@/slices/rating/entities/RatingEntity.spec";
import { UpdateRatingRepository } from "@/slices/rating/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateRating, updateRatingUsecase } from "./UpdateRatingUseCase";

describe("updateRating", () => {
    let fakeQuery: Query;
    let testInstance: updateRating;
    let updateRatingRepository: MockProxy<UpdateRatingRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateRatingRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateRatingRepository.updateRating.mockResolvedValue(ratingEntityMock);
    });

    beforeEach(() => {
        testInstance = updateRatingUsecase(updateRatingRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateRating of updateRatingRepository with correct values", async () => {
        await testInstance(fakeQuery, ratingEntityMock);

        expect(updateRatingRepository.updateRating).toHaveBeenCalledWith(fakeQuery, ratingEntityMock);

        expect(updateRatingRepository.updateRating).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted rating when updateRatingRepository deletes it", async () => {
        const rating = await testInstance(fakeQuery, ratingEntityMock);

        expect(rating).toEqual(ratingEntityMock);
    });

    it("should return null when updateRatingRepository fails to insert", async () => {
        updateRatingRepository.updateRating.mockResolvedValue(null);

        const rating = await testInstance(fakeQuery, ratingEntityMock);

        expect(rating).toBeNull();
    });

    it("should throw an error when updateRatingRepository throws an error", async () => {
        updateRatingRepository.updateRating.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, ratingEntityMock)).rejects.toThrowError("Error");
    });
});

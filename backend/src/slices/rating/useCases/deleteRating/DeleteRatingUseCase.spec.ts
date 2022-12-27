import { Query } from "@/application/@types";
import { ratingEntityMock } from "@/slices/rating/entities/RatingEntity.spec";
import { DeleteRatingRepository } from "@/slices/rating/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteRating, deleteRatingUsecase } from "./DeleteRatingUseCase";

describe("deleteRating", () => {
    let fakeQuery: Query;
    let testInstance: deleteRating;
    let deleteRatingRepository: MockProxy<DeleteRatingRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRatingRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteRatingRepository.deleteRating.mockResolvedValue(ratingEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteRatingUsecase(deleteRatingRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteRating of deleteRatingRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteRatingRepository.deleteRating).toHaveBeenCalledWith(fakeQuery);

        expect(deleteRatingRepository.deleteRating).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted rating when deleteRatingRepository deletes it", async () => {
        const rating = await testInstance(fakeQuery);

        expect(rating).toEqual(ratingEntityMock);
    });

    it("should return null when deleteRatingRepository fails to insert", async () => {
        deleteRatingRepository.deleteRating.mockResolvedValue(null);

        const rating = await testInstance(fakeQuery);

        expect(rating).toBeNull();
    });

    it("should throw an error when deleteRatingRepository throws an error", async () => {
        deleteRatingRepository.deleteRating.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

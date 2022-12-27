import { Query } from "@/application/@types";
import { ratingEntityMock } from "@/slices/rating/entities/RatingEntity.spec";
import { LoadRatingRepository } from "@/slices/rating/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRating, loadRatingUsecase } from "./LoadRatingUseCase";

describe("loadRating", () => {
    let fakeQuery: Query;
    let testInstance: loadRating;
    let loadRatingRepository: MockProxy<LoadRatingRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRatingRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRatingRepository.loadRating.mockResolvedValue(ratingEntityMock);
    });

    beforeEach(() => {
        testInstance = loadRatingUsecase(loadRatingRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRating of loadRatingRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRatingRepository.loadRating).toHaveBeenCalledWith(fakeQuery);

        expect(loadRatingRepository.loadRating).toHaveBeenCalledTimes(1);
    });

    it("should return a rating when loadRatingRepository loads it", async () => {
        const rating = await testInstance(fakeQuery);

        expect(rating).toEqual(ratingEntityMock);
    });

    it("should return null when loadRatingRepository fails to load", async () => {
        loadRatingRepository.loadRating.mockResolvedValue(null);

        const rating = await testInstance(fakeQuery);

        expect(rating).toBeNull();
    });

    it("should throw an error when loadRatingRepository throws an error", async () => {
        loadRatingRepository.loadRating.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

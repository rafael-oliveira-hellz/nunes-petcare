import { Query } from "@/application/@types";
import { ratingEntityPaginatedMock } from "@/slices/rating/entities/RatingEntity.spec";
import { LoadRatingByPageRepository } from "@/slices/rating/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRatingByPage, loadRatingByPageUsecase } from "./LoadRatingByPageUseCase";

describe("loadRatingByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadRatingByPage;
    let loadRatingRepository: MockProxy<LoadRatingByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRatingRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRatingRepository.loadByPage.mockResolvedValue(ratingEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadRatingByPageUsecase(loadRatingRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRatingByPage of loadRatingRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRatingRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadRatingRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a rating when loadRatingRepository loads it", async () => {
        const rating = await testInstance(fakeQuery);

        expect(rating).toEqual(ratingEntityPaginatedMock);
    });

    it("should return null when loadRatingRepository fails to load", async () => {
        loadRatingRepository.loadByPage.mockResolvedValue(null);

        const rating = await testInstance(fakeQuery);

        expect(rating).toBeNull();
    });

    it("should throw an error when loadRatingRepository throws an error", async () => {
        loadRatingRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

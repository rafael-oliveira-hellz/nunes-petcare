import { Query } from "@/application/types";
import { ratingResultEntityMock } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { LoadRatingResultRepository } from "@/slices/ratingResult/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRatingResult, loadRatingResultUsecase } from "./LoadRatingResultUseCase";

describe("loadRatingResult", () => {
    let fakeQuery: Query;
    let testInstance: loadRatingResult;
    let loadRatingResultRepository: MockProxy<LoadRatingResultRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRatingResultRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRatingResultRepository.loadRatingResult.mockResolvedValue(ratingResultEntityMock);
    });

    beforeEach(() => {
        testInstance = loadRatingResultUsecase(loadRatingResultRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRatingResult of loadRatingResultRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRatingResultRepository.loadRatingResult).toHaveBeenCalledWith(fakeQuery);

        expect(loadRatingResultRepository.loadRatingResult).toHaveBeenCalledTimes(1);
    });

    it("should return a ratingResult when loadRatingResultRepository loads it", async () => {
        const ratingResult = await testInstance(fakeQuery);

        expect(ratingResult).toEqual(ratingResultEntityMock);
    });

    it("should return null when loadRatingResultRepository fails to load", async () => {
        loadRatingResultRepository.loadRatingResult.mockResolvedValue(null);

        const ratingResult = await testInstance(fakeQuery);

        expect(ratingResult).toBeNull();
    });

    it("should throw an error when loadRatingResultRepository throws an error", async () => {
        loadRatingResultRepository.loadRatingResult.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

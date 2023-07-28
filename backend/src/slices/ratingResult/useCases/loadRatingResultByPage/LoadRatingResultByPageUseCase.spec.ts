import { Query } from "@/application/types";
import { ratingResultEntityPaginatedMock } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { LoadRatingResultByPageRepository } from "@/slices/ratingResult/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import {
    loadRatingResultByPage,
    loadRatingResultByPageUsecase,
} from "./LoadRatingResultByPageUseCase";

describe("loadRatingResultByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadRatingResultByPage;
    let loadRatingResultRepository: MockProxy<LoadRatingResultByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRatingResultRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRatingResultRepository.loadByPage.mockResolvedValue(ratingResultEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadRatingResultByPageUsecase(loadRatingResultRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRatingResultByPage of loadRatingResultRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRatingResultRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadRatingResultRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a ratingResult when loadRatingResultRepository loads it", async () => {
        const ratingResult = await testInstance(fakeQuery);

        expect(ratingResult).toEqual(ratingResultEntityPaginatedMock);
    });

    it("should return null when loadRatingResultRepository fails to load", async () => {
        loadRatingResultRepository.loadByPage.mockResolvedValue(null);

        const ratingResult = await testInstance(fakeQuery);

        expect(ratingResult).toBeNull();
    });

    it("should throw an error when loadRatingResultRepository throws an error", async () => {
        loadRatingResultRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

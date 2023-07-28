import { Query } from "@/application/types";
import { ratingResultEntityMock } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { UpdateRatingResultRepository } from "@/slices/ratingResult/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import {
    updateRatingResult,
    updateRatingResultUsecase,
} from "./UpdateRatingResultUseCase";

describe("updateRatingResult", () => {
    let fakeQuery: Query;
    let testInstance: updateRatingResult;
    let updateRatingResultRepository: MockProxy<UpdateRatingResultRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateRatingResultRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateRatingResultRepository.updateRatingResult.mockResolvedValue(
            ratingResultEntityMock,
        );
    });

    beforeEach(() => {
        testInstance = updateRatingResultUsecase(updateRatingResultRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateRatingResult of updateRatingResultRepository with correct values", async () => {
        await testInstance(fakeQuery, ratingResultEntityMock);

        expect(updateRatingResultRepository.updateRatingResult).toHaveBeenCalledWith(
            fakeQuery,
            ratingResultEntityMock,
        );

        expect(updateRatingResultRepository.updateRatingResult).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted ratingResult when updateRatingResultRepository deletes it", async () => {
        const ratingResult = await testInstance(fakeQuery, ratingResultEntityMock);

        expect(ratingResult).toEqual(ratingResultEntityMock);
    });

    it("should return null when updateRatingResultRepository fails to insert", async () => {
        updateRatingResultRepository.updateRatingResult.mockResolvedValue(null);

        const ratingResult = await testInstance(fakeQuery, ratingResultEntityMock);

        expect(ratingResult).toBeNull();
    });

    it("should throw an error when updateRatingResultRepository throws an error", async () => {
        updateRatingResultRepository.updateRatingResult.mockRejectedValue(
            new Error("Error"),
        );

        await expect(testInstance(fakeQuery, ratingResultEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

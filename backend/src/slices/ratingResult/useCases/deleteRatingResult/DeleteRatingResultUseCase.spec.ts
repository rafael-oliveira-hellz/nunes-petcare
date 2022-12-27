import { Query } from "@/application/@types";
import { ratingResultEntityMock } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { DeleteRatingResultRepository } from "@/slices/ratingResult/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteRatingResult, deleteRatingResultUsecase } from "./DeleteRatingResultUseCase";

describe("deleteRatingResult", () => {
    let fakeQuery: Query;
    let testInstance: deleteRatingResult;
    let deleteRatingResultRepository: MockProxy<DeleteRatingResultRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRatingResultRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteRatingResultRepository.deleteRatingResult.mockResolvedValue(ratingResultEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteRatingResultUsecase(deleteRatingResultRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteRatingResult of deleteRatingResultRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteRatingResultRepository.deleteRatingResult).toHaveBeenCalledWith(fakeQuery);

        expect(deleteRatingResultRepository.deleteRatingResult).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted ratingResult when deleteRatingResultRepository deletes it", async () => {
        const ratingResult = await testInstance(fakeQuery);

        expect(ratingResult).toEqual(ratingResultEntityMock);
    });

    it("should return null when deleteRatingResultRepository fails to insert", async () => {
        deleteRatingResultRepository.deleteRatingResult.mockResolvedValue(null);

        const ratingResult = await testInstance(fakeQuery);

        expect(ratingResult).toBeNull();
    });

    it("should throw an error when deleteRatingResultRepository throws an error", async () => {
        deleteRatingResultRepository.deleteRatingResult.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

import MockDate from "mockdate";
import { RatingResultEntity } from "./RatingResultEntity";

export const ratingResultEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "RatingResult name",
    ratingId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    rating: "RatingResult rating",
    comment: "RatingResult comment",
    requestId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ratingType: "RatingResult type",
    ratingForId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ratings: [
        {
            rating: "RatingResult 1",
            stars: 1,
            comment: "RatingResult 1 comment",
            count: 1,
            percent: 1,
        },
        {
            rating: "RatingResult 2",
            stars: 2,
            comment: "RatingResult 2 comment",
            count: 2,
            percent: 2,
        },
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const ratingResultEntityPaginatedMock = {
    ratingResults: [
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
        ratingResultEntityMock,
    ],
    total: 15,
};

describe("RatingResultEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a RatingResult entity", () => {
        const ratingResultEntity = new RatingResultEntity(ratingResultEntityMock);
        expect(ratingResultEntity).toBeTruthy();
        expect(ratingResultEntity).toEqual({
            ...ratingResultEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

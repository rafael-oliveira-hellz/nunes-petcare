import MockDate from "mockdate";
import { RatingEntity } from "./RatingEntity";

export const ratingEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Rating name",
    ratingType: "Rating type",
    ratings: [
        {
            rating: "Rating 1",
            stars: 1,
        },
        {
            rating: "Rating 2",
            stars: 2,
        },
        {
            rating: "Rating 3",
            stars: 3,
        },
        {
            rating: "Rating 4",
            stars: 4,
        },
        {
            rating: "Rating 5",
            stars: 5,
        },
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const ratingEntityPaginatedMock = {
    ratings: [
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
        ratingEntityMock,
    ],
    total: 15,
};

describe("RatingEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Rating entity", () => {
        const ratingEntity = new RatingEntity(ratingEntityMock);
        expect(ratingEntity).toBeTruthy();
        expect(ratingEntity).toEqual({
            ...ratingEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

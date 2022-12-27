export type RatingStarsModel = {
    rating: string;
    stars: number;
};

export type RatingData = {
    _id?: string;
    createdById: string;
    name: string;
    ratingType: string;
    ratings: RatingStarsModel[];
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RatingPaginatedData = {
    ratings: RatingData[];
    total: number;
};

export class RatingEntity {
    _id?: string;
    createdById: string;
    name: string;
    ratingType: string;
    ratings: RatingStarsModel[];
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: RatingData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.ratingType = data.ratingType;
        this.ratings = data.ratings;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

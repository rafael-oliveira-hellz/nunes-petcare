type RatingResultStarsModel = {
    rating: string;
    stars: number;
    comment: any;
    count: number;
    percent: number;
};

export type RatingResultData = {
    _id?: string;
    createdById: string;
    name: string;
    ratingId: string;
    rating?: string;
    comment?: string;
    requestId: string;
    ratingType: string;
    ratingForId: string;
    ratings: RatingResultStarsModel[];
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RatingResultAverage = {
    ratingId: string;
    ratingType: string;
    starsAvg: number;
    ratings: Array<{
        count: number;
        stars: number;
        percent: number;
        rating: string;
        comments: any;
    }>;
    createdAt: Date;
};

export type RatingResultPaginatedData = {
    ratingResults: RatingResultData[];
    total: number;
};

export class RatingResultEntity {
    createdById: string;
    name: string;
    ratingId: string;
    rating?: string;
    comment?: string;
    requestId: string;
    ratingType: string;
    ratingForId: string;
    ratings: RatingResultStarsModel[];
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: RatingResultData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.ratingId = data.ratingId;
        this.requestId = data.requestId;
        this.ratingType = data.ratingType;
        this.ratingForId = data.ratingForId;
        this.ratings = data.ratings;
        this.rating = data.rating;
        this.comment = data.comment;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

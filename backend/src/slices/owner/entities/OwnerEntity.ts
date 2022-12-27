export type OwnerData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type OwnerPaginatedData = {
    owners: OwnerData[];
    total: number;
};

export class OwnerEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: OwnerData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

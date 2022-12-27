export type FidelityData = {
    _id?: string;
    createdById: string;
    name: string;
    ownerId: string;
    requestId: string;
    points: number;
    customerId: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type FidelityPaginatedData = {
    fidelities: FidelityData[];
    total: number;
};

export class FidelityEntity {
    createdById: string;
    name: string;
    ownerId: string;
    requestId: string;
    points: number;
    customerId: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: FidelityData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.ownerId = data.ownerId;
        this.requestId = data.requestId;
        this.customerId = data.customerId;
        this.points = data.points;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

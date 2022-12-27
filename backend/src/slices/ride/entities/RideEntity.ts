export type RideData = {
    _id?: string;
    createdById: string;
    name: string;
    driverUserType: string;
    requestId: any;
    origin: any;
    destination: any;
    status: number;
    distance: number;
    distanceTime: number; //in minutes
    maxCostEstimated: number;
    minCostEstimated: number;
    finalCost: number;
    costDefinedByOwner: number;
    initDate: Date;
    endDateEstimated: Date;
    endDate: Date;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RidePaginatedData = {
    rides: RideData[];
    total: number;
};

export class RideEntity {
    createdById: string;
    name: string;
    requestId: any;
    driverUserType: string;
    origin: any;
    destination: any;
    status: number;
    distance: number;
    distanceTime: number; //in minutes
    maxCostEstimated: number;
    minCostEstimated: number;
    finalCost: number;
    costDefinedByOwner: number;
    initDate: Date;
    endDateEstimated: Date;
    endDate: Date;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: RideData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.driverUserType = data.driverUserType;
        this.origin = data.origin;
        this.destination = data.destination;
        this.status = data.status;
        this.distance = data.distance;
        this.distanceTime = data.distanceTime;
        this.maxCostEstimated = data.maxCostEstimated;
        this.minCostEstimated = data.minCostEstimated;
        this.finalCost = data.finalCost;
        this.costDefinedByOwner = data.costDefinedByOwner;
        this.initDate = data.initDate;
        this.endDateEstimated = data.endDateEstimated;
        this.endDate = data.endDate;
        this.requestId = data.requestId;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

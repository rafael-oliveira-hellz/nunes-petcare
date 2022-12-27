export type OwnerData = {
    _id?: string;
    createdById: string;
    name: string;
    totalAppointments?: number;
    totalRatings?: number;
    hasDelivery?: boolean;
    typeTax?: string;
    costByTimeDriving?: number;
    fidelityTaxPoints?: number;
    fixedTax?: number;
    minimumTimeForRescheduling?: number; // in minutes
    description?: string;
    daysOne?: any;
    daysTwo?: any;
    hoursStartOne?: string;
    hoursEndOne?: string;
    hoursStartTwo?: string;
    hoursEndTwo?: string;
    hourLunchStartOne?: string;
    hourLunchEndOne?: string;
    hourLunchStartTwo?: string;
    hourLunchEndTwo?: string;
    daysThree?: any;
    daysFour?: any;
    hoursStartThree?: string;
    hoursEndThree?: string;
    hoursStartFour?: string;
    hoursEndFour?: string;
    hourLunchStartThree?: string;
    hourLunchEndThree?: string;
    hourLunchStartFour?: string;
    hourLunchEndFour?: string;
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
    totalAppointments?: number;
    totalRatings?: number;
    hasDelivery?: boolean;
    typeTax?: string;
    costByTimeDriving?: number;
    fidelityTaxPoints?: number;
    fixedTax?: number;
    minimumTimeForRescheduling?: number; // in minutes
    description?: string;
    daysOne?: any;
    daysTwo?: any;
    hoursStartOne?: string;
    hoursEndOne?: string;
    hoursStartTwo?: string;
    hoursEndTwo?: string;
    hourLunchStartOne?: string;
    hourLunchEndOne?: string;
    hourLunchStartTwo?: string;
    hourLunchEndTwo?: string;
    daysThree?: any;
    daysFour?: any;
    hoursStartThree?: string;
    hoursEndThree?: string;
    hoursStartFour?: string;
    hoursEndFour?: string;
    hourLunchStartThree?: string;
    hourLunchEndThree?: string;
    hourLunchStartFour?: string;
    hourLunchEndFour?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: OwnerData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.totalAppointments = 0;
        this.totalRatings = 0;
        this.hasDelivery = data.hasDelivery;
        this.typeTax = data.typeTax;
        this.costByTimeDriving = data.costByTimeDriving;
        this.fidelityTaxPoints = data.fidelityTaxPoints;
        this.fixedTax = data.fixedTax;
        this.minimumTimeForRescheduling = data.minimumTimeForRescheduling;
        this.description = data.description;
        this.daysOne = data.daysOne;
        this.daysTwo = data.daysTwo;
        this.hoursStartOne = data.hoursStartOne;
        this.hoursEndOne = data.hoursEndOne;
        this.hoursStartTwo = data.hoursStartTwo;
        this.hoursEndTwo = data.hoursEndTwo;
        this.hourLunchStartOne = data.hourLunchStartOne;
        this.hourLunchEndOne = data.hourLunchEndOne;
        this.hourLunchStartTwo = data.hourLunchStartTwo;
        this.hourLunchEndTwo = data.hourLunchEndTwo;
        this.daysThree = data.daysThree;
        this.daysFour = data.daysFour;
        this.hoursStartThree = data.hoursStartThree;
        this.hoursEndThree = data.hoursEndThree;
        this.hoursStartFour = data.hoursStartFour;
        this.hoursEndFour = data.hoursEndFour;
        this.hourLunchStartThree = data.hourLunchStartThree;
        this.hourLunchEndThree = data.hourLunchEndThree;
        this.hourLunchStartFour = data.hourLunchStartFour;
        this.hourLunchEndFour = data.hourLunchEndFour;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

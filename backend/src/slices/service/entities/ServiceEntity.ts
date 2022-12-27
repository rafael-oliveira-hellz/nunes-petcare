export type ServiceData = {
    _id?: string;
    createdById: string;
    name: string;
    categoryId: string;
    duration: number; // duration in minutes
    description?: string;
    productsQuantityNeeded?: number;
    productId?: string;
    promotionalPrice?: number;
    price?: number;
    finalPrice?: number;
    comission?: number;
    comissionPercentage?: number;
    hasPromotionalPrice?: boolean;
    hasFidelityGeneration?: boolean;
    generateHowManyFidelityPoints?: number;
    totalAppointmentsDone?: number;
    canPayWithFidelityPoints?: boolean;
    howManyPointsIsNeededToCashOut?: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ServicePaginatedData = {
    services: ServiceData[];
    total: number;
};

export class ServiceEntity {
    createdById: string;
    name: string;
    categoryId: string;
    duration: number;
    description?: string;
    productsQuantityNeeded?: number;
    productId?: string;
    promotionalPrice?: number;
    price?: number;
    finalPrice?: number;
    comission?: number;
    comissionPercentage?: number;
    hasPromotionalPrice?: boolean;
    hasFidelityGeneration?: boolean;
    generateHowManyFidelityPoints?: number;
    totalAppointmentsDone?: number;
    canPayWithFidelityPoints?: boolean;
    howManyPointsIsNeededToCashOut?: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: ServiceData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.categoryId = data.categoryId;
        this.duration = data.duration;
        this.description = data.description;
        this.productsQuantityNeeded = data.productsQuantityNeeded;
        this.productId = data.productId;
        this.promotionalPrice = data.promotionalPrice;
        this.price = data.price;
        this.finalPrice = data.finalPrice;
        this.comission = data.comission;
        this.comissionPercentage = data.comissionPercentage;
        this.hasPromotionalPrice = data.hasPromotionalPrice;
        this.hasFidelityGeneration = data.hasFidelityGeneration;
        this.generateHowManyFidelityPoints = data.generateHowManyFidelityPoints;
        this.totalAppointmentsDone = 0;
        this.canPayWithFidelityPoints = data.canPayWithFidelityPoints;
        this.howManyPointsIsNeededToCashOut = data.howManyPointsIsNeededToCashOut;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

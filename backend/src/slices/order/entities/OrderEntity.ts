export type OrderData = {
    _id?: string;
    createdById: string;
    name: string;
    percentageAdopted?: number;
    paymentForm?: string;
    orderPaidByCustomer?: boolean;
    comissionPaidByOwner?: boolean;
    comissionValue?: number;
    totalValue?: number;
    professionalId?: string;
    ownerId?: string;
    requestId?: string;
    customerId?: string;
    extraCost?: number;
    normalCost?: number;
    hasFidelity?: boolean;
    hasDelivery?: boolean;
    pointsUsed?: number;
    appointmentDate?: Date;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type OrderPaginatedData = {
    orders: OrderData[];
    total: number;
};

export class OrderEntity {
    createdById: string;
    name: string;
    percentageAdopted?: number;
    paymentForm?: string;
    orderPaidByCustomer?: boolean;
    comissionPaidByOwner?: boolean;
    comissionValue?: number;
    totalValue?: number;
    professionalId?: string;
    ownerId?: string;
    requestId?: string;
    customerId?: string;
    extraCost?: number;
    normalCost?: number;
    hasFidelity?: boolean;
    hasDelivery?: boolean;
    pointsUsed?: number;
    appointmentDate?: Date;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: OrderData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.percentageAdopted = data.percentageAdopted;
        this.paymentForm = data.paymentForm;
        this.orderPaidByCustomer = data.orderPaidByCustomer;
        this.comissionPaidByOwner = data.comissionPaidByOwner;
        this.comissionValue = data.comissionValue;
        this.totalValue = data.totalValue;
        this.professionalId = data.professionalId;
        this.ownerId = data.ownerId;
        this.requestId = data.requestId;
        this.customerId = data.customerId;
        this.extraCost = data.extraCost;
        this.normalCost = data.normalCost;
        this.hasFidelity = data.hasFidelity;
        this.hasDelivery = data.hasDelivery;
        this.pointsUsed = data.pointsUsed;
        this.appointmentDate = data.appointmentDate;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

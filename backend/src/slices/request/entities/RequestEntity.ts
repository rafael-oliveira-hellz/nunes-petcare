import { FidelityData } from "@/slices/fidelity/entities";
import { OrderData } from "@/slices/order/entities";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { RideData } from "@/slices/ride/entities";

export type RequestData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    message: string;
    serviceId: string;
    ownerId: string;
    customerId: string;
    customerUserId?: string;
    professionalId: string;
    status: number;
    createdForId: string;
    updatedById?: string | null;
    updatedByRole?: string | null;
    read: boolean;
    push: boolean;
    email: boolean;
    hasDelivery?: boolean;
    hasRecurrence?: boolean;
    hasFidelity?: boolean;
    hasRide?: boolean;
    fidelity?: FidelityData;
    ride?: RideData;
    recurrence?: RecurrenceData;
    order?: OrderData;
    initDate: string;
    endDate: string;
    cancelledAt?: Date | null;
};

export type RequestPaginatedData = {
    requests: RequestData[];
    total: number;
};

export class RequestEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    message: string;
    serviceId: string;
    ownerId: string;
    customerId: string;
    customerUserId?: string;
    professionalId: string;
    status: number;
    createdForId: string;
    updatedById?: string | null;
    updatedByRole?: string | null;
    read: boolean;
    push: boolean;
    email: boolean;
    hasDelivery?: boolean;
    hasRecurrence?: boolean;
    hasFidelity?: boolean;
    hasRide?: boolean;
    fidelity?: FidelityData;
    ride?: RideData;
    recurrence?: RecurrenceData;
    order?: OrderData;
    initDate: string;
    endDate: string;
    cancelledAt?: Date | null;

    constructor(data: RequestData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.message = data.message;
        this.serviceId = data.serviceId;
        this.ownerId = data.ownerId;
        this.customerId = data.customerId;
        this.customerUserId = data.customerUserId;
        this.professionalId = data.professionalId;
        this.status = 0;
        this.createdForId = data.createdForId;
        this.read = false;
        this.push = data.push;
        this.email = data.email;
        this.hasDelivery = data.hasDelivery;
        this.hasRecurrence = data.hasRecurrence;
        this.hasFidelity = data.hasFidelity;
        this.hasRide = data.hasRide;
        this.initDate = data.initDate;
        this.endDate = data.endDate;
        this.cancelledAt = data.cancelledAt;
        this.fidelity = data.fidelity;
        this.recurrence = data.recurrence;
        this.order = data.order;
        this.ride = data.ride;
        this.updatedById = null;
        this.updatedByRole = null;
    }
}

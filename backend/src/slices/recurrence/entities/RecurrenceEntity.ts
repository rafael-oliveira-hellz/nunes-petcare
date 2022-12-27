export type RecurrenceData = {
    _id?: string;
    createdById: string;
    name: string;
    type: number; //0 is weekly 1 is monthly
    accept: boolean;
    appointmentsWasInserted: boolean;
    frequency: number;
    initDate: Date;
    endDate: Date;
    professionalId: string;
    requestId: string;
    clientId: string;
    ownerId: string;
    serviceId: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RecurrencePaginatedData = {
    recurrences: RecurrenceData[];
    total: number;
};

export class RecurrenceEntity {
    createdById: string;
    name: string;
    type: number; //0 is weekly 1 is monthly
    accept: boolean;
    appointmentsWasInserted: boolean;
    frequency: number;
    initDate: Date;
    endDate: Date;
    professionalId: string;
    requestId: string;
    clientId: string;
    ownerId: string;
    serviceId: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: RecurrenceData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.accept = data.accept;
        this.appointmentsWasInserted = data.appointmentsWasInserted;
        this.frequency = data.frequency;
        this.initDate = data.initDate;
        this.endDate = data.endDate;
        this.professionalId = data.professionalId;
        this.requestId = data.requestId;
        this.clientId = data.clientId;
        this.ownerId = data.ownerId;
        this.serviceId = data.serviceId;
        this.type = data.type;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

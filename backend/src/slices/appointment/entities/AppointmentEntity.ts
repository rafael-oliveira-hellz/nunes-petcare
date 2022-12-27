export type AppointmentData = {
    _id?: string;
    createdById: string;
    name: string;
    requestId?: string;
    message?: string;
    service?: string;
    ownerId?: string;
    customerId?: string;
    professionalId?: string;
    serviceId?: string;
    status?: string;
    createdForId?: string; // para quem foi criada a agenda
    read?: boolean;
    cancelled?: boolean;
    push?: boolean;
    email?: boolean;
    startDate?: Date;
    endDate?: Date;
    cancelledAt?: Date | null;
    cancelledBy?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type AppointmentPaginatedData = {
    appointments: AppointmentData[];
    total: number;
};

export class AppointmentEntity {
    createdById: string;
    name: string;
    requestId?: string;
    message?: string;
    service?: string;
    ownerId?: string;
    customerId?: string;
    professionalId?: string;
    serviceId?: string;
    status?: string;
    createdForId?: string; // para quem foi criada a agenda
    read?: boolean;
    cancelled?: boolean;
    push?: boolean;
    email?: boolean;
    startDate?: Date;
    endDate?: Date;
    cancelledAt?: Date | null;
    cancelledBy?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: AppointmentData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.requestId = data.requestId;
        this.message = data.message;
        this.service = data.service;
        this.ownerId = data.ownerId;
        this.customerId = data.customerId;
        this.professionalId = data.professionalId;
        this.serviceId = data.serviceId;
        this.status = data.status;
        this.createdForId = data.createdForId;
        this.read = data.read;
        this.cancelled = data.cancelled;
        this.push = data.push;
        this.email = data.email;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.cancelledAt = data.cancelledAt;
        this.cancelledBy = data.cancelledBy;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export type OwnerAppointmentInfo = {
    hourEndOne: any;
    hourLunchEndOne?: any;
    hourLunchStartOne?: any;
    hourStartOne: any;
    hourEndTwo?: any;
    hourLunchEndTwo?: any;
    hourLunchStartTwo?: any;
    hourStartTwo?: any;
    hourEndThree?: any;
    hourLunchEndThree?: any;
    hourLunchStartThree?: any;
    hourStartThree?: any;
    daysOne: any;
    daysTwo?: any;
    daysThree?: any;
};

export type AvailableTimesModelRepository = {
    _id?: OwnerAppointmentInfo;
    data: Array<any>;
};

export type QueryAvailableTimesModelRepository = {
    professionalId: string | undefined;
    startWorkingTime: string | undefined; // início do expediente
    endWorkingTime: string | undefined; // fim do expediente
};

export type QueryAvailableTimes = {
    professionalId: string | null;
    date: string | null;
    serviceId: string | null;
    ownerId: string | null;
};

export type QueryVerifyAvailableTimes = QueryAvailableTimes & {
    startDate: Date | string | null;
    endDate: Date | string | null;
};

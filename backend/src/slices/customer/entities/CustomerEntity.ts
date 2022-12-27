export type CustomerData = {
    _id?: string;
    createdById: string;
    name: string;
    cpf?: string;
    phone?: string;
    userId: string;
    ownerId: string;
    birthdate?: Date;
    totalAppointmentsDone?: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type CustomerPaginatedData = {
    customers: CustomerData[];
    total: number;
};

export class CustomerEntity {
    createdById: string;
    name: string;
    cpf?: string;
    phone?: string;
    userId: string;
    ownerId: string;
    birthdate?: Date;
    totalAppointmentsDone?: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: CustomerData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.cpf = data.cpf;
        this.phone = data.phone;
        this.userId = data.userId;
        this.ownerId = data.ownerId;
        this.birthdate = data.birthdate;
        this.totalAppointmentsDone = 0;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

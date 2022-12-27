export type UserData = {
    _id?: string;
    createdById: string;
    name: string;
    email: string;
    role: string;
    confirmedEmail: boolean;
    sentEmailConfirmation: boolean;
    password: string;
    creditCardId?: string;
    ownerId?: string;
    myOwnerId?: string;
    payday: Date;
    photoUrl: string;
    cpf: string;
    phone: string;
    coordinates?: any;
    distance?: number;
    totalAppointmentsDone?: number;
    plan?: string;
    cnpj?: string;
    city?: string;
    uf?: string;
    address?: string;
    complement?: string;
    zipCode?: string;
    photoId?: string;
    cash?: boolean;
    creditCard?: boolean;
    debitCard?: boolean;
    pix?: boolean;
    bankTransfer?: boolean;
    nextPlan?: string;
    addresses?: any;
    clientId?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type UserPaginatedData = {
    users: UserData[];
    total: number;
};

export class UserEntity {
    createdById: string;
    name: string;
    email: string;
    role: string;
    confirmedEmail: boolean;
    sentEmailConfirmation: boolean;
    password: string;
    creditCardId?: string;
    ownerId?: string;
    myOwnerId?: string;
    payday: Date;
    photoUrl: string;
    cpf: string;
    phone: string;
    coordinates?: any;
    distance?: number;
    totalAppointmentsDone?: number;
    plan?: string;
    cnpj?: string;
    city?: string;
    uf?: string;
    address?: string;
    complement?: string;
    zipCode?: string;
    photoId?: string;
    cash?: boolean;
    creditCard?: boolean;
    debitCard?: boolean;
    pix?: boolean;
    bankTransfer?: boolean;
    nextPlan?: string;
    addresses?: any;
    clientId?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: UserData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.confirmedEmail = false;
        this.sentEmailConfirmation = false;
        this.password = data.password;
        this.creditCardId = data.creditCardId;
        this.ownerId = data.ownerId;
        this.myOwnerId = data.myOwnerId;
        this.payday = data.payday;
        this.photoUrl = data.photoUrl;
        this.cpf = data.cpf;
        this.phone = data.phone;
        this.coordinates = data.coordinates;
        this.distance = data.distance;
        this.totalAppointmentsDone = 0;
        this.plan = data.plan;
        this.cnpj = data.cnpj;
        this.city = data.city;
        this.uf = data.uf;
        this.address = data.address;
        this.complement = data.complement;
        this.zipCode = data.zipCode;
        this.photoId = data.photoId;
        this.cash = data.cash;
        this.creditCard = data.creditCard;
        this.debitCard = data.debitCard;
        this.pix = data.pix;
        this.bankTransfer = data.bankTransfer;
        this.nextPlan = data.nextPlan;
        this.addresses = data.addresses;
        this.clientId = data.clientId;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
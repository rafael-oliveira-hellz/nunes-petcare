import { UserEntity } from "./UserEntity";
import MockDate from "mockdate";

export const userEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "userEntityMock",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "string",
    role: "client",
    confirmedEmail: true,
    confirmationEmailSent: true,
    password: "string",
    cardId: "string",
    ownerId: "string",
    myOwnerId: "string",
    payDay: "string",
    photoUrl: "string",
    cpf: "string",
    phone: "string",
    coord: { type: "Point", coordinates: [10, 10] },
    distance: 1,
    appointmentsTotal: 1,
    plan: "string",
    cnpj: "string",
    city: "string",
    uf: "string",
    address: "string",
    complement: "string",
    photoId: "string",
    cash: false,
    creditcard: false,
    debitcard: false,
    transferbank: false,
    cheque: false,
    pix: false,
    nextPlan: "string",
    addresses: [],
    clientId: "string",
};

export const userEntityPaginatedMock = {
    total: 11,
    users: [
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
    ],
};

describe("User", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new UserEntity(userEntityMock);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...userEntityMock,
            _id: undefined,
            active: false,
            confirmedEmail: false,
            confirmationEmailSent: false,
            appointmentsTotal: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

import MockDate from "mockdate";
import { UserEntity } from "./UserEntity";

export const userEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "User name",
    email: "user@mail.com",
    role: "user",
    confirmedEmail: false,
    sentEmailConfirmation: false,
    password: "password",
    creditCardId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    ownerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    myOwnerId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    payday: new Date(),
    photoUrl: "https://www.google.com",
    cpf: "12345678910",
    phone: "12345678910",
    coordinates: {
        type: "Point",
        coordinates: [-46.693419, -23.568704],
    },
    distance: 1000,
    totalAppointmentsDone: 0,
    plan: "plan",
    cnpj: "12345678910111",
    city: "city",
    uf: "uf",
    address: "address",
    complement: "complement",
    zipCode: "12345678",
    photoId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    cash: true,
    creditCard: true,
    debitCard: true,
    pix: true,
    bankTransfer: true,
    nextPlan: "nextPlan",
    addresses: [
        {
            _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
            city: "city",
            uf: "uf",
            address: "address",
            complement: "complement",
            zipCode: "12345678",
            coordinates: {
                type: "Point",
                coordinates: [-46.693419, -23.568704],
            },
            distance: 0,
        },
    ],
    clientId: "5f7b5f9b0b9b9b0b9b0b9b0b",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const userEntityPaginatedMock = {
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
        userEntityMock,
        userEntityMock,
        userEntityMock,
        userEntityMock,
    ],
    total: 15,
};

describe("UserEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a User entity", () => {
        const userEntity = new UserEntity(userEntityMock);
        expect(userEntity).toBeTruthy();
        expect(userEntity).toEqual({
            ...userEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

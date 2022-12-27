import MockDate from "mockdate";
import { AccountEntity } from "./AccountEntity";

export const accountEntityMock = {
    _id: "5f7b5f9b0b9b9b0b9b0b9b0b",
    createdById: "5f7b5f9b0b9b9b0b9b0b9b0b",
    name: "Account name",
    refreshToken: "Account refreshToken",
    expiresAt: "10/10/2023 10:10:10",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const accountEntityPaginatedMock = {
    accounts: [
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
        accountEntityMock,
    ],
    total: 15,
};

describe("AccountEntity", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should create a Account entity", () => {
        const accountEntity = new AccountEntity(accountEntityMock);
        expect(accountEntity).toBeTruthy();
        expect(accountEntity).toEqual({
            ...accountEntityMock,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});

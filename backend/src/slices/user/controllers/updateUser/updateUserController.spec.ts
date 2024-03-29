import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateUserController } from "./updateUserController";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";

describe("UpdateUserController", () => {
    let testInstance: UpdateUserController;
    let updateUser: jest.Mock;
    let validationQuery: MockProxy<Validation>;
    let validationBody: MockProxy<Validation>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateUser = jest.fn();
        updateUser.mockResolvedValue({
            ...userEntityMock,
            createdById: userEntityMock?._id,
        });
        validationQuery = mock();
        validationQuery.validate.mockResolvedValue([] as never);
        validationBody = mock();
        validationBody.validate.mockResolvedValue([] as never);
    });

    afterAll(() => {
        MockDate.reset();
    });

    beforeEach(() => {
        testInstance = new UpdateUserController(validationQuery, validationBody, updateUser);
    });

    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });

    test("should call validationQuery with correct params", async () => {
        await testInstance.execute({ query: userEntityMock });
        expect(validationQuery.validate).toHaveBeenCalledWith(userEntityMock);
        expect(validationQuery.validate).toHaveBeenCalledTimes(1);
    });

    test("should call validationBody with correct params", async () => {
        await testInstance.execute({ body: userEntityMock });
        expect(validationBody.validate).toHaveBeenCalledWith(userEntityMock);
        expect(validationBody.validate).toHaveBeenCalledTimes(1);
    });

    test("should call updateUser with correct params", async () => {
        const result = await testInstance.execute({
            body: userEntityMock,
            query: userEntityMock,
            userId: userEntityMock?._id,
        });

        expect(result).toEqual(
            ok({
                ...userEntityMock,
                createdById: userEntityMock?._id,
            }),
        );

        expect(updateUser).toHaveBeenCalledWith(
            {
                fields: {
                    ...userEntityMock,
                    createdById: userEntityMock?._id,
                },
                options: {},
            },
            userEntityMock,
        );

        expect(updateUser).toHaveBeenCalledTimes(1);
    });

    test("should call updateUser twice if the first returns null with correct params", async () => {
        updateUser.mockResolvedValueOnce(null);
        const result = await testInstance.execute({
            body: userEntityMock,
            query: userEntityMock,
            userId: userEntityMock?._id,
        });

        expect(result).toEqual(
            ok({
                ...userEntityMock,
                createdById: userEntityMock?._id,
            }),
        );

        expect(updateUser).toHaveBeenCalledWith(
            {
                fields: {
                    ...userEntityMock,
                    createdById: userEntityMock?._id,
                },
                options: {},
            },
            userEntityMock,
        );

        expect(updateUser).toHaveBeenCalledTimes(2);
    });

    test("should test admin role", async () => {
        const result = await testInstance.execute({
            body: userEntityMock,
            query: userEntityMock,
            userId: userEntityMock?._id,
            userLogged: { ...userEntityMock, role: "admin" },
        });

        expect(result).toEqual(
            ok({
                ...userEntityMock,
                createdById: userEntityMock?._id,
            }),
        );

        expect(updateUser).toHaveBeenCalledWith(
            {
                fields: {
                    ...userEntityMock,
                    createdById: userEntityMock?._id,
                },
                options: {},
            },
            userEntityMock,
        );

        expect(updateUser).toHaveBeenCalledTimes(1);
    });

    test("should throws if updateUser throw", async () => {
        updateUser.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: userEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });

    test("should return bad request if i dont pass any required field in body", async () => {
        validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);

        const httpResponse = await testInstance.execute({ body: userEntityMock });

        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });

    test("should return bad request if i dont pass any required field in query", async () => {
        validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);

        const httpResponse = await testInstance.execute({ query: userEntityMock });

        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
});

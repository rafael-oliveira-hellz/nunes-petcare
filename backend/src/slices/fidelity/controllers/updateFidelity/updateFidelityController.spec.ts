import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateFidelityController } from "./updateFidelityController";
import { fidelityEntityMock } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateFidelityController", () => {
    let testInstance: UpdateFidelityController;
    let updateFidelity: jest.Mock;
    let validationQuery: MockProxy<Validation>;
    let validationBody: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateFidelity = jest.fn();
        updateFidelity.mockResolvedValue({
            ...fidelityEntityMock,
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
        testInstance = new UpdateFidelityController(
            validationQuery,
            validationBody,
            updateFidelity,
        );
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validationQuery with correct params", async () => {
        await testInstance.execute({ query: fidelityEntityMock });
        expect(validationQuery.validate).toHaveBeenCalledWith(fidelityEntityMock);
        expect(validationQuery.validate).toHaveBeenCalledTimes(1);
    });
    test("should call validationBody with correct params", async () => {
        await testInstance.execute({ body: fidelityEntityMock });
        expect(validationBody.validate).toHaveBeenCalledWith(fidelityEntityMock);
        expect(validationBody.validate).toHaveBeenCalledTimes(1);
    });
    test("should call updateFidelity with correct params", async () => {
        const result = await testInstance.execute({
            body: fidelityEntityMock,
            query: fidelityEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...fidelityEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(updateFidelity).toHaveBeenCalledWith(
            {
                fields: {
                    ...fidelityEntityMock,
                    createdById: userEntityMock?._id,
                },
                options: {},
            },
            fidelityEntityMock,
        );
        expect(updateFidelity).toHaveBeenCalledTimes(1);
    });
    test("should throws if updateFidelity throw", async () => {
        updateFidelity.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: fidelityEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field in body", async () => {
        validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
        const httpResponse = await testInstance.execute({ body: fidelityEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
    test("should return bad request if i dont pass any required field in query", async () => {
        validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
        const httpResponse = await testInstance.execute({ query: fidelityEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
});

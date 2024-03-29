import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddOrderController } from "./addOrderController";
import { orderEntityMock } from "@/slices/order/entities/OrderEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("AddOrderController", () => {
    let testInstance: AddOrderController;
    let addOrder: jest.Mock;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addOrder = jest.fn();
        addOrder.mockResolvedValue({
            ...orderEntityMock,
            createdById: userEntityMock?._id,
        });
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        testInstance = new AddOrderController(validation, addOrder);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ body: orderEntityMock });
        expect(validation.validate).toHaveBeenCalledWith(orderEntityMock);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call addOrder with correct params", async () => {
        const result = await testInstance.execute({
            body: orderEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...orderEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(addOrder).toHaveBeenCalledWith({
            ...orderEntityMock,
            createdById: userEntityMock?._id,
        });
        expect(addOrder).toHaveBeenCalledTimes(1);
    });
    test("should throws if addOrder throw", async () => {
        addOrder.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: orderEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
        const httpResponse = await testInstance.execute({ body: orderEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
});

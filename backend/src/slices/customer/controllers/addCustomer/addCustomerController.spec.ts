import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddCustomerController } from "./addCustomerController";
import { customerEntityMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("AddCustomerController", () => {
    let testInstance: AddCustomerController;
    let addCustomer: jest.Mock;
    let validation: MockProxy<Validation>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addCustomer = jest.fn();
        addCustomer.mockResolvedValue({
            ...customerEntityMock,
            createdById: userEntityMock?._id,
        });
        validation = mock();
        validation.validate.mockResolvedValue([] as never);
    });
    afterAll(() => {
        MockDate.reset();
    });
    beforeEach(() => {
        testInstance = new AddCustomerController(validation, addCustomer);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ body: customerEntityMock });
        expect(validation.validate).toHaveBeenCalledWith(customerEntityMock);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call addCustomer with correct params", async () => {
        const result = await testInstance.execute({
            body: customerEntityMock,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...customerEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(addCustomer).toHaveBeenCalledWith({
            ...customerEntityMock,
            createdById: userEntityMock?._id,
        });
        expect(addCustomer).toHaveBeenCalledTimes(1);
    });
    test("should throws if addCustomer throw", async () => {
        addCustomer.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            body: customerEntityMock,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
        const httpResponse = await testInstance.execute({ body: customerEntityMock });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
    });
});

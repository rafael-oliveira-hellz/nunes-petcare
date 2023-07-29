import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadCustomerController } from "./loadCustomerController";
import { customerEntityMock } from "@/slices/customer/entities/CustomerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { userEntityMock } from "@/slices/user/entities/UserEntity.spec";

describe("LoadCustomerController", () => {
    let testInstance: LoadCustomerController;
    let loadCustomer: jest.Mock;
    let validation: MockProxy<Validation>;
    let fakeQuery: any;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadCustomer = jest.fn();
        loadCustomer.mockResolvedValue({
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
        fakeQuery = { _id: customerEntityMock._id };
        testInstance = new LoadCustomerController(validation, loadCustomer);
    });
    it("should extends class Controller", async () => {
        expect(testInstance).toBeInstanceOf(Controller);
    });
    test("should call validation with correct params", async () => {
        await testInstance.execute({ query: fakeQuery });
        expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
        expect(validation.validate).toHaveBeenCalledTimes(1);
    });
    test("should call loadCustomer with correct params", async () => {
        const result = await testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        expect(result).toEqual(
            ok({
                ...customerEntityMock,
                createdById: userEntityMock?._id,
            }),
        );
        expect(loadCustomer).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
        expect(loadCustomer).toHaveBeenCalledTimes(1);
    });
    test("should throws if loadCustomer throw", async () => {
        loadCustomer.mockRejectedValueOnce(new Error("error"));
        const result = testInstance.execute({
            query: fakeQuery,
            userId: userEntityMock?._id,
        });
        await expect(result).rejects.toThrow(new Error("error"));
    });
    test("should return bad request if i dont pass any required field", async () => {
        validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
        const httpResponse = await testInstance.execute({ query: fakeQuery });
        expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
    });
});

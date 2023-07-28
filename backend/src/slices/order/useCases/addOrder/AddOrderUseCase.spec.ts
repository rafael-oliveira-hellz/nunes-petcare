import { OrderEntity } from "@/slices/order/entities";
import { orderEntityMock } from "@/slices/order/entities/OrderEntity.spec";
import { AddOrderRepository } from "@/slices/order/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addOrder, addOrderUsecase } from "./AddOrderUseCase";

describe("addOrder", () => {
    let testInstance: addOrder;
    let addOrderRepository: MockProxy<AddOrderRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addOrderRepository = mock();

        addOrderRepository.addOrder.mockResolvedValue(orderEntityMock);
    });

    beforeEach(() => {
        testInstance = addOrderUsecase(addOrderRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addOrder of addOrderRepository with correct values", async () => {
        await testInstance(orderEntityMock);

        expect(addOrderRepository.addOrder).toHaveBeenCalledWith(new OrderEntity(orderEntityMock));

        expect(addOrderRepository.addOrder).toHaveBeenCalledTimes(1);
    });

    it("should return a new order when addOrderRepository inserts it", async () => {
        const order = await testInstance(orderEntityMock);

        expect(order).toEqual(orderEntityMock);
    });

    it("should return null when addOrderRepository fails to insert", async () => {
        addOrderRepository.addOrder.mockResolvedValue(null);

        const order = await testInstance(orderEntityMock);

        expect(order).toBeNull();
    });

    it("should throw an error when addOrderRepository throws an error", async () => {
        addOrderRepository.addOrder.mockRejectedValue(new Error("Error"));

        await expect(testInstance(orderEntityMock)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/@types";
import { orderEntityMock } from "@/slices/order/entities/OrderEntity.spec";
import { UpdateOrderRepository } from "@/slices/order/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateOrder, updateOrderUsecase } from "./UpdateOrderUseCase";

describe("updateOrder", () => {
    let fakeQuery: Query;
    let testInstance: updateOrder;
    let updateOrderRepository: MockProxy<UpdateOrderRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateOrderRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateOrderRepository.updateOrder.mockResolvedValue(orderEntityMock);
    });

    beforeEach(() => {
        testInstance = updateOrderUsecase(updateOrderRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateOrder of updateOrderRepository with correct values", async () => {
        await testInstance(fakeQuery, orderEntityMock);

        expect(updateOrderRepository.updateOrder).toHaveBeenCalledWith(fakeQuery, orderEntityMock);

        expect(updateOrderRepository.updateOrder).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted order when updateOrderRepository deletes it", async () => {
        const order = await testInstance(fakeQuery, orderEntityMock);

        expect(order).toEqual(orderEntityMock);
    });

    it("should return null when updateOrderRepository fails to insert", async () => {
        updateOrderRepository.updateOrder.mockResolvedValue(null);

        const order = await testInstance(fakeQuery, orderEntityMock);

        expect(order).toBeNull();
    });

    it("should throw an error when updateOrderRepository throws an error", async () => {
        updateOrderRepository.updateOrder.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, orderEntityMock)).rejects.toThrowError("Error");
    });
});

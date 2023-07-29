import { Query } from "@/application/types";
import { orderEntityMock } from "@/slices/order/entities/OrderEntity.spec";
import { DeleteOrderRepository } from "@/slices/order/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteOrder, DeleteOrder } from "./DeleteOrderUseCase";

describe("deleteOrder", () => {
    let fakeQuery: Query;
    let testInstance: DeleteOrder;
    let deleteOrderRepository: MockProxy<DeleteOrderRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteOrderRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteOrderRepository.deleteOrder.mockResolvedValue(orderEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteOrder(deleteOrderRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteOrder of deleteOrderRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteOrderRepository.deleteOrder).toHaveBeenCalledWith(fakeQuery);

        expect(deleteOrderRepository.deleteOrder).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted order when deleteOrderRepository deletes it", async () => {
        const order = await testInstance(fakeQuery);

        expect(order).toEqual(orderEntityMock);
    });

    it("should return null when deleteOrderRepository fails to insert", async () => {
        deleteOrderRepository.deleteOrder.mockResolvedValue(null);

        const order = await testInstance(fakeQuery);

        expect(order).toBeNull();
    });

    it("should throw an error when deleteOrderRepository throws an error", async () => {
        deleteOrderRepository.deleteOrder.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/types";
import { orderEntityMock } from "@/slices/order/entities/OrderEntity.spec";
import { LoadOrderRepository } from "@/slices/order/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadOrder, loadOrderUsecase } from "./LoadOrderUseCase";

describe("loadOrder", () => {
    let fakeQuery: Query;
    let testInstance: loadOrder;
    let loadOrderRepository: MockProxy<LoadOrderRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadOrderRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadOrderRepository.loadOrder.mockResolvedValue(orderEntityMock);
    });

    beforeEach(() => {
        testInstance = loadOrderUsecase(loadOrderRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadOrder of loadOrderRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadOrderRepository.loadOrder).toHaveBeenCalledWith(fakeQuery);

        expect(loadOrderRepository.loadOrder).toHaveBeenCalledTimes(1);
    });

    it("should return a order when loadOrderRepository loads it", async () => {
        const order = await testInstance(fakeQuery);

        expect(order).toEqual(orderEntityMock);
    });

    it("should return null when loadOrderRepository fails to load", async () => {
        loadOrderRepository.loadOrder.mockResolvedValue(null);

        const order = await testInstance(fakeQuery);

        expect(order).toBeNull();
    });

    it("should throw an error when loadOrderRepository throws an error", async () => {
        loadOrderRepository.loadOrder.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

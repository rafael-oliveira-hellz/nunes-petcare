import { Query } from "@/application/@types";
import { orderEntityPaginatedMock } from "@/slices/order/entities/OrderEntity.spec";
import { LoadOrderByPageRepository } from "@/slices/order/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadOrderByPage, loadOrderByPageUsecase } from "./LoadOrderByPageUseCase";

describe("loadOrderByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadOrderByPage;
    let loadOrderRepository: MockProxy<LoadOrderByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadOrderRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadOrderRepository.loadByPage.mockResolvedValue(orderEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadOrderByPageUsecase(loadOrderRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadOrderByPage of loadOrderRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadOrderRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadOrderRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a order when loadOrderRepository loads it", async () => {
        const order = await testInstance(fakeQuery);

        expect(order).toEqual(orderEntityPaginatedMock);
    });

    it("should return null when loadOrderRepository fails to load", async () => {
        loadOrderRepository.loadByPage.mockResolvedValue(null);

        const order = await testInstance(fakeQuery);

        expect(order).toBeNull();
    });

    it("should throw an error when loadOrderRepository throws an error", async () => {
        loadOrderRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

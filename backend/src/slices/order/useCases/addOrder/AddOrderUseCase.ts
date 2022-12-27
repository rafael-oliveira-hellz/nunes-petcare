import { OrderData, OrderEntity } from "@/slices/order/entities";
import { AddOrderRepository } from "@/slices/order/repositories";

export type addOrder = (data: OrderData) => Promise<OrderEntity | null>;

export type addOrderSignature = (addOrder: AddOrderRepository) => addOrder;

export const addOrderUsecase: addOrderSignature =
    (addOrder: AddOrderRepository) => (data: OrderData) => {
        return addOrder.addOrder(new OrderEntity(data));
    };

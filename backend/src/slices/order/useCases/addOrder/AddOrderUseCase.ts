import { OrderData, OrderEntity } from "@/slices/order/entities";
import { AddOrderRepository } from "@/slices/order/repositories";

export type AddOrder = (data: OrderData) => Promise<OrderEntity | null>;

export type addOrderSignature = (addOrder: AddOrderRepository) => AddOrder;

export const addOrder: addOrderSignature = (addOrder: AddOrderRepository) => (data: OrderData) => {
    return addOrder.addOrder(new OrderEntity(data));
};

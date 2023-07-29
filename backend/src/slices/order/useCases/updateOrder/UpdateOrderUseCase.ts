import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";
import { UpdateOrderRepository } from "@/slices/order/repositories";

export type UpdateOrder = (query: Query, data: OrderData) => Promise<OrderData | null>;

export type updateOrderSignature = (updateOrder: UpdateOrderRepository) => UpdateOrder;

export const updateOrder: updateOrderSignature =
    (updateOrder: UpdateOrderRepository) => (query: Query, data: OrderData) => {
        return updateOrder.updateOrder(query, data);
    };

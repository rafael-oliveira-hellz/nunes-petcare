import { Query } from "@/application/@types";
import { OrderData } from "@/slices/order/entities";
import { UpdateOrderRepository } from "@/slices/order/repositories";

export type updateOrder = (query: Query, data: OrderData) => Promise<OrderData | null>;

export type updateOrderSignature = (
    updateOrder: UpdateOrderRepository
) => updateOrder;

export const updateOrderUsecase: updateOrderSignature =
    (updateOrder: UpdateOrderRepository) => (query: Query, data: OrderData) => {
        return updateOrder.updateOrder(query, data);
    };

import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";
import { DeleteOrderRepository } from "@/slices/order/repositories";

export type deleteOrder = (query: Query) => Promise<OrderData | null>;

export type deleteOrderSignature = (deleteOrder: DeleteOrderRepository) => deleteOrder;

export const deleteOrderUsecase: deleteOrderSignature =
    (deleteOrder: DeleteOrderRepository) => (query: Query) => {
        return deleteOrder.deleteOrder(query);
    };

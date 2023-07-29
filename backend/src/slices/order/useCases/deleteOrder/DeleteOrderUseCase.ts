import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";
import { DeleteOrderRepository } from "@/slices/order/repositories";

export type DeleteOrder = (query: Query) => Promise<OrderData | null>;

export type deleteOrderSignature = (deleteOrder: DeleteOrderRepository) => DeleteOrder;

export const deleteOrder: deleteOrderSignature =
    (deleteOrder: DeleteOrderRepository) => (query: Query) => {
        return deleteOrder.deleteOrder(query);
    };

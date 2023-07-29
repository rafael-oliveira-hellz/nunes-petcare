import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";
import { LoadOrderRepository } from "@/slices/order/repositories";

export type LoadOrder = (query: Query) => Promise<OrderData | null>;

export type loadOrderSignature = (loadOrder: LoadOrderRepository) => LoadOrder;

export const loadOrder: loadOrderSignature =
    (loadOrderRepository: LoadOrderRepository) => (query: Query) => {
        return loadOrderRepository.loadOrder(query);
    };

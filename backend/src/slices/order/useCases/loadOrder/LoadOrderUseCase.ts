import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";
import { LoadOrderRepository } from "@/slices/order/repositories";

export type loadOrder = (query: Query) => Promise<OrderData | null>;

export type loadOrderSignature = (loadOrder: LoadOrderRepository) => loadOrder;

export const loadOrderUsecase: loadOrderSignature =
    (loadOrderRepository: LoadOrderRepository) => (query: Query) => {
        return loadOrderRepository.loadOrder(query);
    };

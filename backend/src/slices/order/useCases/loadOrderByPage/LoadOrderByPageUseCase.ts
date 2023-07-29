import { Query } from "@/application/types";
import { OrderPaginatedData } from "@/slices/order/entities";
import { LoadOrderByPageRepository } from "@/slices/order/repositories";

export type LoadOrderByPage = (query: Query) => Promise<OrderPaginatedData | null>;

export type loadOrderByPageSignature = (
    loadOrderByPage: LoadOrderByPageRepository,
) => LoadOrderByPage;

export const loadOrderByPage: loadOrderByPageSignature =
    (loadOrderByPageRepository: LoadOrderByPageRepository) => (query: Query) => {
        return loadOrderByPageRepository.loadOrderByPage(query);
    };

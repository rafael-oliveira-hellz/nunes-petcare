import { Query } from "@/application/@types";
import { OrderPaginatedData } from "@/slices/order/entities";
import { LoadOrderByPageRepository } from "@/slices/order/repositories";

export type loadOrderByPage = (query: Query) => Promise<OrderPaginatedData | null>;

export type loadOrderByPageSignature = (
    loadOrderByPage: LoadOrderByPageRepository
) => loadOrderByPage;

export const loadOrderByPageUsecase: loadOrderByPageSignature =
    (loadOrderByPageRepository: LoadOrderByPageRepository) => (query: Query) => {
        return loadOrderByPageRepository.loadByPage(query);
    };

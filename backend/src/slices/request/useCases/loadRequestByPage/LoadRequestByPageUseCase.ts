import { Query } from "@/application/types";
import { RequestPaginatedData } from "@/slices/request/entities";
import { LoadRequestByPageRepository } from "@/slices/request/repositories";

export type loadRequestByPage = (query: Query) => Promise<RequestPaginatedData | null>;

export type loadRequestByPageSignature = (
    loadRequestByPage: LoadRequestByPageRepository,
) => loadRequestByPage;

export const loadRequestByPageUsecase: loadRequestByPageSignature =
    (loadRequestByPageRepository: LoadRequestByPageRepository) => (query: Query) => {
        return loadRequestByPageRepository.loadByPage(query);
    };

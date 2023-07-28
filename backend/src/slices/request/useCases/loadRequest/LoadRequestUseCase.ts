import { Query } from "@/application/types";
import { RequestData } from "@/slices/request/entities";
import { LoadRequestRepository } from "@/slices/request/repositories";

export type loadRequest = (query: Query) => Promise<RequestData | null>;

export type loadRequestSignature = (loadRequest: LoadRequestRepository) => loadRequest;

export const loadRequestUsecase: loadRequestSignature =
    (loadRequestRepository: LoadRequestRepository) => (query: Query) => {
        return loadRequestRepository.loadRequest(query);
    };

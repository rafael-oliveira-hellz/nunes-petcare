import { Query } from "@/application/@types";
import { RequestData } from "@/slices/request/entities";
import { UpdateRequestRepository } from "@/slices/request/repositories";

export type updateRequest = (query: Query, data: RequestData) => Promise<RequestData | null>;

export type updateRequestSignature = (
    updateRequest: UpdateRequestRepository
) => updateRequest;

export const updateRequestUsecase: updateRequestSignature =
    (updateRequest: UpdateRequestRepository) => (query: Query, data: RequestData) => {
        return updateRequest.updateRequest(query, data);
    };

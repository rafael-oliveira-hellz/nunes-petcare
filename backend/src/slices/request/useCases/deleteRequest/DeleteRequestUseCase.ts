import { Query } from "@/application/types";
import { RequestData } from "@/slices/request/entities";
import { DeleteRequestRepository } from "@/slices/request/repositories";

export type deleteRequest = (query: Query) => Promise<RequestData | null>;

export type deleteRequestSignature = (
    deleteRequest: DeleteRequestRepository,
) => deleteRequest;

export const deleteRequestUsecase: deleteRequestSignature =
    (deleteRequest: DeleteRequestRepository) => (query: Query) => {
        return deleteRequest.deleteRequest(query);
    };

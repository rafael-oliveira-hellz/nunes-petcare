import { RequestData, RequestEntity } from "@/slices/request/entities";
import { AddRequestRepository } from "@/slices/request/repositories";

export type addRequest = (data: RequestData) => Promise<RequestEntity | null>;

export type addRequestSignature = (addRequest: AddRequestRepository) => addRequest;

export const addRequestUsecase: addRequestSignature =
    (addRequest: AddRequestRepository) => (data: RequestData) => {
        return addRequest.addRequest(new RequestEntity(data));
    };

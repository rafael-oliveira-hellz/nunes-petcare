import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";
import { DeleteServiceRepository } from "@/slices/service/repositories";

export type deleteService = (query: Query) => Promise<ServiceData | null>;

export type deleteServiceSignature = (deleteService: DeleteServiceRepository) => deleteService;

export const deleteServiceUsecase: deleteServiceSignature =
    (deleteService: DeleteServiceRepository) => (query: Query) => {
        return deleteService.deleteService(query);
    };

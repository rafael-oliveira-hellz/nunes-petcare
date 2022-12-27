import { Query } from "@/application/@types";
import { ServiceData } from "@/slices/service/entities";
import { UpdateServiceRepository } from "@/slices/service/repositories";

export type updateService = (query: Query, data: ServiceData) => Promise<ServiceData | null>;

export type updateServiceSignature = (
    updateService: UpdateServiceRepository
) => updateService;

export const updateServiceUsecase: updateServiceSignature =
    (updateService: UpdateServiceRepository) => (query: Query, data: ServiceData) => {
        return updateService.updateService(query, data);
    };

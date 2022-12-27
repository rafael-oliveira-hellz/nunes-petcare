import { ServiceData, ServiceEntity } from "@/slices/service/entities";
import { AddServiceRepository } from "@/slices/service/repositories";

export type addService = (data: ServiceData) => Promise<ServiceEntity | null>;

export type addServiceSignature = (addService: AddServiceRepository) => addService;

export const addServiceUsecase: addServiceSignature =
    (addService: AddServiceRepository) => (data: ServiceData) => {
        return addService.addService(new ServiceEntity(data));
    };

import { Query } from "@/application/@types";
import { ServiceData } from "@/slices/service/entities";
import { LoadServiceRepository } from "@/slices/service/repositories";

export type loadService = (query: Query) => Promise<ServiceData | null>;

export type loadServiceSignature = (loadService: LoadServiceRepository) => loadService;

export const loadServiceUsecase: loadServiceSignature =
    (loadServiceRepository: LoadServiceRepository) => (query: Query) => {
        return loadServiceRepository.loadService(query);
    };

import { Query } from "@/application/types";
import { ServicePaginatedData } from "@/slices/service/entities";
import { LoadServiceByPageRepository } from "@/slices/service/repositories";

export type loadServiceByPage = (query: Query) => Promise<ServicePaginatedData | null>;

export type loadServiceByPageSignature = (
    loadServiceByPage: LoadServiceByPageRepository,
) => loadServiceByPage;

export const loadServiceByPageUsecase: loadServiceByPageSignature =
    (loadServiceByPageRepository: LoadServiceByPageRepository) => (query: Query) => {
        return loadServiceByPageRepository.loadByPage(query);
    };

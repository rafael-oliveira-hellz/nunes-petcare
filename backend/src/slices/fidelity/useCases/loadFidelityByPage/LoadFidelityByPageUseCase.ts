import { Query } from "@/application/types";
import { FidelityPaginatedData } from "@/slices/fidelity/entities";
import { LoadFidelityByPageRepository } from "@/slices/fidelity/repositories";

export type loadFidelityByPage = (query: Query) => Promise<FidelityPaginatedData | null>;

export type loadFidelityByPageSignature = (
    loadFidelityByPage: LoadFidelityByPageRepository,
) => loadFidelityByPage;

export const loadFidelityByPageUsecase: loadFidelityByPageSignature =
    (loadFidelityByPageRepository: LoadFidelityByPageRepository) => (query: Query) => {
        return loadFidelityByPageRepository.loadByPage(query);
    };

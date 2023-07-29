import { Query } from "@/application/types";
import { FidelityPaginatedData } from "@/slices/fidelity/entities";
import { LoadFidelityByPageRepository } from "@/slices/fidelity/repositories";

export type LoadFidelityByPage = (query: Query) => Promise<FidelityPaginatedData | null>;

export type loadFidelityByPageSignature = (
    loadFidelityByPage: LoadFidelityByPageRepository,
) => LoadFidelityByPage;

export const loadFidelityByPage: loadFidelityByPageSignature =
    (loadFidelityByPageRepository: LoadFidelityByPageRepository) => (query: Query) => {
        return loadFidelityByPageRepository.loadFidelityByPage(query);
    };

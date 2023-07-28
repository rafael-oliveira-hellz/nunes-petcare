import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { LoadFidelityRepository } from "@/slices/fidelity/repositories";

export type loadFidelity = (query: Query) => Promise<FidelityData | null>;

export type loadFidelitySignature = (loadFidelity: LoadFidelityRepository) => loadFidelity;

export const loadFidelityUsecase: loadFidelitySignature =
    (loadFidelityRepository: LoadFidelityRepository) => (query: Query) => {
        return loadFidelityRepository.loadFidelity(query);
    };

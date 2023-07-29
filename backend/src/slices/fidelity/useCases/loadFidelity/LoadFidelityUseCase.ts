import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { LoadFidelityRepository } from "@/slices/fidelity/repositories";

export type LoadFidelity = (query: Query) => Promise<FidelityData | null>;

export type loadFidelitySignature = (loadFidelity: LoadFidelityRepository) => LoadFidelity;

export const loadFidelity: loadFidelitySignature =
    (loadFidelityRepository: LoadFidelityRepository) => (query: Query) => {
        return loadFidelityRepository.loadFidelity(query);
    };

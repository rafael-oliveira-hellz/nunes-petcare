import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { UpdateFidelityRepository } from "@/slices/fidelity/repositories";

export type UpdateFidelity = (query: Query, data: FidelityData) => Promise<FidelityData | null>;

export type updateFidelitySignature = (updateFidelity: UpdateFidelityRepository) => UpdateFidelity;

export const updateFidelity: updateFidelitySignature =
    (updateFidelity: UpdateFidelityRepository) => (query: Query, data: FidelityData) => {
        return updateFidelity.updateFidelity(query, data);
    };

import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { UpdateFidelityRepository } from "@/slices/fidelity/repositories";

export type updateFidelity = (
    query: Query,
    data: FidelityData,
) => Promise<FidelityData | null>;

export type updateFidelitySignature = (
    updateFidelity: UpdateFidelityRepository,
) => updateFidelity;

export const updateFidelityUsecase: updateFidelitySignature =
    (updateFidelity: UpdateFidelityRepository) => (query: Query, data: FidelityData) => {
        return updateFidelity.updateFidelity(query, data);
    };

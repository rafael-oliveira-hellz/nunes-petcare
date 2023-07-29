import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { DeleteFidelityRepository } from "@/slices/fidelity/repositories";

export type DeleteFidelity = (query: Query) => Promise<FidelityData | null>;

export type deleteFidelitySignature = (deleteFidelity: DeleteFidelityRepository) => DeleteFidelity;

export const deleteFidelity: deleteFidelitySignature =
    (deleteFidelity: DeleteFidelityRepository) => (query: Query) => {
        return deleteFidelity.deleteFidelity(query);
    };

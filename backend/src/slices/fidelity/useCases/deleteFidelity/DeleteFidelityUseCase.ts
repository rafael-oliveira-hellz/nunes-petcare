import { Query } from "@/application/@types";
import { FidelityData } from "@/slices/fidelity/entities";
import { DeleteFidelityRepository } from "@/slices/fidelity/repositories";

export type deleteFidelity = (query: Query) => Promise<FidelityData | null>;

export type deleteFidelitySignature = (
    deleteFidelity: DeleteFidelityRepository
) => deleteFidelity;

export const deleteFidelityUsecase: deleteFidelitySignature =
    (deleteFidelity: DeleteFidelityRepository) => (query: Query) => {
        return deleteFidelity.deleteFidelity(query);
    };

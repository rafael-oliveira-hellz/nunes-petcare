import { FidelityData, FidelityEntity } from "@/slices/fidelity/entities";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";

export type AddFidelity = (data: FidelityData) => Promise<FidelityEntity | null>;

export type addFidelitySignature = (addFidelity: AddFidelityRepository) => AddFidelity;

export const addFidelity: addFidelitySignature =
    (addFidelity: AddFidelityRepository) => (data: FidelityData) => {
        return addFidelity.addFidelity(new FidelityEntity(data));
    };

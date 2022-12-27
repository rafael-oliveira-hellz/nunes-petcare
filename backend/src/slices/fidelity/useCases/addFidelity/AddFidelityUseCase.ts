import { FidelityData, FidelityEntity } from "@/slices/fidelity/entities";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";

export type addFidelity = (data: FidelityData) => Promise<FidelityEntity | null>;

export type addFidelitySignature = (addFidelity: AddFidelityRepository) => addFidelity;

export const addFidelityUsecase: addFidelitySignature =
    (addFidelity: AddFidelityRepository) => (data: FidelityData) => {
        return addFidelity.addFidelity(new FidelityEntity(data));
    };

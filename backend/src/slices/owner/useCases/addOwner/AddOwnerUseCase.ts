import { OwnerData, OwnerEntity } from "@/slices/owner/entities";
import { AddOwnerRepository } from "@/slices/owner/repositories";

export type addOwner = (data: OwnerData) => Promise<OwnerEntity | null>;

export type addOwnerSignature = (addOwner: AddOwnerRepository) => addOwner;

export const addOwnerUsecase: addOwnerSignature =
    (addOwner: AddOwnerRepository) => (data: OwnerData) => {
        return addOwner.addOwner(new OwnerEntity(data));
    };

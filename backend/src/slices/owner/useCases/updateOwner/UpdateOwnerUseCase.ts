import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { UpdateOwnerRepository } from "@/slices/owner/repositories";

export type updateOwner = (query: Query, data: OwnerData) => Promise<OwnerData | null>;

export type updateOwnerSignature = (updateOwner: UpdateOwnerRepository) => updateOwner;

export const updateOwnerUsecase: updateOwnerSignature =
    (updateOwner: UpdateOwnerRepository) => (query: Query, data: OwnerData) => {
        return updateOwner.updateOwner(query, data);
    };

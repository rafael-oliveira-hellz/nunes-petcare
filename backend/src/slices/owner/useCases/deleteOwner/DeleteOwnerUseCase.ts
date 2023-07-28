import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { DeleteOwnerRepository } from "@/slices/owner/repositories";

export type deleteOwner = (query: Query) => Promise<OwnerData | null>;

export type deleteOwnerSignature = (deleteOwner: DeleteOwnerRepository) => deleteOwner;

export const deleteOwnerUsecase: deleteOwnerSignature =
    (deleteOwner: DeleteOwnerRepository) => (query: Query) => {
        return deleteOwner.deleteOwner(query);
    };

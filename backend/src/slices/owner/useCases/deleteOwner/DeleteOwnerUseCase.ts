import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { DeleteOwnerRepository } from "@/slices/owner/repositories";

export type DeleteOwner = (query: Query) => Promise<OwnerData | null>;

export type deleteOwnerSignature = (deleteOwner: DeleteOwnerRepository) => DeleteOwner;

export const deleteOwner: deleteOwnerSignature =
    (deleteOwner: DeleteOwnerRepository) => (query: Query) => {
        return deleteOwner.deleteOwner(query);
    };

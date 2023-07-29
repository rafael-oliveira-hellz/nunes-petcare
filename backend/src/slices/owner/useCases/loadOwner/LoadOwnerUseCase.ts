import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { LoadOwnerRepository } from "@/slices/owner/repositories";

export type LoadOwner = (query: Query) => Promise<OwnerData | null>;

export type loadOwnerSignature = (loadOwner: LoadOwnerRepository) => LoadOwner;

export const loadOwner: loadOwnerSignature =
    (loadOwnerRepository: LoadOwnerRepository) => (query: Query) => {
        return loadOwnerRepository.loadOwner(query);
    };

import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { LoadOwnerRepository } from "@/slices/owner/repositories";

export type loadOwner = (query: Query) => Promise<OwnerData | null>;

export type loadOwnerSignature = (loadOwner: LoadOwnerRepository) => loadOwner;

export const loadOwnerUsecase: loadOwnerSignature =
    (loadOwnerRepository: LoadOwnerRepository) => (query: Query) => {
        return loadOwnerRepository.loadOwner(query);
    };

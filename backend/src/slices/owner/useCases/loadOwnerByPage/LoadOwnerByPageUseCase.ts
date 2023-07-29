import { Query } from "@/application/types";
import { OwnerPaginatedData } from "@/slices/owner/entities";
import { LoadOwnerByPageRepository } from "@/slices/owner/repositories";

export type LoadOwnerByPage = (query: Query) => Promise<OwnerPaginatedData | null>;

export type loadOwnerByPageSignature = (
    loadOwnerByPage: LoadOwnerByPageRepository,
) => LoadOwnerByPage;

export const loadOwnerByPage: loadOwnerByPageSignature =
    (loadOwnerByPageRepository: LoadOwnerByPageRepository) => (query: Query) => {
        return loadOwnerByPageRepository.loadOwnerByPage(query);
    };

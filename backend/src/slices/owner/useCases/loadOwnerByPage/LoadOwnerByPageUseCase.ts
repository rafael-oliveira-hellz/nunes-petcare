import { Query } from "@/application/@types";
import { OwnerPaginatedData } from "@/slices/owner/entities";
import { LoadOwnerByPageRepository } from "@/slices/owner/repositories";

export type loadOwnerByPage = (query: Query) => Promise<OwnerPaginatedData | null>;

export type loadOwnerByPageSignature = (
    loadOwnerByPage: LoadOwnerByPageRepository
) => loadOwnerByPage;

export const loadOwnerByPageUsecase: loadOwnerByPageSignature =
    (loadOwnerByPageRepository: LoadOwnerByPageRepository) => (query: Query) => {
        return loadOwnerByPageRepository.loadByPage(query);
    };

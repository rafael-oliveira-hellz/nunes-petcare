import { LoadUserByPageGeoNearRepository } from "@/slices/user/repositories";
import { UserPaginatedData } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type LoadUserByPageGeoNear = (query: Query) => Promise<UserPaginatedData | null>;
export type LoadUserByPageGeoNearSignature = (
    loadUserByPageGeoNear: LoadUserByPageGeoNearRepository,
) => LoadUserByPageGeoNear;
export const loadUserByPageGeoNear: LoadUserByPageGeoNearSignature =
    (loadUserByPageGeoNearRepository: LoadUserByPageGeoNearRepository) => async (query: Query) => {
        return loadUserByPageGeoNearRepository.loadUserByPageGeoNear(query);
    };

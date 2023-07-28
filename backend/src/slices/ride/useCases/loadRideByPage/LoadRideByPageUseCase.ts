import { Query } from "@/application/types";
import { RidePaginatedData } from "@/slices/ride/entities";
import { LoadRideByPageRepository } from "@/slices/ride/repositories";

export type loadRideByPage = (query: Query) => Promise<RidePaginatedData | null>;

export type loadRideByPageSignature = (
    loadRideByPage: LoadRideByPageRepository,
) => loadRideByPage;

export const loadRideByPageUsecase: loadRideByPageSignature =
    (loadRideByPageRepository: LoadRideByPageRepository) => (query: Query) => {
        return loadRideByPageRepository.loadByPage(query);
    };

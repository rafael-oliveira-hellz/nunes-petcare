import { Query } from "@/application/@types";
import { RideData } from "@/slices/ride/entities";
import { LoadRideRepository } from "@/slices/ride/repositories";

export type loadRide = (query: Query) => Promise<RideData | null>;

export type loadRideSignature = (loadRide: LoadRideRepository) => loadRide;

export const loadRideUsecase: loadRideSignature =
    (loadRideRepository: LoadRideRepository) => (query: Query) => {
        return loadRideRepository.loadRide(query);
    };

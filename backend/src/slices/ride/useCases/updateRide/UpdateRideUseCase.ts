import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";
import { UpdateRideRepository } from "@/slices/ride/repositories";

export type updateRide = (query: Query, data: RideData) => Promise<RideData | null>;

export type updateRideSignature = (updateRide: UpdateRideRepository) => updateRide;

export const updateRideUsecase: updateRideSignature =
    (updateRide: UpdateRideRepository) => (query: Query, data: RideData) => {
        return updateRide.updateRide(query, data);
    };

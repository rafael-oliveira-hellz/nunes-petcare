import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";
import { DeleteRideRepository } from "@/slices/ride/repositories";

export type deleteRide = (query: Query) => Promise<RideData | null>;

export type deleteRideSignature = (deleteRide: DeleteRideRepository) => deleteRide;

export const deleteRideUsecase: deleteRideSignature =
    (deleteRide: DeleteRideRepository) => (query: Query) => {
        return deleteRide.deleteRide(query);
    };

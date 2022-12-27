import { RideData, RideEntity } from "@/slices/ride/entities";
import { AddRideRepository } from "@/slices/ride/repositories";

export type addRide = (data: RideData) => Promise<RideEntity | null>;

export type addRideSignature = (addRide: AddRideRepository) => addRide;

export const addRideUsecase: addRideSignature =
    (addRide: AddRideRepository) => (data: RideData) => {
        return addRide.addRide(new RideEntity(data));
    };

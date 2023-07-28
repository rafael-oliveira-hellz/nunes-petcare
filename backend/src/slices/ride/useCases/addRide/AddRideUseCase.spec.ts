import { RideEntity } from "@/slices/ride/entities";
import { rideEntityMock } from "@/slices/ride/entities/RideEntity.spec";
import { AddRideRepository } from "@/slices/ride/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addRide, addRideUsecase } from "./AddRideUseCase";

describe("addRide", () => {
    let testInstance: addRide;
    let addRideRepository: MockProxy<AddRideRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addRideRepository = mock();

        addRideRepository.addRide.mockResolvedValue(rideEntityMock);
    });

    beforeEach(() => {
        testInstance = addRideUsecase(addRideRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addRide of addRideRepository with correct values", async () => {
        await testInstance(rideEntityMock);

        expect(addRideRepository.addRide).toHaveBeenCalledWith(
            new RideEntity(rideEntityMock),
        );

        expect(addRideRepository.addRide).toHaveBeenCalledTimes(1);
    });

    it("should return a new ride when addRideRepository inserts it", async () => {
        const ride = await testInstance(rideEntityMock);

        expect(ride).toEqual(rideEntityMock);
    });

    it("should return null when addRideRepository fails to insert", async () => {
        addRideRepository.addRide.mockResolvedValue(null);

        const ride = await testInstance(rideEntityMock);

        expect(ride).toBeNull();
    });

    it("should throw an error when addRideRepository throws an error", async () => {
        addRideRepository.addRide.mockRejectedValue(new Error("Error"));

        await expect(testInstance(rideEntityMock)).rejects.toThrowError("Error");
    });
});

import { Query } from "@/application/types";
import { rideEntityMock } from "@/slices/ride/entities/RideEntity.spec";
import { UpdateRideRepository } from "@/slices/ride/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateRide, updateRideUsecase } from "./UpdateRideUseCase";

describe("updateRide", () => {
    let fakeQuery: Query;
    let testInstance: updateRide;
    let updateRideRepository: MockProxy<UpdateRideRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateRideRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateRideRepository.updateRide.mockResolvedValue(rideEntityMock);
    });

    beforeEach(() => {
        testInstance = updateRideUsecase(updateRideRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateRide of updateRideRepository with correct values", async () => {
        await testInstance(fakeQuery, rideEntityMock);

        expect(updateRideRepository.updateRide).toHaveBeenCalledWith(fakeQuery, rideEntityMock);

        expect(updateRideRepository.updateRide).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted ride when updateRideRepository deletes it", async () => {
        const ride = await testInstance(fakeQuery, rideEntityMock);

        expect(ride).toEqual(rideEntityMock);
    });

    it("should return null when updateRideRepository fails to insert", async () => {
        updateRideRepository.updateRide.mockResolvedValue(null);

        const ride = await testInstance(fakeQuery, rideEntityMock);

        expect(ride).toBeNull();
    });

    it("should throw an error when updateRideRepository throws an error", async () => {
        updateRideRepository.updateRide.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, rideEntityMock)).rejects.toThrowError("Error");
    });
});

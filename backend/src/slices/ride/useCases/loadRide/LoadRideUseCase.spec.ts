import { Query } from "@/application/@types";
import { rideEntityMock } from "@/slices/ride/entities/RideEntity.spec";
import { LoadRideRepository } from "@/slices/ride/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRide, loadRideUsecase } from "./LoadRideUseCase";

describe("loadRide", () => {
    let fakeQuery: Query;
    let testInstance: loadRide;
    let loadRideRepository: MockProxy<LoadRideRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRideRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRideRepository.loadRide.mockResolvedValue(rideEntityMock);
    });

    beforeEach(() => {
        testInstance = loadRideUsecase(loadRideRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRide of loadRideRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRideRepository.loadRide).toHaveBeenCalledWith(fakeQuery);

        expect(loadRideRepository.loadRide).toHaveBeenCalledTimes(1);
    });

    it("should return a ride when loadRideRepository loads it", async () => {
        const ride = await testInstance(fakeQuery);

        expect(ride).toEqual(rideEntityMock);
    });

    it("should return null when loadRideRepository fails to load", async () => {
        loadRideRepository.loadRide.mockResolvedValue(null);

        const ride = await testInstance(fakeQuery);

        expect(ride).toBeNull();
    });

    it("should throw an error when loadRideRepository throws an error", async () => {
        loadRideRepository.loadRide.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

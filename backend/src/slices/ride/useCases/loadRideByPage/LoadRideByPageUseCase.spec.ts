import { Query } from "@/application/@types";
import { rideEntityPaginatedMock } from "@/slices/ride/entities/RideEntity.spec";
import { LoadRideByPageRepository } from "@/slices/ride/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRideByPage, loadRideByPageUsecase } from "./LoadRideByPageUseCase";

describe("loadRideByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadRideByPage;
    let loadRideRepository: MockProxy<LoadRideByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRideRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRideRepository.loadByPage.mockResolvedValue(rideEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadRideByPageUsecase(loadRideRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRideByPage of loadRideRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRideRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadRideRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a ride when loadRideRepository loads it", async () => {
        const ride = await testInstance(fakeQuery);

        expect(ride).toEqual(rideEntityPaginatedMock);
    });

    it("should return null when loadRideRepository fails to load", async () => {
        loadRideRepository.loadByPage.mockResolvedValue(null);

        const ride = await testInstance(fakeQuery);

        expect(ride).toBeNull();
    });

    it("should throw an error when loadRideRepository throws an error", async () => {
        loadRideRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

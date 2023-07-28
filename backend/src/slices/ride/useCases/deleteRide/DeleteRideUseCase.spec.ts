import { Query } from "@/application/types";
import { rideEntityMock } from "@/slices/ride/entities/RideEntity.spec";
import { DeleteRideRepository } from "@/slices/ride/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteRide, deleteRideUsecase } from "./DeleteRideUseCase";

describe("deleteRide", () => {
    let fakeQuery: Query;
    let testInstance: deleteRide;
    let deleteRideRepository: MockProxy<DeleteRideRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRideRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteRideRepository.deleteRide.mockResolvedValue(rideEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteRideUsecase(deleteRideRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteRide of deleteRideRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteRideRepository.deleteRide).toHaveBeenCalledWith(fakeQuery);

        expect(deleteRideRepository.deleteRide).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted ride when deleteRideRepository deletes it", async () => {
        const ride = await testInstance(fakeQuery);

        expect(ride).toEqual(rideEntityMock);
    });

    it("should return null when deleteRideRepository fails to insert", async () => {
        deleteRideRepository.deleteRide.mockResolvedValue(null);

        const ride = await testInstance(fakeQuery);

        expect(ride).toBeNull();
    });

    it("should throw an error when deleteRideRepository throws an error", async () => {
        deleteRideRepository.deleteRide.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

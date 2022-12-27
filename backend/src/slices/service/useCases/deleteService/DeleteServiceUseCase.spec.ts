import { Query } from "@/application/@types";
import { serviceEntityMock } from "@/slices/service/entities/ServiceEntity.spec";
import { DeleteServiceRepository } from "@/slices/service/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteService, deleteServiceUsecase } from "./DeleteServiceUseCase";

describe("deleteService", () => {
    let fakeQuery: Query;
    let testInstance: deleteService;
    let deleteServiceRepository: MockProxy<DeleteServiceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteServiceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteServiceRepository.deleteService.mockResolvedValue(serviceEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteServiceUsecase(deleteServiceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteService of deleteServiceRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteServiceRepository.deleteService).toHaveBeenCalledWith(fakeQuery);

        expect(deleteServiceRepository.deleteService).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted service when deleteServiceRepository deletes it", async () => {
        const service = await testInstance(fakeQuery);

        expect(service).toEqual(serviceEntityMock);
    });

    it("should return null when deleteServiceRepository fails to insert", async () => {
        deleteServiceRepository.deleteService.mockResolvedValue(null);

        const service = await testInstance(fakeQuery);

        expect(service).toBeNull();
    });

    it("should throw an error when deleteServiceRepository throws an error", async () => {
        deleteServiceRepository.deleteService.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

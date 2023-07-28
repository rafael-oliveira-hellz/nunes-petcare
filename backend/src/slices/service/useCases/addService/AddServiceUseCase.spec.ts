import { ServiceEntity } from "@/slices/service/entities";
import { serviceEntityMock } from "@/slices/service/entities/ServiceEntity.spec";
import { AddServiceRepository } from "@/slices/service/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addService, addServiceUsecase } from "./AddServiceUseCase";

describe("addService", () => {
    let testInstance: addService;
    let addServiceRepository: MockProxy<AddServiceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addServiceRepository = mock();

        addServiceRepository.addService.mockResolvedValue(serviceEntityMock);
    });

    beforeEach(() => {
        testInstance = addServiceUsecase(addServiceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addService of addServiceRepository with correct values", async () => {
        await testInstance(serviceEntityMock);

        expect(addServiceRepository.addService).toHaveBeenCalledWith(
            new ServiceEntity(serviceEntityMock),
        );

        expect(addServiceRepository.addService).toHaveBeenCalledTimes(1);
    });

    it("should return a new service when addServiceRepository inserts it", async () => {
        const service = await testInstance(serviceEntityMock);

        expect(service).toEqual(serviceEntityMock);
    });

    it("should return null when addServiceRepository fails to insert", async () => {
        addServiceRepository.addService.mockResolvedValue(null);

        const service = await testInstance(serviceEntityMock);

        expect(service).toBeNull();
    });

    it("should throw an error when addServiceRepository throws an error", async () => {
        addServiceRepository.addService.mockRejectedValue(new Error("Error"));

        await expect(testInstance(serviceEntityMock)).rejects.toThrowError("Error");
    });
});

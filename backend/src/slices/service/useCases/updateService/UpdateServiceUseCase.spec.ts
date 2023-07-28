import { Query } from "@/application/types";
import { serviceEntityMock } from "@/slices/service/entities/ServiceEntity.spec";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateService, updateServiceUsecase } from "./UpdateServiceUseCase";

describe("updateService", () => {
    let fakeQuery: Query;
    let testInstance: updateService;
    let updateServiceRepository: MockProxy<UpdateServiceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateServiceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateServiceRepository.updateService.mockResolvedValue(serviceEntityMock);
    });

    beforeEach(() => {
        testInstance = updateServiceUsecase(updateServiceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateService of updateServiceRepository with correct values", async () => {
        await testInstance(fakeQuery, serviceEntityMock);

        expect(updateServiceRepository.updateService).toHaveBeenCalledWith(
            fakeQuery,
            serviceEntityMock,
        );

        expect(updateServiceRepository.updateService).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted service when updateServiceRepository deletes it", async () => {
        const service = await testInstance(fakeQuery, serviceEntityMock);

        expect(service).toEqual(serviceEntityMock);
    });

    it("should return null when updateServiceRepository fails to insert", async () => {
        updateServiceRepository.updateService.mockResolvedValue(null);

        const service = await testInstance(fakeQuery, serviceEntityMock);

        expect(service).toBeNull();
    });

    it("should throw an error when updateServiceRepository throws an error", async () => {
        updateServiceRepository.updateService.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, serviceEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

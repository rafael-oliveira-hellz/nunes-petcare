import { Query } from "@/application/@types";
import { serviceEntityMock } from "@/slices/service/entities/ServiceEntity.spec";
import { LoadServiceRepository } from "@/slices/service/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadService, loadServiceUsecase } from "./LoadServiceUseCase";

describe("loadService", () => {
    let fakeQuery: Query;
    let testInstance: loadService;
    let loadServiceRepository: MockProxy<LoadServiceRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadServiceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadServiceRepository.loadService.mockResolvedValue(serviceEntityMock);
    });

    beforeEach(() => {
        testInstance = loadServiceUsecase(loadServiceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadService of loadServiceRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadServiceRepository.loadService).toHaveBeenCalledWith(fakeQuery);

        expect(loadServiceRepository.loadService).toHaveBeenCalledTimes(1);
    });

    it("should return a service when loadServiceRepository loads it", async () => {
        const service = await testInstance(fakeQuery);

        expect(service).toEqual(serviceEntityMock);
    });

    it("should return null when loadServiceRepository fails to load", async () => {
        loadServiceRepository.loadService.mockResolvedValue(null);

        const service = await testInstance(fakeQuery);

        expect(service).toBeNull();
    });

    it("should throw an error when loadServiceRepository throws an error", async () => {
        loadServiceRepository.loadService.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

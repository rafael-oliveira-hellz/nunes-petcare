import { Query } from "@/application/types";
import { serviceEntityPaginatedMock } from "@/slices/service/entities/ServiceEntity.spec";
import { LoadServiceByPageRepository } from "@/slices/service/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadServiceByPage, loadServiceByPageUsecase } from "./LoadServiceByPageUseCase";

describe("loadServiceByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadServiceByPage;
    let loadServiceRepository: MockProxy<LoadServiceByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadServiceRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadServiceRepository.loadServiceByPage.mockResolvedValue(serviceEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadServiceByPageUsecase(loadServiceRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadServiceByPage of loadServiceRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadServiceRepository.loadServiceByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadServiceRepository.loadServiceByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a service when loadServiceRepository loads it", async () => {
        const service = await testInstance(fakeQuery);

        expect(service).toEqual(serviceEntityPaginatedMock);
    });

    it("should return null when loadServiceRepository fails to load", async () => {
        loadServiceRepository.loadServiceByPage.mockResolvedValue(null);

        const service = await testInstance(fakeQuery);

        expect(service).toBeNull();
    });

    it("should throw an error when loadServiceRepository throws an error", async () => {
        loadServiceRepository.loadServiceByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

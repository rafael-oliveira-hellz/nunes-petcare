import { Query } from "@/application/types";
import { requestEntityPaginatedMock } from "@/slices/request/entities/RequestEntity.spec";
import { LoadRequestByPageRepository } from "@/slices/request/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRequestByPage, loadRequestByPageUsecase } from "./LoadRequestByPageUseCase";

describe("loadRequestByPage", () => {
    let fakeQuery: Query;
    let testInstance: loadRequestByPage;
    let loadRequestRepository: MockProxy<LoadRequestByPageRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRequestRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRequestRepository.loadByPage.mockResolvedValue(requestEntityPaginatedMock);
    });

    beforeEach(() => {
        testInstance = loadRequestByPageUsecase(loadRequestRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRequestByPage of loadRequestRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRequestRepository.loadByPage).toHaveBeenCalledWith(fakeQuery);

        expect(loadRequestRepository.loadByPage).toHaveBeenCalledTimes(1);
    });

    it("should return a request when loadRequestRepository loads it", async () => {
        const request = await testInstance(fakeQuery);

        expect(request).toEqual(requestEntityPaginatedMock);
    });

    it("should return null when loadRequestRepository fails to load", async () => {
        loadRequestRepository.loadByPage.mockResolvedValue(null);

        const request = await testInstance(fakeQuery);

        expect(request).toBeNull();
    });

    it("should throw an error when loadRequestRepository throws an error", async () => {
        loadRequestRepository.loadByPage.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

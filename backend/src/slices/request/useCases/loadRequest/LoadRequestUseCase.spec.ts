import { Query } from "@/application/types";
import { requestEntityMock } from "@/slices/request/entities/RequestEntity.spec";
import { LoadRequestRepository } from "@/slices/request/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { loadRequest, loadRequestUsecase } from "./LoadRequestUseCase";

describe("loadRequest", () => {
    let fakeQuery: Query;
    let testInstance: loadRequest;
    let loadRequestRepository: MockProxy<LoadRequestRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        loadRequestRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        loadRequestRepository.loadRequest.mockResolvedValue(requestEntityMock);
    });

    beforeEach(() => {
        testInstance = loadRequestUsecase(loadRequestRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call loadRequest of loadRequestRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(loadRequestRepository.loadRequest).toHaveBeenCalledWith(fakeQuery);

        expect(loadRequestRepository.loadRequest).toHaveBeenCalledTimes(1);
    });

    it("should return a request when loadRequestRepository loads it", async () => {
        const request = await testInstance(fakeQuery);

        expect(request).toEqual(requestEntityMock);
    });

    it("should return null when loadRequestRepository fails to load", async () => {
        loadRequestRepository.loadRequest.mockResolvedValue(null);

        const request = await testInstance(fakeQuery);

        expect(request).toBeNull();
    });

    it("should throw an error when loadRequestRepository throws an error", async () => {
        loadRequestRepository.loadRequest.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

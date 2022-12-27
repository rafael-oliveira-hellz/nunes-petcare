import { RequestEntity } from "@/slices/request/entities";
import { requestEntityMock } from "@/slices/request/entities/RequestEntity.spec";
import { AddRequestRepository } from "@/slices/request/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { addRequest, addRequestUsecase } from "./AddRequestUseCase";

describe("addRequest", () => {
    let testInstance: addRequest;
    let addRequestRepository: MockProxy<AddRequestRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        addRequestRepository = mock();

        addRequestRepository.addRequest.mockResolvedValue(requestEntityMock);
    });

    beforeEach(() => {
        testInstance = addRequestUsecase(addRequestRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call addRequest of addRequestRepository with correct values", async () => {
        await testInstance(requestEntityMock);

        expect(addRequestRepository.addRequest).toHaveBeenCalledWith(
            new RequestEntity(requestEntityMock)
        );

        expect(addRequestRepository.addRequest).toHaveBeenCalledTimes(1);
    });

    it("should return a new request when addRequestRepository inserts it", async () => {
        const request = await testInstance(requestEntityMock);

        expect(request).toEqual(requestEntityMock);
    });

    it("should return null when addRequestRepository fails to insert", async () => {
        addRequestRepository.addRequest.mockResolvedValue(null);

        const request = await testInstance(requestEntityMock);

        expect(request).toBeNull();
    });

    it("should throw an error when addRequestRepository throws an error", async () => {
        addRequestRepository.addRequest.mockRejectedValue(new Error("Error"));

        await expect(testInstance(requestEntityMock)).rejects.toThrowError("Error");
    });
});

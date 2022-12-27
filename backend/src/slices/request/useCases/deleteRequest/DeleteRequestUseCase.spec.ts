import { Query } from "@/application/@types";
import { requestEntityMock } from "@/slices/request/entities/RequestEntity.spec";
import { DeleteRequestRepository } from "@/slices/request/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { deleteRequest, deleteRequestUsecase } from "./DeleteRequestUseCase";

describe("deleteRequest", () => {
    let fakeQuery: Query;
    let testInstance: deleteRequest;
    let deleteRequestRepository: MockProxy<DeleteRequestRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRequestRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        deleteRequestRepository.deleteRequest.mockResolvedValue(requestEntityMock);
    });

    beforeEach(() => {
        testInstance = deleteRequestUsecase(deleteRequestRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call deleteRequest of deleteRequestRepository with correct values", async () => {
        await testInstance(fakeQuery);

        expect(deleteRequestRepository.deleteRequest).toHaveBeenCalledWith(fakeQuery);

        expect(deleteRequestRepository.deleteRequest).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted request when deleteRequestRepository deletes it", async () => {
        const request = await testInstance(fakeQuery);

        expect(request).toEqual(requestEntityMock);
    });

    it("should return null when deleteRequestRepository fails to insert", async () => {
        deleteRequestRepository.deleteRequest.mockResolvedValue(null);

        const request = await testInstance(fakeQuery);

        expect(request).toBeNull();
    });

    it("should throw an error when deleteRequestRepository throws an error", async () => {
        deleteRequestRepository.deleteRequest.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery)).rejects.toThrowError("Error");
    });
});

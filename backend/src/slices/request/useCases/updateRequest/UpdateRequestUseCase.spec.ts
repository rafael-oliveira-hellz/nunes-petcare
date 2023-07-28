import { Query } from "@/application/types";
import { requestEntityMock } from "@/slices/request/entities/RequestEntity.spec";
import { UpdateRequestRepository } from "@/slices/request/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import { updateRequest, updateRequestUsecase } from "./UpdateRequestUseCase";

describe("updateRequest", () => {
    let fakeQuery: Query;
    let testInstance: updateRequest;
    let updateRequestRepository: MockProxy<UpdateRequestRepository>;

    beforeAll(async () => {
        MockDate.set(new Date());
        updateRequestRepository = mock();

        fakeQuery = {
            fields: {
                name: "name",
            },
            options: {},
        };

        updateRequestRepository.updateRequest.mockResolvedValue(requestEntityMock);
    });

    beforeEach(() => {
        testInstance = updateRequestUsecase(updateRequestRepository);
    });

    afterAll(async () => {
        MockDate.reset();
    });

    it("should call updateRequest of updateRequestRepository with correct values", async () => {
        await testInstance(fakeQuery, requestEntityMock);

        expect(updateRequestRepository.updateRequest).toHaveBeenCalledWith(
            fakeQuery,
            requestEntityMock,
        );

        expect(updateRequestRepository.updateRequest).toHaveBeenCalledTimes(1);
    });

    it("should return a new deleted request when updateRequestRepository deletes it", async () => {
        const request = await testInstance(fakeQuery, requestEntityMock);

        expect(request).toEqual(requestEntityMock);
    });

    it("should return null when updateRequestRepository fails to insert", async () => {
        updateRequestRepository.updateRequest.mockResolvedValue(null);

        const request = await testInstance(fakeQuery, requestEntityMock);

        expect(request).toBeNull();
    });

    it("should throw an error when updateRequestRepository throws an error", async () => {
        updateRequestRepository.updateRequest.mockRejectedValue(new Error("Error"));

        await expect(testInstance(fakeQuery, requestEntityMock)).rejects.toThrowError(
            "Error",
        );
    });
});

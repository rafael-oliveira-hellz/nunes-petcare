import {
    AvailableTimesModelRepository,
    QueryAvailableTimesModelRepository,
} from "@/slices/appointment/entities";

export interface LoadAvailableTimeRepository {
    loadAppointment: (
        query: QueryAvailableTimesModelRepository,
    ) => Promise<AvailableTimesModelRepository | null>;
}

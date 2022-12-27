import { Query } from "@/application/@types";
import { AppointmentPaginatedData } from "@/slices/appointment/entities";

export interface LoadAppointmentByPageRepository {
    loadByPage(query: Query): Promise<AppointmentPaginatedData | null>;
}

import { Query } from "@/application/types";
import { AppointmentPaginatedData } from "@/slices/appointment/entities";
import { LoadAppointmentByPageRepository } from "@/slices/appointment/repositories";

export type LoadAppointmentByPage = (query: Query) => Promise<AppointmentPaginatedData | null>;

export type loadAppointmentByPageSignature = (
    loadAppointmentByPage: LoadAppointmentByPageRepository,
) => LoadAppointmentByPage;

export const loadAppointmentByPage: loadAppointmentByPageSignature =
    (loadAppointmentByPageRepository: LoadAppointmentByPageRepository) => (query: Query) => {
        return loadAppointmentByPageRepository.loadAppointmentByPage(query);
    };

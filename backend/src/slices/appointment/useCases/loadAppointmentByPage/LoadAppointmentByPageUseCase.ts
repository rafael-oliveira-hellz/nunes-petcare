import { Query } from "@/application/types";
import { AppointmentPaginatedData } from "@/slices/appointment/entities";
import { LoadAppointmentByPageRepository } from "@/slices/appointment/repositories";

export type loadAppointmentByPage = (
    query: Query,
) => Promise<AppointmentPaginatedData | null>;

export type loadAppointmentByPageSignature = (
    loadAppointmentByPage: LoadAppointmentByPageRepository,
) => loadAppointmentByPage;

export const loadAppointmentByPageUsecase: loadAppointmentByPageSignature =
    (loadAppointmentByPageRepository: LoadAppointmentByPageRepository) =>
    (query: Query) => {
        return loadAppointmentByPageRepository.loadByPage(query);
    };

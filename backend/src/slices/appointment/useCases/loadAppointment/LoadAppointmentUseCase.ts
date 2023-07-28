import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { LoadAppointmentRepository } from "@/slices/appointment/repositories";

export type loadAppointment = (query: Query) => Promise<AppointmentData | null>;

export type loadAppointmentSignature = (
    loadAppointment: LoadAppointmentRepository,
) => loadAppointment;

export const loadAppointmentUsecase: loadAppointmentSignature =
    (loadAppointmentRepository: LoadAppointmentRepository) => (query: Query) => {
        return loadAppointmentRepository.loadAppointment(query);
    };

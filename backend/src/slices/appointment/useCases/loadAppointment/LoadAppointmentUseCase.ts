import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { LoadAppointmentRepository } from "@/slices/appointment/repositories";

export type LoadAppointment = (query: Query) => Promise<AppointmentData | null>;

export type loadAppointmentSignature = (
    loadAppointment: LoadAppointmentRepository,
) => LoadAppointment;

export const loadAppointment: loadAppointmentSignature =
    (loadAppointmentRepository: LoadAppointmentRepository) => (query: Query) => {
        return loadAppointmentRepository.loadAppointment(query);
    };

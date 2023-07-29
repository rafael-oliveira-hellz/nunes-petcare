import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { UpdateAppointmentRepository } from "@/slices/appointment/repositories";

export type UpdateAppointment = (
    query: Query,
    data: AppointmentData,
) => Promise<AppointmentData | null>;

export type updateAppointmentSignature = (
    updateAppointment: UpdateAppointmentRepository,
) => UpdateAppointment;

export const updateAppointment: updateAppointmentSignature =
    (updateAppointment: UpdateAppointmentRepository) => (query: Query, data: AppointmentData) => {
        return updateAppointment.updateAppointment(query, data);
    };

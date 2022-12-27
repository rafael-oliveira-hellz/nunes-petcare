import { Query } from "@/application/@types";
import { AppointmentData } from "@/slices/appointment/entities";
import { UpdateAppointmentRepository } from "@/slices/appointment/repositories";

export type updateAppointment = (query: Query, data: AppointmentData) => Promise<AppointmentData | null>;

export type updateAppointmentSignature = (
    updateAppointment: UpdateAppointmentRepository
) => updateAppointment;

export const updateAppointmentUsecase: updateAppointmentSignature =
    (updateAppointment: UpdateAppointmentRepository) => (query: Query, data: AppointmentData) => {
        return updateAppointment.updateAppointment(query, data);
    };

import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { DeleteAppointmentRepository } from "@/slices/appointment/repositories";

export type deleteAppointment = (query: Query) => Promise<AppointmentData | null>;

export type deleteAppointmentSignature = (
    deleteAppointment: DeleteAppointmentRepository,
) => deleteAppointment;

export const deleteAppointmentUsecase: deleteAppointmentSignature =
    (deleteAppointment: DeleteAppointmentRepository) => (query: Query) => {
        return deleteAppointment.deleteAppointment(query);
    };

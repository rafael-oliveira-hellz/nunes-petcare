import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { DeleteAppointmentRepository } from "@/slices/appointment/repositories";

export type DeleteAppointment = (query: Query) => Promise<AppointmentData | null>;

export type deleteAppointmentSignature = (
    deleteAppointment: DeleteAppointmentRepository,
) => DeleteAppointment;

export const deleteAppointment: deleteAppointmentSignature =
    (deleteAppointment: DeleteAppointmentRepository) => (query: Query) => {
        return deleteAppointment.deleteAppointment(query);
    };

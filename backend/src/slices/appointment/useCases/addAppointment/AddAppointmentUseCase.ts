import { AppointmentData, AppointmentEntity } from "@/slices/appointment/entities";
import { AddAppointmentRepository } from "@/slices/appointment/repositories";

export type AddAppointment = (data: AppointmentData) => Promise<AppointmentEntity | null>;

export type addAppointmentSignature = (addAppointment: AddAppointmentRepository) => AddAppointment;

export const addAppointment: addAppointmentSignature =
    (addAppointment: AddAppointmentRepository) => (data: AppointmentData) => {
        return addAppointment.addAppointment(new AppointmentEntity(data));
    };

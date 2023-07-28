import { AppointmentData, AppointmentEntity } from "@/slices/appointment/entities";
import { AddAppointmentRepository } from "@/slices/appointment/repositories";

export type addAppointment = (data: AppointmentData) => Promise<AppointmentEntity | null>;

export type addAppointmentSignature = (
    addAppointment: AddAppointmentRepository,
) => addAppointment;

export const addAppointmentUsecase: addAppointmentSignature =
    (addAppointment: AddAppointmentRepository) => (data: AppointmentData) => {
        return addAppointment.addAppointment(new AppointmentEntity(data));
    };

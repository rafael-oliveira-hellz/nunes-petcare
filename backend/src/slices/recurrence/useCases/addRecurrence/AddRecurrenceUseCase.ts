import { RecurrenceData, RecurrenceEntity } from "@/slices/recurrence/entities";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";

export type addRecurrence = (data: RecurrenceData) => Promise<RecurrenceEntity | null>;

export type addRecurrenceSignature = (
    addRecurrence: AddRecurrenceRepository,
) => addRecurrence;

export const addRecurrenceUsecase: addRecurrenceSignature =
    (addRecurrence: AddRecurrenceRepository) => (data: RecurrenceData) => {
        return addRecurrence.addRecurrence(new RecurrenceEntity(data));
    };

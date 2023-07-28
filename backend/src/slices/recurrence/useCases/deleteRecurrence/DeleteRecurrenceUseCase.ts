import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { DeleteRecurrenceRepository } from "@/slices/recurrence/repositories";

export type deleteRecurrence = (query: Query) => Promise<RecurrenceData | null>;

export type deleteRecurrenceSignature = (
    deleteRecurrence: DeleteRecurrenceRepository,
) => deleteRecurrence;

export const deleteRecurrenceUsecase: deleteRecurrenceSignature =
    (deleteRecurrence: DeleteRecurrenceRepository) => (query: Query) => {
        return deleteRecurrence.deleteRecurrence(query);
    };

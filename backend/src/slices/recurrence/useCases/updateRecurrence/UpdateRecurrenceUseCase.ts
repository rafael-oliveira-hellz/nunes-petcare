import { Query } from "@/application/@types";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { UpdateRecurrenceRepository } from "@/slices/recurrence/repositories";

export type updateRecurrence = (query: Query, data: RecurrenceData) => Promise<RecurrenceData | null>;

export type updateRecurrenceSignature = (
    updateRecurrence: UpdateRecurrenceRepository
) => updateRecurrence;

export const updateRecurrenceUsecase: updateRecurrenceSignature =
    (updateRecurrence: UpdateRecurrenceRepository) => (query: Query, data: RecurrenceData) => {
        return updateRecurrence.updateRecurrence(query, data);
    };

import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { LoadRecurrenceRepository } from "@/slices/recurrence/repositories";

export type loadRecurrence = (query: Query) => Promise<RecurrenceData | null>;

export type loadRecurrenceSignature = (loadRecurrence: LoadRecurrenceRepository) => loadRecurrence;

export const loadRecurrenceUsecase: loadRecurrenceSignature =
    (loadRecurrenceRepository: LoadRecurrenceRepository) => (query: Query) => {
        return loadRecurrenceRepository.loadRecurrence(query);
    };

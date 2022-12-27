import { Query } from "@/application/@types";
import { RecurrencePaginatedData } from "@/slices/recurrence/entities";
import { LoadRecurrenceByPageRepository } from "@/slices/recurrence/repositories";

export type loadRecurrenceByPage = (query: Query) => Promise<RecurrencePaginatedData | null>;

export type loadRecurrenceByPageSignature = (
    loadRecurrenceByPage: LoadRecurrenceByPageRepository
) => loadRecurrenceByPage;

export const loadRecurrenceByPageUsecase: loadRecurrenceByPageSignature =
    (loadRecurrenceByPageRepository: LoadRecurrenceByPageRepository) => (query: Query) => {
        return loadRecurrenceByPageRepository.loadByPage(query);
    };

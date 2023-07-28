import { Query } from "@/application/types";
import { RecurrencePaginatedData } from "@/slices/recurrence/entities";

export interface LoadRecurrenceByPageRepository {
    loadByPage(query: Query): Promise<RecurrencePaginatedData | null>;
}

import { utcToZonedTime as utcToZonedTimeDateFns } from "date-fns-tz";
import {
    addDays as addDaysDateFns,
    isToday as isTodayDateFns,
    subMinutes as subMinutesDateFns,
    getDay as getDayDateFns,
    addMinutes as addMinutesDateFns,
    isPast as isPastDateFns,
    addHours as addHoursDateFns,
    eachHourOfInterval as eachHourOfIntervalDateFns,
    eachMinuteOfInterval as eachMinuteOfIntervalDateFns,
    eachQuarterOfInterval as eachQuarterOfIntervalDateFns,
    intervalToDuration as intervalToDurationDateFns,
    areIntervalsOverlapping as areIntervalsOverlappingDateFns,
    setMinutes as setMinutesDateFns,
    setHours as setHoursDateFns,
    endOfDay as endOfDayDateFns,
    startOfDay as startOfDayDateFns,
    add as addDateFns,
    formatISO as formatISODateFns,
    isAfter as isAfterDateFns,
    parseISO as parseISODateFns,
    toDate as toDateDateFns,
    differenceInMinutes as differenceInMinutesDateFns,
    setMilliseconds as setMiliDateFns,
    setSeconds as setSecondsDateFns,
    isBefore as isBeforeDateFns,
    differenceInDays as differenceInDaysDateFns,
    subDays as subDaysDateFns,
} from "date-fns";

type Options = {
    step?: number;
};

type Duration = {
    year?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

export const addDays = (date: number | Date, amount: number): string => {
    return addDaysDateFns(date, amount)?.toISOString?.();
};
export const addMinutes = (date: number | Date, amount: number): string => {
    return addMinutesDateFns(date, amount)?.toISOString?.();
};
export const addHours = (date: number | Date, amount: number): string => {
    return addHoursDateFns(date, amount)?.toISOString?.();
};
export const isPast = (date: number | Date): boolean => {
    return isPastDateFns(date);
};

export const startOfDay = (date: number | Date): Date => startOfDayDateFns(date);
export const endOfDay = (date: number | Date): Date => endOfDayDateFns(date);

export const isBeforeToday = (date: number | Date): boolean => {
    return isBeforeDateFns(date, startOfDayDateFns(new Date()));
};

export const formatISO = (date: number | Date): string => formatISODateFns(date);
export const parseISO = (date: string): Date => parseISODateFns(date);

export const intervalDuration = (start: number | Date, end: number | Date): Duration => {
    return intervalToDurationDateFns({ start, end });
};
export const addDuration = (duration: Duration, date: number | Date): Date => {
    return addDateFns(date, duration);
};

export const intervalsOverlapping = (
    started1: any,
    ended1: any,
    started2: any,
    ended2: any,
): boolean => {
    const start1Aux: Date = started1?.getMonth ? started1 : parseISODateFns(started1);
    const start2Aux: Date = started2?.getMonth ? started2 : parseISODateFns(started2);
    const end1Aux: Date = ended1?.getMonth ? ended1 : parseISODateFns(ended1);
    const end2Aux: Date = ended2?.getMonth ? ended2 : parseISODateFns(ended2);
    if (
        start2Aux.getTime() > start1Aux.getTime() ||
        start1Aux.getTime() > end1Aux.getTime() ||
        start2Aux.getTime() > end2Aux.getTime() ||
        end1Aux.getTime() > end2Aux.getTime() ||
        end1Aux.getTime() < start2Aux.getTime()
    ) {
        return false;
    }
    return areIntervalsOverlappingDateFns(
        { start: start1Aux, end: end1Aux },
        { start: start2Aux, end: end2Aux },
    );
};

export const eachHourInterval = (
    start: number | Date,
    end: number | Date,
    options: Options,
): Date[] => {
    return eachHourOfIntervalDateFns({ start, end }, options);
};

export const eachMinuteOfInterval = (
    start: number | Date,
    end: number | Date,
    options: Options,
): Date[] => {
    return eachMinuteOfIntervalDateFns({ start, end }, options);
};

export const eachQuarterOfInterval = (start: number | Date, end: number | Date): Date[] => {
    return eachQuarterOfIntervalDateFns({ start, end });
};

export const setMinutes = (date: number | Date, minutes: number): Date => {
    return setMinutesDateFns(date, minutes);
};
export const setHours = (date: number | Date, hours: number): Date => {
    return setHoursDateFns(date, hours);
};
export const setSeconds = (date: number | Date, hours: number): Date => {
    return setSecondsDateFns(date, hours);
};
export const setMili = (date: number | Date, hours: number): Date => {
    return setMiliDateFns(date, hours);
};
export const differenceInMinutes = (date: number | Date, date2: number | Date): number => {
    return differenceInMinutesDateFns(date, date2);
};
export const differenceInDays = (date: number | Date, date2: number | Date): number => {
    return differenceInDaysDateFns(date, date2);
};

export const dayOfWeek = (date: number | Date): string => {
    const result = getDayDateFns(date);
    switch (result) {
        case 0:
            return "domingo";
        case 1:
            return "segunda-feira";
        case 2:
            return "terça-feira";
        case 3:
            return "quarta-feira";
        case 4:
            return "quinta-feira";
        case 5:
            return "sexta-feira";
        case 6:
            return "sábado";
    }
};

export const subMinutes = (date: number | Date, minutes: number): Date => {
    return subMinutesDateFns(date, minutes);
};
export const subDays = (date: number | Date, days: number): Date => {
    return subDaysDateFns(date, days);
};

export const isAfter = (date: number | Date, date2: number | Date): boolean => {
    return isAfterDateFns(date, date2);
};

export const isToday = (date: number | Date): boolean => {
    return isTodayDateFns(date);
};

export const cloneDate = (date: number | Date): Date => {
    return toDateDateFns(date);
};

export const isBefore = (date: number | Date, date2: number | Date): boolean => {
    return isBeforeDateFns(date, date2);
};

export const dealWithTimezone = (date: number | Date): Date => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return utcToZonedTimeDateFns(date, timezone);
};

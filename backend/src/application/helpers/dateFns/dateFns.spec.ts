import {
    addDays,
    addMinutes,
    addHours,
    isPast,
    isBeforeToday,
    intervalDuration,
    addDuration,
    formatISO,
    startOfDay,
    parseISO,
    intervalsOverlapping,
    eachHourInterval,
    eachMinuteOfInterval,
    eachQuarterOfInterval,
    setMinutes,
    setHours,
    setMili,
    setSeconds,
    differenceInMinutes,
    differenceInDays,
    endOfDay,
    dayOfWeek,
    subMinutes,
    subDays,
    isAfter,
    cloneDate,
    isBefore,
    dealWithTimezone,
    isToday,
} from "./dateFns";
import MockDate from "mockdate";

describe("dateFns functions", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    it("should return added days when i call addDays", () => {
        expect(addDays(new Date(2021, 9, 12), 1)).toBe(
            new Date(2021, 9, 13).toISOString(),
        );
    });

    it("should return added minutes when i call addMinutes", () => {
        expect(addMinutes(new Date(2021, 9, 12, 10, 20), 10)).toBe(
            new Date(2021, 9, 12, 10, 30).toISOString(),
        );
    });

    it("should return added hours when i call addHours", () => {
        expect(addHours(new Date(2021, 9, 12, 1, 30), 10)).toBe(
            new Date(2021, 9, 12, 11, 30).toISOString(),
        );
    });

    it("should return if is past when i call isPast", () => {
        expect(isPast(new Date(2021, 9, 12, 10, 20))).toBe(true);
    });

    it("should return if isBeforeToday when i call isBeforeToday", () => {
        expect(isBeforeToday(new Date(2021, 9, 12, 10, 20))).toBe(true);
    });

    test("intervalDuration function", () => {
        expect(intervalDuration(new Date(2021, 9, 14), new Date(2021, 9, 15))).toEqual({
            days: 1,
            hours: 0,
            minutes: 0,
            months: 0,
            years: 0,
            seconds: 0,
        });
    });

    test("addDuration function", () => {
        const duration = intervalDuration(new Date(2021, 9, 14), new Date(2021, 9, 15));
        const dateTest = formatISO(addDuration(duration, new Date(2021, 9, 14)));
        expect(dateTest).toBe("2021-10-15T00:00:00-03:00");
    });

    test("startOfDay function", () => {
        const todayParseISO = parseISO(
            formatISO(new Date().setHours(3, 0, 0, 0)).replace("-03:00", "") + ".000Z",
        );
        const dateTest = startOfDay(new Date());
        expect(dateTest).toEqual(todayParseISO);
    });

    test("intervalsOverlapping function", () => {
        expect(
            intervalsOverlapping(
                parseISO(formatISO(new Date(2021, 9, 11))),
                parseISO(formatISO(new Date(2021, 9, 12))),
                parseISO(formatISO(new Date(2021, 8, 10))),
                parseISO(formatISO(new Date(2021, 10, 10))),
            ),
        ).toBe(true);
    });

    test("intervalsOverlapping function first if", () => {
        expect(
            intervalsOverlapping(
                parseISO(formatISO(new Date(2022, 2, 11))),
                parseISO(formatISO(new Date(2021, 9, 12))),
                parseISO(formatISO(new Date(2021, 8, 10))),
                parseISO(formatISO(new Date(2021, 10, 10))),
            ),
        ).toBe(false);
    });

    test("intervalsOverlapping function in ISO Format", () => {
        expect(
            intervalsOverlapping(
                formatISO(new Date(2021, 9, 11)),
                formatISO(new Date(2021, 9, 12)),
                formatISO(new Date(2021, 8, 10)),
                formatISO(new Date(2021, 10, 10)),
            ),
        ).toBe(true);
    });

    test("eachHourInterval function in ISO Format", () => {
        const dateTest = eachHourInterval(new Date(2021, 9, 11), new Date(2021, 9, 14), {
            step: 1,
        });
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(73);
    });

    test("eachMinuteOfInterval function with step 39 minutes", () => {
        const startDate = new Date(2021, 9, 11);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: 39,
        };

        const dateTest = eachMinuteOfInterval(startDate, endDate, options);

        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(37);
    });

    test("eachMinuteOfInterval function with step -1 minute", () => {
        const startDate = new Date(2021, 9, 11);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: -1,
        };

        expect(() => eachMinuteOfInterval(startDate, endDate, options)).toThrowError(
            "`options.step` must be a number equal to or greater than 1",
        );
    });

    test("eachMinuteOfInterval function with start greater than end", () => {
        const startDate = new Date(2021, 9, 13);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: 10,
        };

        expect(() => eachMinuteOfInterval(startDate, endDate, options)).toThrowError(
            "Invalid interval",
        );
    });

    test("eachMinuteOfInterval function with step 122 minutes", () => {
        const startDate = new Date(2021, 9, 11);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: 122,
        };

        const dateTest = eachMinuteOfInterval(startDate, endDate, options);

        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(12);
    });

    test("eachMinuteOfInterval function with step 119 minutes", () => {
        const startDate = new Date(2021, 9, 11);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: 119,
        };

        const dateTest = eachMinuteOfInterval(startDate, endDate, options);

        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(13);
    });

    test("eachMinuteOfInterval function with step 359 minutes", () => {
        const startDate = new Date(2021, 9, 11);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: 359,
        };

        const dateTest = eachMinuteOfInterval(startDate, endDate, options);

        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(5);
    });

    test("eachMinuteOfInterval function with step 479 minutes", () => {
        const startDate = new Date(2021, 9, 11);
        const endDate = new Date(2021, 9, 12);
        const options = {
            step: 479,
        };

        const dateTest = eachMinuteOfInterval(startDate, endDate, options);

        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(4);
    });

    test("eachQuarterOfInterval function with valid dates", () => {
        const startDate = new Date(2021, 0, 1);
        const endDate = new Date(2021, 11, 31);

        const result = eachQuarterOfInterval(startDate, endDate);
        expect(result).toEqual([
            new Date(2021, 0, 1),
            new Date(2021, 3, 1),
            new Date(2021, 6, 1),
            new Date(2021, 9, 1),
        ]);
    });

    test("eachQuarterOfInterval function with start greater than end", () => {
        const startDate = new Date(2022, 0, 1);
        const endDate = new Date(2021, 11, 31);

        expect(() => eachQuarterOfInterval(startDate, endDate)).toThrowError(
            "Invalid interval",
        );
    });

    test("eachQuarterOfInterval function with same start and end dates", () => {
        const startDate = new Date(2021, 5, 15);
        const endDate = new Date(2021, 5, 15);

        const result = eachQuarterOfInterval(startDate, endDate);
        expect(result).toEqual([new Date(2021, 3, 1)]);
    });

    test("eachQuarterOfInterval function with step 1 quarter", () => {
        const startDate = new Date(2020, 0, 1);
        const endDate = new Date(2023, 11, 31);

        const result = eachQuarterOfInterval(startDate, endDate);

        expect(result.length).toBe(16);
    });

    test("setMinutes function", () => {
        expect(formatISO(setMinutes(new Date(2021, 9, 14), 3))).toBe(
            "2021-10-14T00:03:00-03:00",
        );
    });

    test("setHours function", () => {
        expect(formatISO(setHours(new Date(2021, 9, 14), 3))).toBe(
            "2021-10-14T03:00:00-03:00",
        );
    });

    test("setSeconds function", () => {
        expect(formatISO(setSeconds(new Date(2021, 9, 14), 3))).toBe(
            "2021-10-14T00:00:03-03:00",
        );
    });

    test("setMili function", () => {
        expect(formatISO(setMili(new Date(2021, 9, 14), 3))).toBe(
            "2021-10-14T00:00:00-03:00",
        );
    });

    test("differenceInMinutes function", () => {
        expect(
            differenceInMinutes(
                new Date(2021, 9, 14, 10, 30),
                new Date(2021, 9, 14, 10, 20),
            ),
        ).toBe(10);
    });

    test("differenceInDays function", () => {
        expect(differenceInDays(new Date(2021, 9, 15), new Date(2021, 9, 14))).toBe(1);
    });

    test("endOfDay function", () => {
        expect(endOfDay(new Date(2021, 9, 15))).toStrictEqual(
            new Date("2021-10-16T02:59:59.999Z"),
        );
    });

    test("dayOfWeek function when the day passed is friday", () => {
        expect(dayOfWeek(new Date(2021, 9, 15))).toBe("sexta-feira");
    });

    test("dayOfWeek function when the day passed is saturday", () => {
        expect(dayOfWeek(new Date(2021, 9, 16))).toBe("sábado");
    });

    test("dayOfWeek function when the day passed is sunday", () => {
        expect(dayOfWeek(new Date(2021, 9, 17))).toBe("domingo");
    });

    test("dayOfWeek function when the day passed is monday", () => {
        expect(dayOfWeek(new Date(2021, 9, 18))).toBe("segunda-feira");
    });

    test("dayOfWeek function when the day passed is tuesday", () => {
        expect(dayOfWeek(new Date(2021, 9, 19))).toBe("terça-feira");
    });

    test("dayOfWeek function when the day passed is wednesday", () => {
        expect(dayOfWeek(new Date(2021, 9, 20))).toBe("quarta-feira");
    });

    test("dayOfWeek function when the day passed is thursday", () => {
        expect(dayOfWeek(new Date(2021, 9, 21))).toBe("quinta-feira");
    });

    test("subMinutes function", () => {
        expect(subMinutes(new Date(2021, 9, 21, 10, 30), 10)).toStrictEqual(
            new Date(2021, 9, 21, 10, 20),
        );
    });

    test("subDays function", () => {
        expect(subDays(new Date(2021, 9, 21), 1)).toStrictEqual(new Date(2021, 9, 20));
    });

    test("isAfter function", () => {
        expect(isAfter(new Date(2021, 9, 21), new Date(2021, 9, 20))).toBe(true);
    });

    test("isBefore function", () => {
        expect(isBefore(new Date(2021, 9, 21), new Date(2021, 9, 20))).toBe(false);
    });

    test("isToday function", () => {
        expect(isToday(new Date(2021, 9, 21))).toBe(false);
    });

    test("cloneDate function", () => {
        const currentDate = new Date();
        const clonedDate = cloneDate(currentDate);
        currentDate.setMilliseconds(9292);
        expect(clonedDate).toStrictEqual(new Date());
    });

    test("dealWithTimezone function", () => {
        const timezonedDate = formatISO(dealWithTimezone(new Date(2021, 9, 21, 10, 30)));
        expect(timezonedDate).toStrictEqual("2021-10-21T10:30:00-03:00");
    });
});

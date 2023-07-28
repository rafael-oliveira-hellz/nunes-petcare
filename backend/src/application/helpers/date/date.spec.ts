import MockDate from "mockdate";
import { getHoursObject, GetHoursObjectInput } from "./date";

describe("date tests business rules", () => {
    let mockHoursObject: GetHoursObjectInput;

    beforeAll(async () => {
        MockDate.set(new Date());
        mockHoursObject = {
            hourStartOne: "8:00",
            hourEndOne: "18:00",
            hourLunchEndOne: "13:00",
            hourLunchStartOne: "12:00",
            hourStartTwo: "8:00",
            hourEndTwo: "18:00",
            hourLunchEndTwo: "13:00",
            hourLunchStartTwo: "12:00",
            hourStartThree: "8:00",
            hourEndThree: "18:00",
            hourLunchEndThree: "13:00",
            hourLunchStartThree: "12:00",
            daysOne: {
                monday1: true,
                sunday1: false,
                tuesday1: true,
                thursday1: true,
                friday1: true,
                wednesday1: false,
                saturday1: false,
            },
            daysTwo: {
                monday2: false,
                sunday2: false,
                tuesday2: false,
                thursday2: false,
                friday2: false,
                wednesday2: true,
                saturday2: false,
            },
            daysThree: {
                monday3: false,
                sunday3: false,
                tuesday3: false,
                thursday3: false,
                friday3: false,
                wednesday3: false,
                saturday3: true,
            },
            dayOfWeek1: "monday1",
            dayOfWeek2: "monday2",
            dayOfWeek3: "monday3",
        };
    });

    afterAll(async () => {
        MockDate.reset();
    });

    test("getHoursObject function when dayOfWeek matches in days1", async () => {
        expect(getHoursObject(mockHoursObject)).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });

    test("getHoursObject function when dayOfWeek matches in days2", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "wednesday1",
                dayOfWeek2: "wednesday2",
                dayOfWeek3: "wednesday3",
            }),
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });

    test("getHoursObject function when dayOfWeek matches in days3", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
            }),
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });

    test("getHoursObject function when dayOfWeek matches in daysThree", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
            }),
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });

    test("getHoursObject function when dayOfWeek matches in days3 without hourLunch", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
                hourLunchStartThree: "",
                hourLunchEndThree: "",
            }),
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: [""],
            hourLunchStart: [""],
        });
    });

    test("getHoursObject function when dayOfWeek matches in days3 with hourLunch null", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
                hourLunchStartThree: null,
                hourLunchEndThree: null,
            }),
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: undefined,
            hourLunchStart: undefined,
        });
    });

    test("getHoursObject function when function receives null", async () => {
        expect(getHoursObject(null as any)).toEqual({
            hourStart: [],
            hourLunchStart: [],
            hourEnd: [],
            hourLunchEnd: [],
        });
    });

    test("getHoursObject function when dayOfWeek matches nobody", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "sunday1",
                dayOfWeek2: "sunday2",
                dayOfWeek3: "sunday3",
            }),
        ).toEqual({
            hourStart: [],
            hourEnd: [],
            hourLunchEnd: [],
            hourLunchStart: [],
        });
    });
});

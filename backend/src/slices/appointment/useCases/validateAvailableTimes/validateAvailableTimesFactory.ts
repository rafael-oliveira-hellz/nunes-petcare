import { makeLoadAvailableTimesFactory } from "../loadAvailableTimes/LoadAvailableTimesFactory";
import { ValidateAvailableTimes, validateAvailableTimes } from "./validateAvailableTimes";

export const makeValidateAvailableTimesFactory = (): ValidateAvailableTimes => {
    return validateAvailableTimes(makeLoadAvailableTimesFactory());
};

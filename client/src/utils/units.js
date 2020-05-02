import { UNITS } from "../types";
import { getDuration } from "./duration";
import { getRandomEl } from "./random";

const unitTypeToSecondsPerRepMap = {
  [UNITS.Meters]: "metersPerRep",
  [UNITS.Calories]: "caloriesPerRep",
};

const secondsPerRepMap = {
  caloriesPerRep: "secondsPerCalorieRep",
  metersPerRep: "secondsPerMeterRep",
};

const toRangeWithStep = (array, step = 1) => {
  const [start, stop] = array;
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((n, i) => n + i * step);
};

const getUnitsByDuration = (movement, minutes) => {
  const duration = getDuration(minutes);
  return toUnits(movement, duration);
};

const toUnits = (movement, duration) => {
  const unit = getRandomEl(Object.keys(movement.units));
  const unitObj = movement.units[unit];
  const unitRangeByDuration = unitObj[duration];
  const randomUnit = getRandomEl(
    toRangeWithStep(unitRangeByDuration, unit.step)
  );
  const roundedUnit = Math.ceil(randomUnit / 10) * 10;

  const timeTakenInSeconds = roundedUnit * unitObj.secondsPerRep;
  return {
    unit,
    units: roundedUnit,
    timeTakenInSeconds,
    formattedUnit: `${roundedUnit} ${unit}`,
  };
};

export { getUnitsByDuration };

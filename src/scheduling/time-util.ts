import { DAYS } from "../data/events/timestamps";
import type { Days, Quarter } from "../data/events/timestamps";

const amountOfSegments = (8 + 24 + 23) * 4 + 1;
const startHours = 12;

export const getAllTimestampSegments = () => {
  return Array.from(Array(amountOfSegments).keys()).map((index) => {
    const [day, hours, quarters] = toTimestamp(index);
    return { day, hours, quarters, index };
  });
};

const toTimestamp = (i: number): [Days, number, Quarter] => {
  const quarters = ((i % 4) * 15) as Quarter;
  const hours = (startHours + Math.floor(i / 4)) % 24;
  const day = Math.floor((startHours + Math.floor(i / 4)) / 24);
  return [DAYS[day], hours, quarters];
};

/**
 * Whether a given hours and minutes should be shown on the table. False if between 4 and 11 AM (both exclusive)
 * @returns True if it should be visible, false otherwise
 */
export const isVisibleTimestamp = (hours: number, quarters: Quarter) => {
  return (hours === 4 && quarters === 0) || hours < 4 || hours >= 9;
};

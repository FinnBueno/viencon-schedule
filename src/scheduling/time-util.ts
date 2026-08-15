import { DAYS } from "../data/events/timestamps";
import type { Days, Quarter, Timestamp } from "../data/events/timestamps";

const amountOfSegments = (8 + 24 + 23) * 4 + 17;
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

/**
 * Returns -1 if A is older than B
 * Returns 1 if B is older than A
 * Returns 0 if equal
 */
export const compareTimestamps = (a: Timestamp, b: Timestamp): -1 | 0 | 1 => {
  const aNumeric = toNumericTimestamp(a);
  const bNumeric = toNumericTimestamp(b);
  if (aNumeric < bNumeric) return -1;
  if (bNumeric < aNumeric) return 1;
  return 0;
}

export const toNumericTimestamp = (a: Timestamp): number => {
  let value = 0;
  switch (a.day) {
    case "FRIDAY": value = 10000; break;
    case "SATURDAY": value = 20000; break;
    case "SUNDAY": value = 30000; break;
  }
  value += a.hours * 100;
  value += a.minutes;
  return value;
}

export const writeTimestamp = (ts: Timestamp) => {
  return `${ts.day}-${ts.hours}-${ts.minutes}`;
}
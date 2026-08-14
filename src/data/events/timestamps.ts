import type { Location } from "../locations";

export const friday = (hours: number, minutes: Quarter = 0): Timestamp => ({
  day: "FRIDAY",
  hours,
  minutes,
});

export const saturday = (hours: number, minutes: Quarter = 0): Timestamp => ({
  day: "SATURDAY",
  hours,
  minutes,
});

export const sunday = (hours: number, minutes: Quarter = 0): Timestamp => ({
  day: "SUNDAY",
  hours,
  minutes,
});

export type Days = "FRIDAY" | "SATURDAY" | "SUNDAY";

export const DAYS: Days[] = ["FRIDAY", "SATURDAY", "SUNDAY"];

export type Quarter = 0 | 15 | 30 | 45;

export type Timestamp = {
  day: Days;
  hours: number;
  minutes: Quarter;
};

type Timespan = {
  from: Timestamp;
  to: Timestamp;
};

export type Event = {
  name: string;
  subtext?: string;
  link?: string;
  location: Location;
  isNegative?: boolean;
  periods: Timespan[];
};

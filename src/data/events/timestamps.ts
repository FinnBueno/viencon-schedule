import type { Location } from "../locations";

export const friday = (hours: number, minutes: Quarter = 0): Omit<Timestamp, 'id'> => ({
  day: "FRIDAY",
  hours,
  minutes,
});

export const saturday = (hours: number, minutes: Quarter = 0): Omit<Timestamp, 'id'> => ({
  day: "SATURDAY",
  hours,
  minutes,
});

export const sunday = (hours: number, minutes: Quarter = 0): Omit<Timestamp, 'id'> => ({
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
  id: string;
};

export type Event = {
  id: string;
  name: string;
  subtext?: string;
  link?: string;
  location: Location;
  isNegative?: boolean;
  periods: {
    from: Timestamp,
    to: Timestamp,
  }[];
};

// used to construct events before automatically assigning IDs
export type EventWithoutIds = Omit<Event, 'id' | 'periods'> & {
  periods: {
    from: Omit<Timestamp, 'id'>
    to: Omit<Timestamp, 'id'>
  }[];
}
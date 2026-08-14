import { compareTimestamps, writeTimestamp } from "../../scheduling/time-util";
import type { Location } from "../locations";
import { FRIDAY_EVENTS } from "./friday";
import { SATURDAY_EVENTS } from "./saturday";
import { SUNDAY_EVENTS } from "./sunday";
import type { Timestamp } from "./timestamps";

export const EVENTS = [...FRIDAY_EVENTS, ...SATURDAY_EVENTS, ...SUNDAY_EVENTS];

const AMOUNT_OF_EVENTS_BY_START_TIMESTAMPS: {[key: string]: string[]} = EVENTS.reduce<{[key: string]: string[]}>((resultMap, currentEvent) => {
  for (const period of currentEvent.periods) {
    const fromTimestamp = `${period.from.day}-${period.from.hours}-${period.from.minutes}`;
    const location = currentEvent.location;
    if (!resultMap[fromTimestamp + location.id]) {
      resultMap[fromTimestamp + location.id] = [];
    }
    resultMap[fromTimestamp + location.id].push(currentEvent.name);
  }
  return resultMap;
}, {} as {[key: string]: string[]});

/**
 * Returns whether a given element should be displayed at a lower point to not hide an
 * event that starts at the same time. This is a limited functionality and only supports
 * showing 2 events at the same time.
 */
export const shouldBeLoweredOnSchedule = (fromTimestamp: string, location: string, name: string): boolean => {
  return AMOUNT_OF_EVENTS_BY_START_TIMESTAMPS[fromTimestamp + location].indexOf(name) > 0;
}

/**
 * Returns the next timespan occuring on the same exact row as the given timestamp.
 * Does not return timestamps starting at exactly the same time.
 */
export const findNextTimestampOnSameRow = (timestamp: Timestamp, location: Location, log?: boolean): Timestamp | undefined => {
  if (log) console.log(timestamp);
  const upcomingTimestamps: Timestamp[] = [];
  for (const event of EVENTS) {
    if (event.location.id !== location.id || (event.location.subroom ?? {})[location.id] !== undefined) continue;

    if (log) {
      console.log(event.name, event.periods.map(pr => `${writeTimestamp(pr.from)}`).join(', '));
    }

    const periodsAfterGivenTimestamp = event.periods.filter(prd => {
      // -1 means timestamp is less (older) than prd.from
      if (log) {
        console.log('Comparing', writeTimestamp(timestamp), 'to', writeTimestamp(prd.from), compareTimestamps(timestamp, prd.from) === -1);
      }
      return compareTimestamps(timestamp, prd.from) === -1;
    })
    if (periodsAfterGivenTimestamp.length === 0) continue;
  
    if (log) console.log('This event has periods that appear after the current one')

    upcomingTimestamps.push(periodsAfterGivenTimestamp[0].from);
  }

  if (upcomingTimestamps.length === 0) return undefined;

  return upcomingTimestamps.sort((a, b) => compareTimestamps(a, b))[0];
}
import { compareTimestamps, toNumericTimestamp } from "../../scheduling/time-util";
import { assignIds } from "../../utils/id-util";
import type { Location } from "../locations";
import { FRIDAY_EVENTS } from "./friday";
import { SATURDAY_EVENTS } from "./saturday";
import { SUNDAY_EVENTS } from "./sunday";
import type { Timestamp } from "./timestamps";

const EVENTS_WITHOUT_IDS = [...FRIDAY_EVENTS, ...SATURDAY_EVENTS, ...SUNDAY_EVENTS];
export const EVENTS = assignIds(EVENTS_WITHOUT_IDS);

/**
 * Returns whether a given element should be displayed at a lower point to not hide an
 * event that starts at the same time. This is a limited functionality and only supports
 * showing 2 events at the same time.
 */
export const shouldBeLoweredOnSchedule = (fromTimestamp: Timestamp, locationId: string, eventId: string): boolean => {
  const numericStartSelf = toNumericTimestamp(fromTimestamp);
  for (const event of EVENTS.filter(e => e.location.id === locationId)) {
    if (event.id === eventId) return false;

    const shouldLowerForThisEvent = !!event.periods.find(prd => {
      const periodStart = toNumericTimestamp(prd.from);
      const periodEnd = toNumericTimestamp(prd.to);
      return periodStart <= numericStartSelf && numericStartSelf < periodEnd;
    });
    if (shouldLowerForThisEvent) return true;
  }
  return false;
}

/**
 * Returns the next timespan occuring on the same exact row as the given timestamp.
 * Does not return timestamps starting at exactly the same time.
 */
export const findNextTimestampOnSameRow = (timestamp: Timestamp, location: Location): Timestamp | undefined => {
  const upcomingTimestamps: Timestamp[] = [];
  for (const event of EVENTS) {
    if (event.location.id !== location.id || (event.location.subroom ?? {})[location.id] !== undefined) continue;

    const periodsAfterGivenTimestamp = event.periods.filter(prd => {
      // -1 means timestamp is less (older) than prd.from
      return compareTimestamps(timestamp, prd.from) === -1;
    })
    if (periodsAfterGivenTimestamp.length === 0) continue;

    upcomingTimestamps.push(periodsAfterGivenTimestamp[0].from);
  }

  if (upcomingTimestamps.length === 0) return undefined;

  return upcomingTimestamps.sort((a, b) => compareTimestamps(a, b))[0];
}
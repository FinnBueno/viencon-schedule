import { FRIDAY_EVENTS } from "./friday";
import { SATURDAY_EVENTS } from "./saturday";
import { SUNDAY_EVENTS } from "./sunday";

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

console.log(AMOUNT_OF_EVENTS_BY_START_TIMESTAMPS);

/**
 * Returns whether a given element should be displayed at a lower point to not hide an
 * event that starts at the same time. This is a limited functionality and only supports
 * showing 2 events at the same time.
 */
export const shouldBeLoweredOnSchedule = (fromTimestamp: string, location: string, name: string): boolean => {
  return AMOUNT_OF_EVENTS_BY_START_TIMESTAMPS[fromTimestamp + location].indexOf(name) > 0;
}
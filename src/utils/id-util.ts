import type { Event, EventWithoutIds } from "../data/events/timestamps";
import hash from 'object-hash';

/**
 * Assigns random unique IDs to events and their various periods so they may be uniquely identified
 * This is used for the search function
 */
export const assignIds = (events: EventWithoutIds[]): Event[] => {
  return events.map((ev) => {
    const eventId = hash(ev);
    return ({
      ...ev,
      id: eventId,
      periods: ev.periods.map((prd) => ({
        from: {
          ...prd.from,
          id: eventId + hash(prd.from),
        },
        to: {
          ...prd.to,
          id: eventId + hash(prd.to),
        },
      })),
    });
  });
};

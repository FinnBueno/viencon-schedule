import { type Days, type Event } from '../data/events/timestamps';

export type EventsByDay = { [key in Days]: Event[] };
export const groupEventsByDay = (events: Event[]): EventsByDay => {
  return events.reduce<EventsByDay>(
    (total, currentEvent) => {
      currentEvent.periods.forEach((period) => {
        total[period.from.day].push({
          ...currentEvent,
          // only keep the periods on this event that match the day we're currently adding to
          periods: currentEvent.periods.filter(
            (p) => p.from.day === period.from.day,
          ),
        });
      });
      return total;
    },
    {
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    } as EventsByDay,
  );
};

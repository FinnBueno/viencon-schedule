import type { FC } from 'react';
import { EVENTS } from '../../../../../data/events';
import { LOCATIONS } from '../../../../../data/locations';
import { groupEventsByDay } from '../../../../../utils/event-util';
import { FromSchedulePinContent } from '../FromSchedulePinContent';
import { timespanToWrittenTime } from '../../../../../utils/datetime-util';

const events = groupEventsByDay(
  EVENTS.filter((event) => {
    return (
      event.location.id === LOCATIONS.HawkArena.id &&
      event.name === 'Ducky Yard Sale'
    );
  }),
);

export const DuckyYardSalePinContent: FC = () => {
  return (
    <FromSchedulePinContent
      events={events}
      transformEventLine={(event, period) =>
        `${event.name}${event.subtext ? ` (${event.subtext})` : ''}: ${timespanToWrittenTime(period)}`
      }
    />
  );
};

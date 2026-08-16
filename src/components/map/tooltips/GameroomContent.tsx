import type { FC } from 'react';
import { EVENTS } from '../../../data/events';
import { LOCATIONS } from '../../../data/locations';
import { groupEventsByDay } from '../../../utils/event-util';
import { timespanToWrittenTime } from '../../../utils/datetime-util';
import { FromSchedulePinContent } from './FromSchedulePinContent';

const events = groupEventsByDay(
  EVENTS.filter((event) => event.location.id === LOCATIONS.GameroomKaraoke.id),
);

export const GameroomKaraokePinContent: FC = () => {
  return (
    <FromSchedulePinContent
      events={events}
      transformEventLine={(event, period) => {
        let eventName = event.name;
        if (eventName === 'Gameroom / Karaoke') eventName = 'Opening Times';
        return `${eventName}: ${timespanToWrittenTime(period)}`;
      }}
    />
  );
};

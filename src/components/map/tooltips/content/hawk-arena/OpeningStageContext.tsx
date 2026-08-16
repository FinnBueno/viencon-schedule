import type { FC } from 'react';
import { EVENTS } from '../../../../../data/events';
import { LOCATIONS } from '../../../../../data/locations';
import { groupEventsByDay } from '../../../../../utils/event-util';
import { FromSchedulePinContent } from '../FromSchedulePinContent';

const events = groupEventsByDay(
  EVENTS.filter((event) => {
    return (
      event.location.id === LOCATIONS.HawkArena.id &&
      (event.name === 'Opening Ceremony' || event.name === 'Ending Ceremony')
    );
  }),
);

export const OpeningStagePinContent: FC = () => {
  return <FromSchedulePinContent events={events} />;
};

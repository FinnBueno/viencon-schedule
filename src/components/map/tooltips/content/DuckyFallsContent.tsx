import type { FC } from 'react';
import { EVENTS } from '../../../../data/events';
import { LOCATIONS } from '../../../../data/locations';
import { groupEventsByDay } from '../../../../utils/event-util';
import { FromSchedulePinContent } from './FromSchedulePinContent';

const events = groupEventsByDay(
  EVENTS.filter((event) => event.location.id === LOCATIONS.DuckyFallsTent.id),
);

export const DuckyFallsPinContent: FC = () => {
  return <FromSchedulePinContent events={events} />;
};

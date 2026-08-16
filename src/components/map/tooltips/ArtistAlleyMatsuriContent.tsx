import type { FC } from 'react';
import { EVENTS } from '../../../data/events';
import { LOCATIONS } from '../../../data/locations';
import { groupEventsByDay } from '../../../utils/event-util';
import { FromSchedulePinContent } from './FromSchedulePinContent';

const events = groupEventsByDay(
  EVENTS.filter((event) => {
    return event.location.id === LOCATIONS.ArtistAlleyMatsuri.id;
  }),
);

export const ArtistAlleyMatsuriPinContent: FC = () => {
  return <FromSchedulePinContent events={events} />;
};

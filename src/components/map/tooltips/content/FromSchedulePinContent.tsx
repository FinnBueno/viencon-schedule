import { Fragment, type FC } from 'react';
import { TooltipContainer } from '../TooltipContainer';
import { TooltipText } from '../TooltipText';
import { TooltipHeader } from '../TooltipHeader';
import { type EventsByDay } from '../../../../utils/event-util';
import { capitalize } from '../../../../utils/string-util';
import { timespanToWrittenTime } from '../../../../utils/datetime-util';
import type { Event } from '../../../../data/events/timestamps';

interface Props {
  events: EventsByDay;
  transformEventLine?: (
    event: Event,
    period: Event['periods'][number],
  ) => string;
}

const defaultTransform: Props['transformEventLine'] = (event, period) =>
  `${event.name}: ${timespanToWrittenTime(period)}`;

/*
 * Takes in events grouped per day and shows them
 */
export const FromSchedulePinContent: FC<Props> = ({
  events,
  transformEventLine = defaultTransform,
}) => {
  return (
    <TooltipContainer>
      {Object.entries(events).map(([dayKey, events]) => (
        <Fragment key={dayKey}>
          <TooltipHeader>{capitalize(dayKey)}</TooltipHeader>
          {events.length === 0 && <TooltipText indent>-</TooltipText>}
          {events.map((event) => (
            <Fragment key={event.id}>
              {event.periods.map((period) => {
                return (
                  <TooltipText indent key={period.from.id}>
                    {transformEventLine(event, period)}
                  </TooltipText>
                );
              })}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </TooltipContainer>
  );
};

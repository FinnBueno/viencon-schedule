import { type FC } from 'react';
import type { Event } from '../../data/events/timestamps';
import styled from '@emotion/styled';
import { shouldBeLoweredOnSchedule } from '../../data/events';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { IconButton } from '../atoms/icon-button';
import { useVienconTheme } from '../../hooks/use-viencon-theme';

const EventBlock = styled.div<{
  from: string;
  to: string;
  rowId: string;
  isNegative: boolean;
  isLowered: boolean;
  showHighlight: boolean;
}>`
  grid-column: ${(props) => `${props.from}-start / ${props.to}-start`};
  grid-row: ${(props) => `${props.rowId}-start / ${props.rowId}-end`};

  outline: 1px solid black;
  margin-left: 1px;

  ${(props) =>
    props.isNegative
      ? `
      background: repeating-linear-gradient(45deg, ${props.theme.color.eventBlock}, ${props.theme.color.eventBlock} 10px, ${props.theme.color.negativeBlock} 10px, ${props.theme.color.negativeBlock} 20px);
    `
      : `
      background-color: ${props.theme.color.eventBlock};
  `}
  border-radius: 8px;

  color: ${(props) => props.theme.color.font.onForeground};

  ${(props) =>
    props.isLowered
      ? `
    height: auto;
    margin-top: 32px;
  `
      : ''}

  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;

  &::after {
    background-color: none;
    transition: background-color 150ms;
    content: '';
    grid-column: ${(props) => `${props.from}-start / ${props.to}-start`};
    grid-row: ${(props) => `${props.rowId}-start / ${props.rowId}-end`};
  }

  transition:
    outline 150ms,
    box-shadow 150ms;

  ${(props) =>
    props.showHighlight
      ? `
    outline: 3px solid #ffd400;
    box-shadow: 0 0 0 3px #ffd400, 0 0 16px 4px rgba(255, 212, 0, 0.8);
  `
      : ''}
`;

const EventContent = styled.div<{
  from: string;
  to: string;
  rowId: string;
}>`
  display: block;

  padding: 6px 8px 8px 8px;

  z-index: 1;
  position: sticky;

  grid-column: ${(props) => `${props.from}-start / ${props.to}-start`};
  grid-row: ${(props) => `${props.rowId}-start / ${props.rowId}-end`};
`;

const EventText = styled.span`
  background-color: ${(props) => props.theme.color.eventBlock};
  border-radius: 4px;

  position: sticky;
  left: 72px;
  top: 0;
  align-self: start;
`;

const TimespanLabel = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 80%;
`;

type Props = {
  timespan: Event['periods'][number];
  event: Event;
  currentHighlight?: string;
};

export const EventItem: FC<Props> = ({ timespan, event, currentHighlight }) => {
  const { getTheme } = useVienconTheme();
  const theme = getTheme();

  const { from, to } = timespan;
  const fromStamp = `${from.day}-${from.hours}-${from.minutes}`;
  const toStamp = `${to.day}-${to.hours}-${to.minutes}`;
  return (
    <EventBlock
      key={from.id}
      id={from.id}
      from={fromStamp}
      to={toStamp}
      rowId={event.location.id}
      isNegative={event.isNegative ?? false}
      isLowered={shouldBeLoweredOnSchedule(from, event.location.id, event.id)}
      showHighlight={from.id === currentHighlight}
    >
      <EventContent from={fromStamp} to={toStamp} rowId={event.location.id}>
        <EventText>
          <b>{event.name}</b>{' '}
          {event.subtext ? <span>({event.subtext}) </span> : null}
          <TimespanLabel>
            {from.hours}:{from.minutes || '00'} - {to.hours}:
            {to.minutes || '00'}
          </TimespanLabel>
          {event.link ? (
            <IconButton
              onClick={() => window.open(event.link, '_blank')}
              style={{ verticalAlign: 'middle' }}
            >
              <RxOpenInNewWindow
                size={20}
                color={theme.color.font.onForeground}
              />
            </IconButton>
          ) : null}
        </EventText>
      </EventContent>
    </EventBlock>
  );
};

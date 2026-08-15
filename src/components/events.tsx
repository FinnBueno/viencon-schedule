import { useEffect, type FC } from 'react';
import { EVENTS, shouldBeLoweredOnSchedule } from '../data/events';
import styled from '@emotion/styled';
import { useSearch } from '../context/SearchContext';
import { GRID_ID } from './grid';

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
    margin-top: 38px;
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
    z-index: 10;
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

  padding: 8px;

  z-index: 1;
  position: sticky;

  grid-column: ${(props) => `${props.from}-start / ${props.to}-start`};
  grid-row: ${(props) => `${props.rowId}-start / ${props.rowId}-end`};
`;

const EventText = styled.span`
  background-color: ${(props) => props.theme.color.eventBlock};
  padding: 2px 4px 4px 4px;
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

export const Events: FC<unknown> = () => {
  const { currentResult } = useSearch();

  useEffect(() => {
    if (!currentResult) return;

    const parent = document.getElementById(GRID_ID);
    const target = document.getElementById(currentResult);
    const parentBounds = parent?.getBoundingClientRect();
    const targetBounds = target?.getBoundingClientRect();
    if (!parent || !target || !parentBounds || !targetBounds) return;

    const offset = targetBounds.left - parentBounds.left - 140;
    parent.scrollBy({ left: offset, behavior: 'smooth' });
  }, [currentResult]);

  return (
    <>
      {EVENTS.map((event) => {
        return event.periods.map((timespan) => {
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
              isLowered={shouldBeLoweredOnSchedule(
                from,
                event.location.id,
                event.id,
              )}
              showHighlight={from.id === currentResult}
            >
              <EventContent
                from={fromStamp}
                to={toStamp}
                rowId={event.location.id}
              >
                <EventText>
                  {event.subtext ? (
                    <>
                      <b>{event.name}</b>&nbsp;<span>({event.subtext})</span>
                      &nbsp;
                      <TimespanLabel>
                        {from.hours}:{from.minutes || '00'} - {to.hours}:
                        {to.minutes || '00'}
                      </TimespanLabel>
                    </>
                  ) : (
                    <>
                      <b>{event.name}</b>&nbsp;
                      <TimespanLabel>
                        {from.hours}:{from.minutes || '00'} - {to.hours}:
                        {to.minutes || '00'}
                      </TimespanLabel>
                    </>
                  )}
                </EventText>
              </EventContent>
            </EventBlock>
          );
        });
      })}
    </>
  );
};

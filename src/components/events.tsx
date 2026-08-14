import type { FC } from "react";
import { EVENTS } from "../data/events";
import styled from "@emotion/styled";

const EventBlock = styled.div<{
  from: string;
  to: string;
  rowId: string;
  isNegative: boolean;
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

  padding: 8px;

  color: ${(props) => props.theme.color.font.onForeground};
`;

const EventText = styled.span`
  background-color: ${(props) => props.theme.color.eventBlock};
  padding: 2px 4px 4px 4px;
  border-radius: 4px;
`;

export const Events: FC<unknown> = () => (
  <>
    {EVENTS.map((event) => {
      return event.periods.map(({ from, to }) => {
        const fromStamp = `${from.day}-${from.hours}-${from.minutes}`;
        const toStamp = `${to.day}-${to.hours}-${to.minutes}`;
        return (
          <EventBlock
            key={event.name + fromStamp + toStamp}
            from={fromStamp}
            to={toStamp}
            rowId={event.location.id}
            isNegative={event.isNegative ?? false}
          >
            <EventText>
              {event.subtext ? (
                <>
                  <b>{event.name}</b> <span>({event.subtext})</span>
                </>
              ) : (
                <b>{event.name}</b>
              )}
            </EventText>
          </EventBlock>
        );
      });
    })}
  </>
);

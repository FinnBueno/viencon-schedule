import styled from '@emotion/styled';
import {
  getAllTimestampSegments,
  isVisibleTimestamp,
} from '../../scheduling/time-util';
import { LogoImage } from '../atoms/logo';
import { Settings } from './settings';

const DayHeader = styled.h2`
  grid-row: start-timestamp / end-timestamp;
  z-index: 2;
  margin: 0;

  position: sticky;
  top: 0;
  align-self: start;
`;

const FridayHeader = styled(DayHeader)`
  grid-column: FRIDAY-12-0-start / SATURDAY-9-0-start;
`;

const SaturdayHeader = styled(DayHeader)`
  grid-column: SATURDAY-9-0-start / SUNDAY-9-0-start;
`;

const SundayHeader = styled(DayHeader)`
  grid-column: SUNDAY-9-0-start / SUNDAY-18-0-end;
`;

const StickyWeekday = styled.span`
  position: sticky;
  left: 4px;
  align-self: start;
`;

const TimestampDisplay = styled.div<{ stamp: string }>`
  grid-column: ${({ stamp }) => `${stamp}-start / ${stamp}-end`};
  grid-row: start-timestamp / end-timestamp;
  font-size: 1.5rem;
  position: sticky;
  top: 0;
  align-self: start;
  & > p {
    margin: 36px 0 0 calc(-50% - 10px);
    bottom: 0;
  }
  background-color: ${(props) => props.theme.color.background};
`;

const LogoPlaceholder = styled.div`
  background-color: ${(props) => props.theme.color.background};

  grid-column: start-header / end-header;
  grid-row: start-timestamp / end-timestamp;

  position: sticky;
  top: 0;
  align-self: start;

  height: 100%;

  display: flex;
  align-items: center;

  padding-left: 8px;
`;

export const TableHeaders = () => {
  return (
    <>
      <LogoPlaceholder>
        <Settings />
        <LogoImage />
      </LogoPlaceholder>
      <FridayHeader>
        <StickyWeekday>Friday</StickyWeekday>
      </FridayHeader>
      <SaturdayHeader>
        <StickyWeekday>Saturday</StickyWeekday>
      </SaturdayHeader>
      <SundayHeader>
        <StickyWeekday>Sunday</StickyWeekday>
      </SundayHeader>
      {getAllTimestampSegments().map(({ day, hours, quarters }) => {
        const stamp = `${day}-${hours}-${quarters}`;
        if (quarters % 30 === 15) return null;
        return (
          <TimestampDisplay
            key={stamp}
            stamp={stamp}
            style={{
              overflow: isVisibleTimestamp(hours, quarters)
                ? 'visible'
                : 'hidden',
            }}
          >
            <p>
              {hours}:{quarters || '00'}
            </p>
          </TimestampDisplay>
        );
      })}
    </>
  );
};

import styled from '@emotion/styled';
import { Fragment, useRef, type FC, type ReactNode } from 'react';
import { ALL_LOCATIONS } from '../../data/locations';
import {
  getAllTimestampSegments,
  isVisibleTimestamp,
} from '../../scheduling/time-util';
import { getAllLocationOptions } from '../../scheduling/location-util';
import { useHorizontalSrollPosition } from '../../hooks/use-horizontal-scroll';
import { LocationRow } from './location';

const segmentSpace = '52px';

/**
 * Generates the column setup for the grid.
 * The columns are setup to allow easy positioning depending on an events timing.
 * There are markers at each quarter in time, with each quarter having a start and end marker.
 * A marker is named <day>-<hours>-<minutes>-start and <day>-<hours>-<quarters>-end.
 * The start line of a given quarter is equal to the end line of the quarter before it.
 * The end line of a given quarter is thus also equal to the start line of the quarter after it.
 * The column width is equal to the variable 'segmentSpace', except if the column is between 4 and 11 AM (exclusive). If they are, their width is set to 0.
 * The columns are prepended with an extra column for showing the room names, which is marked by marker lines named 'start-header' and 'end-header' and has a width of min-content.
 * In it's totality, it'll look something like this (with certain times ommitted for readability):
 * [start-header] min-content [end-header FRIDAY-16-0-start] segmentSpace [FRIDAY-16-0-end FRIDAY-16-15-start] segmentSpace [FRIDAY-16-15-end FRIDAY-4-15-start] 0px [FRIDAY-4-15-end]
 * @returns The CSS value for 'grid-template-columns' for the schedule grid
 */
const getColumnTemplate = () => {
  let columnTemplate = '[start-header] 148px [end-header ';
  const allSegments = getAllTimestampSegments();
  for (const { day, hours, quarters, index } of allSegments) {
    const stamp = `${day}-${hours}-${quarters}`;
    const space = isVisibleTimestamp(hours, quarters) ? segmentSpace : '0px';
    columnTemplate += `${stamp}-start] ${space} [${stamp}-end`;
    if (index != allSegments.length - 1) {
      columnTemplate += ' ';
    }
  }
  return columnTemplate + ' end-of-table]';
};

/**
 * Generates the row setup for the grid.
 * The rows are setup to allow easy positioning depending on an events location.
 * There are start and end markers defined for each major room, as well as its subrooms.
 * A marker is named <room id>-start and <room id>-end.
 * The start line of a room is equal to the start line of its first subroom, and its end line is equal to the end line of its last subroom. Thus, if you'd have room A with subrooms B and C, spanning from A-start to A-end would be equal to spanning from B-start to C-end.
 * The row column is prepended with an extra row to target the timestamp row at the top.
 * All width is defined as 'min-content'.
 * In its totality, it'll look something like this:
 * [start-timestamp] min-content [end-timestamp a-start b-start] min-content [b-end c-start] min-content [c-end a-end]
 * @returns The CSS value for 'grid-template-rows' for the schedule grid
 */
const getRowTemplate = () => {
  let rowTemplate = '[start-timestamp] min-content [end-timestamp ';
  ALL_LOCATIONS.forEach((location, index) => {
    if (location.subroom) {
      const subroomKeys = Object.keys(location.subroom);
      subroomKeys.forEach((key, index) => {
        if (index === 0) {
          rowTemplate += `${location.id}-start `;
        }
        rowTemplate += `${key}-start] 84px [${key}-end`;
        if (index !== subroomKeys.length - 1) {
          rowTemplate += ' ';
        } else {
          rowTemplate += ` ${location.id}-end `;
        }
      });
    } else {
      rowTemplate += `${location.id}-start] 84px [${location.id}-end`;
      if (index !== ALL_LOCATIONS.length - 1) {
        rowTemplate += ' ';
      }
    }
  });
  return rowTemplate + ']';
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${getColumnTemplate()};
  grid-template-rows: ${getRowTemplate()};
  row-gap: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100vw;
  padding-bottom: 12px;
`;

const GridBorder = styled.div<{
  stamp: string;
  rowId: string;
  isDark: boolean;
}>`
  border-color: ${(props) => (props.isDark ? props.theme.color.grid.softBorder : props.theme.color.grid.hardBorder)};
  border-style: solid;
  border-width: 0 0 0 1px;
  height: calc(100% + 8px);
  grid-column: ${(props) => `${props.stamp}-start / ${props.stamp}-end`};
  grid-row: ${(props) => `${props.rowId}-start / ${props.rowId}-end`};
`;

export const GRID_ID = 'grid';

export const ScheduleGrid: FC<{ children: ReactNode }> = ({ children }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useHorizontalSrollPosition(gridRef);
  return (
    <Grid id={GRID_ID} ref={gridRef}>
      {getAllLocationOptions().map((loc) => (
        <Fragment key={loc.id}>
          <GridBordersOnRow rowId={loc.id} />
          <LocationRow scrollPosition={scrollPosition} loc={loc} />
        </Fragment>
      ))}
      {children}
    </Grid>
  );
};

const GridBordersOnRow: FC<{ rowId: string }> = ({ rowId }) => (
  <>
    {getAllTimestampSegments().map(({ day, hours, quarters }) => {
      const stamp = `${day}-${hours}-${quarters}`;
      return (
        <GridBorder
          key={stamp}
          stamp={stamp}
          rowId={rowId}
          isDark={quarters % 30 === 15}
        />
      );
    })}
  </>
);

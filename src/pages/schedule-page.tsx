import type { FC } from 'react';
import { Events } from '../components/schedule/events';
import { ScheduleGrid } from '../components/schedule/grid';
import { TableHeaders } from '../components/schedule/header';
import { SearchMenu } from '../components/schedule/search';

export const SchedulePage: FC = () => (
  <>
    <SearchMenu />
    <ScheduleGrid>
      <TableHeaders />
      <Events />
    </ScheduleGrid>
  </>
);

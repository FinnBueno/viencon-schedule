import styled from '@emotion/styled';
import type { FC } from 'react';
import { TooltipContainer } from '../../molecules/TooltipContainer';
import { TooltipText } from '../../molecules/TooltipText';
import { TooltipHeader } from '../../molecules/TooltipHeader';

const TimeEntry = styled(TooltipText)`
  margin: 0 0 0 4px;
`;

export const PoolPinContent: FC = () => {
  return (
    // fuck it, I'm hardcoding the times here. Looking it up from the EVENTS data is too convoluted
    <TooltipContainer>
      <TooltipHeader>Friday</TooltipHeader>
      <TimeEntry>Regular: 16:00 - 23:00</TimeEntry>
      <TimeEntry subtle>Closed between 18:00 - 20:00 for cleaning</TimeEntry>
      <TooltipHeader>Saturday</TooltipHeader>
      <TimeEntry>Photoshoots: 9:00 - 12:00</TimeEntry>
      <TimeEntry>Regular: 12:00 - 23:00</TimeEntry>
      <TimeEntry subtle>Closed between 18:00 - 20:00 for cleaning</TimeEntry>
      <TooltipHeader>Sunday</TooltipHeader>
      <TimeEntry>Photoshoots: 9:00 - 12:00</TimeEntry>
      <TimeEntry>Regular: 12:00 - 23:00</TimeEntry>
      <TimeEntry subtle>Closed between 18:00 - 20:00 for cleaning</TimeEntry>
    </TooltipContainer>
  );
};

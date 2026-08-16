import type { FC } from 'react';
import { TooltipContainer } from '../TooltipContainer';
import { TooltipText } from '../TooltipText';
import { TooltipHeader } from '../TooltipHeader';

export const SharkHousePinContent: FC = () => {
  return (
    <TooltipContainer>
      <TooltipHeader>Fuji no En (Maid & Butler Cafe)</TooltipHeader>
      <TooltipText indent>Friday: 12:00 - 18:00</TooltipText>
      <TooltipText indent>Saturday: 12:00 - 18:00</TooltipText>
      <TooltipText indent>Sunday: 12:00 - 16:00</TooltipText>
      <TooltipHeader>Izakaya</TooltipHeader>
      <TooltipText indent>Friday: 22:00 - 1:30</TooltipText>
      <TooltipText indent>Saturday: 21:00 - 1:30</TooltipText>
    </TooltipContainer>
  );
};

import type { FC, ReactNode } from 'react';
import type { GateId } from '../../../../data/map/gate-pins';
import { TooltipContainer } from '../TooltipContainer';
import { TooltipText } from '../TooltipText';

interface Props {
  gate: GateId;
}

const gateNoteContents: { [key in GateId]: ReactNode } = {
  A: (
    <>
      <TooltipText>
        Open from <b>9:00 - 22:00</b>
      </TooltipText>
      <TooltipText>
        After <b>22:00</b>, this gate is{' '}
        <b>
          <u>EXIT ONLY</u>
        </b>
        !
      </TooltipText>
    </>
  ),
  B: (
    <>
      <TooltipText>
        Open from <b>9:00 - 03:00</b>
      </TooltipText>
      <TooltipText>
        After <b>22:00</b>, this gate has a{' '}
        <b>
          <u>BAG CHECK</u>
        </b>
        !
      </TooltipText>
    </>
  ),
  C: (
    <>
      <TooltipText>Always open.</TooltipText>
      <TooltipText>
        From <b>22:00</b> to <b>3:00</b>, there's a{' '}
        <b>
          <u>BAG CHECK</u>
        </b>
        !
      </TooltipText>
    </>
  ),
  D: <TooltipText>Entrance & Exit for Shark House</TooltipText>,
  E: (
    <>
      <TooltipText>
        <b>Pool Entrance</b>
      </TooltipText>
      <TooltipText>(Random) bag checks throughout the day.</TooltipText>
      <TooltipText>
        No entry 15 minutes before closing. See Pool pin for opening times.
      </TooltipText>
    </>
  ),
  F: (
    <>
      <TooltipText>
        Ducky Yard Sale,{' '}
        <b>
          <u>Entrance only!</u>
        </b>
      </TooltipText>
      <TooltipText>
        See Ducky Yard Sale pin (on the right) for opening times.
      </TooltipText>
    </>
  ),
  G: (
    <TooltipText>
      Hawk Arena{' '}
      <b>
        <u>Entrance only!</u>
      </b>
    </TooltipText>
  ),
  H: (
    <TooltipText>
      Ducky Yard Sale & Hawk Arena{' '}
      <b>
        <u>Exit only!</u>
      </b>
    </TooltipText>
  ),
};

export const GateTooltipContent: FC<Props> = ({ gate }) => {
  return <TooltipContainer>{gateNoteContents[gate]}</TooltipContainer>;
};

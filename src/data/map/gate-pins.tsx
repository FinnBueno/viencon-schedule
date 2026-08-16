import { GateTooltipContent } from '../../components/map/tooltips/GateTooltipContent';
import { LOCATIONS } from '../locations';
import type { PinWithoutId } from './pins';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GATES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export type GateId = (typeof GATES)[number];

export const GATE_PINS: PinWithoutId[] = [
  {
    x: 0.56,
    y: 0.5,
    type: 'gates',
    content: <GateTooltipContent gate="A" />,
  },
  {
    x: 0.452,
    y: 0.252,
    type: 'gates',
    content: <GateTooltipContent gate="A" />,
  },
  {
    x: 0.629,
    y: 0.377,
    type: 'gates',
    content: <GateTooltipContent gate="B" />,
  },
  {
    x: 0.718,
    y: 0.595,
    type: 'gates',
    content: <GateTooltipContent gate="C" />,
  },
  {
    x: 0.86,
    y: 0.542,
    type: 'gates',
    content: <GateTooltipContent gate="D" />,
  },
  {
    x: 0.411,
    y: 0.281,
    type: 'gates',
    content: <GateTooltipContent gate="E" />,
  },
  {
    x: 0.075,
    y: 0.784,
    type: 'gates',
    content: <GateTooltipContent gate="F" />,
  },
  {
    x: 0.068,
    y: 0.801,
    type: 'gates',
    content: <GateTooltipContent gate="G" />,
    location: LOCATIONS.HawkArena,
  },
  {
    x: 0.185,
    y: 0.832,
    type: 'gates',
    content: <GateTooltipContent gate="H" />,
  },
];

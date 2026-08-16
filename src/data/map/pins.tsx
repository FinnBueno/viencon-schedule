import type { ReactNode } from 'react';
import { assignIdToPins } from '../../utils/id-util';
import { type Location } from '../locations';
import { AREA_PINS } from './area-pins';
import { GATE_PINS } from './gate-pins';

export type PinType = 'area' | 'gates' | 'facilities';

export interface PinWithoutId {
  x: number; // horizontal position as a fraction (0–1) of the map width
  y: number; // vertical position as a fraction (0–1) of the map height
  location?: Location;
  partOf?: Location;
  name?: string; // will first try to use the name from location if present
  type: PinType;
  content?: ReactNode;
}

export interface Pin extends PinWithoutId {
  id: string;
}

const PINS_WITHOUT_IDS: PinWithoutId[] = [...AREA_PINS, ...GATE_PINS];

export const PINS = assignIdToPins(PINS_WITHOUT_IDS);

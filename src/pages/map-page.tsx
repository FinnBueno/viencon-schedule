import type { FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import { PINS } from '../data/map/pins';

// providing target with a value will move the view to a pin matching by location ID
export const MapPage: FC<{ target?: string }> = ({ target }) => (
  <ZoomableMap pins={PINS} target={target} />
);

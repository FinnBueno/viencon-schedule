import type { FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import { PINS } from '../data/map/pins';

export const MapPage: FC = () => <ZoomableMap pins={PINS} />;

import type { FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import mapImg from '../assets/viencon-park-map.avif';
import { FriendsMenu } from '../components/friends/FriendsMenu';
import { HOUSE_COORDINATES } from '../data/park/getHouseCoordinates';
import type { PinType } from '../data/map/pins';
import { IdentityProvider } from '../context/IdentityContext';

interface Props {
  target?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pins = Object.entries(HOUSE_COORDINATES).map(([key, coordinates]) => ({
  ...coordinates,
  name: key,
  id: key,
  type: 'area' as PinType,
}));

export const FriendsPage: FC<Props> = ({ target }) => (
  <IdentityProvider>
    <FriendsMenu />
    <ZoomableMap pins={[]} target={target} img={mapImg} />
  </IdentityProvider>
);

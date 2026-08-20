import { type FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import mapImg from '../assets/viencon-park-map.webp';
import { FriendsMenu } from '../components/friends/FriendsMenu';
import { useFriends } from '../context/FriendsContext';
import { useShareableIdentity } from '../context/IdentityContext';
import { useHousePinGrouping } from '../hooks/use-house-pin-grouping';

interface Props {
  target?: string;
}

export const FriendsPage: FC<Props> = ({ target }) => (
  <>
    <MapWithFriendAddresses target={target} />
  </>
);

const MapWithFriendAddresses: FC<Props> = ({ target }) => {
  const { data: selfData } = useShareableIdentity();

  const { friendsPerHouse } = useFriends();

  const housePins = useHousePinGrouping(friendsPerHouse, selfData);

  return (
    <ZoomableMap
      pins={housePins}
      target={target}
      img={mapImg}
      pinFinder={(pin, id) => pin.id === id}
    >
      <FriendsMenu target={target} />
    </ZoomableMap>
  );
};

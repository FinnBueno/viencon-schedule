import { useMemo, type FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import mapImg from '../assets/viencon-park-map.avif';
import { FriendsMenu } from '../components/friends/FriendsMenu';
import {
  getHouseCoordinates,
  type HouseAddress,
} from '../data/park/getHouseCoordinates';
import type { Pin } from '../data/map/pins';
import { useFriends } from '../context/FriendsContext';
import { HousePinContent } from '../components/friends/tooltips/HousePinContent';
import { useShareableIdentity } from '../context/IdentityContext';

interface Props {
  target?: string;
}

export const FriendsPage: FC<Props> = ({ target }) => (
  <>
    <MapWithFriendAddresses target={target} />
  </>
);

const MapWithFriendAddresses: FC<Props> = ({ target }) => {
  const { data } = useShareableIdentity();

  const { friendsPerHouse } = useFriends();

  const pins = useMemo(() => {
    return Object.entries(friendsPerHouse)
      .map(([addressString, people]) => {
        const address = addressString as HouseAddress;
        const coordinates = getHouseCoordinates(address);
        if (!coordinates) return undefined;

        const peopleWithPotentialSelf = [...people];
        if (data && address === String(data?.houseNumber)) {
          peopleWithPotentialSelf.push({
            name: `${data.name} (you)`,
            houseNumber: address,
          });
        }

        const resultingPin: Pin = {
          ...coordinates,
          id: address,
          type: 'area',
          content: (
            <HousePinContent
              address={address}
              people={peopleWithPotentialSelf}
            />
          ),
        };
        return resultingPin;
      })
      .filter((v) => !!v);
  }, [data, friendsPerHouse]);

  return (
    <ZoomableMap
      pins={pins}
      target={target}
      img={mapImg}
      pinFinder={(pin, id) => pin.id === id}
    >
      <FriendsMenu />
    </ZoomableMap>
  );
};

import { useMemo, type FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import mapImg from '../assets/viencon-park-map.webp';
import { FriendsMenu } from '../components/friends/FriendsMenu';
import {
  getHouseCoordinates,
  type HouseAddress,
} from '../data/park/getHouseCoordinates';
import type { Pin } from '../data/map/pins';
import { useFriends, type FriendsPerHouse } from '../context/FriendsContext';
import { HousePinContent } from '../components/friends/tooltips/HousePinContent';
import {
  useShareableIdentity,
  type ShareableIdentity,
} from '../context/IdentityContext';

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

  // creates a pin for each house
  // also tries to insert the user's own name into the house they have configured
  const housePins = useMemo(
    () => createHousePins(friendsPerHouse, selfData),
    [selfData, friendsPerHouse],
  );

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

// creates a set of pins with description out of a friend list
// includes the own user if they have self data specified
const createHousePins = (
  friendsPerHouse: FriendsPerHouse,
  selfData?: ShareableIdentity,
) => {
  // this is messy, I'm sorry
  let selfWasRegisteredAlongTheWay = false;
  const resultingPins = Object.entries(friendsPerHouse)
    .map(([addressString, people]) => {
      const address = addressString as HouseAddress;
      const coordinates = getHouseCoordinates(address);
      if (!coordinates) return undefined;

      const peopleWithPotentialSelf = [...people];
      if (selfData && address === String(selfData?.houseNumber)) {
        selfWasRegisteredAlongTheWay = true;
        peopleWithPotentialSelf.push({
          name: `${selfData.name} (you)`,
          houseNumber: address,
        });
      }

      const resultingPin: Pin = {
        ...coordinates,
        id: address,
        type: 'area',
        content: (
          <HousePinContent address={address} people={peopleWithPotentialSelf} />
        ),
      };
      return resultingPin;
    })
    .filter((v) => !!v);
  if (!selfWasRegisteredAlongTheWay && selfData) {
    const address = String(selfData.houseNumber) as HouseAddress;
    const coordinates = getHouseCoordinates(address);
    if (!coordinates) return resultingPins;
    const selfPin: Pin = {
      ...coordinates,
      id: address,
      type: 'area',
      content: (
        <HousePinContent
          address={address}
          people={[
            {
              name: selfData.name,
              houseNumber: address,
            },
          ]}
        />
      ),
    };
    return [...resultingPins, selfPin];
  }
};

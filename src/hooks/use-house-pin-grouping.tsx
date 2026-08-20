import { HousePinContent } from '../components/friends/tooltips/HousePinContent';
import type { FriendEntry, FriendsPerHouse } from '../context/FriendsContext';
import type { ShareableIdentity } from '../context/IdentityContext';
import type { Pin } from '../data/map/pins';
import {
  getHouseCoordinates,
  type HouseAddress,
} from '../data/park/getHouseCoordinates';

type PinData = Omit<Pin, 'content'> & {
  people: FriendEntry[];
  address: HouseAddress;
};

export const useHousePinGrouping = (
  friendsPerHouse: FriendsPerHouse,
  selfData?: ShareableIdentity,
): Pin[] => {
  // convert friendsPerHouse to a list of pins (effective the same data structure)
  const resultingPins = Object.entries(friendsPerHouse)
    .map(([addressString, people]) => {
      const coordinates = getHouseCoordinates(addressString as HouseAddress);
      if (!coordinates) return undefined;
      const pin: PinData = {
        id: addressString,
        address: addressString as HouseAddress,
        ...coordinates,
        type: 'area',
        people,
      };
      return pin;
    })
    // remove any houses that don't have anybody registered in them
    .filter((i) => !!i);
  // find the pin for the house the user resides in, if it exists
  const selfHouse =
    selfData &&
    resultingPins.find((pin) => pin.id === String(selfData.houseNumber));
  // if there is one, add the user to the people list
  if (selfHouse) {
    selfHouse.people.push({
      name: selfData.name,
      houseNumber: String(selfData.houseNumber) as HouseAddress,
    });
  }
  return resultingPins.map((pinData) => {
    const { people, address, ...rest } = pinData;
    const pin: Pin = {
      ...rest,
      content: <HousePinContent address={address} people={people} />,
    };
    return pin;
  });
};

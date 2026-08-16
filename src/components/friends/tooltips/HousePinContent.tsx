import type { FC } from 'react';
import { TooltipContainer } from '../../molecules/TooltipContainer';
import { TooltipText } from '../../molecules/TooltipText';
import type { FriendEntry } from '../../../context/FriendsContext';
import type { HouseAddress } from '../../../data/park/getHouseCoordinates';
import { TooltipHeader } from '../../molecules/TooltipHeader';

interface Props {
  address: HouseAddress;
  people: FriendEntry[];
}

export const HousePinContent: FC<Props> = ({ address, people }) => {
  const names = people.map((p) => p.name);
  const peopleAsString =
    people.length > 1
      ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
      : names.join('');
  return (
    <TooltipContainer>
      <TooltipHeader>House {address}</TooltipHeader>
      <TooltipText>{peopleAsString}</TooltipText>
    </TooltipContainer>
  );
};

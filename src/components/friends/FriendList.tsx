import styled from '@emotion/styled';
import type { FC } from 'react';
import { IdentityRow } from './IdentityRow';
import { useFriends } from '../../context/FriendsContext';
import { AddressEntry } from './AddressEntry';
import type { HouseAddress } from '../../data/park/getHouseCoordinates';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 260px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */

  overflow-x: visible;

  gap: 8px;
`;

export const FriendList: FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const { friendsPerHouse } = useFriends();
  return (
    <Container>
      <IdentityRow />
      {Object.entries(friendsPerHouse).map(([houseAddress, friends]) => (
        <AddressEntry
          address={houseAddress as HouseAddress}
          friends={friends}
          closeMenu={closeMenu}
        />
      ))}
    </Container>
  );
};

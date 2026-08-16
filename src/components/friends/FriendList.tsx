import styled from '@emotion/styled';
import type { FC } from 'react';
import { IdentityRow } from './IdentityRow';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 260px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */

  overflow-x: visible;
`;

export const FriendList: FC = () => (
  <Container>
    <IdentityRow />
  </Container>
);

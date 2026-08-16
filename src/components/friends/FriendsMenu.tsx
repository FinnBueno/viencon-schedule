import styled from '@emotion/styled';
import { useState, type FC } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FriendList } from './FriendList';
import { FriendControls } from './FriendControls';

const Position = styled.div`
  position: absolute;
  top: 0;
  width: 100%;

  display: flex;
  justify-content: center;

  z-index: 1;
  padding: 4px;

  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.backgroundHighlight};
  padding: 8px 8px;

  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Title = styled.h3`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0;
  opacity: 0.7;
`;

const ToggleButton = styled.div<{ rotate: 'true' | 'false' }>`
  position: absolute;
  top: 4px;
  right: 0;
  transform-origin: 50% 45%;
  ${(props) => (props.rotate === 'true' ? 'transform: rotate(180deg);' : '')}
`;

const Body = styled.div<{ collapsed: boolean }>`
  height: ${(props) => (props.collapsed ? '0px' : '400px')};
  overflow: ${(props) => (props.collapsed ? 'hidden' : 'scroll')};
  padding: ${(props) => (props.collapsed ? '0' : '8px 0')};
  transition:
    height 300ms,
    padding 300ms;
  box-sizing: border-box;

  width: 100%;
  /* height: 400px; */
`;

// div with hardcoded height to make the animation work, yuck
const FriendListSizer = styled.div`
  height: 305px;
  margin-bottom: 8px;
  overflow-y: scroll;
  overflow-x: visible;
`;

const Divider = styled.hr`
  opacity: 0.3;
`;

export const FriendsMenu: FC = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Position>
      <Container>
        <Header onClick={() => setOpen((s) => !s)}>
          <Title>Friends Menu</Title>
          <Subtitle>Press to manage friend list</Subtitle>
          <ToggleButton rotate={`${isOpen}`}>
            <IoIosArrowDown size={30} />
          </ToggleButton>
        </Header>
        <Body collapsed={!isOpen}>
          <Divider />
          <FriendListSizer>
            <FriendList />
          </FriendListSizer>
          <FriendControls />
        </Body>
      </Container>
    </Position>
  );
};

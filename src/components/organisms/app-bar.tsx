import styled from '@emotion/styled';
import { useEffect, useRef, type FC } from 'react';
import { GrMapLocation, GrSchedule } from 'react-icons/gr';
import { useRouting } from '../../context/RouteContext';
import { useVienconTheme } from '../../hooks/use-viencon-theme';

const appBarHeight = 52;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${appBarHeight + 4}px;
  z-index: 20;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background-color: ${(props) => props.theme.color.backgroundHighlight};
`;

const AppBarIcon = styled.button`
  position: relative;
  margin: 0;
  padding: 8px;
  border: none;
  background: none;
  outline: none;

  height: 48px;
  width: 48px;

  & > * {
    transition: color 150ms;
  }
`;

const ActiveBackground = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
  background-color: ${(props) => props.theme.color.location};
  border-radius: 4px;
  height: 48px;
  width: 48px;
  transition: transform 150ms ease-in-out;
`;

const AppBarHeightPadding = styled.div`
  height: ${appBarHeight}px;
`;

export const AppBar: FC = () => {
  const { route, navigateTo } = useRouting();

  const { getTheme } = useVienconTheme();
  const theme = getTheme();

  const scheduleBtnRef = useRef<HTMLButtonElement>(null);
  const mapBtnRef = useRef<HTMLButtonElement>(null);
  // const friendsBtnRef = useRef<HTMLButtonElement>(null);
  const activeBackgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !scheduleBtnRef.current ||
      !mapBtnRef.current ||
      // !friendsBtnRef.current ||
      !activeBackgroundRef.current
    )
      return;

    let activeButton;
    switch (route) {
      case 'schedule':
        activeButton = scheduleBtnRef.current;
        break;
      case 'map':
        activeButton = mapBtnRef.current;
        break;
      // case 'friends':
      //   activeButton = friendsBtnRef.current;
      //   break;
      default:
        return;
    }

    activeBackgroundRef.current.style.transform = `translateX(${activeButton.offsetLeft}px)`;
  }, [route]);

  return (
    <>
      <AppBarHeightPadding />
      <Container>
        <ActiveBackground ref={activeBackgroundRef} />
        <AppBarIcon ref={scheduleBtnRef} onClick={() => navigateTo('schedule')}>
          <GrSchedule
            size={30}
            color={
              theme.color.font[
                route === 'schedule' ? 'onBackground' : 'onForeground'
              ]
            }
          />
        </AppBarIcon>
        <AppBarIcon ref={mapBtnRef} onClick={() => navigateTo('map')}>
          <GrMapLocation
            size={30}
            color={
              theme.color.font[
                route === 'map' ? 'onBackground' : 'onForeground'
              ]
            }
          />
        </AppBarIcon>
        {/* <AppBarIcon ref={friendsBtnRef} onClick={() => navigateTo('friends')}>
          <FaUserGroup
            size={30}
            color={
              theme.color.font[
                route === 'friends' ? 'onBackground' : 'onForeground'
              ]
            }
          />
        </AppBarIcon> */}
      </Container>
    </>
  );
};

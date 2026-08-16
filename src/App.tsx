import { css, Global, ThemeProvider } from '@emotion/react';
import type { Theme } from '@emotion/react';
import { darkTheme, lightTheme } from './styles/theme';
import {
  useVienconTheme,
  VienconThemeProvider,
} from './hooks/use-viencon-theme';
import { SearchProvider } from './context/SearchContext';
import { ModalProvider } from './context/ModalContext';
import { IdentityProvider } from './context/IdentityContext';
import {
  FriendsProvider,
  useFriends,
  type FriendEntry,
} from './context/FriendsContext';
import { AppBar } from './components/organisms/app-bar';
import { RouteProvider, useRouting } from './context/RouteContext';
import { useEffect, useRef, type FC } from 'react';
import { SchedulePage } from './pages/schedule-page';
import { MapPage } from './pages/map-page';
import { FriendsPage } from './pages/friends-page';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getGlobalStyle = (theme: Theme) => css`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.color.background};
    color: ${theme.color.font.onBackground};
    width: fit-content;
    height: 100%;
    overscroll-behavior-x: none;
    overflow-x: hidden;
  }

  * {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {
  return (
    <VienconThemeProvider>
      <AppWithTheme />
    </VienconThemeProvider>
  );
}

function AppWithTheme() {
  const { theme } = useVienconTheme();

  const queryParams = new URLSearchParams(window.location.search);
  const addFriendParam = queryParams.get('frnd');

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <SearchProvider>
        <RouteProvider>
          <IdentityProvider>
            <FriendsProvider>
              <ModalProvider>
                <Global styles={(theme) => getGlobalStyle(theme)} />
                <Router addFriendData={addFriendParam ?? undefined} />
                <AppBar />
                <ToastContainer
                  position="bottom-center"
                  theme={theme === 'dark' ? 'dark' : 'light'}
                />
              </ModalProvider>
            </FriendsProvider>
          </IdentityProvider>
        </RouteProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

const clearQueryParams = () => {
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.hash}`,
  );
};

const Router: FC<{ addFriendData?: string }> = ({ addFriendData }) => {
  const { route, routeData, navigateTo } = useRouting();
  const { addFriend } = useFriends();

  useEffect(() => {
    if (!addFriendData) return;

    let friendData: FriendEntry;
    try {
      friendData = JSON.parse(atob(addFriendData)) as FriendEntry;
    } catch {
      toast.error(
        'Something is wrong with that friend code. Ask them to send a new one',
      );
      clearQueryParams();
      return;
    }

    addFriend(friendData);
    toast.success(
      `Added ${friendData.name} to house ${friendData.houseNumber}`,
    );
    clearQueryParams();
    if (route !== 'friends' && routeData !== friendData.houseNumber) {
      navigateTo('friends', friendData.houseNumber);
    }
  }, [addFriend, addFriendData, navigateTo, route, routeData]);

  // Keep schedule page mounted after its first visit so switching back isn't so slow
  const visitedSchedule = useRef<boolean>(false);
  if (route === 'schedule') visitedSchedule.current = true;
  return (
    <>
      {visitedSchedule.current && (
        <div hidden={route !== 'schedule'}>
          <SchedulePage />
        </div>
      )}
      {route === 'map' && <MapPage target={routeData} />}
      {route === 'friends' && <FriendsPage target={routeData} />}
    </>
  );
};

export default App;

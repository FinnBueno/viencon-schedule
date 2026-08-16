import { css, Global, ThemeProvider } from '@emotion/react';
import type { Theme } from '@emotion/react';
import { darkTheme, lightTheme } from './styles/theme';
import {
  useVienconTheme,
  VienconThemeProvider,
} from './hooks/use-viencon-theme';
import { SearchProvider } from './context/SearchContext';
import { ModalProvider } from './context/ModalContext';
import { AppBar } from './components/organisms/app-bar';
import { RouteProvider, useRouting } from './context/RouteContext';
import { useRef, type FC } from 'react';
import { SchedulePage } from './pages/schedule-page';
import { MapPage } from './pages/map-page';
import { FriendsPage } from './pages/friends-page';

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
  const addFriendParam = queryParams.get('add-friend');

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <SearchProvider>
        <RouteProvider>
          <ModalProvider>
            <Global styles={(theme) => getGlobalStyle(theme)} />
            <Router addFriendData={addFriendParam ?? undefined} />
            <AppBar />
          </ModalProvider>
        </RouteProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

const Router: FC<{ addFriendData?: string }> = () => {
  const { route, routeData } = useRouting();

  // todo:
  // if we run into friend data, we'll do the following:
  // 1. interpret the friend data and register it
  // 2. display a success popup
  // 3. manually clear the url (I guess?)
  // 4. navigate to the friends page and pass the friend ID as a target

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
      {route === 'friends' && <FriendsPage />}
    </>
  );
};

export default App;

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
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <SearchProvider>
        <RouteProvider>
          <ModalProvider>
            <Global styles={(theme) => getGlobalStyle(theme)} />
            <Router />
            <AppBar />
          </ModalProvider>
        </RouteProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

const Router: FC = () => {
  const { route } = useRouting();
  // Keep each page mounted after its first visit so switching back is instant
  // instead of paying the full re-mount cost (heaviest for the schedule).
  const visited = useRef<Set<string>>(new Set());
  visited.current.add(route);
  return (
    <>
      {visited.current.has('schedule') && (
        <div hidden={route !== 'schedule'}>
          <SchedulePage />
        </div>
      )}
      {visited.current.has('map') && (
        <div hidden={route !== 'map'}>
          <MapPage />
        </div>
      )}
      {visited.current.has('friends') && (
        <div hidden={route !== 'friends'}>
          <FriendsPage />
        </div>
      )}
    </>
  );
};

export default App;

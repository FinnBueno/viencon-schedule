import { css, Global, ThemeProvider } from "@emotion/react";
import { Events } from "./components/events";
import type { Theme } from "@emotion/react";
import { TableHeaders } from "./components/header";
import { ScheduleGrid } from "./components/grid";
import { darkTheme, lightTheme } from "./styles/theme";
import {
  useVienconTheme,
  VienconThemeProvider,
} from "./hooks/use-viencon-theme";
// import { SearchMenu } from "./components/search";

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
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Global styles={(theme) => getGlobalStyle(theme)} />
      {/* <SearchMenu /> */}
      <ScheduleGrid>
        <TableHeaders />
        <Events />
      </ScheduleGrid>
    </ThemeProvider>
  );
}

export default App;

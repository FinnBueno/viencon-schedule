import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from 'react';

type Route = 'schedule' | 'map' | 'friends';

type RouteData = {
  route: Route;
  navigateTo: (route: Route) => void;
};

const RouteContext = createContext<RouteData>({
  navigateTo: () => {},
  route: 'schedule',
});

export const RouteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<Route>('schedule');

  return (
    <RouteContext.Provider
      value={{
        route,
        navigateTo: setRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRouting = () => useContext(RouteContext);

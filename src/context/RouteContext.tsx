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
  routeData?: string;
  navigateTo: (route: Route, routeData?: string) => void;
};

const RouteContext = createContext<RouteData>({
  navigateTo: () => {},
  route: 'schedule',
});

export const RouteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [[route, routeData], setRoute] = useState<[Route, string | undefined]>([
    'schedule',
    undefined,
  ]);

  const navigateTo = (newRoute: Route, routeData?: string) =>
    setRoute([newRoute, routeData]);

  return (
    <RouteContext.Provider
      value={{
        route,
        routeData,
        navigateTo,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRouting = () => useContext(RouteContext);

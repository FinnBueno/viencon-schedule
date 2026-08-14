import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";

type SearchControls = [string | undefined, (newQuery: string) => void];

const SearchContext = createContext<SearchControls>([undefined, () => {}]);

export const SearchContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string | undefined>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSearchQuery = useCallback(
    (newQuery: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => setQuery(newQuery), 500);
    },
    [setQuery],
  );

  return (
    <SearchContext.Provider value={[query, setSearchQuery]}>
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);

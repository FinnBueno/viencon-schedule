import {
  createContext,
  useContext,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { EVENTS } from '../data/events';
import type { Event } from '../data/events/timestamps';

type SearchControls = {
  isSearching: boolean;
  currentIndex: number;
  currentResult?: string;
  totalResults: number;
  goNext: () => void;
  goBack: () => void;
  updateQuery: (query?: string) => void;
};

const SearchContext = createContext<SearchControls>({
  isSearching: false,
  currentIndex: 0,
  currentResult: undefined,
  totalResults: 0,
  goNext: () => {},
  goBack: () => {},
  updateQuery: () => {},
});

const search = (event: Event, query: string): boolean => {
  return event.name.toLowerCase().trim().includes(query.toLowerCase().trim());
};

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousQueryRef = useRef<string>(null);
  const [searchResults, setSearchResults] = useState<string[] | undefined>();
  const [resultStepper, setResultStepper] = useState(0);

  const updateSearchResults = (query?: string) => {
    if (previousQueryRef.current === query) {
      return;
    }

    previousQueryRef.current = query ?? null;

    if (!query) {
      setSearchResults(undefined);
      setResultStepper(0);
      return;
    }

    if (query.length < 3) {
      setSearchResults(undefined);
      previousQueryRef.current = null;
      return;
    }

    setResultStepper(0);
    setSearchResults(
      EVENTS.filter((e) => search(e, query))
        .map((e) => e.periods.map((p) => p.from))
        .flat()
        .map((p) => p.id),
    );
  };

  const updateQuery = (query?: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => updateSearchResults(query), 500);
  };

  const goNext = () =>
    setResultStepper((step) =>
      step >= (searchResults?.length ?? 0) - 1 ? 0 : step + 1,
    );
  const goBack = () =>
    setResultStepper((step) =>
      step <= 0 ? (searchResults?.length ?? 1) - 1 : step - 1,
    );

  return (
    <SearchContext.Provider
      value={{
        isSearching: !!searchResults,
        currentIndex: resultStepper,
        currentResult:
          searchResults && searchResults?.length > 0
            ? searchResults[resultStepper]
            : undefined,
        totalResults: searchResults?.length ?? 0,
        goNext,
        goBack,
        updateQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);

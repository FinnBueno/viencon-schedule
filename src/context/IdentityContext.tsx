import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from 'react';

interface ShareableIdentity {
  name: string;
  houseNumber: number;
}

interface ShareableIdentityData {
  isInitialized: boolean;
  data?: ShareableIdentity;
  updateIdentity: (name: string, houseNumber: number) => void;
  clearIdentity: () => void;
}

const IdentityContext = createContext<ShareableIdentityData>({
  isInitialized: false,
  updateIdentity: () => {},
  clearIdentity: () => {},
});

const CACHE_ID = 'viencon-2026-identity';

export const IdentityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [shareableIdentity, setShareableIdentity] = useState(getCachedValue());

  const updateIdentity = (name: string, houseNumber: number) => {
    const newIdentity = {
      name,
      houseNumber,
    };
    setShareableIdentity(newIdentity);
    localStorage.setItem(CACHE_ID, JSON.stringify(newIdentity));
  };

  const clearIdentity = () => {
    setShareableIdentity(undefined);
    localStorage.removeItem(CACHE_ID);
  };

  const value = shareableIdentity
    ? {
        isInitialized: true,
        data: shareableIdentity,
        updateIdentity,
        clearIdentity,
      }
    : {
        isInitialized: false,
        updateIdentity,
        clearIdentity,
      };

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShareableIdentity = () => useContext(IdentityContext);

function getCachedValue(): ShareableIdentity | undefined {
  const cachedValue = localStorage.getItem(CACHE_ID);

  if (!cachedValue) return undefined;

  try {
    return JSON.parse(cachedValue) as ShareableIdentity;
  } catch {
    localStorage.removeItem(CACHE_ID);
    return undefined;
  }
}

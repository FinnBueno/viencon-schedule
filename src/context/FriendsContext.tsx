import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import type { HouseAddress } from '../data/park/getHouseCoordinates';
import * as Sentry from '@sentry/react';

export interface FriendEntry {
  name: string;
  houseNumber: HouseAddress;
}

export type FriendList = FriendEntry[];

export type FriendsPerHouse = Partial<{ [key in HouseAddress]: FriendEntry[] }>;

interface FriendsControls {
  friendsPerHouse: FriendsPerHouse;
  addFriend: (friend: FriendEntry) => void;
  removeFriend: (friend: FriendEntry) => void;
  dangerouslySetFriendList: (list: FriendList) => void;
  removeHouse: (address: HouseAddress) => void;
  clearFriends: () => void;
}

const FriendsContext = createContext<FriendsControls>({
  friendsPerHouse: {},
  addFriend: () => {},
  removeFriend: () => {},
  dangerouslySetFriendList: () => {},
  removeHouse: () => {},
  clearFriends: () => {},
});

const CACHE_ID = 'viencon-2026-friends';

export const FriendsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [friendsList, setFriendsList] = useState<FriendList>(getCachedValue());

  const friendsPerHouse: FriendsPerHouse = useMemo(() => {
    return Object.values(friendsList).reduce<FriendsPerHouse>(
      (total, current) => {
        if (!total[current.houseNumber]) {
          total[current.houseNumber] = [];
        }
        total[current.houseNumber]!.push(current);
        return total;
      },
      {} as FriendsPerHouse,
    );
  }, [friendsList]);

  const dangerouslySetFriendList = useCallback((friendList: FriendList) => {
    setFriendsList(friendList);
    localStorage.setItem(CACHE_ID, JSON.stringify(friendList));
  }, []);

  const addFriend = useCallback((friend: FriendEntry) => {
    setFriendsList((state) => {
      // if we already have a friend in that house with that exact name, don't add them
      if (
        state.find(
          (p) =>
            p.houseNumber === String(friend.houseNumber) &&
            p.name.toLowerCase().trim() === friend.name.toLowerCase().trim(),
        )
      )
        return state;
      const newState = [...state, friend];
      localStorage.setItem(CACHE_ID, JSON.stringify(newState));
      return newState;
    });
  }, []);

  const removeFriend = useCallback((friend: FriendEntry) => {
    setFriendsList((state) => {
      const newState = state.filter((e) => e !== friend);
      localStorage.setItem(CACHE_ID, JSON.stringify(newState));
      return newState;
    });
  }, []);

  const removeHouse = useCallback((address: HouseAddress) => {
    setFriendsList((state) => {
      const newState = state.filter((e) => String(e.houseNumber) !== address);
      localStorage.setItem(CACHE_ID, JSON.stringify(newState));
      return newState;
    });
  }, []);

  const clearFriends = useCallback(() => {
    setFriendsList(() => {
      localStorage.setItem(CACHE_ID, JSON.stringify([]));
      return [];
    });
  }, []);

  return (
    <FriendsContext.Provider
      value={{
        friendsPerHouse,
        addFriend,
        removeFriend,
        dangerouslySetFriendList,
        removeHouse,
        clearFriends,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFriends = () => useContext(FriendsContext);

function getCachedValue(): FriendList {
  const cachedValue = localStorage.getItem(CACHE_ID);

  if (!cachedValue) return [];

  try {
    return JSON.parse(cachedValue) as FriendList;
  } catch (error) {
    Sentry.logger.error('Could not parse friendlist from useFriends hook', {
      error,
    });
    localStorage.removeItem(CACHE_ID);
    return [];
  }
}

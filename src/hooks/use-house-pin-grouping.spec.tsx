import { describe, it, expect } from 'vitest';
import { cleanup, render, renderHook, screen } from '@testing-library/react';
import { useHousePinGrouping } from './use-house-pin-grouping';
import type { FriendsPerHouse } from '../context/FriendsContext';
import type { ShareableIdentity } from '../context/IdentityContext';

describe('useHousePinGrouping', () => {
  afterEach(() => {
    cleanup();
  });

  it('should return empty list when no data is present', () => {
    const hookResult = renderHook(() => useHousePinGrouping({}, undefined));
    expect(hookResult.result.current).toEqual([]);
  });

  it('should return 1 correctly addressed pin when 1 friend is registered', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
      ],
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, undefined),
    );
    expect(hookResult.result.current.length).toEqual(1);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark/)).toBeTruthy();
  });

  it("should return 1 correctly addressed pin when friend's houseNumber value doesn't match", () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '321',
        },
      ],
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, undefined),
    );
    expect(hookResult.result.current.length).toEqual(1);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark/)).toBeTruthy();
  });

  it('should return 1 correctly addressed pin when 2 friends are registered on 1 house', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
        {
          name: 'Lars',
          houseNumber: '101',
        },
      ],
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, undefined),
    );
    expect(hookResult.result.current.length).toEqual(1);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark and Lars/)).toBeTruthy();
  });

  it('should return 1 correctly addressed pin when 3 friends are registered on 1 house', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
        {
          name: 'Lars',
          houseNumber: '101',
        },
        {
          name: 'Lisa',
          houseNumber: '101',
        },
      ],
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, undefined),
    );
    expect(hookResult.result.current.length).toEqual(1);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark, Lars and Lisa/)).toBeTruthy();
  });
  it('should return 2 correctly addressed pins when 2 friends are registered on 2 houses', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
      ],
      123: [
        {
          name: 'Lars',
          houseNumber: '123',
        },
      ],
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, undefined),
    );

    expect(hookResult.result.current.length).toEqual(2);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark/)).toBeTruthy();

    expect(hookResult.result.current[1].id).toEqual('123');
    expect(hookResult.result.current[1].type).toEqual('area');
    render(hookResult.result.current[1].content);
    expect(screen.getByText(/123/)).toBeTruthy();
    expect(screen.getByText(/Lars/)).toBeTruthy();
  });

  it('should return 2 correctly addressed pins when 3 friends are registered on 2 houses', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
      ],
      123: [
        {
          name: 'Lars',
          houseNumber: '123',
        },
        {
          name: 'Lisa',
          houseNumber: '123',
        },
      ],
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, undefined),
    );

    expect(hookResult.result.current.length).toEqual(2);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark/)).toBeTruthy();

    expect(hookResult.result.current[1].id).toEqual('123');
    expect(hookResult.result.current[1].type).toEqual('area');
    render(hookResult.result.current[1].content);
    expect(screen.getByText(/123/)).toBeTruthy();
    expect(screen.getByText(/Lars and Lisa/)).toBeTruthy();
  });

  it('should return 1 correctly addressed pin when only self data is present', () => {
    const friendsPerHouse: FriendsPerHouse = {};
    const selfData: ShareableIdentity = {
      name: 'Daisy',
      houseNumber: 101,
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, selfData),
    );

    expect(hookResult.result.current.length).toEqual(1);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Daisy \(you\)/)).toBeTruthy();
  });

  it('should return 1 correctly addressed pin when self data and 1 friend is present in the same house', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
      ],
    };
    const selfData: ShareableIdentity = {
      name: 'Daisy',
      houseNumber: 101,
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, selfData),
    );

    expect(hookResult.result.current.length).toEqual(1);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark and Daisy \(you\)/)).toBeTruthy();
  });

  it('should return 2 correctly addressed pins when self data and 1 friend is present in the same house and 1 friend in another house', () => {
    const friendsPerHouse: FriendsPerHouse = {
      101: [
        {
          name: 'Mark',
          houseNumber: '101',
        },
      ],
      123: [
        {
          name: 'Lars',
          houseNumber: '123',
        },
      ],
    };
    const selfData: ShareableIdentity = {
      name: 'Daisy',
      houseNumber: 101,
    };
    const hookResult = renderHook(() =>
      useHousePinGrouping(friendsPerHouse, selfData),
    );

    expect(hookResult.result.current.length).toEqual(2);
    expect(hookResult.result.current[0].id).toEqual('101');
    expect(hookResult.result.current[0].type).toEqual('area');
    render(hookResult.result.current[0].content);
    expect(screen.getByText(/101/)).toBeTruthy();
    expect(screen.getByText(/Mark and Daisy \(you\)/)).toBeTruthy();

    expect(hookResult.result.current[1].id).toEqual('123');
    expect(hookResult.result.current[1].type).toEqual('area');
    render(hookResult.result.current[1].content);
    expect(screen.getByText(/123/)).toBeTruthy();
    expect(screen.getByText(/Lars/)).toBeTruthy();
  });
});

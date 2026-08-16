export type Location = {
  name: string;
  id: string;
  emoji: string;
  subroom?: { [key: string]: Location };
};

export const LOCATIONS = {
  Mainstage: {
    id: 'Mainstage',
    name: 'Mainstage',
    emoji: '🎤',
    subroom: {
      roomOne: {
        id: 'roomOne',
        emoji: '1️⃣',
        name: '(Room 1)',
      },
      roomTwo: {
        id: 'roomTwo',
        emoji: '2️⃣',
        name: '(Room 2)',
      },
    },
  },
  DuckyDomeStage: {
    id: 'DuckyDomeStage',
    emoji: '🦆 🎤',
    name: 'Ducky Dome Stage',
  },
  GameroomKaraoke: {
    id: 'GameroomKaraoke',
    name: 'Gameroom / Karaoke',
    emoji: '🎙️ 🎮',
  },
  SharkHouse: {
    id: 'SharkHouse',
    name: 'Sharkhouse',
    emoji: '🦈 🏠',
  },
  ArtistAlleyMatsuri: {
    id: 'ArtistAlleyMatsuri',
    name: 'Artist Alley / Matsuri',
    emoji: '🛍️ 🀄️',
  },
  HawkArena: {
    id: 'HawkArena',
    name: 'Hawk Arena',
    emoji: '🦅 🏟️',
  },
  Pool: {
    id: 'Pool',
    name: 'Pool',
    emoji: '🏊🏻‍♀️ 🌊',
  },
  DuckyFallsTent: {
    id: 'DuckyFallsTent',
    emoji: '🦆 🎪',
    name: 'Ducky Falls Tent',
  },
};

export const ALL_LOCATIONS: (Location & { id: string })[] = Object.entries(
  LOCATIONS,
).map(([key, location]) => ({
  ...location,
  id: key,
}));

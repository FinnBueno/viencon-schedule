import { LOCATIONS } from "../locations";
import { sunday, type EventWithoutIds } from "./timestamps";

export const SUNDAY_EVENTS: EventWithoutIds[] = [
  // All-day events
  {
    name: "Artist Alley / Matsuri",
    location: LOCATIONS.ArtistAlleyMatsuri,
    periods: [
      {
        from: sunday(12),
        to: sunday(18)
      }
    ]
  },
  {
    name: "Ducky Yard Sale",
    location: LOCATIONS.HawkArena,
    link: 'https://viencon.nl/ducky-yard-sale',
    periods: [
      {
        from: sunday(12),
        to: sunday(16)
      }
    ]
  },
  {
    name: "Pool open",
    subtext: "Photoshoots only",
    location: LOCATIONS.Pool,
    periods: [
      {
        from: sunday(9),
        to: sunday(12)
      }
    ]
  },
  {
    name: "Pool open",
    location: LOCATIONS.Pool,
    periods: [
      {
        from: sunday(12),
        to: sunday(18),
      },
      {
        from: sunday(20),
        to: sunday(23),
      }
    ],
  },
  {
    name: "Pool closed",
    subtext: "Cleaning",
    location: LOCATIONS.Pool,
    isNegative: true,
    periods: [
      {
        from: sunday(18),
        to: sunday(20),
      },
    ],
  },
  {
    name: "Gameroom / Karaoke",
    location: LOCATIONS.GameroomKaraoke,
    periods: [
      {
        from: sunday(12),
        to: sunday(18)
      }
    ]
  },
  {
    name: "Vtuber Mascots 101",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    periods: [
      {
        from: sunday(12, 30),
        to: sunday(14, 30)
      }
    ]
  },
  {
    name: "House Games",
    location: LOCATIONS.HawkArena,
    link: 'https://viencon.nl/house-games',
    periods: [
      {
        from: sunday(12, 30),
        to: sunday(14)
      }
    ]
  },
  {
    name: "Dodgeball",
    location: LOCATIONS.HawkArena,
    link: 'https://viencon.nl/dodgeball',
    periods: [
      {
        from: sunday(14),
        to: sunday(16)
      }
    ]
  },
  {
    name: "Ending Ceremony",
    location: LOCATIONS.HawkArena,
    periods: [
      {
        from: sunday(17),
        to: sunday(18)
      }
    ]
  },
  {
    name: "Asgard Sings",
    subtext: "Anime Music Quiz",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/asgardsings',
    periods: [
      {
        from: sunday(14),
        to: sunday(15)
      }
    ]
  },
  {
    name: "Fuji no En",
    subtext: "Maid & Butler cafe",
    link: 'https://viencon.nl/fuji-no-en',
    location: LOCATIONS.SharkHouse,
    periods: [
      {
        from: sunday(12),
        to: sunday(16)
      }
    ]
  },
  {
    name: "Fabric Market",
    location: LOCATIONS.DuckyFallsTent,
    link: 'https://viencon.nl/fabric-market',
    periods: [
      {
        from: sunday(12, 30),
        to: sunday(14, 30)
      }
    ]
  },
  {
    name: "Beer Tasting",
    location: LOCATIONS.DuckyFallsTent,
    link: 'https://viencon.nl/beer-tasting',
    periods: [
      {
        from: sunday(15),
        to: sunday(16, 30)
      }
    ]
  },
  {
    name: "Aqua Para",
    location: LOCATIONS.Pool,
    link: 'https://viencon.nl/aquapara',
    periods: [
      {
        from: sunday(12, 30),
        to: sunday(13, 15)
      }
    ]
  },
];

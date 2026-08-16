import { friday, saturday, type EventWithoutIds } from "./timestamps";
import { LOCATIONS } from "../locations";

export const FRIDAY_EVENTS: EventWithoutIds[] = [
  // All-day events
  {
    name: "Matsuri",
    location: LOCATIONS.ArtistAlleyMatsuri,
    periods: [
      {
        from: friday(16),
        to: friday(19)
      }
    ]
  },
  {
    name: "Ducky Yard Sale",
    subtext: "Pickup/Drop off only",
    link: 'https://viencon.nl/ducky-yard-sale',
    location: LOCATIONS.HawkArena,
    periods: [
      {
        from: friday(16),
        to: friday(19)
      }
    ]
  },
  {
    name: "Pool open",
    location: LOCATIONS.Pool,
    periods: [
      {
        from: friday(16),
        to: friday(18),
      },
      {
        from: friday(20),
        to: friday(23),
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
        from: friday(18),
        to: friday(20),
      },
    ],
  },
  {
    name: "Gameroom / Karaoke",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/nerdcore',
    periods: [
      {
        from: friday(16),
        to: saturday(3)
      }
    ]
  },
  {
    name: "Opening Ceremony",
    location: LOCATIONS.HawkArena,
    periods: [
      {
        from: friday(19),
        to: friday(20)
      }
    ]
  },
  {
    name: "Unmei Idols",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    periods: [
      {
        from: friday(20),
        to: friday(21, 30)
      }
    ]
  },
  {
    name: "Deshima Sounds",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    periods: [
      {
        from: saturday(0),
        to: saturday(3)
      }
    ]
  },
  {
    name: "Festival Lantern Workshop",
    location: LOCATIONS.Mainstage.subroom.roomTwo,
    link: 'https://viencon.nl/lantern-making',
    periods: [
      {
        from: friday(20),
        to: friday(21, 30)
      }
    ]
  },
  {
    name: "Fuji no En",
    subtext: "Maid & Butler Cafe",
    link: 'https://viencon.nl/fuji-no-en',
    location: LOCATIONS.SharkHouse,
    periods: [
      {
        from: friday(12),
        to: friday(18)
      }
    ]
  },
  {
    name: "Izakaya",
    location: LOCATIONS.SharkHouse,
    link: 'https://viencon.nl/izakaya',
    periods: [
      {
        from: friday(22),
        to: saturday(1, 30)
      }
    ]
  },
  {
    name: "Slide Quest",
    location: LOCATIONS.DuckyDomeStage,
    link: 'https://viencon.nl/slide-quest',
    periods: [
      {
        from: friday(22, 30),
        to: friday(23, 30)
      }
    ]
  },
  {
    name: "Pon de Beats",
    location: LOCATIONS.DuckyDomeStage,
    periods: [
      {
        from: saturday(0),
        to: saturday(3)
      }
    ]
  },
  {
    name: "Mead Tasting",
    location: LOCATIONS.DuckyFallsTent,
    link: 'https://viencon.nl/mead-tasting',
    periods: [
      {
        from: friday(20),
        to: friday(21, 30)
      }
    ]
  },
  {
    name: "Pong Competition",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/nerdcore',
    periods: [
      {
        from: friday(20, 30),
        to: friday(22, 30)
      }
    ]
  },
]

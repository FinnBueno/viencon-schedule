import { LOCATIONS } from "../locations";
import { saturday, sunday, type EventWithoutIds } from "./timestamps";

export const SATURDAY_EVENTS: EventWithoutIds[] = [
  // All-day events
  {
    name: "Artist Alley / Matsuri / Ducky Yard Sale",
    location: LOCATIONS.HawkArena.subroom.market,
    link: 'https://viencon.nl/ducky-yard-sale',
    periods: [
      {
        from: saturday(12),
        to: saturday(18)
      }
    ]
  },
  {
    name: "Pool open",
    subtext: "Photoshoots only",
    location: LOCATIONS.Pool,
    periods: [
      {
        from: saturday(9),
        to: saturday(12)
      }
    ]
  },
  {
    name: "Pool open",
    location: LOCATIONS.Pool,
    periods: [
      {
        from: saturday(12),
        to: saturday(18),
      },
      {
        from: saturday(20),
        to: saturday(23),
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
        from: saturday(18),
        to: saturday(20),
      },
    ],
  },
  {
    name: "Gameroom / Karaoke",
    location: LOCATIONS.GameroomKaraoke,
    periods: [
      {
        from: saturday(12),
        to: sunday(3)
      }
    ]
  },
  {
    name: "Low Budget Cosplay",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    link: 'https://viencon.nl/low-budget-cosplay',
    periods: [
      {
        from: saturday(14),
        to: saturday(16)
      }
    ]
  },
  {
    name: "Cosplay Catwalk",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    periods: [
      {
        from: saturday(16, 30),
        to: saturday(17, 30)
      }
    ]
  },
  {
    name: "Doremelody",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    periods: [
      {
        from: saturday(20),
        to: saturday(21)
      }
    ]
  },
  {
    name: "Deshima Sounds",
    location: LOCATIONS.Mainstage.subroom.roomOne,
    periods: [
      {
        from: sunday(0),
        to: sunday(3)
      }
    ]
  },
  {
    name: "Pon de Beats",
    location: LOCATIONS.DuckyDomeStage,
    periods: [
      {
        from: sunday(0),
        to: sunday(3)
      }
    ]
  },
  {
    name: "Asgard Sings",
    subtext: "Balfolk",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/asgardsings',
    periods: [
      {
        from: saturday(15),
        to: saturday(16)
      }
    ]
  },
  {
    name: "Overcooked Competition",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/nerdcore',
    periods: [
      {
        from: saturday(16, 30),
        to: saturday(19, 30)
      }
    ]
  },
  {
    name: "Asgard Sings",
    subtext: "Thor's Voice Battle",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/asgardsings',
    periods: [
      {
        from: saturday(19, 30),
        to: saturday(21)
      }
    ]
  },
  {
    name: "Soul Calibur Competition",
    location: LOCATIONS.GameroomKaraoke,
    link: 'https://viencon.nl/nerdcore',
    periods: [
      {
        from: saturday(21),
        to: sunday(0)
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
        from: saturday(12),
        to: saturday(18)
      }
    ]
  },
  {
    name: "Izakaya",
    location: LOCATIONS.SharkHouse,
    link: 'https://viencon.nl/izakaya',
    periods: [
      {
        from: saturday(21),
        to: sunday(1, 30)
      }
    ]
  },
  {
    name: "Beer Tasting",
    location: LOCATIONS.DuckyFallsTent,
    link: 'https://viencon.nl/beer-tasting',
    periods: [
      {
        from: saturday(17, 30),
        to: saturday(19)
      }
    ]
  },
  {
    name: "House Games",
    location: LOCATIONS.HawkArena.subroom.eventRooms,
    link: 'https://viencon.nl/house-games',
    periods: [
      {
        from: saturday(12, 30),
        to: saturday(14)
      }
    ]
  },
  {
    name: "Dodgeball",
    location: LOCATIONS.HawkArena.subroom.eventRooms,
    link: 'https://viencon.nl/dodgeball',
    periods: [
      {
        from: saturday(14),
        to: saturday(16)
      }
    ]
  },
  {
    name: "House Games",
    location: LOCATIONS.HawkArena.subroom.eventRooms,
    link: 'https://viencon.nl/house-games',
    periods: [
      {
        from: saturday(16),
        to: saturday(18)
      }
    ]
  },
  {
    name: "Aqua Fitness",
    location: LOCATIONS.Pool,
    link: 'https://viencon.nl/aquafit',
    periods: [
      {
        from: saturday(13),
        to: saturday(13, 45)
      }
    ]
  },
];
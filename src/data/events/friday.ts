import { friday, saturday, type Event } from "./timestamps";
import { LOCATIONS } from "../locations";

export const FRIDAY_EVENTS: Event[] = [

  // All-day events
  {
    name: "Matsuri / Ducky Yard Sale ",
    subtext: "Pickup/Drop off only",
    location: LOCATIONS.HawkArena.subroom.market,
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
    periods: [
      {
        from: friday(16),
        to: saturday(3)
      }
    ]
  },
  {
    name: "Opening Ceremony",
    location: LOCATIONS.HawkArena.subroom.eventRooms,
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
    periods: [
      {
        from: friday(20, 30),
        to: friday(22, 30)
      }
    ]
  },
]

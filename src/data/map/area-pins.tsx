import { ArtistAlleyMatsuriPinContent } from '../../components/map/tooltips/content/ArtistAlleyMatsuriContent';
import { DuckyDomeStagePinContent } from '../../components/map/tooltips/content/DuckyDomeStageContent';
import { DuckyFallsPinContent } from '../../components/map/tooltips/content/DuckyFallsContent';
import { DuckyYardSalePinContent } from '../../components/map/tooltips/content/hawk-arena/DuckyYardSaleContent';
import { GameroomKaraokePinContent } from '../../components/map/tooltips/content/GameroomContent';
import { MainStageOnePinContent } from '../../components/map/tooltips/content/MainStageOneContent';
import { MainStageTwoPinContent } from '../../components/map/tooltips/content/MainStageTwoContent';
import { PoolPinContent } from '../../components/map/tooltips/content/PoolPinContent';
import { SharkHousePinContent } from '../../components/map/tooltips/content/SharkHouseContent';
import { LOCATIONS } from '../locations';
import type { PinWithoutId } from './pins';
import { OpeningStagePinContent } from '../../components/map/tooltips/content/hawk-arena/OpeningStageContext';
import { HawkArenaMiscPinContent } from '../../components/map/tooltips/content/hawk-arena/HawkArenaMiscContent';

const matsuriArtistAlleyPinTemplate: Omit<PinWithoutId, 'x' | 'y'> = {
  location: LOCATIONS.ArtistAlleyMatsuri,
  type: 'area',
  content: <ArtistAlleyMatsuriPinContent />,
};

export const AREA_PINS: PinWithoutId[] = [
  {
    x: 0.671,
    y: 0.554,
    location: LOCATIONS.Mainstage.subroom.roomOne,
    type: 'area',
    content: <MainStageOnePinContent />,
  },
  {
    x: 0.684,
    y: 0.509,
    location: LOCATIONS.Mainstage.subroom.roomTwo,
    type: 'area',
    content: <MainStageTwoPinContent />,
  },
  {
    x: 0.652,
    y: 0.43,
    location: LOCATIONS.GameroomKaraoke,
    type: 'area',
    content: <GameroomKaraokePinContent />,
  },
  {
    x: 0.645,
    y: 0.471,
    name: 'Draw wall',
    type: 'area',
  },
  {
    x: 0.359,
    y: 0.321,
    location: LOCATIONS.Pool,
    type: 'area',
    content: <PoolPinContent />,
  },
  {
    x: 0.564,
    y: 0.39,
    location: LOCATIONS.DuckyDomeStage,
    type: 'area',
    content: <DuckyDomeStagePinContent />,
  },
  {
    x: 0.683,
    y: 0.43,
    name: 'Wishing Alley',
    type: 'area',
  },
  {
    x: 0.748,
    y: 0.527,
    location: LOCATIONS.DuckyFallsTent,
    type: 'area',
    content: <DuckyFallsPinContent />,
  },
  {
    x: 0.904,
    y: 0.506,
    location: LOCATIONS.SharkHouse,
    type: 'area',
    content: <SharkHousePinContent />,
  },
  {
    ...matsuriArtistAlleyPinTemplate,
    x: 0.456,
    y: 0.631,
  },
  {
    ...matsuriArtistAlleyPinTemplate,
    x: 0.305,
    y: 0.635,
  },
  {
    ...matsuriArtistAlleyPinTemplate,
    x: 0.243,
    y: 0.707,
  },
  {
    ...matsuriArtistAlleyPinTemplate,
    x: 0.214,
    y: 0.804,
  },
  {
    x: 0.098,
    y: 0.791,
    partOf: LOCATIONS.HawkArena,
    name: `Ducky's Yard Sale 🦆`,
    type: 'area',
    content: <DuckyYardSalePinContent />,
  },
  {
    x: 0.099,
    y: 0.864,
    partOf: LOCATIONS.HawkArena,
    name: 'Hawk Gym',
    type: 'area',
    content: <HawkArenaMiscPinContent />,
  },
  {
    x: 0.123,
    y: 0.903,
    partOf: LOCATIONS.HawkArena,
    name: 'Opening and Ending Stage',
    type: 'area',
    content: <OpeningStagePinContent />,
  },
  {
    x: 0.159,
    y: 0.869,
    partOf: LOCATIONS.HawkArena,
    name: 'Event Hall 3',
    type: 'area',
  },
  {
    x: 0.153,
    y: 0.885,
    partOf: LOCATIONS.HawkArena,
    name: 'Event Hall 4',
    type: 'area',
  },
];

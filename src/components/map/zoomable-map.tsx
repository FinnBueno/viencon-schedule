import { type FC, type ReactNode } from 'react';

import styled from '@emotion/styled';
import type { Pin } from '../../data/map/pins';
import { PinTooltip } from './pin-tooltip';
import { MapPin } from './pin';
import {
  MapProvider,
  useMapPins,
  useMapSurface,
  useMapTooltip,
} from '../../context/MapContext';

interface ZoomableMapProps {
  pins?: Pin[];
  target?: string;
  img: string;
  pinFinder: (pin: Pin, id: string) => boolean;
  children?: ReactNode;
}

const Container = styled.div`
  width: 100vw;
  height: calc(100dvh - 56px);
  overflow: hidden;
  touch-action: none; /* we handle all touch gestures ourselves */
  user-select: none;
  -webkit-user-select: none;
  @media (min-width: 769px) {
    height: 100dvh;
  }
`;

const Stage = styled.div<{ ready: boolean }>`
  position: relative;
  width: 100%;
  transform-origin: 0 0;
  will-change: transform;
  visibility: ${(props) => (props.ready ? 'visible' : 'hidden')};
`;

const MapImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
`;

export const ZoomableMap: FC<ZoomableMapProps> = ({
  pins = [],
  target,
  img,
  pinFinder,
  children,
}) => (
  // setup map provider so children like pins can use hooks to access map data
  <MapProvider pins={pins} target={target} pinFinder={pinFinder}>
    {children}
    <MapCanvas img={img} />
  </MapProvider>
);

const MapCanvas: FC<{ img: string }> = ({ img }) => {
  const { containerRef, contentRef, applyTransform, closePin, ready } =
    useMapSurface();
  const pins = useMapPins();
  const { openPin } = useMapTooltip();

  return (
    <Container ref={containerRef} onClick={closePin}>
      <Stage ref={contentRef} ready={ready}>
        <MapImage
          src={img}
          alt="map"
          draggable={false}
          onLoad={applyTransform}
          // // TEMP: log fractional coordinates of a clicked point for authoring pins.
          // onClick={(e) => {
          //   const rect = e.currentTarget.getBoundingClientRect();
          //   const x = (e.clientX - rect.left) / rect.width;
          //   const y = (e.clientY - rect.top) / rect.height;
          //   navigator.clipboard.writeText(
          //     `x: ${x.toFixed(3)}, y: ${y.toFixed(3)}`,
          //   );
          // }}
        />
        {pins.map((pin) => (
          <MapPin key={pin.id} pin={pin} />
        ))}
        {openPin && <PinTooltip />}
      </Stage>
    </Container>
  );
};

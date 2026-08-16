import type { FC } from 'react';
import map from '../../assets/viencon-map.webp';
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
}

const Container = styled.div`
  width: 100vw;
  height: calc(100dvh - 56px);
  overflow: hidden;
  touch-action: none; /* we handle all touch gestures ourselves */
  user-select: none;
  -webkit-user-select: none;
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  transform-origin: 0 0;
  will-change: transform;
`;

const MapImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
`;

export const ZoomableMap: FC<ZoomableMapProps> = ({ pins = [] }) => (
  // setup map provider so children like pins can use hooks to access map data
  <MapProvider pins={pins}>
    <MapCanvas />
  </MapProvider>
);

const MapCanvas: FC = () => {
  const { containerRef, contentRef, applyTransform, closePin } =
    useMapSurface();
  const pins = useMapPins();
  const { openPin } = useMapTooltip();

  return (
    <Container ref={containerRef} onClick={closePin}>
      <Stage ref={contentRef}>
        <MapImage
          src={map}
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

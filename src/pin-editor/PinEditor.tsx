import { useCallback, useRef, useState, type FC } from 'react';
import styled from '@emotion/styled';
import { usePinchZoom } from '../hooks/use-pinch-zoom';
import { HOUSE_COORDINATES } from '../data/park/getHouseCoordinates';
import mapImg from '../assets/viencon-park-map.avif';
import { EditablePin } from './EditablePin';

// Pin-position editor. Not part of the app UI — open it by adding
// "#pin-editor" to the URL on localhost (wired up in src/main.tsx). Drag any
// pin to move it; every drop logs the full, updated coordinate map to the
// console as a JSON string so it can be pasted back into
// src/data/park/getHouseCoordinates.ts.
// super high-tech, I know

const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
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

const Hint = styled.div`
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 2;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font:
    12px/1.4 Arial,
    sans-serif;
  pointer-events: none;
`;

interface EditorPin {
  id: string;
  x: number;
  y: number;
}

const round = (value: number) => Math.round(value * 10000) / 10000;

const initialPins: EditorPin[] = Object.entries(HOUSE_COORDINATES).map(
  ([id, { x, y }]) => ({ id, x, y }),
);

export const PinEditor: FC = () => {
  const { containerRef, contentRef, applyTransform, ready } = usePinchZoom<
    HTMLDivElement,
    HTMLDivElement
  >();
  const [pins, setPins] = useState<EditorPin[]>(initialPins);
  // Mirror of `pins` so the drop handler can read the latest positions without
  // being re-created on every drag.
  const pinsRef = useRef<EditorPin[]>(initialPins);

  const toFraction = useCallback(
    (clientX: number, clientY: number) => {
      const rect = contentRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height,
      };
    },
    [contentRef],
  );

  const handleDrag = useCallback((id: string, x: number, y: number) => {
    const next = pinsRef.current.map((pin) =>
      pin.id === id ? { ...pin, x, y } : pin,
    );
    pinsRef.current = next;
    setPins(next);
  }, []);

  const handleDrop = useCallback(() => {
    const map: Record<string, { x: number; y: number }> = {};
    for (const pin of pinsRef.current)
      map[pin.id] = { x: round(pin.x), y: round(pin.y) };
    console.log(JSON.stringify(map));
  }, []);

  return (
    <Container ref={containerRef}>
      <Hint>
        Drag pins to reposition. Each drop logs updated JSON to console.
      </Hint>
      <Stage ref={contentRef} ready={ready}>
        <MapImage
          src={mapImg}
          alt="map"
          draggable={false}
          onLoad={applyTransform}
        />
        {pins.map((pin) => (
          <EditablePin
            key={pin.id}
            id={pin.id}
            x={pin.x}
            y={pin.y}
            onDrag={handleDrag}
            onDrop={handleDrop}
            toFraction={toFraction}
          />
        ))}
      </Stage>
    </Container>
  );
};

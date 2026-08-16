import { useEffect, useRef, type FC } from 'react';
import styled from '@emotion/styled';
import { IoIosPin } from 'react-icons/io';

interface Props {
  id: string;
  x: number;
  y: number;
  onDrag: (id: string, x: number, y: number) => void;
  onDrop: () => void;
  // Converts a screen point to a fraction (0–1) of the map, ignoring pan/zoom.
  toFraction: (clientX: number, clientY: number) => { x: number; y: number };
}

const Wrapper = styled.div`
  position: absolute;
  /* Anchor the tip to (x, y) and dampen the map zoom so pins stay grabbable. */
  transform-origin: bottom center;
  transform: translate(-50%, -100%)
    scale(calc(1 / (1 + (var(--map-scale, 1) - 1) * 0.4)));
  will-change: transform;
  display: flex;
  cursor: grab;
  color: #ff2d55;
  overflow: visible;
  touch-action: none;
`;

// A single draggable pin. It uses native pointer listeners (not React's
// synthetic ones) so that dragging a pin can stop the event before the map's
// own native pointerdown listener starts a pan.
export const EditablePin: FC<Props> = ({
  id,
  x,
  y,
  onDrag,
  onDrop,
  toFraction,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  // Offset between the pin's tip and the grab point, kept constant while
  // dragging so the pin doesn't jump under the cursor.
  const grabOffset = useRef({ x: 0, y: 0 });
  // Latest props, read inside the native listeners without re-binding them.
  const latest = useRef({ x, y, onDrag, onDrop, toFraction });
  latest.current = { x, y, onDrag, onDrop, toFraction };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const down = (e: PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dragging.current = true;
      el.setPointerCapture(e.pointerId);
      const f = latest.current.toFraction(e.clientX, e.clientY);
      grabOffset.current = {
        x: latest.current.x - f.x,
        y: latest.current.y - f.y,
      };
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.stopPropagation();
      const f = latest.current.toFraction(e.clientX, e.clientY);
      latest.current.onDrag(
        id,
        f.x + grabOffset.current.x,
        f.y + grabOffset.current.y,
      );
    };
    const up = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      if (el.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
      latest.current.onDrop();
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [id]);

  return (
    <Wrapper
      ref={elRef}
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      title={id}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          color: 'black',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        {id}
      </div>
      <IoIosPin
        size={28}
        style={{ filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
      />
    </Wrapper>
  );
};

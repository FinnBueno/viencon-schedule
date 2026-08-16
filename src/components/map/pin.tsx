import styled from '@emotion/styled';
import type { FC } from 'react';
import type { Pin, PinType } from '../../data/map/pins';
import { usePin } from '../../context/MapContext';
import { IoIosPin } from 'react-icons/io';

interface Props {
  pin: Pin;
}

const StyledPin = styled.div<{ type: PinType }>`
  position: absolute;
  /* Anchor the pin's tip to (x, y); counter-scale (dampened by 0.5) so it stays
     roughly constant instead of tracking the map's zoom one-to-one. */
  transform-origin: bottom center;
  transform: translate(-50%, -100%)
    scale(calc(1 / (1 + (var(--map-scale, 1) - 1) * 0.4)));
  // make sure svg doesn't become crusty
  will-change: transform;
  display: flex;
  cursor: pointer;
  color: ${(props) => props.theme.color.pins[props.type]};
  overflow: visible;
`;

export const MapPin: FC<Props> = ({ pin }) => {
  const { isHighlighted, toggle, ref } = usePin(pin.id);
  return (
    <StyledPin
      style={{
        left: `${pin.x * 100}%`,
        top: `${pin.y * 100}%`,
        // lift the open pin so its tooltip renders over other pins.
        zIndex: isHighlighted ? 1 : undefined,
      }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      type={pin.type}
    >
      <IoIosPin
        size={28}
        style={{
          filter: 'drop-shadow( 0px 0px 2px rgba(0, 0, 0, 1))',
        }}
      />
    </StyledPin>
  );
};

import type { FC } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useAnchoredTooltip } from '../../hooks/use-anchored-tooltip';
import { ALL_LOCATIONS, type Location } from '../../data/locations';
import { useMapTooltip } from '../../context/MapContext';
import { TooltipText } from './tooltips/TooltipText';
import { TooltipContainer } from './tooltips/TooltipContainer';

const Tooltip = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px 10px;
  border-radius: 8px;
  max-width: 240px;
  width: fit-content;
  background-color: ${({ theme }) => theme.color.backgroundHighlight};
  color: ${({ theme }) => theme.color.font.onBackground};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  /* Passive label: let clicks fall through to pins it may overlap. */
  pointer-events: none;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Header = styled.h4`
  margin: 0 0 0 0;
`;

const PartOfPin = styled.span`
  padding: 2px 6px;
  font-weight: 600;
  font-size: 0.7em;
  border-radius: 99px;
  background-color: ${(props) => props.theme.color.location};
`;

export const PinTooltip: FC = () => {
  const { openPin, anchorRef, subscribe } = useMapTooltip();
  const tooltipRef = useAnchoredTooltip(anchorRef, subscribe, openPin);

  if (!openPin) return null;

  const header =
    openPin.name ??
    (openPin.location ? getLocationName(openPin.location) : undefined);

  const content =
    openPin.content ??
    (openPin.location || openPin.partOf ? (
      <TooltipContainer>
        <TooltipText>See schedule for programming</TooltipText>
      </TooltipContainer>
    ) : null);

  return createPortal(
    <Tooltip ref={tooltipRef}>
      {header && <Header>{header}</Header>}
      {openPin.partOf ? <PartOfPin>{openPin.partOf.name}</PartOfPin> : null}
      {content}
    </Tooltip>,
    document.body,
  );
};

const getLocationName = (location: Location): string | undefined => {
  for (const loc of ALL_LOCATIONS) {
    if (loc.id === location.id) return `${location.name} ${location.emoji}`;
    if (loc.subroom) {
      const subroom = loc.subroom[location.id];
      if (!subroom) continue;
      return `${loc.name} ${location.name} ${loc.emoji} ${location.emoji}`;
    }
  }
  return undefined;
};

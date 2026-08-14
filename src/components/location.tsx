import type { FC } from "react";
import type { Location } from "../data/locations";
import styled from "@emotion/styled";

const LargeLocationRow = styled.div<{ roomId: string; hide: boolean }>`
  grid-column: start-header / end-header;
  grid-row: ${({ roomId }) => `${roomId}-start / ${roomId}-end`};

  padding: 0px 12px 0 8px;
  margin-right: 32px;

  position: sticky;
  left: 0;
  align-self: start;

  background-color: ${(props) => props.theme.color.location};
  border-radius: 0 12px 12px 0;
  box-shadow: 8px 0px 12px -3px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 8px 0px 12px -3px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 8px 0px 12px -3px rgba(0, 0, 0, 0.15);

  color: ${(props) => props.theme.color.font.onForeground};
  text-align: right;

  transition: opacity 200ms;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  &:hover {
    opacity: 1;
  }

  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  z-index: 2;
`;

const SmallLocationRow = styled(LargeLocationRow)`
  width: fit-content;
  display: flex;
  align-items: center;
  height: 100%;
  pointer-events: none;

  z-index: 2;
`;

const LocationRowContent = styled.p`
  padding: 4px 0;
`;

const SHRINK_THRESHOLD = 75;

export const LocationRow: FC<{ scrollPosition: number; loc: Location }> = ({
  scrollPosition,
  loc,
}) => (
  <>
    <SmallLocationRow roomId={loc.id} hide={scrollPosition <= SHRINK_THRESHOLD}>
      <LocationRowContent>{loc.emoji}</LocationRowContent>
    </SmallLocationRow>
    <LargeLocationRow roomId={loc.id} hide={scrollPosition > SHRINK_THRESHOLD}>
      <LocationRowContent
        dangerouslySetInnerHTML={{
          __html: loc.name,
        }}
      />
    </LargeLocationRow>
  </>
);

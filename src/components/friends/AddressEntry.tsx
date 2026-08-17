import { useEffect, useRef, useState, type FC, type PointerEvent } from 'react';
import type { HouseAddress } from '../../data/park/getHouseCoordinates';
import { useFriends, type FriendEntry } from '../../context/FriendsContext';
import styled from '@emotion/styled';
import { IoPersonRemove } from 'react-icons/io5';
import { IconButton } from '../atoms/icon-button';
import { IoIosPin } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import { useModal } from '../../context/ModalContext';
import { ConfirmHouseDeletionModal } from './ConfirmHouseDeletionModal';
import { usePin } from '../../context/MapContext';

interface Props {
  address: HouseAddress;
  friends: FriendEntry[];
  closeMenu: () => void;
  initiateHighlight?: boolean;
}

const Container = styled.div<{ isHighlighted?: boolean }>`
  display: flex;

  background-color: ${(props) => props.theme.color.friendBlock};
  box-sizing: border-box;

  padding: 8px 8px;
  border-radius: 4px;
  gap: 8px;

  transition:
    outline 1000ms,
    box-shadow 1000ms;

  ${(props) =>
    props.isHighlighted
      ? `
    outline: 3px solid #ffd400;
    box-shadow: 0 0 0 3px #ffd400, 0 0 16px 4px rgba(255, 212, 0, 0.8);
  `
      : ''}

  margin: 0 8px;
  box-sizing: border-box;
`;

const HouseNumberLabel = styled.h3`
  margin: 0;
  font-weight: normal;
`;

const PillGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ColumnPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const AddressEntry: FC<Props> = ({
  address,
  friends,
  closeMenu,
  initiateHighlight,
}) => {
  const { openModal, closeModal } = useModal();
  const { removeFriend, removeHouse } = useFriends();
  const { panTo } = usePin(address);
  const [isHighlighted, setHighlighted] = useState(initiateHighlight);
  const highlightDisableRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initiateHighlight) return;

    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });

    if (highlightDisableRef.current) clearTimeout(highlightDisableRef.current);

    highlightDisableRef.current = setTimeout(() => setHighlighted(false), 2000);
    return () => {
      if (highlightDisableRef.current)
        clearTimeout(highlightDisableRef.current);
    };
  }, [initiateHighlight]);

  const goToHouse = () => {
    panTo();
    closeMenu();
  };

  const deleteHouse = () => {
    removeHouse(address);
    closeModal();
  };

  return (
    <Container ref={containerRef} isHighlighted={isHighlighted}>
      <ColumnPanel>
        <HouseNumberLabel>
          House Number: <b>{address}</b>
        </HouseNumberLabel>
        <PillGroup>
          {friends.map((friend) => (
            <FriendPill
              key={friend.houseNumber + friend.name}
              friend={friend}
              onRemove={() => removeFriend(friend)}
            />
          ))}
        </PillGroup>
      </ColumnPanel>
      <IconButton onClick={goToHouse}>
        <IoIosPin size={36} />
      </IconButton>
      <IconButton
        style={{ marginRight: '8px' }}
        onClick={() =>
          openModal(<ConfirmHouseDeletionModal onComplete={deleteHouse} />)
        }
      >
        <FaTrashCan size={28} />
      </IconButton>
    </Container>
  );
};

const HOLD_DURATION_MS = 1000;

const Pill = styled.span`
  position: relative;
  width: fit-content;
  flex: 0;
  background-color: ${(props) => props.theme.color.eventBlock};
  padding: 4px 12px;
  border-radius: 16px;

  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
`;

const OutlineSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`;

// pathLength normalises the perimeter to 100 so the dash draws at a constant
// speed along the border regardless of the pill's aspect ratio.
const OutlineRect = styled.rect`
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  fill: none;
  stroke: ${(props) => props.theme.color.pins.gates};
  stroke-width: 2px;
  stroke-dasharray: 100;
  stroke-dashoffset: calc((1 - var(--hold-progress, 0)) * 100);
`;

const RemoveIcon = styled.span`
  display: inline-flex;
  color: ${(props) => props.theme.color.font.onBackground};
`;

const FriendPill: FC<{ friend: FriendEntry; onRemove: () => void }> = ({
  friend,
  onRemove,
}) => {
  const pillRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);

  const setProgress = (fraction: number) => {
    pillRef.current?.style.setProperty('--hold-progress', String(fraction));
  };

  const stopHold = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setProgress(0);
  };

  const tick = (now: number) => {
    const fraction = Math.min((now - startRef.current) / HOLD_DURATION_MS, 1);
    setProgress(fraction);
    if (fraction >= 1) {
      rafRef.current = null;
      setProgress(0);
      onRemove();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleHoldStart = (event: PointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    if (rafRef.current !== null) return;
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <Pill
      ref={pillRef}
      title="Hold to remove"
      onPointerDown={handleHoldStart}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
      onPointerCancel={stopHold}
    >
      {friend.name}
      <RemoveIcon aria-hidden>
        <IoPersonRemove />
      </RemoveIcon>
      <OutlineSvg aria-hidden>
        <OutlineRect x={1} y={1} rx={15} ry={15} pathLength={100} />
      </OutlineSvg>
    </Pill>
  );
};

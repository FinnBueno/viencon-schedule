import type { RefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';

const EDGE_MARGIN = 4; // min gap the tooltip keeps from the viewport edge
const GAP = 6; // vertical gap between the anchor and the tooltip

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Positions a fixed/portalled tooltip above `anchorRef` in screen space,
 * re-clamping on every `subscribe` notification (e.g. a map pan/zoom). While
 * the anchor is on screen the tooltip keeps EDGE_MARGIN from the viewport edge;
 * once the anchor leaves, the bound freezes so the tooltip follows it off screen.
 * Pass a `dependency` that changes when the tooltip's content (and thus size) does.
 */
export const useAnchoredTooltip = (
  anchorRef: RefObject<HTMLElement | null>,
  subscribe: (listener: () => void) => () => void,
  dependency?: unknown,
) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reposition = () => {
      const anchor = anchorRef.current;
      const tooltip = tooltipRef.current;
      if (!anchor || !tooltip) return;

      const anchorRect = anchor.getBoundingClientRect();
      const ttRect = tooltip.getBoundingClientRect();
      const vw = window.innerWidth;
      const half = ttRect.width / 2;
      const anchorCenterX = anchorRect.left + anchorRect.width / 2;

      const clampedX = clamp(anchorCenterX, 0, vw);
      const lower = EDGE_MARGIN + half - clampedX;
      const upper = vw - EDGE_MARGIN - half - clampedX;
      const shift =
        upper < lower ? vw / 2 - anchorCenterX : clamp(0, lower, upper);

      tooltip.style.left = `${anchorCenterX + shift - half}px`;
      tooltip.style.top = `${anchorRect.top - ttRect.height - GAP}px`;
    };

    reposition();
    return subscribe(reposition);
  }, [anchorRef, subscribe, dependency]);

  return tooltipRef;
};

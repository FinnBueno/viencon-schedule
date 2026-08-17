import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_SCALE = 6;
const PADDING = 48; // how far the image edge can be dragged past the container
const DRAG_THRESHOLD = 6; // px a single pointer must travel before it pans (vs. a tap)

// A point on the map to centre on first, as fractions (0–1) of the map, plus
// the scale to zoom to.
export interface Focus {
  x: number;
  y: number;
  scale: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const distance = (a: PointerEvent, b: PointerEvent) =>
  Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

export const usePinchZoom = <
  Container extends HTMLElement,
  Content extends HTMLElement,
>(
  // Consulted once, when the map first gets real dimensions, so the very first
  // paint is already centred on the focus (no flash of the whole map first).
  initialFocus?: () => Focus | null,
) => {
  const containerRef = useRef<Container>(null);
  const contentRef = useRef<Content>(null);
  const initialFocusRef = useRef(initialFocus);
  initialFocusRef.current = initialFocus;
  // False until the first transform is applied, so the map can stay hidden
  // and avoid flashing at the top-left before it's centred.
  const [ready, setReady] = useState(false);

  const pointers = useRef(new Map<number, PointerEvent>());
  const transform = useRef({ scale: 1, tx: 0, ty: 0 });
  const lastPinch = useRef<{ dist: number; midX: number; midY: number } | null>(
    null,
  );
  const initialised = useRef(false);
  // A single-pointer gesture only becomes a pan once it moves past
  // DRAG_THRESHOLD; until then it stays a tap so the click reaches a pin.
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const panning = useRef(false);
  // Previous pointer position of an in-progress pan. We derive the pan delta
  // from clientX/clientY rather than movementX/movementY because Firefox
  // reports movement in scaled screen pixels (and inconsistently once the
  // pointer is captured), which makes single-finger dragging wonky there.
  const lastPan = useRef<{ x: number; y: number } | null>(null);
  // Notified after every transform change so overlays (e.g. a pin tooltip
  // positioned in screen space) can re-read the pin's on-screen position.
  const listeners = useRef(new Set<() => void>());

  const subscribe = useCallback((listener: () => void) => {
    listeners.current.add(listener);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  // Smallest scale that still fits the whole image in the container. On wide
  // (landscape) viewports the width-fitted image is taller than the viewport,
  // so this drops below 1 to let you zoom out until the full map is visible.
  const getMinScale = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || !content.offsetHeight) return 1;
    return Math.min(1, container.clientHeight / content.offsetHeight);
  }, []);

  const applyTransform = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const bw = content.offsetWidth; // unscaled (fits container width)
    const bh = content.offsetHeight;

    const minScale = getMinScale();
    if (!initialised.current && bh) {
      const focus = initialFocusRef.current?.();
      if (focus) {
        // Start zoomed in on the focus point, centred in the container.
        const s = clamp(focus.scale, minScale, MAX_SCALE);
        transform.current.scale = s;
        transform.current.tx = cw / 2 - focus.x * bw * s;
        transform.current.ty = ch / 2 - focus.y * bh * s;
      } else {
        // Start with the whole map visible and centred.
        transform.current.scale = minScale;
        transform.current.tx = (cw - bw * minScale) / 2;
        transform.current.ty = (ch - bh * minScale) / 2;
      }
      initialised.current = true;
      setReady(true);
    }
    const scale = clamp(transform.current.scale, minScale, MAX_SCALE);
    transform.current.scale = scale;

    const sw = bw * scale;
    const sh = bh * scale;

    // Allow dragging PADDING past each edge, measured from where that edge rests
    // flush against the container. Using min/max(0, c - s) keeps the overscroll
    // identical whether the image is larger or smaller than the container.
    const tx = clamp(
      transform.current.tx,
      Math.min(0, cw - sw) - PADDING,
      Math.max(0, cw - sw) + PADDING,
    );
    const ty = clamp(
      transform.current.ty,
      Math.min(0, ch - sh) - PADDING,
      Math.max(0, ch - sh) + PADDING,
    );
    transform.current.tx = tx;
    transform.current.ty = ty;

    content.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    // Exposed so children (e.g. map pins) can counter-scale to a fixed size.
    content.style.setProperty('--map-scale', String(scale));
    listeners.current.forEach((listener) => listener());
  }, [getMinScale]);

  // Centre the given fractional map point in the container at `scale`, clamped
  // to the map's bounds. Used to pan/zoom to a pin after the map is mounted.
  const focusOn = useCallback(
    ({ x, y, scale }: Focus) => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content || !content.offsetHeight) return;

      const s = clamp(scale, getMinScale(), MAX_SCALE);
      transform.current.scale = s;
      transform.current.tx =
        container.clientWidth / 2 - x * content.offsetWidth * s;
      transform.current.ty =
        container.clientHeight / 2 - y * content.offsetHeight * s;
      applyTransform();
    },
    [applyTransform, getMinScale],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      // Capture is deferred to onPointerMove so a plain tap/click still reaches
      // pins (a capturing container steals their click event).
      pointers.current.set(e.pointerId, e);
      lastPinch.current = null;
      dragStart.current = { x: e.clientX, y: e.clientY };
      panning.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, e);
      const points = [...pointers.current.values()];

      if (points.length >= 2) {
        if (!container.hasPointerCapture(e.pointerId))
          container.setPointerCapture(e.pointerId);
        const [p1, p2] = points;
        const dist = distance(p1, p2);
        const rect = container.getBoundingClientRect();
        const midX = (p1.clientX + p2.clientX) / 2 - rect.left;
        const midY = (p1.clientY + p2.clientY) / 2 - rect.top;

        const prev = lastPinch.current;
        if (prev) {
          const t = transform.current;
          const newScale = clamp(
            t.scale * (dist / prev.dist),
            getMinScale(),
            MAX_SCALE,
          );
          const eff = newScale / t.scale;

          // Pan by the midpoint movement, then zoom around the midpoint.
          t.tx += midX - prev.midX;
          t.ty += midY - prev.midY;
          t.tx = midX - (midX - t.tx) * eff;
          t.ty = midY - (midY - t.ty) * eff;
          t.scale = newScale;
          applyTransform();
        }
        lastPinch.current = { dist, midX, midY };
      } else if (points.length === 1) {
        // Ignore sub-threshold movement so a click with a little jitter still
        // registers as a tap on the pin instead of being stolen as a pan.
        if (!panning.current) {
          const start = dragStart.current;
          if (
            start &&
            Math.hypot(e.clientX - start.x, e.clientY - start.y) <
              DRAG_THRESHOLD
          )
            return;
          panning.current = true;
          lastPan.current = { x: e.clientX, y: e.clientY };
        }
        if (!container.hasPointerCapture(e.pointerId))
          container.setPointerCapture(e.pointerId);
        const last = lastPan.current;
        if (last) {
          transform.current.tx += e.clientX - last.x;
          transform.current.ty += e.clientY - last.y;
        }
        lastPan.current = { x: e.clientX, y: e.clientY };
        applyTransform();
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      lastPinch.current = null;
      dragStart.current = null;
      panning.current = false;
      if (container.hasPointerCapture(e.pointerId))
        container.releasePointerCapture(e.pointerId);
    };

    // Desktop: mouse wheel and trackpad pinch (ctrl+wheel) zoom around the cursor.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const fx = e.clientX - rect.left;
      const fy = e.clientY - rect.top;
      const lines = e.deltaMode === 1 ? 16 : 1; // normalise line-based deltas
      const t = transform.current;
      const newScale = clamp(
        t.scale * Math.exp(-e.deltaY * lines * 0.002),
        getMinScale(),
        MAX_SCALE,
      );
      const eff = newScale / t.scale;
      t.tx = fx - (fx - t.tx) * eff;
      t.ty = fy - (fy - t.ty) * eff;
      t.scale = newScale;
      applyTransform();
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('pointerleave', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Block iOS Safari's page-level pinch zoom while touching the map.
    const preventGesture = (e: Event) => e.preventDefault();
    container.addEventListener('gesturestart', preventGesture);
    container.addEventListener('gesturechange', preventGesture);

    // Re-clamp and re-centre when the viewport (and thus the min scale) changes.
    const onResize = () => applyTransform();
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('pointerleave', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('gesturestart', preventGesture);
      container.removeEventListener('gesturechange', preventGesture);
      window.removeEventListener('resize', onResize);
    };
  }, [applyTransform, getMinScale]);

  return {
    containerRef,
    contentRef,
    applyTransform,
    focusOn,
    subscribe,
    ready,
  };
};

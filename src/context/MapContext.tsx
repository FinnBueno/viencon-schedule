import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
} from 'react';
import type { Pin } from '../data/map/pins';
import { usePinchZoom } from '../hooks/use-pinch-zoom';

type Subscribe = (listener: () => void) => () => void;

const AUTO_FOCUS_SCALE = 3;

interface MapContextValue {
  pins: Pin[];
  openPin: Pin | null;
  anchorRef: RefObject<HTMLDivElement | null>;
  registerPinEl: (id: string, el: HTMLDivElement | null) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  applyTransform: () => void;
  ready: boolean;
  subscribe: Subscribe;
  isPinOpen: (id: string) => boolean;
  togglePin: (id: string) => void;
  closePin: () => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export const MapProvider: FC<{
  pins: Pin[];
  target?: string;
  children: ReactNode;
}> = ({ pins, target, children }) => {
  // The pin whose location (or parent location) matches the requested target.
  const targetPin = target
    ? (pins.find((pin) => pin.location?.id === target) ?? null)
    : null;
  const targetPinRef = useRef(targetPin);
  targetPinRef.current = targetPin;

  const {
    containerRef,
    contentRef,
    applyTransform,
    focusOn,
    subscribe,
    ready,
  } = usePinchZoom<HTMLDivElement, HTMLDivElement>(() => {
    const pin = targetPinRef.current;
    return pin ? { x: pin.x, y: pin.y, scale: AUTO_FOCUS_SCALE } : null;
  });
  const [openPinId, setOpenPinId] = useState<string | null>(null);

  // Re-focus when the target changes after the map is already mounted (the
  // initial focus above only runs once, on the map's first layout). Also open
  // the target pin's tooltip once the map is ready.
  useEffect(() => {
    if (ready && targetPin) {
      focusOn({ x: targetPin.x, y: targetPin.y, scale: AUTO_FOCUS_SCALE });
      setOpenPinId(targetPin.id);
    }
  }, [ready, targetPin, focusOn]);

  const pinEls = useRef(new Map<string, HTMLDivElement>());
  const anchorRef = useRef<HTMLDivElement | null>(null);
  anchorRef.current = openPinId
    ? (pinEls.current.get(openPinId) ?? null)
    : null;
  const openPin = pins.find((pin) => pin.id === openPinId) ?? null;

  const registerPinEl = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) pinEls.current.set(id, el);
    else pinEls.current.delete(id);
  }, []);

  const isPinOpen = useCallback((id: string) => openPinId === id, [openPinId]);
  const togglePin = useCallback(
    (id: string) => setOpenPinId((current) => (current === id ? null : id)),
    [],
  );
  const closePin = useCallback(() => setOpenPinId(null), []);

  return (
    <MapContext.Provider
      value={{
        pins,
        openPin,
        anchorRef,
        registerPinEl,
        containerRef,
        contentRef,
        applyTransform,
        ready,
        subscribe,
        isPinOpen,
        togglePin,
        closePin,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMap = (): MapContextValue => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('Map hooks must be used within a <MapProvider>');
  }
  return context;
};

// The list of pins to render on the map.
// eslint-disable-next-line react-refresh/only-export-components
export const useMapPins = () => useMap().pins;

// refs, transform application and dismissal for the map surface itself.
// eslint-disable-next-line react-refresh/only-export-components
export const useMapSurface = () => {
  const { containerRef, contentRef, applyTransform, closePin, ready } =
    useMap();
  return { containerRef, contentRef, applyTransform, closePin, ready };
};

// per-pin data, like open state, toggle fn and ref to display tooltip
// eslint-disable-next-line react-refresh/only-export-components
export const usePin = (id: string) => {
  const { isPinOpen, togglePin, registerPinEl } = useMap();
  const isHighlighted = isPinOpen(id);
  const toggle = useCallback(() => togglePin(id), [id, togglePin]);
  const ref = useCallback(
    (el: HTMLDivElement | null) => registerPinEl(id, el),
    [id, registerPinEl],
  );
  return {
    isHighlighted,
    toggle,
    ref,
  };
};

// The currently open pin plus what the tooltip needs to anchor to it.
// eslint-disable-next-line react-refresh/only-export-components
export const useMapTooltip = () => {
  const { openPin, anchorRef, subscribe } = useMap();
  return { openPin, anchorRef, subscribe };
};

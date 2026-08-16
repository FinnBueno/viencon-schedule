import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
} from 'react';
import type { Pin } from '../data/map/pins';
import { usePinchZoom } from '../hooks/use-pinch-zoom';

type Subscribe = (listener: () => void) => () => void;

interface MapContextValue {
  pins: Pin[];
  openPin: Pin | null;
  anchorRef: RefObject<HTMLDivElement | null>;
  registerPinEl: (id: string, el: HTMLDivElement | null) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  applyTransform: () => void;
  subscribe: Subscribe;
  isPinOpen: (id: string) => boolean;
  togglePin: (id: string) => void;
  closePin: () => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export const MapProvider: FC<{ pins: Pin[]; children: ReactNode }> = ({
  pins,
  children,
}) => {
  const { containerRef, contentRef, applyTransform, subscribe } = usePinchZoom<
    HTMLDivElement,
    HTMLDivElement
  >();
  const [openPinId, setOpenPinId] = useState<string | null>(null);

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
  const { containerRef, contentRef, applyTransform, closePin } = useMap();
  return { containerRef, contentRef, applyTransform, closePin };
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

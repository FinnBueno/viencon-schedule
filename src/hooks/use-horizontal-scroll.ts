import { useCallback, useEffect, useState, type RefObject } from "react";

export const useHorizontalSrollPosition = (ref: RefObject<HTMLElement | null>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref || !ref.current) return;
  
    const position = ref.current.scrollLeft;
    setScrollPosition(position);
  }, [ref]);

  useEffect(() => {
    if (!ref || !ref.current) return;

    const current = ref.current;

    current.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      current.removeEventListener("scroll", handleScroll);
    };
  }, [ref, handleScroll]);

  return scrollPosition;
};

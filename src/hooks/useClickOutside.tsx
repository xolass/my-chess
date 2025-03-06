import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"] as const;

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    DEFAULT_EVENTS.forEach((event) => {
      document.addEventListener(event, handleClickOutside);
    });

    return () => {
      DEFAULT_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleClickOutside);
      });
    };
  }, [callback]);

  return ref;
};

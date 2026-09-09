import { useEffect, useRef, useState } from "react";

/**
 * Entrance animation helper.
 *
 * Consumers gate content behind `opacity-0` until this returns true, which means
 * a failure here doesn't degrade to "no animation" — it degrades to "content is
 * invisible forever". So the observer is treated as an enhancement, never as the
 * thing standing between a visitor and the page:
 *
 *  - no IntersectionObserver in the environment → visible immediately
 *  - observer present but never fires → a timer reveals it anyway
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const supported = typeof IntersectionObserver !== "undefined";
  const [isVisible, setIsVisible] = useState(!supported);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supported) return;

    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (currentRef) observer.observe(currentRef);

    // Safety net: whatever happens, the content is on screen shortly after load.
    const failsafe = window.setTimeout(() => setIsVisible(true), 1500);

    return () => {
      window.clearTimeout(failsafe);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, supported]);

  return { ref, isVisible };
};

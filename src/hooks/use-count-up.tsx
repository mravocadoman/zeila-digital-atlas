import { useEffect, useRef, useState } from "react";

/**
 * Ticks a stat up to its value when it scrolls into view.
 *
 * Takes the rendered string ("$5M+", "36.34", "10+") and animates only the
 * numeric part, so prefixes and suffixes survive untouched.
 *
 * The important property is the failure mode. An earlier version started the
 * state at 0 and counted up, which meant that anywhere requestAnimationFrame
 * doesn't run the stats rendered "$0M+" — wrong numbers on a page whose whole
 * credibility is its numbers. So the real value is the default, and an
 * interpolated value is only ever written from inside a live animation frame:
 * if rAF never fires, the visitor simply sees the true figure with no animation.
 */
export function useCountUp(display: string, durationMs = 1100) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number | null>(null); // null = show the real thing
  const started = useRef(false);

  const match = display.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const raw = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = match ? parseFloat(raw.replace(/,/g, "")) : NaN;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const animatable = !!match && !Number.isNaN(target);

  useEffect(() => {
    if (!animatable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / durationMs, 1);
        setValue(target * (1 - Math.pow(1 - p, 3))); // ease-out cubic
        if (p < 1) requestAnimationFrame(tick);
        else setValue(null); // hand rendering back to the source string
      };
      requestAnimationFrame(tick);
    };

    const check = () => {
      const el = ref.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        run();
        window.removeEventListener("scroll", check);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
    // primitives only — `match` is a fresh array each render and would thrash
  }, [animatable, target, durationMs]);

  const text =
    value === null ? display : `${prefix}${value.toFixed(decimals)}${suffix}`;

  return { ref, text };
}

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered entrance for a section.
 *
 * The hard-won rule in this file: **never hide content until you have proven the
 * render loop is actually running.**
 *
 * An earlier version hid the section immediately and relied on a timer to reveal
 * it. That timer applied an `animation: … both`, and `both` pins an element to
 * the animation's *first* keyframe when animations don't run — so in any
 * environment where the compositor is paused, every section below the hero sat
 * at `opacity: 0` permanently. The failsafe was causing the failure.
 *
 * So arming is gated on a real requestAnimationFrame callback. If rAF never
 * fires (animations suspended, reduced motion, JS broken), nothing is ever
 * hidden and the visitor just reads a normal page.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  variant: "section" | "card" = "section",
) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"visible" | "armed" | "in">("visible");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cancelled = false;

    // A frame actually painted ⇒ animations will run ⇒ safe to hide.
    raf = requestAnimationFrame(() => {
      if (cancelled) return;
      const el = ref.current;
      if (!el) return;
      // Already on screen at load: leave it be, the hero owns that moment.
      if (el.getBoundingClientRect().top < window.innerHeight - 60) return;
      setState("armed");
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (state !== "armed") return;
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        setState("in");
        window.removeEventListener("scroll", check);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [state]);

  const armed = variant === "card" ? "card-armed" : "reveal-armed";
  const shown = variant === "card" ? "card-in" : "reveal-in";

  return {
    ref,
    className: state === "armed" ? armed : state === "in" ? shown : "",
  };
}

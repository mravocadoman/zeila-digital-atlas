import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "uJ5XHdTOfzk";

/**
 * The YouTube backdrop from the original design, restored — but it no longer
 * costs anything on page load.
 *
 * The old version mounted the iframe immediately, so every visitor downloaded a
 * second YouTube player (~1 MB of JS) whether or not they ever scrolled this far.
 * Here it mounts only when the section is close to the viewport.
 *
 * Deliberately a scroll listener rather than IntersectionObserver: the failure
 * mode of a missed observer callback is "the thing never loads", and this is
 * decoration that should quietly appear rather than depend on an API working.
 */
const VideoBackdrop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      if (top < window.innerHeight + 300) {
        setShow(true);
        window.removeEventListener("scroll", check);
      }
    };

    check(); // in case it's already in view on load
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    >
      {show && (
        <iframe
          className="absolute top-1/2 left-1/2 w-[135%] h-[135%] min-w-[135vw] min-h-[135vh] -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          style={{ border: "none" }}
        />
      )}
      {/* keeps the form legible over whatever frame is playing */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
    </div>
  );
};

export default VideoBackdrop;

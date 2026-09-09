import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "uJ5XHdTOfzk";
const TARGET_RATE = 0.5; // YouTube offers a fixed ladder: 0.25 / 0.5 / 0.75 / 1 …
const LOOP_LEAD = 0.45; // seconds before the end to wrap, so no black frame lands

/**
 * The backdrop behind the contact form.
 *
 * Driven through the IFrame Player API rather than a plain embed, for two
 * reasons. A plain embed gives no playback-rate control, and its `loop=1`
 * parameter wraps by re-seeking at the very end — which shows as a jolt that
 * reads like the video briefly speeding up. Here it runs at half speed and
 * wraps a beat early, while the frame is still moving.
 *
 * Still lazy: the API script and the player are only created once the section
 * is near the viewport, so nothing is downloaded for visitors who never
 * scroll this far.
 */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadPlayerApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

const VideoBackdrop = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // only load anything once the section is close
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const check = () => {
      const el = hostRef.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight + 300) {
        setNear(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (!near || !mountRef.current) return;

    let player: any;
    let wrapTimer = 0;
    let cancelled = false;
    let rate = TARGET_RATE; // resolved against what the video actually offers

    loadPlayerApi().then(() => {
      if (cancelled || !mountRef.current) return;

      player = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          // deliberately no `loop` — it wraps with a visible jolt
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            // setPlaybackRate is a silent no-op for a rate the video does not
            // offer, so snap to the nearest one it does.
            const avail: number[] = e.target.getAvailablePlaybackRates?.() ?? [];
            if (avail.length) {
              rate = avail.reduce((best, r) =>
                Math.abs(r - TARGET_RATE) < Math.abs(best - TARGET_RATE) ? r : best,
              );
            }
            e.target.setPlaybackRate(rate);
            e.target.playVideo();
          },
          onPlaybackRateChange: (e: any) => {
            // YouTube resets the rate across some transitions; hold it
            if (e.target.getPlaybackRate() !== rate) e.target.setPlaybackRate(rate);
          },
          onStateChange: (e: any) => {
            const YT = window.YT;
            if (e.data === YT.PlayerState.PLAYING) {
              e.target.setPlaybackRate(rate);
              window.clearInterval(wrapTimer);
              // wrap slightly before the end, while the picture is still moving
              wrapTimer = window.setInterval(() => {
                const d = e.target.getDuration?.() ?? 0;
                const t = e.target.getCurrentTime?.() ?? 0;
                if (d && t >= d - LOOP_LEAD) {
                  e.target.seekTo(0, true);
                  e.target.setPlaybackRate(rate);
                }
              }, 250);
            }
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(0, true);
              e.target.setPlaybackRate(rate);
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      window.clearInterval(wrapTimer);
      try {
        player?.destroy?.();
      } catch {
        /* player may already be gone */
      }
    };
  }, [near]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {near && (
        <div className="absolute top-1/2 left-1/2 w-[135%] h-[135%] min-w-[135vw] min-h-[135vh] -translate-x-1/2 -translate-y-1/2">
          <div ref={mountRef} className="w-full h-full" />
        </div>
      )}
      {/* keeps the form legible over whatever frame is playing */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
    </div>
  );
};

export default VideoBackdrop;

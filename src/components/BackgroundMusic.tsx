import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (audioRef.current) {
      // Set medium volume for mobile, use slider value for desktop
      audioRef.current.volume = isMobile ? 0.6 : volume;
    }
  }, [volume, isMobile]);

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.muted = false;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Play after interaction failed:", error);
          });
      }
    };

    // Try autoplay on mount (muted for mobile)
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play()
        .then(() => {
          // For desktop, unmute immediately
          if (!isMobile) {
            audioRef.current!.muted = false;
            setIsPlaying(true);
          } else {
            // For mobile, wait for first user interaction
            const handleFirstInteraction = () => {
              startAudio();
              document.removeEventListener("touchstart", handleFirstInteraction);
              document.removeEventListener("click", handleFirstInteraction);
            };
            document.addEventListener("touchstart", handleFirstInteraction, { once: true });
            document.addEventListener("click", handleFirstInteraction, { once: true });
          }
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          // If muted autoplay fails, try on first interaction
          const handleFirstInteraction = () => {
            startAudio();
            document.removeEventListener("touchstart", handleFirstInteraction);
            document.removeEventListener("click", handleFirstInteraction);
          };
          document.addEventListener("touchstart", handleFirstInteraction, { once: true });
          document.addEventListener("click", handleFirstInteraction, { once: true });
        });
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMobile && !isVisible ? "translate-y-32 opacity-0" : "translate-y-0 opacity-100"
    }`}>
      <div className={`flex items-center gap-3 bg-background/95 backdrop-blur-sm border border-border shadow-lg ${
        isMobile ? "rounded-full p-0" : "rounded-full px-4 py-2"
      }`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className={`hover:bg-primary/10 ${
            isMobile ? "rounded-full w-12 h-12" : "rounded-full"
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
        
        {!isMobile && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Volume control"
          />
        )}
      </div>

      {/* Audio element - replace src with your synthwave music file */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/synthwave-background.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BackgroundMusic;

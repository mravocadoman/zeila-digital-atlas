import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLang } from "@/i18n/lang";

const FreeTraining = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLang();

  return (
    <section 
      ref={ref}
      id="free-training" 
      className="py-12 lg:py-32 px-2 lg:px-16 bg-sunken section-rule"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="heading-elegant text-3xl lg:text-display mb-4 lg:mb-6 text-center">
            {t("Free Training", "Bezmaksas apmācības")}
          </h2>
          <p className="body-clean text-lg lg:text-2xl text-muted-foreground mb-8 lg:mb-12 text-center max-w-3xl mx-auto">
            {t(
              "Learn Meta advertising strategies through my comprehensive YouTube playlist. Over 10 lessons covering everything from fundamentals to advanced optimization techniques.",
              "Apgūstiet Meta reklāmas stratēģijas manā YouTube atskaņošanas sarakstā. Vairāk nekā 10 nodarbības — no pamatiem līdz padziļinātām optimizācijas metodēm.",
            )}
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="card-luxury overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
            loading="lazy"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PLHpAUrghDOai7S1pZVyoOhOn6crOlUc5i"
                  title="Mastering Meta Ads - Complete Training Series"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-2 lg:p-8">
                <h3 className="heading-elegant text-xl lg:text-heading mb-3">
                  {t("Mastering Meta Ads", "Meta Ads meistarklase")}
                </h3>
                <p className="body-clean text-lg lg:text-xl text-muted-foreground mb-4">
                  {t(
                    "A complete training series designed to help businesses and marketers master Meta advertising. From campaign setup to scaling strategies, this playlist covers the essential skills needed to generate results with Facebook and Instagram ads.",
                    "Pilna apmācību sērija, kas palīdz uzņēmumiem un mārketinga speciālistiem apgūt Meta reklāmu. No kampaņas iestatīšanas līdz mērogošanas stratēģijām — šajā sarakstā ir galvenās prasmes, lai gūtu rezultātus ar Facebook un Instagram reklāmām.",
                  )}
                </p>
                <a
                  href="https://www.youtube.com/playlist?list=PLHpAUrghDOai7S1pZVyoOhOn6crOlUc5i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors body-clean font-bold text-sm uppercase tracking-wider"
                >
                  {t("View Full Playlist on YouTube", "Skatīt visu sarakstu YouTube")}
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTraining;

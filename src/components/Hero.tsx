import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.webp";
import { useLang } from "@/i18n/lang";

const Hero = () => {
  const { t } = useLang();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="px-4 sm:px-6 lg:px-16 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-center lg:items-end">
          <div className="order-2 lg:order-1">
            <span
              className="eyebrow block mb-5 rise"
              style={{ animationDelay: "0.05s" }}
            >
              {t("Paid growth consulting · Riga", "Reklāma un izaugsme · Rīga")}
            </span>

            <h1
              className="heading-elegant text-foreground text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6 rise"
              style={{ animationDelay: "0.15s" }}
            >
              {t(
                "I build the paid-growth system, then train your team to run it.",
                "Sakārtoju tavu reklāmas sistēmu un iemācu komandai to vadīt pašai.",
              )}
            </h1>

            <p
              className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-4 rise"
              style={{ animationDelay: "0.28s" }}
            >
              {t(
                "Anyone can run your ads. The hard part is leaving behind a system that still works without me.",
                "Reklāmu palaist var jebkurš. Grūtākais ir atstāt sistēmu, kas strādā arī bez manis.",
              )}
            </p>
            <p
              className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8 rise"
              style={{ animationDelay: "0.36s" }}
            >
              {t(
                "Ten years in paid media and up to $5M a year in ad spend, on the agency side and in the Riga Business School MBA room. I work with e-commerce brands, SMEs and in-house teams that are done experimenting and want numbers they can rely on.",
                "Desmit gadi reklāmā un līdz $5M budžeta gadā, gan aģentūrā, gan Rīgas Biznesa skolas MBA auditorijā. Strādāju ar e-veikaliem, maziem un vidējiem uzņēmumiem un mārketinga komandām, kas ar eksperimentiem jau ir cauri un grib skaitļus, uz kuriem var paļauties.",
              )}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 rise"
              style={{ animationDelay: "0.46s" }}
            >
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="bg-primary text-background hover:bg-primary/90 transition-all px-8 py-6 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider"
              >
                {t("Book a consultation", "Pieteikties konsultācijai")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("engagements")}
                className="bg-background border border-border text-foreground hover:border-primary hover:bg-background transition-all px-8 py-6 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider"
              >
                {t("See how we'd work", "Kā varam sadarboties")}
              </Button>
            </div>
          </div>

          <div
            className="order-1 lg:order-2 lg:pb-6 rise"
            style={{ animationDelay: "0.2s" }}
          >
            {/* He stands on the horizon line, which runs off to the right with the
                grid receding below it. See .hero-stage in index.css. */}
            <div className="hero-stage w-56 sm:w-72 lg:w-full lg:max-w-md mx-auto">
              <img
                src={headshotImage}
                alt={t(
                  "Rihards Zeila, paid growth consultant and MBA lecturer based in Riga, Latvia",
                  "Rihards Zeila, reklāmas konsultants un MBA lektors Rīgā",
                )}
                loading="eager"
                width="900"
                height="1200"
              />
              <div className="hero-line" aria-hidden="true" />
              <div className="hero-grid" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

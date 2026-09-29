import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { T, useLang } from "@/i18n/lang";

const getCaseStudies = (t: T) => [
  {
    company: "The Brew Company",
    engagement: t("Fractional growth lead", "Ārpakalpojuma izaugsmes vadītājs"),
    description: t(
      "Specialty coffee brand moving from retail to digital across Meta, TikTok, Google and YouTube — a Q4 pilot that became a long-term partnership.",
      "Specializētās kafijas zīmols, kas no mazumtirdzniecības pārgāja uz digitālo vidi — Meta, TikTok, Google un YouTube. Q4 pilotprojekts, kas kļuva par ilgtermiņa sadarbību.",
    ),
    approach: t("Held 4–7 ROAS through the iOS 14 measurement shift.", "Noturēja 4–7 ROAS iOS 14 mērījumu izmaiņu laikā."),
    metrics: [
      { label: t("Monthly Budget", "Mēneša budžets"), value: "€75K+" },
      { label: t("Peak ROAS", "Maksimālais ROAS"), value: "13.36" },
      { label: t("Revenue Generated", "Radītie ieņēmumi"), value: "€1M+" },
    ],
  },
  {
    company: "Cetras Zoles",
    engagement: t("Build & handover", "Izstrāde un nodošana"),
    description: t(
      "Latvian outlet store selling branded fashion at a discount. Maximum reach, minimal spend.",
      "Latvijas outlet veikals, kas pārdod zīmolu apģērbus ar atlaidi. Maksimāla sasniedzamība, minimāli izdevumi.",
    ),
    approach: t("Creative testing plus Advantage+ campaigns on Meta.", "Kreatīvu testēšana un Advantage+ kampaņas Meta platformā."),
    metrics: [
      { label: "ROAS", value: "36.34" },
      { label: t("Initial Spend", "Sākotnējie izdevumi"), value: "€1K" },
      { label: t("Revenue", "Ieņēmumi"), value: "€36K+" },
    ],
  },
  {
    company: "Instant Change",
    engagement: t("Build & handover", "Izstrāde un nodošana"),
    description: t(
      "Three-layer Meta Ads funnel for a German transformation coach, covering the DACH region.",
      "Trīs līmeņu Meta Ads piltuve vācu transformācijas koučam DACH reģionā.",
    ),
    approach: t(
      "Video awareness → webinar remarketing → lookalike conversions.",
      "Video atpazīstamība → vebināra atkārtotais mārketings → līdzīgo auditoriju konversijas.",
    ),
    metrics: [{ label: "ROAS", value: "12.55" }],
  },
  {
    company: "Excel Know How",
    engagement: t("Build & handover", "Izstrāde un nodošana"),
    description: t(
      "Excel and Power BI training turned into a predictable lead-gen engine with free webinar funnels.",
      "Excel un Power BI apmācības, pārvērstas paredzamā potenciālo klientu piesaistes dzinējā ar bezmaksas vebināru piltuvēm.",
    ),
    approach: t(
      "€1,175 of spend; 2% of leads converted to €250 courses.",
      "€1 175 izdevumi; 2% potenciālo klientu nopirka €250 kursus.",
    ),
    metrics: [
      { label: t("Leads Generated", "Piesaistīti kontakti"), value: "2,000+" },
      { label: t("Cost Per Lead", "Cena par kontaktu"), value: "€0.59" },
      { label: "ROAS", value: "8.5" },
      { label: t("Revenue", "Ieņēmumi"), value: "€10K" },
    ],
  },
  {
    company: t("LIFT Digitalisation Program", "LIFT digitalizācijas programma"),
    engagement: t("Team training & workshops", "Komandu apmācības un darbnīcas"),
    description: t(
      'As part of the EU-funded LIFT initiative, I developed five digital marketing courses, built dedicated landing pages, and helped marketingaskola.lv rank #3 on Google for "digitālā mārketinga kursi."',
      "ES finansētās LIFT iniciatīvas ietvaros izstrādāju piecus digitālā mārketinga kursus, izveidoju tiem galvenās lapas un palīdzēju marketingaskola.lv ieņemt 3. vietu Google meklētājā pēc frāzes “digitālā mārketinga kursi”.",
    ),
    approach: t(
      "Meta ads, email outreach and automation drove the pipeline.",
      "Klientus piesaistīja Meta reklāmas, e-pasta uzrunāšana un automatizācija.",
    ),
    metrics: [
      { label: t("Google Ranking", "Vieta Google"), value: "#3" },
      { label: t("Leads Generated", "Piesaistīti kontakti"), value: "300+" },
      { label: t("Participants", "Dalībnieki"), value: "75-105" },
      { label: t("B2B Reply Rate", "B2B atbilžu īpatsvars"), value: "5%" },
    ],
  },
];

type Study = ReturnType<typeof getCaseStudies>[number];

const StudyCard = ({ study }: { study: Study }) => {
  const [lead, ...rest] = study.metrics;

  return (
    <article className="border border-border rounded-lg p-6 flex flex-col h-full bg-background/40">
      <span className="eyebrow block mb-2">{study.engagement}</span>
      <h3 className="heading-elegant text-xl mb-5">{study.company}</h3>

      <div className="mb-5">
        <div className="numeral text-primary text-4xl leading-none">
          {lead.value}
        </div>
        <div className="body-clean text-xs text-muted-foreground uppercase tracking-wider mt-2">
          {lead.label}
        </div>
      </div>

      <p className="body-clean text-foreground/85 text-base leading-relaxed mb-4">
        {study.description}
      </p>

      {rest.length > 0 && (
        <dl className="flex flex-wrap gap-x-5 gap-y-2 mt-auto pt-4 border-t border-border">
          {rest.map((m) => (
            <div key={m.label}>
              <dd className="body-clean text-foreground text-base font-semibold tabular-nums leading-none">
                {m.value}
              </dd>
              <dt className="body-clean text-[0.7rem] text-muted-foreground uppercase tracking-wider mt-1">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
};

/**
 * A slider, done so it doesn't repeat the original's mistake.
 *
 * The first carousel showed one of five with nothing saying there were more,
 * so four were effectively invisible. This one shows three at desktop, two on
 * tablet, and one with the next peeking in on mobile; it says where you are
 * ("1-3 of 5"); and it is native CSS scroll-snap, so trackpad swipes, touch
 * momentum and keyboard arrows all work without a library.
 */
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const CaseStudies = () => {
  const reveal = useReveal<HTMLElement>();
  const { t } = useLang();
  const caseStudies = getCaseStudies(t);
  const track = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState(0);
  const [perView, setPerView] = useState(1);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const card = (el.firstElementChild as HTMLElement).getBoundingClientRect()
      .width;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const step = card + gap;
    setPerView(Math.max(1, Math.round((el.clientWidth + gap) / step)));
    setFirst(
      Math.min(caseStudies.length - 1, Math.round(el.scrollLeft / step)),
    );
  }, [caseStudies.length]);

  useEffect(() => {
    measure();
    const el = track.current;
    el?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const card = (el.firstElementChild as HTMLElement).getBoundingClientRect()
      .width;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    el.scrollBy({ left: dir * (card + gap), behavior: scrollBehavior() });
  };

  const goTo = (i: number) => {
    const el = track.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target)
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
  };

  const last = Math.min(first + perView, caseStudies.length);
  const atStart = first <= 0;
  const atEnd = last >= caseStudies.length;
  const positions = Math.max(1, caseStudies.length - perView + 1);

  return (
    <section
      id="case-studies"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <span className="eyebrow block mb-4">{t("Proof", "Pierādījumi")}</span>
            <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
              {t("Case studies.", "Rezultāti.")}
            </h2>
            <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl">
              {t(
                "Real results from real campaigns — from e-commerce to coaching, fashion to fintech.",
                "Reāli rezultāti no reālām kampaņām — no e-komercijas līdz koučingam, no modes līdz finanšu tehnoloģijām.",
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="body-clean text-sm text-muted-foreground tabular-nums mr-1"
              aria-live="polite"
            >
              {first + 1}
              {last - first > 1 ? `–${last}` : ""} {t("of", "no")} {caseStudies.length}
            </span>
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label={t("Previous case study", "Iepriekšējais piemērs")}
              className="h-11 w-11 grid place-items-center rounded-md border border-border text-foreground hover:border-primary disabled:opacity-30 disabled:hover:border-border transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label={t("Next case study", "Nākamais piemērs")}
              className="h-11 w-11 grid place-items-center rounded-md border border-border text-foreground hover:border-primary disabled:opacity-30 disabled:hover:border-border transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label={t("Case studies, scroll horizontally", "Rezultāti, ritiniet horizontāli")}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 focus-visible:outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {caseStudies.map((s) => (
            <div
              key={s.company}
              className="snap-start shrink-0 basis-[86%] sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)]"
            >
              <StudyCard study={s} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: positions }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t(`Show case study ${i + 1}`, `Rādīt ${i + 1}. piemēru`)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === first
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

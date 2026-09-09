import { useReveal } from "@/hooks/use-reveal";

const caseStudies = [
  {
    company: "The Brew Company",
    engagement: "Fractional growth lead",
    description:
      "Specialty coffee brand moving from retail to digital across Meta, TikTok, Google and YouTube — a Q4 pilot that became a long-term partnership.",
    approach: "Held 4–7 ROAS through the iOS 14 measurement shift.",
    metrics: [
      { label: "Monthly Budget", value: "€75K+" },
      { label: "Peak ROAS", value: "13.36" },
      { label: "Revenue Generated", value: "€1M+" },
    ],
  },
  {
    company: "Cetras Zoles",
    engagement: "Build & handover",
    description:
      "Latvian outlet store selling branded fashion at a discount. Maximum reach, minimal spend.",
    approach: "Creative testing plus Advantage+ campaigns on Meta.",
    metrics: [
      { label: "ROAS", value: "36.34" },
      { label: "Initial Spend", value: "€1K" },
      { label: "Revenue", value: "€36K+" },
    ],
  },
  {
    company: "Instant Change",
    engagement: "Build & handover",
    description:
      "Three-layer Meta Ads funnel for a German transformation coach, covering the DACH region.",
    approach: "Video awareness → webinar remarketing → lookalike conversions.",
    metrics: [{ label: "ROAS", value: "12.55" }],
  },
  {
    company: "Excel Know How",
    engagement: "Build & handover",
    description:
      "Excel and Power BI training turned into a predictable lead-gen engine with free webinar funnels.",
    approach: "€1,175 of spend; 2% of leads converted to €250 courses.",
    metrics: [
      { label: "Leads Generated", value: "2,000+" },
      { label: "Cost Per Lead", value: "€0.59" },
      { label: "ROAS", value: "8.5" },
      { label: "Revenue", value: "€10K" },
    ],
  },
  {
    company: "LIFT Digitalisation Program",
    engagement: "Team training & workshops",
    description:
      'As part of the EU-funded LIFT initiative, I developed five digital marketing courses, built dedicated landing pages, and helped marketingaskola.lv rank #3 on Google for "digitālā mārketinga kursi."',
    approach: "Meta ads, email outreach and automation drove the pipeline.",
    metrics: [
      { label: "Google Ranking", value: "#3" },
      { label: "Leads Generated", value: "300+" },
      { label: "Participants", value: "75-105" },
      { label: "B2B Reply Rate", value: "5%" },
    ],
  },
];

type Study = (typeof caseStudies)[number];

/**
 * Compact cards, three up.
 *
 * As full-width rows this ran long enough to read as a wall even after the
 * duplicated prose came out. Each card now carries one headline number, the
 * client, a single line of context, and the supporting figures small — so the
 * section is scanned rather than read, and all five stay visible. No carousel:
 * the earlier one hid four of the five.
 */
const StudyCard = ({ study }: { study: Study }) => {
  const card = useReveal<HTMLElement>("card");
  const [lead, ...rest] = study.metrics;

  return (
    <article
      ref={card.ref}
      className={`border border-border rounded-lg p-6 flex flex-col lift ${card.className}`}
    >
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

const CaseStudies = () => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="case-studies"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">Proof</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          Case studies.
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-12">
          Real results from real campaigns — from e-commerce to coaching,
          fashion to fintech.
        </p>

        <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((s) => (
            <StudyCard key={s.company} study={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

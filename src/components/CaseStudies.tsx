import { useReveal } from "@/hooks/use-reveal";

const caseStudies = [
  {
    company: "The Brew Company",
    engagement: "Fractional growth lead",
    description:
      "Helped a specialty coffee brand transition from retail to digital with a cross-channel strategy across Meta, TikTok, Google, and YouTube. Started as a Q4 pilot, turned into a long-term partnership.",
    details:
      "Managed €75K+ monthly budgets with 13.36 peak ROAS, generating €1M+ in revenue. Post-iOS14, maintained 4–7 ROAS consistently above industry average.",
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
      "Latvian outlet store selling branded fashion at major discounts. Goal: maximum reach, minimal spend.",
    details:
      "Strong creative testing + Advantage+ campaigns on Meta. First €1K delivered 36.34 ROAS. Great products just need the right structure.",
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
      "Built a three-layer Meta Ads funnel for a German transformation coach covering DACH region.",
    details:
      "Video awareness → webinar remarketing → lookalike conversions. Seamless client acquisition with 12.55 ROAS.",
    metrics: [{ label: "ROAS", value: "12.55" }],
  },
  {
    company: "Excel Know How",
    engagement: "Build & handover",
    description:
      "Turned Excel and Power BI training into a predictable lead-gen engine with free webinar funnels.",
    details:
      "€1,175 ad spend generated 2,000+ leads at €0.59 each. 2% converted to €250 courses = €10K revenue, 8.5 ROAS.",
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
    details:
      "Using Meta ads, email outreach, and automations, I generated 300+ high-quality leads, resulting in 75–105 new course participants and B2B email reply rates of 5% (well above industry average).",
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
 * Rows, matching the engagements above.
 *
 * This was a carousel showing one of five, then a 2-up grid at 1,724px. As rows
 * all five stay visible and the section costs a fraction of the height: client
 * and engagement on the left, the numbers in the middle where they can be
 * scanned down the column, the story on the right.
 */
const StudyRow = ({ study }: { study: Study }) => {
  const row = useReveal<HTMLElement>("card");

  return (
    <article
      ref={row.ref}
      className={`grid gap-x-8 gap-y-3 lg:gap-y-0 py-5 lg:py-7 border-t border-border lg:grid-cols-[minmax(0,14rem)_minmax(0,18rem)_minmax(0,1fr)] ${row.className}`}
    >
      <div className="min-w-0">
        <span className="eyebrow block mb-1.5">{study.engagement}</span>
        <h3 className="heading-elegant text-xl lg:text-2xl">{study.company}</h3>
      </div>

      <dl className="grid grid-cols-2 gap-x-5 gap-y-3 content-start">
        {study.metrics.map((m, i) => (
          <div key={m.label}>
            <dd
              className={
                i === 0
                  ? "numeral text-primary text-2xl leading-none"
                  : "body-clean text-foreground text-lg font-semibold tabular-nums leading-none"
              }
            >
              {m.value}
            </dd>
            <dt className="body-clean text-xs text-muted-foreground uppercase tracking-wider mt-1.5">
              {m.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="min-w-0">
        <p className="body-clean text-foreground/90 text-base leading-relaxed mb-2 max-w-[62ch]">
          {study.description}
        </p>
        <p className="body-clean text-muted-foreground text-base leading-relaxed max-w-[62ch]">
          {study.details}
        </p>
      </div>
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
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-10">
          Real results from real campaigns — from e-commerce to coaching,
          fashion to fintech.
        </p>

        <div className="border-b border-border">
          {caseStudies.map((s) => (
            <StudyRow key={s.company} study={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

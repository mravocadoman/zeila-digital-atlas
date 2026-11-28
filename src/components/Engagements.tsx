import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

import advisoryGfx from "@/assets/gfx/advisory.webp";
import auditGfx from "@/assets/gfx/audit.webp";
import buildGfx from "@/assets/gfx/build.webp";
import retainerGfx from "@/assets/gfx/retainer.webp";
import trainingGfx from "@/assets/gfx/training.webp";

/**
 * The AI marketing team offer (Rihards, 2026-11-28, from the Founder OS foundations doc): a first helper, the team
 * build, then run-and-improve. Only the retainer publishes figures (lowered to European rates on 2026-11-28); the
 * first helper and the build are quoted by scope until Rihards confirms prices. Keep the pricing answer in FAQ.tsx
 * in step with any change here.
 */
const getEngagements = () => [
  {
    kind: "Advisory",
    gfx: advisoryGfx,
    title: "AI strategy session",
    forWho: "Founders and marketing leads deciding what to automate",
    body: "We go through a week of your marketing work and decide what a helper should do, what to cut, and what stays with a person.",
    price: "Per session",
    deliverables: [
      "Your week mapped, with the hours each job takes",
      "The first three helpers worth building, in order",
      "What stays in human hands, and why",
    ],
    featured: false,
  },
  {
    kind: "Fixed scope",
    gfx: auditGfx,
    title: "First helper",
    forWho: "Teams that want to see it work before committing",
    body: "One helper built for your account in a week, usually the morning ad check: real orders against what the platform reports, losing campaigns flagged, five lines on why.",
    price: "Fixed fee · 1 week",
    deliverables: [
      "One helper live on your account",
      "Its rules written down in plain words",
      "A walk-through so your team can change them",
    ],
    featured: false,
  },
  {
    kind: "Project",
    gfx: buildGfx,
    title: "AI marketing team",
    forWho: "Teams spending their week on reporting, posting and follow-ups",
    body: "The core engagement. Four to six helpers mapped, built and tested on your accounts: the ad checks, the content pipeline, lead routing and follow-up drafts, with a second AI checking anything a customer sees. Then I hand it to your team.",
    price: "Project fee · 4–6 weeks",
    deliverables: [
      "Four to six helpers, built and live",
      "Written rules and alerts for each one",
      "A handover session, so your team runs it",
    ],
    featured: true,
  },
  {
    kind: "Ongoing",
    gfx: retainerGfx,
    title: "Run and improve",
    forWho: "Teams that want the helpers watched and growing",
    body: "Monthly, at two depths: a senior second opinion on what the helpers report, or me in the system every week, adding helpers and tuning the rules.",
    price: "Monthly retainer, 3-month minimum",
    tiers: [
      { name: "Advisor", scope: "half a day a week", amount: "€1,200/mo" },
      { name: "Operator", scope: "one day a week", amount: "€2,400/mo" },
    ],
    deliverables: [
      "A weekly review of what the helpers caught",
      "New helpers as your team finds more repetitive work",
      "On call for the decisions that cost money",
    ],
    featured: false,
  },
  {
    kind: "Training",
    gfx: trainingGfx,
    title: "Team training & workshops",
    forWho: "Companies, universities, and EU-funded programs",
    body: "Your team learns to build its own helpers with Claude and n8n, from the same material I taught on the Riga Business School MBA. One-day workshops through multi-session courses.",
    price: "Per program",
    deliverables: [
      "Workshops where each person builds a working helper",
      "Meta ads intensives and multi-session courses",
      "Recordings and playbooks so it sticks",
    ],
    featured: false,
  },
];

type Engagement = ReturnType<typeof getEngagements>[number];

/**
 * Rows, not cards.
 *
 * As a 2-up grid of five these ran 2,241px — three rows of tall cards with a
 * half-empty one at the end. Horizontal room is free at desktop widths and
 * vertical room is not, so each engagement is now one row: mark, what it is,
 * what you get, what it costs. It also reads like the service menu it actually
 * is, and five rows always align — no orphan to centre.
 */
const EngagementRow = ({ e, index }: { e: Engagement; index: number }) => {
  const row = useReveal<HTMLElement>("card");

  return (
    <article
      ref={row.ref}
      className={`grid gap-x-8 gap-y-3 lg:gap-y-0 py-5 lg:py-7 border-t lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,20rem)] ${
        e.featured ? "border-t-[hsl(320_100%_65%/0.5)]" : "border-t-border"
      } ${row.className}`}
    >
      <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:gap-2">
        <span className="numeral text-primary/45 text-sm lg:text-base leading-none lg:mt-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <img
          src={e.gfx}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="460"
          height="240"
          className="h-10 lg:h-14 w-auto object-contain object-left"
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap mb-1">
          <span className="eyebrow">{e.kind}</span>
          {e.featured && (
            <span className="body-clean text-[0.68rem] font-semibold text-[hsl(320_100%_65%)] uppercase tracking-wider">
              {"Most common"}
            </span>
          )}
        </div>
        <h3 className="heading-elegant text-2xl lg:text-3xl mb-1.5">
          {e.title}
        </h3>
        <p className="body-clean text-base text-foreground/70 mb-2 max-w-[60ch]">
          {e.forWho}
        </p>
        <p className="body-clean text-foreground/85 text-base leading-relaxed max-w-[62ch]">
          {e.body}
        </p>
      </div>

      <div className="min-w-0">
        <span className="eyebrow block mb-2.5 text-muted-foreground">
          {"What you get"}
        </span>
        <ul className="space-y-1.5 mb-3">
          {e.deliverables.map((d) => (
            <li key={d} className="flex gap-2.5 items-start">
              <span className="text-primary flex-shrink-0" aria-hidden="true">
                &mdash;
              </span>
              <span className="body-clean text-base text-foreground/80 leading-relaxed">
                {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="body-clean text-base text-foreground/90 pt-3 border-t border-border">
          {e.price}
        </p>
        {"tiers" in e && e.tiers && (
          <ul className="mt-2 space-y-1">
            {e.tiers.map((tier) => (
              <li key={tier.name} className="flex justify-between items-baseline gap-3 body-clean text-base">
                <span className="min-w-0 text-foreground/90">
                  {tier.name}
                  <span className="block text-sm text-foreground/60">{tier.scope}</span>
                </span>
                <span className="font-semibold tabular-nums whitespace-nowrap">{tier.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

const Engagements = () => {
  const reveal = useReveal<HTMLElement>();
  const engagements = getEngagements();

  return (
    <section
      id="engagements"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 bg-sunken section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{"What you get"}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          {"Five ways to work together."}
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-10">
          {"Every one of them ends with your team running the helpers themselves. That handover is the point of the work, and it is included."}
        </p>

        <div className="border-b border-border">
          {engagements.map((e, i) => (
            <EngagementRow key={i} e={e} index={i} />
          ))}
        </div>

        <div className="mt-10 lg:mt-12 text-center">
          <Button
            size="lg"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-primary text-background hover:bg-primary/90 px-8 py-6 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider"
          >
            {"Book a consultation"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Engagements;

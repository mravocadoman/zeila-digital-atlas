import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

import advisoryGfx from "@/assets/gfx/advisory.webp";
import auditGfx from "@/assets/gfx/audit.webp";
import buildGfx from "@/assets/gfx/build.webp";
import retainerGfx from "@/assets/gfx/retainer.webp";
import trainingGfx from "@/assets/gfx/training.webp";

/**
 * TODO (Rihards): pricing is described by shape only, no figures. If you want
 * a floor published ("audits from EUR X"), edit the `price` lines below and the
 * pricing answer in FAQ.tsx.
 */
const engagements = [
  {
    kind: "Advisory",
    gfx: advisoryGfx,
    title: "Strategy consulting",
    forWho: "Founders and marketing leads with a decision to make",
    body: "You don't need someone in the account — you need someone who has already made this mistake. Channel strategy, budget allocation, agency decisions, whether to build in-house.",
    price: "Per session or day rate",
    deliverables: [
      "Working sessions on the decision in front of you",
      "A written recommendation you can take to the board",
      "Follow-up as it plays out, not a one-shot opinion",
    ],
    featured: false,
  },
  {
    kind: "Fixed scope",
    gfx: auditGfx,
    title: "Account audit",
    forWho: "Brands already spending, unsure where it leaks",
    body: "I go through the ad account, tracking setup, and funnel, then tell you what's actually costing you money — in priority order.",
    price: "Fixed fee · 1–2 weeks",
    deliverables: [
      "Written findings on account structure, creative, and measurement",
      "A prioritised fix list, most expensive problem first",
      "A 90-minute call to walk your team through it",
    ],
    featured: false,
  },
  {
    kind: "Project",
    gfx: buildGfx,
    title: "Build & handover",
    forWho: "Teams that need the system built once, properly",
    body: "The core engagement. I build the campaign structure, funnel, and tracking, run it until the numbers are stable, then hand it over documented so your team owns it.",
    price: "Project fee · 6–12 weeks",
    deliverables: [
      "Campaign and funnel architecture, built and live",
      "Tracking and reporting your team can actually read",
      "SOPs and a handover session — you keep running it",
    ],
    featured: true,
  },
  {
    kind: "Ongoing",
    gfx: retainerGfx,
    title: "Fractional growth lead",
    forWho: "In-house teams who want a sparring partner",
    body: "Monthly. I stay close to the account without taking it over — reviews, creative direction, and someone senior to argue with before you spend.",
    price: "Monthly retainer",
    deliverables: [
      "Weekly working sessions with your marketers",
      "Ad account reviews and scaling decisions",
      "On call for the decisions that cost money",
    ],
    featured: false,
  },
  {
    kind: "Training",
    gfx: trainingGfx,
    title: "Team training & workshops",
    forWho: "Companies, universities, and EU-funded programs",
    body: "The same material I teach on the Riga Business School MBA, adapted to your channels and tools. One-day intensives through semester-long modules.",
    price: "Per program",
    deliverables: [
      "Meta Ads intensives and multi-session courses",
      "Custom MBA / BBA modules with assessments",
      "Recordings and playbooks so it sticks",
    ],
    featured: false,
  },
];

type Engagement = (typeof engagements)[number];

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
              Most common
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
          What you get
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
      </div>
    </article>
  );
};

const Engagements = () => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="engagements"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 bg-sunken section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">What you get</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          Five ways to work together.
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-10">
          Every one of them ends with your team able to run the thing
          themselves. That's the point, not an upsell I'm withholding.
        </p>

        <div className="border-b border-border">
          {engagements.map((e, i) => (
            <EngagementRow key={e.title} e={e} index={i} />
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
            Book a consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Engagements;

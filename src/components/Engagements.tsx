import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

import advisoryGfx from "@/assets/gfx/advisory.webp";
import auditGfx from "@/assets/gfx/audit.webp";
import buildGfx from "@/assets/gfx/build.webp";
import retainerGfx from "@/assets/gfx/retainer.webp";
import trainingGfx from "@/assets/gfx/training.webp";

/**
 * The five ways to work together. Deliverables are written as things that land
 * in the client's hands — not as activities I perform.
 *
 * TODO (Rihards): pricing is described by shape only, no figures. If you want
 * a floor published ("audits from €X"), add it to the `price` line below and
 * to the pricing answer in FAQ.tsx.
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

/** Reveals as it personally reaches the fold, rather than with the section. */
const EngagementCard = ({ e }: { e: Engagement }) => {
  const card = useReveal<HTMLDivElement>("card");

  return (
    <div
      ref={card.ref}
      className={`rounded-lg overflow-hidden flex flex-col border ${
        e.featured
          ? "border-[hsl(320_100%_65%/0.65)] bg-background"
          : "border-border lift"
      } ${card.className}`}
      style={{ flexBasis: "min(100%, 34rem)", flexGrow: 0 }}
    >
      <div className="p-5 lg:p-8 flex flex-1 flex-col">
        {/* Decorative — the title carries the meaning. */}
        <img
          src={e.gfx}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="460"
          height="240"
          className="h-16 lg:h-20 w-auto object-contain object-left mb-4"
        />
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <span className="eyebrow">{e.kind}</span>
          {e.featured && (
            <span className="body-clean text-xs font-semibold text-[hsl(320_100%_65%)] uppercase tracking-wider">
              Most common
            </span>
          )}
        </div>

        <h3 className="heading-elegant text-2xl lg:text-3xl mb-2">{e.title}</h3>
        <p className="body-clean text-sm text-primary/90 mb-4">{e.forWho}</p>
        <p className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
          {e.body}
        </p>

        <ul className="space-y-2.5 mb-6">
          {e.deliverables.map((d) => (
            <li key={d} className="flex gap-3 items-start">
              <span
                className="text-primary mt-1.5 flex-shrink-0"
                aria-hidden="true"
              >
                —
              </span>
              <span className="body-clean text-base text-muted-foreground leading-relaxed">
                {d}
              </span>
            </li>
          ))}
        </ul>

        <p className="body-clean text-sm text-muted-foreground mt-auto pt-4 border-t border-border">
          {e.price}
        </p>
      </div>
    </div>
  );
};

const Engagements = () => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="engagements"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 bg-card section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">What you get</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          Five ways to work together.
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-12">
          Every one of them ends with your team able to run the thing
          themselves. That's the point, not an upsell I'm withholding.
        </p>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {engagements.map((e) => (
            <EngagementCard key={e.title} e={e} />
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

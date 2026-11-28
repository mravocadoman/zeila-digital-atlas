import { useReveal } from "@/hooks/use-reveal";

import scalingGfx from "@/assets/gfx/scaling.webp";
import plateauGfx from "@/assets/gfx/plateau.webp";
import systemGfx from "@/assets/gfx/system.webp";

const audiences = () => [
  {
    gfx: scalingGfx,
    title: "E-commerce brands spending on ads",
    body: "You spend real money on ads and someone checks the numbers by hand, often days late. A morning check against real orders catches the losing campaign the next day, with five lines on why.",
  },
  {
    gfx: plateauGfx,
    title: "Small teams doing everything",
    body: "One to five marketers doing the reporting, the posting, the lead follow-ups and the ads. The repetitive half of that week can run on its own, with a person approving what matters.",
  },
  {
    gfx: systemGfx,
    title: "Teams that tried AI and stopped trusting it",
    body: "You asked a chatbot for a campaign plan and couldn't tell whether the answer was right. Helpers built on written rules, by someone who has bought ads for 12 years, give answers you can check.",
  },
];

/** Each card animates as it personally reaches the fold, not all at once. */
const AudienceCard = ({
  gfx,
  title,
  body,
}: {
  gfx: string;
  title: string;
  body: string;
}) => {
  const card = useReveal<HTMLDivElement>("card");

  return (
    <div
      ref={card.ref}
      className={`border border-border rounded-lg overflow-hidden lift flex flex-col ${card.className}`}
    >
      {/* Decorative — the heading carries the meaning, so it's hidden from
          assistive tech rather than given invented alt text. */}
      <div className="p-5 lg:p-7">
        <img
          src={gfx}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="460"
          height="240"
          className="h-16 lg:h-20 w-auto object-contain object-left mb-4"
        />
        <h3 className="heading-elegant text-xl lg:text-2xl mb-3">{title}</h3>
        <p className="body-clean text-foreground/85 text-base lg:text-lg leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
};

const WhoFor = () => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="who-for"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{"Who this is for"}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          {"Three teams these helpers pay for themselves in."}
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-12">
          {"If none of these sound like you, say so in the form anyway. I'll tell you straight if it isn't a fit."}
        </p>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {audiences().map((a) => (
            <AudienceCard key={a.title} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoFor;

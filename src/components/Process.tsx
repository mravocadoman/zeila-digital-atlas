import { useReveal } from "@/hooks/use-reveal";
const steps = [
  {
    n: "01",
    title: "Discovery call",
    body: "Thirty minutes on your goals, current spend, stack, and what's already been tried. If I'm not the right person, I say so on this call.",
  },
  {
    n: "02",
    title: "Scope & proposal",
    body: "A written scope with deliverables, timeline, and what success looks like in numbers. Fixed price where the scope allows it.",
  },
  {
    n: "03",
    title: "Build",
    body: "I do the work in your accounts, with your team watching rather than waiting. No black box — you see the reasoning as it happens.",
  },
  {
    n: "04",
    title: "Handover",
    body: "SOPs, dashboards, and a working session so your team can run it. Follow-up check-ins are included; a retainer is optional, never assumed.",
  },
];

const Process = () => {
  const reveal = useReveal<HTMLElement>();
  return (
    <section
      id="process"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">How an engagement works</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-8 lg:mb-12 max-w-3xl">
          Four steps, no bloat.
        </h2>

        <ol className="stagger grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="border-t-2 pt-5"
              style={{
                borderTopColor:
                  i % 2
                    ? "hsl(320 100% 65% / 0.45)"
                    : "hsl(196 97% 49% / 0.45)",
              }}
            >
              <span
                className="numeral text-lg block mb-3"
                style={{
                  color: i % 2 ? "hsl(320 100% 65%)" : "hsl(196 97% 49%)",
                }}
              >
                {s.n}
              </span>
              <h3 className="heading-elegant text-xl lg:text-2xl mb-3">
                {s.title}
              </h3>
              <p className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;

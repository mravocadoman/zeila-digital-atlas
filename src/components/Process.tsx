import { useReveal } from "@/hooks/use-reveal";
const steps = () => [
  {
    n: "01",
    title: "Map the week",
    body: "Thirty minutes on your goals, your spend and the work your team repeats every week. We list the jobs and the hours, and if I'm not the right person, I say so on this call.",
  },
  {
    n: "02",
    title: "First helper in week one",
    body: "The first helper goes live in the first week, usually the morning ad check against real orders, so you see it work before anything else is built.",
  },
  {
    n: "03",
    title: "Build the team, with rules",
    body: "Each new helper gets written rules, a person who approves what matters, and a second check on anything a customer sees. You watch the reasoning as it happens.",
  },
  {
    n: "04",
    title: "Handover",
    body: "Rules, alerts and a working session so your team runs it. Follow-up check-ins are included; a retainer is optional, never assumed.",
  },
];

const Process = () => {
  const reveal = useReveal<HTMLElement>();
  return (
    <section
      id="process"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{"How an engagement works"}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-8 lg:mb-12 max-w-3xl">
          {"Four steps, first helper in week one."}
        </h2>

        <ol className="stagger grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {steps().map((s) => (
            <li key={s.n} className="border-t-2 border-primary/40 pt-5">
              <span className="numeral text-primary text-lg block mb-3">
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

import { useReveal } from "@/hooks/use-reveal";
import { Link } from "react-router-dom";

/**
 * The teaching CV, compressed from a 2,357px résumé into credibility for the
 * consulting offer. The exhaustive list (25+ lectures, podcasts, panels) lives
 * on /about — this is the top five, chosen for what a buyer would recognise.
 */
const highlights = [
  {
    org: "Riga Business School",
    role: "MBA Lecturer, Digital Marketing",
    period: "2021 — present",
  },
  {
    org: "LIFT Program (EU-funded)",
    role: "Course leader — Meta Ads & automation for SMEs",
    period: "2024 — present",
  },
  {
    org: "International Trade Centre",
    role: "Workshop facilitator — Kenya, Palestine, Gambia, Jordan",
    period: "2019, 2023",
  },
  {
    org: "RISEBA University",
    role: "BBA Lecturer, Social Media & Meta Ads",
    period: "2023 — 2024",
  },
  {
    org: "University of Lusaka",
    role: "Guest Lecturer (Erasmus+)",
    period: "2024",
  },
];

const TeachingEdge = () => {
  const reveal = useReveal<HTMLElement>();
  return (
  <section
    id="teaching"
    ref={reveal.ref}
    className={`py-12 lg:py-24 px-6 lg:px-16 bg-card section-rule ${reveal.className}`}
  >
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
      <div>
        <span className="eyebrow block mb-4">Why me</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-6">
          I teach this at MBA level. That's the difference.
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed mb-4">
          Most consultants can run your ads. Far fewer can explain the reasoning
          clearly enough that your team can take over — which is the only version of
          this that leaves you better off in a year.
        </p>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed">
          I've been building the curriculum for that handover since 2021, in front of
          MBA students who ask hard questions and EU program participants who have to
          use it on Monday.
        </p>
      </div>

      <div>
        <ul className="divide-y divide-border border-y border-border">
          {highlights.map((h) => (
            <li
              key={h.org}
              className="py-4 grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-6 items-baseline"
            >
              <div>
                <p className="body-clean font-semibold text-foreground text-lg">
                  {h.org}
                </p>
                <p className="body-clean text-muted-foreground text-base">{h.role}</p>
              </div>
              <span className="body-clean text-sm text-muted-foreground whitespace-nowrap">
                {h.period}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to="/about"
          className="body-clean inline-block mt-6 text-primary hover:text-foreground transition-colors font-semibold"
        >
          Full teaching history, career, and credentials →
        </Link>
      </div>
    </div>
  </section>
  );
};

export default TeachingEdge;

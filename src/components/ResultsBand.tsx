import { useCountUp } from "@/hooks/use-count-up";
import { useReveal } from "@/hooks/use-reveal";

/**
 * The four headline numbers, moved out of the logo strip.
 *
 * They sit at the head of the case studies on purpose: every figure here is one
 * a visitor can check against a card immediately below it, which is the whole
 * reason to claim them. Stacked above the logos they were just decoration.
 */
const stats = [
  { value: "10+", label: "Years in paid media" },
  { value: "$5M+", label: "Annual ad spend managed" },
  { value: "36.34", label: "Best recorded ROAS" },
  { value: "20+", label: "Programs taught" },
];

const Stat = ({
  value,
  label,
  i,
}: {
  value: string;
  label: string;
  i: number;
}) => {
  const { ref, text } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="border-l-2 pl-4"
      style={{
        borderLeftColor:
          i % 2 ? "hsl(320 100% 65% / 0.5)" : "hsl(196 97% 49% / 0.5)",
      }}
    >
      <div className="numeral text-3xl lg:text-4xl mb-1 tabular-nums">
        {text}
      </div>
      <div className="body-clean text-sm lg:text-base text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

const ResultsBand = () => {
  const reveal = useReveal<HTMLDivElement>();
  return (
    <div
      ref={reveal.ref}
      className={`max-w-6xl mx-auto px-6 lg:px-16 pt-16 lg:pt-24 ${reveal.className}`}
    >
      <div className="stagger grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {stats.map((s, i) => (
          <Stat key={s.label} value={s.value} label={s.label} i={i} />
        ))}
      </div>
    </div>
  );
};

export default ResultsBand;

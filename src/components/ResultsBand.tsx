import { useCountUp } from "@/hooks/use-count-up";
import { useReveal } from "@/hooks/use-reveal";
import { T, useLang } from "@/i18n/lang";

/**
 * The four headline numbers, moved out of the logo strip.
 *
 * They sit at the head of the case studies on purpose: every figure here is one
 * a visitor can check against a card immediately below it, which is the whole
 * reason to claim them. Stacked above the logos they were just decoration.
 */
const stats = (t: T) => [
  { value: "10+", label: t("Years in paid media", "Gadi maksātajā reklāmā") },
  { value: "$5M+", label: t("Annual ad spend managed", "Pārvaldītais reklāmas budžets gadā") },
  { value: "36.34", label: t("Best recorded ROAS", "Labākais sasniegtais ROAS") },
  { value: "20+", label: t("Programs taught", "Vadītas programmas") },
];

const Stat = ({ value, label }: { value: string; label: string }) => {
  const { ref, text } = useCountUp(value);
  return (
    <div ref={ref} className="border-l-2 border-primary/40 pl-4">
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
  const { t } = useLang();
  return (
    <div
      ref={reveal.ref}
      className={`max-w-6xl mx-auto px-6 lg:px-16 pt-16 lg:pt-24 ${reveal.className}`}
    >
      <div className="stagger grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {stats(t).map((s) => (
          <Stat key={s.value} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  );
};

export default ResultsBand;

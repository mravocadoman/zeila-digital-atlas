import { useReveal } from "@/hooks/use-reveal";
import { T, useLang } from "@/i18n/lang";
const steps = (t: T) => [
  {
    n: "01",
    title: t("Discovery call", "Iepazīšanās saruna"),
    body: t(
      "Thirty minutes on your goals, current spend, stack, and what's already been tried. If I'm not the right person, I say so on this call.",
      "Pusstunda par jūsu mērķiem, budžetu, rīkiem un to, kas jau izmēģināts. Ja neesmu īstais cilvēks, pateikšu to uzreiz.",
    ),
  },
  {
    n: "02",
    title: t("Scope & proposal", "Piedāvājums"),
    body: t(
      "A written scope with deliverables, timeline, and what success looks like in numbers. Fixed price where the scope allows it.",
      "Rakstisks plāns: kas tiks izdarīts, kādos termiņos un kā izskatīsies rezultāts skaitļos. Ja iespējams, cena ir fiksēta.",
    ),
  },
  {
    n: "03",
    title: t("Build", "Darbs"),
    body: t(
      "I do the work in your accounts, with your team watching rather than waiting. No black box — you see the reasoning as it happens.",
      "Strādāju jūsu reklāmas kontos, un komanda redz visu procesu, nevis tikai gaida rezultātu. Nekā slēpta — katru lēmumu var redzēt un saprast.",
    ),
  },
  {
    n: "04",
    title: t("Handover", "Nodošana"),
    body: t(
      "SOPs, dashboards, and a working session so your team can run it. Follow-up check-ins are included; a retainer is optional, never assumed.",
      "Instrukcijas, atskaites un kopīga darba sesija, lai komanda varētu turpināt pati. Pēcpārbaudes ir iekļautas cenā; ilgtermiņa sadarbība — tikai tad, ja to vēlaties.",
    ),
  },
];

const Process = () => {
  const reveal = useReveal<HTMLElement>();
  const { t } = useLang();
  return (
    <section
      id="process"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{t("How an engagement works", "Kā notiek sadarbība")}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-8 lg:mb-12 max-w-3xl">
          {t("Four steps, no bloat.", "Četri soļi. Bez liekas birokrātijas.")}
        </h2>

        <ol className="stagger grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {steps(t).map((s) => (
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

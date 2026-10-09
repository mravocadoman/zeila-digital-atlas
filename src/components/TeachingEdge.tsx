import { useReveal } from "@/hooks/use-reveal";
import { Link } from "react-router-dom";
import { T, useLang } from "@/i18n/lang";

/**
 * The teaching CV, compressed from a 2,357px résumé into credibility for the
 * consulting offer. The exhaustive list (25+ lectures, podcasts, panels) lives
 * on /about — this is the top five, chosen for what a buyer would recognise.
 */
const highlights = (t: T) => [
  {
    org: t("Riga Business School", "Rīgas Biznesa skola"),
    role: t("MBA Lecturer, Digital Marketing", "MBA lektors digitālajā mārketingā"),
    period: t("2021–present", "2021–šobrīd"),
  },
  {
    org: t("LIFT Program (EU-funded)", "LIFT programma (ES finansēta)"),
    role: t("Course leader — Meta Ads & automation for SMEs", "Kursu vadītājs — Meta reklāma un automatizācija uzņēmējiem"),
    period: t("2024–present", "2024–šobrīd"),
  },
  {
    org: t("International Trade Centre", "Starptautiskais tirdzniecības centrs (ITC)"),
    role: t("Workshop facilitator — Kenya, Palestine, Gambia, Jordan", "Darbnīcu vadītājs — Kenija, Palestīna, Gambija, Jordānija"),
    period: "2019, 2023",
  },
  {
    org: t("RISEBA University", "Augstskola RISEBA"),
    role: t("BBA Lecturer, Social Media & Meta Ads", "BBA lektors — sociālie mediji un Meta reklāma"),
    period: "2023–2024",
  },
  {
    org: t("University of Lusaka", "Lusakas Universitāte (Zambija)"),
    role: t("Guest Lecturer (Erasmus+)", "Vieslektors (Erasmus+)"),
    period: "2024",
  },
];

const TeachingEdge = () => {
  const reveal = useReveal<HTMLElement>();
  const { t, to } = useLang();
  return (
  <section
    id="teaching"
    ref={reveal.ref}
    className={`py-12 lg:py-24 px-6 lg:px-16 bg-sunken section-rule ${reveal.className}`}
  >
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
      <div>
        <span className="eyebrow block mb-4">{t("Why me", "Kāpēc tieši es")}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-6">
          {t("I teach this at MBA level. That's the difference.", "Es to mācu MBA studentiem. Tur ir atšķirība.")}
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed mb-4">
          {t(
            "Most consultants can run your ads. Far fewer can explain the reasoning clearly enough that your team can take over. That's the only version of this that leaves you better off in a year.",
            "Reklāmas tev var palaist daudzi. Daudz retāk kāds spēj visu izskaidrot tik skaidri, lai tava komanda varētu darbu pārņemt. Un tikai tā pēc gada tu būsi labākā situācijā nekā šodien.",
          )}
        </p>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed">
          {t(
            "I've been building the curriculum for that handover since 2021, in front of MBA students who ask hard questions and EU program participants who have to use it on Monday.",
            "Kopš 2021. gada to mācu MBA studentiem, kas uzdod neērtus jautājumus, un ES programmu dalībniekiem, kuriem viss jāpielieto jau nākamajā pirmdienā.",
          )}
        </p>
      </div>

      <div>
        <ul className="divide-y divide-border border-y border-border">
          {highlights(t).map((h) => (
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
          to={to("/about")}
          className="body-clean inline-block mt-6 text-primary hover:text-foreground transition-colors font-semibold"
        >
          {t("Full teaching history, career, and credentials →", "Visa pasniegšanas pieredze, karjera un izglītība →")}
        </Link>
      </div>
    </div>
  </section>
  );
};

export default TeachingEdge;

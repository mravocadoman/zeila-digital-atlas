import { useReveal } from "@/hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { T, useLang } from "@/i18n/lang";

/**
 * The pricing answer states the three fractional retainer tiers published in
 * Engagements.tsx (set by Rihards 2026-11-21). Audits, projects and training
 * are still priced by shape; keep both files in step.
 */
const faqs = (t: T) => [
  {
    q: t("How does pricing work?", "Cik tas maksā?"),
    a: t(
      "Audits are a fixed fee. Projects are quoted as a fixed project price once the scope is written, so the number doesn't move mid-engagement. The fractional retainer has three published levels: €2,400, €5,000 or €10,500 a month, for half a day, one day or two days a week, with a three-month minimum. Training is priced per program. You get every price in writing after the discovery call, before any work starts. I don't do hourly.",
      "Auditam ir fiksēta cena. Projekta cenu nosakām pēc darba apjoma izvērtēšanas, un tā vairs nemainās. Ilgtermiņa sadarbībai ir trīs līmeņi: 2 400 €, 5 000 € vai 10 500 € mēnesī, atkarībā no tā, cik daudz laika veltu tavam uzņēmumam: pusi dienas, vienu vai divas dienas nedēļā. Minimālais sadarbības termiņš ir trīs mēneši. Apmācību cena ir atkarīga no programmas. Visas cenas tu saņem rakstiski pēc iepazīšanās sarunas, pirms sākam darbu. Pēc stundām nestrādāju.",
    ),
  },
  {
    q: t("Do you take over our ad account, or work through our team?", "Vai pārņemsi mūsu reklāmas kontu, vai strādāsi kopā ar komandu?"),
    a: t(
      "Through your team wherever possible. I'll work directly in the account during a build, but your people keep access and watch the reasoning as it happens. The handover is the deliverable, so a black box would defeat it.",
      "Kopā ar komandu, kur vien iespējams. Izveides laikā strādāju tieši kontā, bet taviem cilvēkiem saglabājas piekļuve, un viņi redz, ko un kāpēc daru. Galvenais ir tas, lai komanda varētu turpināt pati, tāpēc nekas netiek slēpts.",
    ),
  },
  {
    q: t("What's the minimum ad spend for this to be worth it?", "Kādam jābūt reklāmas budžetam, lai tas atmaksātos?"),
    a: t(
      "Roughly €10k a month, or a credible plan to get there. Below that the constraint is usually offer and creative volume rather than account structure, and you'd be paying me to fix the wrong thing.",
      "Aptuveni €10k mēnesī vai reāls plāns, kā līdz tam nonākt. Ar mazāku budžetu problēma parasti ir piedāvājumā un reklāmu daudzumā, nevis konta struktūrā, un tu maksātu man par nepareizās lietas labošanu.",
    ),
  },
  {
    q: t("Remote, in person, or both?", "Tu strādā attālināti vai klātienē?"),
    a: t(
      "Both. I'm based in Riga and work on-site across the Baltics; everything else is remote, and I've delivered programs in Europe, Africa, and Southeast Asia. Winters are usually remote.",
      "Abējādi. Dzīvoju Rīgā un klātienē braucu pa visu Baltiju, pārējais notiek attālināti. Programmas esmu vadījis Eiropā, Āfrikā un Dienvidaustrumāzijā. Ziemās parasti strādāju attālināti.",
    ),
  },
  {
    q: t("Which languages do you work in?", "Kādās valodās tu strādā?"),
    a: t(
      "English and Latvian, natively. Also Latgalian, and professional working Russian and Polish.",
      "Latviski un angliski runāju brīvi, protu arī latgaliski, bet krieviski un poliski runāju darba līmenī.",
    ),
  },
  {
    q: t("How fast can you start?", "Cik ātri vari sākt?"),
    a: t(
      "Audits usually within two weeks. Build projects depend on the current book. I'll tell you honestly on the discovery call. I reply to enquiries within two business days.",
      "Auditu parasti varu sākt divu nedēļu laikā. Lielākiem projektiem tas atkarīgs no noslodzes, un iepazīšanās sarunā to pateikšu godīgi. Uz pieteikumiem atbildu divu darba dienu laikā.",
    ),
  },
];

const FAQ = () => {
  const reveal = useReveal<HTMLElement>();
  const { t } = useLang();
  return (
  <section
    id="faq"
    ref={reveal.ref}
    className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
  >
    <div className="max-w-3xl mx-auto">
      <span className="eyebrow block mb-4">{t("Questions", "Jautājumi")}</span>
      <h2 className="heading-elegant text-3xl lg:text-5xl mb-10">
        {t("The things people ask before emailing.", "Ko parasti jautā pirms sadarbības.")}
      </h2>

      <Accordion type="single" collapsible defaultValue="q0" className="w-full">
        {faqs(t).map((f, i) => (
          <AccordionItem key={i} value={`q${i}`} className="border-border">
            <AccordionTrigger className="heading-elegant text-lg lg:text-xl text-left py-5 hover:no-underline hover:text-primary transition-colors">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
  );
};

export default FAQ;

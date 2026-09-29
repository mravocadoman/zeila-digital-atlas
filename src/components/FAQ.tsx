import { useReveal } from "@/hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { T, useLang } from "@/i18n/lang";

/**
 * TODO (Rihards): the pricing answer describes structure but publishes no
 * figures — I'm not inventing your rates. If you want a floor stated
 * ("audits from €X"), edit the first answer and the `price` lines in
 * Engagements.tsx to match.
 */
const faqs = (t: T) => [
  {
    q: t("How does pricing work?", "Kā tiek noteikta cena?"),
    a: t(
      "Audits are a fixed fee. Projects are quoted as a fixed project price once the scope is written, so the number doesn't move mid-engagement. Retainers and training are monthly or per-program. You get the price in writing after the discovery call, before any work starts — I don't do hourly.",
      "Auditiem ir fiksēta maksa. Projektiem cenu nosaku kā fiksētu projekta cenu, tiklīdz ir aprakstīts darba apjoms, tāpēc tā sadarbības vidū nemainās. Ilgtermiņa sadarbība un apmācības tiek apmaksātas reizi mēnesī vai par programmu. Cenu saņemat rakstiski pēc iepazīšanās sarunas, pirms sākas jebkāds darbs — pēc stundām es nestrādāju.",
    ),
  },
  {
    q: t("Do you take over our ad account, or work through our team?", "Vai jūs pārņemat mūsu reklāmas kontu vai strādājat caur mūsu komandu?"),
    a: t(
      "Through your team wherever possible. I'll work directly in the account during a build, but your people keep access and watch the reasoning as it happens. The handover is the deliverable, so a black box would defeat it.",
      "Caur jūsu komandu, kur vien iespējams. Izstrādes laikā strādāju tieši kontā, bet jūsu cilvēkiem saglabājas piekļuve un viņi redz loģiku darba gaitā. Nodošana ir galvenais rezultāts, tāpēc “melnā kaste” to sabojātu.",
    ),
  },
  {
    q: t("What's the minimum ad spend for this to be worth it?", "Kāds ir minimālais reklāmas budžets, lai tas atmaksātos?"),
    a: t(
      "Roughly €10k a month, or a credible plan to get there. Below that the constraint is usually offer and creative volume rather than account structure, and you'd be paying me to fix the wrong thing.",
      "Aptuveni €10k mēnesī vai ticams plāns, kā līdz tam nonākt. Zem šīs robežas ierobežojums parasti ir piedāvājums un kreatīvu apjoms, nevis konta struktūra — un jūs maksātu man par nepareizās lietas labošanu.",
    ),
  },
  {
    q: t("Remote, in person, or both?", "Attālināti, klātienē vai abi?"),
    a: t(
      "Both. I'm based in Riga and work on-site across the Baltics; everything else is remote, and I've delivered programs in Europe, Africa, and Southeast Asia. Winters are usually remote.",
      "Abi. Esmu Rīgā un klātienē strādāju visā Baltijā; pārējais notiek attālināti, un programmas esmu vadījis Eiropā, Āfrikā un Dienvidaustrumāzijā. Ziemās parasti strādāju attālināti.",
    ),
  },
  {
    q: t("Which languages do you work in?", "Kādās valodās jūs strādājat?"),
    a: t(
      "English and Latvian, natively. Also Latgalian, and professional working Russian and Polish.",
      "Latviešu un angļu valodā dzimtās valodas līmenī. Arī latgaliešu valodā, un profesionālā līmenī krievu un poļu valodā.",
    ),
  },
  {
    q: t("How fast can you start?", "Cik ātri varat sākt?"),
    a: t(
      "Audits usually within two weeks. Build projects depend on the current book — the discovery call will tell you honestly. I reply to enquiries within two business days.",
      "Auditus parasti divu nedēļu laikā. Izstrādes projekti atkarīgi no pašreizējās noslodzes — iepazīšanās sarunā to godīgi pateikšu. Uz pieprasījumiem atbildu divu darba dienu laikā.",
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
        {t("The things people ask before emailing.", "Ko cilvēki jautā, pirms raksta.")}
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

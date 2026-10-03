import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { T, useLang } from "@/i18n/lang";

import advisoryGfx from "@/assets/gfx/advisory.webp";
import auditGfx from "@/assets/gfx/audit.webp";
import buildGfx from "@/assets/gfx/build.webp";
import retainerGfx from "@/assets/gfx/retainer.webp";
import trainingGfx from "@/assets/gfx/training.webp";

/**
 * TODO (Rihards): pricing is described by shape only, no figures. If you want
 * a floor published ("audits from EUR X"), edit the `price` lines below and the
 * pricing answer in FAQ.tsx.
 */
const getEngagements = (t: T) => [
  {
    kind: t("Advisory", "Konsultācijas"),
    gfx: advisoryGfx,
    title: t("Strategy consulting", "Stratēģiskās konsultācijas"),
    forWho: t("Founders and marketing leads with a decision to make", "Uzņēmumu un mārketinga vadītājiem, kuriem jāpieņem svarīgs lēmums"),
    body: t(
      "You don't need someone in the account — you need someone who has already made this mistake. Channel strategy, budget allocation, agency decisions, whether to build in-house.",
      "Tev nevajag cilvēku, kas klikšķina reklāmas kontā. Vajag kādu, kurš šo kļūdu jau ir pieļāvis. Kanālu izvēle, budžeta sadale, darbs ar aģentūru, savas komandas veidošana.",
    ),
    price: t("Per session or day rate", "Maksa par sesiju vai dienu"),
    deliverables: [
      t("Working sessions on the decision in front of you", "Darba sesijas tieši par tavu jautājumu"),
      t("A written recommendation you can take to the board", "Rakstisks ieteikums, ko var likt priekšā valdei"),
      t("Follow-up as it plays out, not a one-shot opinion", "Esmu blakus arī tad, kad lēmumu īsteno — nevis tikai viens padoms"),
    ],
    featured: false,
  },
  {
    kind: t("Fixed scope", "Vienreizējs darbs"),
    gfx: auditGfx,
    title: t("Account audit", "Reklāmas konta audits"),
    forWho: t("Brands already spending, unsure where it leaks", "Uzņēmumiem, kas jau reklamējas, bet nezina, kur aizplūst nauda"),
    body: t(
      "I go through the ad account, tracking setup, and funnel, then tell you what's actually costing you money — in priority order.",
      "Izskatu reklāmas kontu, mērīšanas iestatījumus un pārdošanas piltuvi un pasaku, kas tev patiesībā izmaksā naudu — sākot ar svarīgāko.",
    ),
    price: t("Fixed fee · 1–2 weeks", "Fiksēta cena · 1–2 nedēļas"),
    deliverables: [
      t("Written findings on account structure, creative, and measurement", "Rakstisks ziņojums par konta struktūru, reklāmām un mērīšanu"),
      t("A prioritised fix list, most expensive problem first", "Labojumu saraksts — dārgākā problēma pirmajā vietā"),
      t("A 90-minute call to walk your team through it", "90 minūšu saruna, kurā visu izrunājam ar tavu komandu"),
    ],
    featured: false,
  },
  {
    kind: t("Project", "Projekts"),
    gfx: buildGfx,
    title: t("Build & handover", "Sistēmas izveide un nodošana"),
    forWho: t("Teams that need the system built once, properly", "Komandām, kurām sistēmu vajag izveidot vienreiz un kārtīgi"),
    body: t(
      "The core engagement. I build the campaign structure, funnel, and tracking, run it until the numbers are stable, then hand it over documented so your team owns it.",
      "Galvenais pakalpojums. Izveidoju kampaņu struktūru, pārdošanas piltuvi un mērīšanu, vadu to, līdz rezultāti ir stabili, un tad nododu tavai komandai kopā ar visu dokumentāciju.",
    ),
    price: t("Project fee · 6–12 weeks", "Projekta cena · 6–12 nedēļas"),
    deliverables: [
      t("Campaign and funnel architecture, built and live", "Kampaņu un piltuves struktūra — izveidota un strādā"),
      t("Tracking and reporting your team can actually read", "Mērīšana un atskaites, kuras komanda tiešām saprot"),
      t("SOPs and a handover session — you keep running it", "Instrukcijas un apmācība — tālāk to vadi pats"),
    ],
    featured: true,
  },
  {
    kind: t("Ongoing", "Ilgtermiņā"),
    gfx: retainerGfx,
    title: t("Fractional growth lead", "Izaugsmes vadītājs uz nepilnu slodzi"),
    forWho: t("In-house teams who want a sparring partner", "Komandām, kurām blakus vajag pieredzējušu padomdevēju"),
    body: t(
      "Monthly. I stay close to the account without taking it over — reviews, creative direction, and someone senior to argue with before you spend.",
      "Ikmēneša sadarbība. Sekoju līdzi kontam, to nepārņemot: pārskati, ieteikumi reklāmām un pieredzējis cilvēks, ar ko izrunāt lēmumus, pirms tu tērē naudu.",
    ),
    price: t("Monthly retainer", "Ikmēneša maksa"),
    deliverables: [
      t("Weekly working sessions with your marketers", "Iknedēļas tikšanās ar tavu mārketinga komandu"),
      t("Ad account reviews and scaling decisions", "Reklāmas kontu pārskati un lēmumi par budžeta palielināšanu"),
      t("On call for the decisions that cost money", "Pieejams, kad jāpieņem lēmumi, kas maksā naudu"),
    ],
    featured: false,
  },
  {
    kind: t("Training", "Apmācības"),
    gfx: trainingGfx,
    title: t("Team training & workshops", "Apmācības un darbnīcas komandām"),
    forWho: t("Companies, universities, and EU-funded programs", "Uzņēmumiem, augstskolām un ES finansētām programmām"),
    body: t(
      "The same material I teach on the Riga Business School MBA, adapted to your channels and tools. One-day intensives through semester-long modules.",
      "Tas pats, ko mācu Rīgas Biznesa skolas MBA studentiem, tikai pielāgots taviem kanāliem un rīkiem. No vienas dienas intensīvajiem kursiem līdz semestra garumā kursiem.",
    ),
    price: t("Per program", "Cena atkarīga no programmas"),
    deliverables: [
      t("Meta Ads intensives and multi-session courses", "Meta reklāmu intensīvie kursi un kursi vairākās nodarbībās"),
      t("Custom MBA / BBA modules with assessments", "MBA / BBA kursi ar pārbaudījumiem"),
      t("Recordings and playbooks so it sticks", "Ieraksti un rokasgrāmatas, lai zināšanas neaizmirstas"),
    ],
    featured: false,
  },
];

type Engagement = ReturnType<typeof getEngagements>[number];

/**
 * Rows, not cards.
 *
 * As a 2-up grid of five these ran 2,241px — three rows of tall cards with a
 * half-empty one at the end. Horizontal room is free at desktop widths and
 * vertical room is not, so each engagement is now one row: mark, what it is,
 * what you get, what it costs. It also reads like the service menu it actually
 * is, and five rows always align — no orphan to centre.
 */
const EngagementRow = ({ e, index }: { e: Engagement; index: number }) => {
  const row = useReveal<HTMLElement>("card");
  const { t } = useLang();

  return (
    <article
      ref={row.ref}
      className={`grid gap-x-8 gap-y-3 lg:gap-y-0 py-5 lg:py-7 border-t lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,20rem)] ${
        e.featured ? "border-t-[hsl(320_100%_65%/0.5)]" : "border-t-border"
      } ${row.className}`}
    >
      <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:gap-2">
        <span className="numeral text-primary/45 text-sm lg:text-base leading-none lg:mt-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <img
          src={e.gfx}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="460"
          height="240"
          className="h-10 lg:h-14 w-auto object-contain object-left"
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap mb-1">
          <span className="eyebrow">{e.kind}</span>
          {e.featured && (
            <span className="body-clean text-[0.68rem] font-semibold text-[hsl(320_100%_65%)] uppercase tracking-wider">
              {t("Most common", "Visbiežāk izvēlas")}
            </span>
          )}
        </div>
        <h3 className="heading-elegant text-2xl lg:text-3xl mb-1.5">
          {e.title}
        </h3>
        <p className="body-clean text-base text-foreground/70 mb-2 max-w-[60ch]">
          {e.forWho}
        </p>
        <p className="body-clean text-foreground/85 text-base leading-relaxed max-w-[62ch]">
          {e.body}
        </p>
      </div>

      <div className="min-w-0">
        <span className="eyebrow block mb-2.5 text-muted-foreground">
          {t("What you get", "Ko tu saņem")}
        </span>
        <ul className="space-y-1.5 mb-3">
          {e.deliverables.map((d) => (
            <li key={d} className="flex gap-2.5 items-start">
              <span className="text-primary flex-shrink-0" aria-hidden="true">
                &mdash;
              </span>
              <span className="body-clean text-base text-foreground/80 leading-relaxed">
                {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="body-clean text-base text-foreground/90 pt-3 border-t border-border">
          {e.price}
        </p>
      </div>
    </article>
  );
};

const Engagements = () => {
  const reveal = useReveal<HTMLElement>();
  const { t } = useLang();
  const engagements = getEngagements(t);

  return (
    <section
      id="engagements"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 bg-sunken section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{t("What you get", "Pakalpojumi")}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          {t("Five ways to work together.", "Piecas sadarbības iespējas.")}
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-10">
          {t(
            "Every one of them ends with your team able to run the thing themselves. That's the point, not an upsell I'm withholding.",
            "Katra no tām beidzas ar to, ka tava komanda visu spēj vadīt pati. Tieši tāds ir mērķis — nevis turēt tevi pie sevis.",
          )}
        </p>

        <div className="border-b border-border">
          {engagements.map((e, i) => (
            <EngagementRow key={i} e={e} index={i} />
          ))}
        </div>

        <div className="mt-10 lg:mt-12 text-center">
          <Button
            size="lg"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-primary text-background hover:bg-primary/90 px-8 py-6 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider"
          >
            {t("Book a consultation", "Pieteikties konsultācijai")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Engagements;

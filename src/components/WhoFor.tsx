import { useReveal } from "@/hooks/use-reveal";
import { T, useLang } from "@/i18n/lang";

import scalingGfx from "@/assets/gfx/scaling.webp";
import plateauGfx from "@/assets/gfx/plateau.webp";
import systemGfx from "@/assets/gfx/system.webp";

const audiences = (t: T) => [
  {
    gfx: scalingGfx,
    title: t("E-commerce brands scaling up", "E-veikali, kas aug"),
    body: t(
      "You're spending real money, €20k a month and climbing, and the returns are getting less predictable as the budget grows. Nine times in ten the fix is in the account structure and the tracking, before anyone touches the creative.",
      "Reklāmā tu jau iegulda nopietnu naudu, €20k mēnesī un vairāk, bet, budžetam augot, rezultātu kļūst arvien grūtāk paredzēt. Deviņos gadījumos no desmit problēma ir kampaņu struktūrā un mērīšanā, nevis pašās reklāmās.",
    ),
  },
  {
    gfx: plateauGfx,
    title: t("SMEs stuck at a plateau", "Uzņēmumi, kas iestrēguši uz vietas"),
    body: t(
      "Ads work sometimes and you can't say why. There's no funnel behind the traffic and no reliable way to tell which euro did the work.",
      "Reklāmas reizēm nostrādā, bet nav skaidrs, kāpēc. Aiz tām nav pārdošanas piltuves, un nav iespējams pateikt, kurš iztērētais eiro atnesa klientu.",
    ),
  },
  {
    gfx: systemGfx,
    title: t("In-house teams without a system", "Mārketinga komandas bez sistēmas"),
    body: t(
      "You have marketers, not a machine. You want the process written down and the team able to run it, so you are never locked into an agency again.",
      "Cilvēki tev ir, sistēmas nav. Gribi, lai process ir pierakstīts un komanda to vada pati, lai vairs nebūtu jāpaļaujas uz kārtējo aģentūru.",
    ),
  },
];

/** Each card animates as it personally reaches the fold, not all at once. */
const AudienceCard = ({
  gfx,
  title,
  body,
}: {
  gfx: string;
  title: string;
  body: string;
}) => {
  const card = useReveal<HTMLDivElement>("card");

  return (
    <div
      ref={card.ref}
      className={`border border-border rounded-lg overflow-hidden lift flex flex-col ${card.className}`}
    >
      {/* Decorative — the heading carries the meaning, so it's hidden from
          assistive tech rather than given invented alt text. */}
      <div className="p-5 lg:p-7">
        <img
          src={gfx}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="460"
          height="240"
          className="h-16 lg:h-20 w-auto object-contain object-left mb-4"
        />
        <h3 className="heading-elegant text-xl lg:text-2xl mb-3">{title}</h3>
        <p className="body-clean text-foreground/85 text-base lg:text-lg leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
};

const WhoFor = () => {
  const reveal = useReveal<HTMLElement>();
  const { t } = useLang();

  return (
    <section
      id="who-for"
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{t("Who this is for", "Kam es palīdzu")}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">
          {t("Three situations where I earn my fee.", "Trīs situācijas, kurās esmu savas naudas vērts.")}
        </h2>
        <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl mb-8 lg:mb-12">
          {t(
            "If none of these sound like you, say so in the form anyway. I'll tell you straight if it isn't a fit.",
            "Ja neatpazīsti sevi nevienā no tām, tāpat uzraksti, un godīgi pateikšu, vai varu palīdzēt.",
          )}
        </p>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {audiences(t).map((a) => (
            <AudienceCard key={a.title} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoFor;

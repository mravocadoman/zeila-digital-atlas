import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "@/i18n/lang";

import aboutPortrait from "@/assets/rihards-about.webp";

import Navigation from "@/components/Navigation";
import SpeakingTeaching from "@/components/SpeakingTeaching";
import Timeline from "@/components/Timeline";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";

/**
 * Everything that belongs in a CV but doesn't sell a consultation. Nothing was
 * deleted in the rebuild — the full teaching history, career timeline, and
 * credentials all moved here intact.
 */
const About = () => {
  const { t, to } = useLang();
  usePageMeta(
    t(
      "About Rihards Zeila — career, teaching, and credentials",
      "Par Rihardu Zeilu — karjera, pasniegšana un kvalifikācija",
    ),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="px-6 lg:px-16 pt-28 pb-10 lg:pt-36 lg:pb-14">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="eyebrow block mb-4">{t("About", "Par mani")}</span>
              <h1 className="heading-elegant text-4xl lg:text-6xl mb-6">
                {t(
                  "Ten years of paid media, teaching, and a lot of airports.",
                  "Desmit gadi maksātās reklāmas, pasniegšanas un daudz lidostu.",
                )}
              </h1>
              <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl leading-relaxed">
                {t(
                  "The full record — every lecture, workshop, panel and podcast, the career timeline, and the credentials behind it. If you're here to hire rather than to read,",
                  "Pilns saraksts — katra lekcija, darbnīca, diskusija un podkāsts, karjeras gaita un kvalifikācija. Ja esat šeit, lai sadarbotos, nevis lasītu,",
                )}{" "}
                <Link to={to("/#engagements")} className="text-primary hover:underline">
                  {t("the work I do is over here", "mans piedāvājums ir šeit")}
                </Link>
                .
              </p>
            </div>
            <img
              src={aboutPortrait}
              alt="Rihards Zeila"
              className="w-44 sm:w-56 lg:w-full lg:max-w-xs mx-auto rounded-lg border border-border"
              loading="eager"
            />
          </div>
        </section>

        <SpeakingTeaching />
        <Timeline />
        <Credentials />

        <section className="px-6 lg:px-16 py-16 lg:py-24 bg-sunken">
          <div className="max-w-3xl mx-auto">
            <span className="eyebrow block mb-4">{t("One more reference", "Vēl viena atsauksme")}</span>
            <figure>
              <blockquote className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed mb-5">
                &ldquo;{t(
                  "Goal-oriented, brave and active professional who always strives for growth and development, while maintaining the belief that work should bring joy and be interesting. Rihards has excellent sales and persuasion skills. He creates a pleasant, open and friendly first impression.",
                  "Mērķtiecīgs, drosmīgs un aktīvs profesionālis, kurš vienmēr tiecas pēc izaugsmes un attīstības, vienlaikus saglabājot pārliecību, ka darbam jāsagādā prieks un jābūt interesantam. Rihardam ir izcilas pārdošanas un pārliecināšanas prasmes. Viņš rada patīkamu, atvērtu un draudzīgu pirmo iespaidu.",
                )}&rdquo;
              </blockquote>
              <figcaption className="body-clean">
                <span className="font-semibold text-foreground">Evita Jaunozola</span>
                <span className="text-muted-foreground"> — StartSchooler</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="px-6 lg:px-16 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-elegant text-2xl lg:text-4xl mb-6">
              {t("Got what you came for?", "Atradāt, ko meklējāt?")}
            </h2>
            <Link
              to={to("/#contact")}
              className="body-clean inline-block bg-primary text-background px-8 py-4 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              {t("Book a consultation", "Pieteikt konsultāciju")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

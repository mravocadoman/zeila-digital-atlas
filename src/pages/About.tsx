import { useEffect } from "react";
import { Link } from "react-router-dom";

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
  useEffect(() => {
    document.title = "About Rihards Zeila — career, teaching, and credentials";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="px-6 lg:px-16 pt-28 pb-10 lg:pt-36 lg:pb-14">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="eyebrow block mb-4">About</span>
              <h1 className="heading-elegant text-4xl lg:text-6xl mb-6">
                Ten years of paid media, teaching, and a lot of airports.
              </h1>
              <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl leading-relaxed">
                The full record — every lecture, workshop, panel and podcast, the career
                timeline, and the credentials behind it. If you're here to hire rather
                than to read,{" "}
                <Link to="/#engagements" className="text-primary hover:underline">
                  the work I do is over here
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
            <span className="eyebrow block mb-4">One more reference</span>
            <figure>
              <blockquote className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed mb-5">
                &ldquo;Goal-oriented, brave and active professional who always strives for
                growth and development, while maintaining the belief that work should
                bring joy and be interesting. Rihards has excellent sales and persuasion
                skills. He creates a pleasant, open and friendly first impression.&rdquo;
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
              Got what you came for?
            </h2>
            <Link
              to="/#contact"
              className="body-clean inline-block bg-primary text-background px-8 py-4 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Book a consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

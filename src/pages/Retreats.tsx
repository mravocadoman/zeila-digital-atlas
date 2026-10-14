import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "@/i18n/lang";
import { useReveal } from "@/hooks/use-reveal";

import aboutPortrait from "@/assets/rihards-about.webp";
import shalaImg from "@/assets/retreat/shala.webp";
import palmsImg from "@/assets/retreat/palms.webp";
import deskImg from "@/assets/retreat/desk.webp";
import oceanImg from "@/assets/retreat/ocean.webp";
import pathImg from "@/assets/retreat/path.webp";

import ResultsBand from "@/components/ResultsBand";
import { getCaseStudies, StudyCard } from "@/components/CaseStudies";
import Footer from "@/components/Footer";

/**
 * The page sent to yoga, meditation and retreat centres in outreach: a season
 * on site as "marketer in residence", paid in a room and the practice.
 *
 * Deliberately unlisted and English-only. It's noindex, absent from the nav and
 * sitemap, and has no /lv mirror, because a room-and-board offer sitting on the
 * public consulting site would undercut the consulting rates. Hence its own
 * header: the shared Navigation carries the language switch, which would point
 * at a /lv/retreats that doesn't exist.
 *
 * It also has its own look (.rt-theme in index.css): linen, ink and terracotta,
 * a Fraunces serif, film grain and generated mood photography, because it is
 * read by retreat owners, not ad buyers. The photos (src/assets/retreat) show
 * no people and no real place, so none of them can read as a client claim.
 */

const WHATSAPP = `https://wa.me/37126673384?text=${encodeURIComponent(
  "Hi Rihards, I run a centre and saw your residency page.",
)}`;
const EMAIL = "mailto:rihards.zeila@gmail.com?subject=Marketing%20residency";

const primaryBtn =
  "body-clean inline-block text-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm lg:text-base tracking-wide hover:bg-primary/90 transition-colors";
const ghostBtn =
  "body-clean inline-block text-center border border-foreground/40 text-foreground px-8 py-4 rounded-full font-semibold text-sm lg:text-base tracking-wide hover:border-foreground transition-colors";

const offers = [
  {
    title: "Full retreats and trainings",
    body: "Meta and Google ads aimed at the people who actually book, with tracking that shows which euro brought which guest.",
  },
  {
    title: "A website that takes bookings",
    body: "Broken forms, stale calendars and slow pages fixed first. Then a booking path a guest can finish on a phone.",
  },
  {
    title: "Offers and landing pages",
    body: "Retreat packages, early-bird and seasonal offers, each with its own page and a clear reason to book now.",
  },
  {
    title: "Automations that follow up",
    body: "Enquiries answered in minutes, unfinished bookings chased, reviews requested after checkout, cancelled spots refilled from a waitlist.",
  },
  {
    title: "AI your team will actually use",
    body: "Replies, posts and newsletters drafted in your voice, and an assistant that answers the questions guests ask every day.",
  },
  {
    title: "Workshops for your team",
    body: "I've taught 20+ marketing programs. Your staff come out able to run the ads, emails and automations without me.",
  },
];

const situations = [
  {
    problem: "Enquiries go cold in the inbox",
    build: "A WhatsApp and email flow that answers the common questions instantly, sends dates and prices, and follows up twice if nobody books.",
    keep: "A reply time measured in minutes, even on a teaching day.",
  },
  {
    problem: "Shoulder weeks sit half empty",
    build: "Your past guests sorted by what they came for, and a short last-minute offer that goes out to the right ones when a week looks thin.",
    keep: "A lever you can pull every slow week.",
  },
  {
    problem: "Teacher trainings fill too slowly",
    build: "A free online class that leads into the application. It's the same funnel shape that turned €1,175 of ads into €10K of course sales for a training company.",
    keep: "A pipeline of applicants months before the start date.",
  },
  {
    problem: "Retreat leaders don't know you exist",
    build: "A venue page and an outreach sequence for teachers who bring groups of 12 to 50, with the photos, room plans and prices they need to sell your place to their students.",
    keep: "Groups booked a year out, not just individual guests.",
  },
  {
    problem: "Last season's offer is still on the homepage",
    build: "A campaign calendar for the year (Black Friday, New Year, high season), with every page and email built ahead and ready to switch on.",
    keep: "No more scrambling in November.",
  },
];

// Real clients only. None are retreat centres yet, so each says why it transfers.
const transfers: Record<string, string> = {
  "Instant Change":
    "A coach sells transformation, not a product. So does a retreat: people have to trust you before they give you a week of their life.",
  "Excel Know How":
    "A free webinar into a paid course is the same shape as a free class into a teacher training.",
  "LIFT Digitalisation Program":
    "Course pages, search rankings and email filled a training programme. It's the same work as filling a retreat calendar.",
};

const steps = [
  {
    title: "Week one: listen and fix",
    body: "I go through your site, booking flow, ads and reviews, and fix what's broken first. You get a written plan by the end of the week.",
  },
  {
    title: "Then: build",
    body: "Campaigns, pages and automations, built in your own accounts with your team alongside. Nothing in a black box.",
  },
  {
    title: "Last weeks: hand over",
    body: "Short guides, a simple dashboard and a workshop, so your team keeps it running after I leave.",
  },
  {
    title: "The exchange",
    body: "2 to 4 hours a day, more for a big project. You provide a room and a place in your practice, and meals if you can. No fees either way.",
  },
];

const terms = ["Starts Nov or Dec", "2 to 4 months", "2 to 4 hours a day"];

/** A section that rises in once it reaches the fold. See use-reveal for why it's safe. */
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) => {
  const reveal = useReveal<HTMLElement>();
  return (
    <section id={id} ref={reveal.ref} className={`px-6 lg:px-16 py-20 lg:py-32 ${className} ${reveal.className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="eyebrow block mb-5">{children}</span>
);

/** Decorative mood photo. The copy carries the meaning, so it's hidden from assistive tech. */
const Photo = ({ src, className }: { src: string; className: string }) => (
  <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" className={`object-cover ${className}`} />
);

const Retreats = () => {
  const { t } = useLang();
  usePageMeta(
    "Marketer in residence for yoga & retreat centres | Rihards Zeila",
    "A senior marketer living at your centre for a season, working on bookings, ads, website and automations in exchange for a room and the practice.",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!document.getElementById("rt-fonts")) {
      const fonts = document.createElement("link");
      fonts.id = "rt-fonts";
      fonts.rel = "stylesheet";
      fonts.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..600,0..100;1,9..144,300..600,0..100&family=Inter+Tight:wght@400;600&display=swap";
      document.head.appendChild(fonts);
    }
    // index.html ships "index, follow"; a second tag would contradict it, so swap
    // the content and put it back when the visitor moves on to a listed page.
    const robots = document.querySelector('meta[name="robots"]');
    const listed = robots?.getAttribute("content") ?? "";
    robots?.setAttribute("content", "noindex, follow");
    return () => robots?.setAttribute("content", listed);
  }, []);

  const studies = getCaseStudies(t).filter((s) => s.company in transfers);

  return (
    <div className="min-h-screen rt-theme rt-grain">
      {/* Hero: full-bleed sunrise shala, copy on the shaded left */}
      <header className="rt-dark relative min-h-[100svh] flex flex-col overflow-hidden">
        <img
          src={shalaImg}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="rt-drift absolute inset-0 h-full w-full object-cover"
        />
        <div className="rt-hero-shade absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 lg:px-16 pt-6 flex items-center justify-between">
          <Link to="/" className="heading-elegant text-lg lg:text-xl hover:text-primary transition-colors">
            Rihards Zeila
          </Link>
          <a href="#contact" className="body-clean text-sm font-semibold tracking-wide hover:text-primary transition-colors">
            Get in touch
          </a>
        </div>

        <div className="relative z-10 flex-1 flex items-end">
          <div className="max-w-6xl w-full mx-auto px-6 lg:px-16 pb-16 lg:pb-24 pt-32">
            <Eyebrow>For yoga, meditation &amp; retreat centres</Eyebrow>
            <h1 className="heading-elegant text-5xl sm:text-6xl lg:text-8xl leading-[1.02] max-w-4xl mb-8">
              A marketer <em className="italic text-primary">in residence</em> for your season.
            </h1>
            <p className="body-clean text-foreground/85 text-lg lg:text-xl leading-relaxed max-w-xl mb-8">
              I'd like to live at your centre for a season and spend a few hours a day on whatever
              fills your retreats, trainings and rooms. In return: a room, a place in your daily
              practice, and meals if you can.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                Message me on WhatsApp
              </a>
              <a href={EMAIL} className={ghostBtn}>
                Email me
              </a>
            </div>
            <ul className="flex flex-wrap gap-2">
              {terms.map((term) => (
                <li key={term} className="body-clean text-xs lg:text-sm tracking-wide border border-foreground/30 rounded-full px-4 py-1.5 text-foreground/85">
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main>
        <div className="rt-dark pb-16 lg:pb-24">
          <ResultsBand />
        </div>

        {/* What I bring: sticky heading and still life left, the six offers right */}
        <Section>
          <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-10 self-start">
              <Eyebrow>What I bring</Eyebrow>
              <h2 className="heading-elegant text-4xl lg:text-6xl leading-[1.05] mb-6">
                The marketing a small centre rarely has <em className="italic">time</em> for.
              </h2>
              <p className="body-clean text-muted-foreground text-lg leading-relaxed mb-8">
                Ten years running paid growth for e-commerce and service businesses, and I teach
                digital marketing on the Riga Business School MBA.
              </p>
              <Photo src={deskImg} className="w-full aspect-[4/3] rounded-2xl" />
            </div>
            <ol className="grid sm:grid-cols-2 gap-x-10">
              {offers.map((o, i) => (
                <li key={o.title} className="border-t border-border py-8">
                  <span className="heading-elegant italic text-primary text-3xl block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-elegant text-2xl mb-3">{o.title}</h3>
                  <p className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed">{o.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* At a centre: an arch of palm shadow stays put while the situations scroll */}
        <Section className="bg-sunken">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-10 self-start">
              <Eyebrow>At a centre</Eyebrow>
              <h2 className="heading-elegant text-4xl lg:text-6xl leading-[1.05] mb-6">
                What this looks like <em className="italic">in practice.</em>
              </h2>
              <p className="body-clean text-muted-foreground text-lg leading-relaxed mb-8">
                Five situations I see at most retreat centres, and what I'd build for each. These
                are plans, not past results.
              </p>
              <Photo src={palmsImg} className="hidden lg:block w-full max-w-sm aspect-[2/3] rounded-t-full" />
            </div>
            <ol>
              {situations.map((s) => (
                <li key={s.problem} className="border-t border-border py-8 lg:py-10">
                  <h3 className="heading-elegant text-2xl lg:text-3xl mb-4">{s.problem}</h3>
                  <p className="body-clean text-foreground/85 text-base lg:text-lg leading-relaxed mb-3">
                    <span className="eyebrow inline mr-2">Build</span>
                    {s.build}
                  </p>
                  <p className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed">
                    <span className="eyebrow inline mr-2">Keep</span>
                    {s.keep}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Breather */}
        <figure className="rt-dark relative min-h-[70svh] flex items-center overflow-hidden">
          <Photo src={oceanImg} className="absolute inset-0 h-full w-full" />
          <div className="rt-shade absolute inset-0" aria-hidden="true" />
          <blockquote className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 py-24 text-center">
            <p className="heading-elegant italic text-3xl sm:text-4xl lg:text-6xl leading-[1.15]">
              &ldquo;I'd rather give a centre the skills I'm best at than a pair of spare hands.&rdquo;
            </p>
          </blockquote>
        </figure>

        <Section>
          <div className="max-w-3xl mb-12 lg:mb-16">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="heading-elegant text-4xl lg:text-6xl leading-[1.05] mb-6">
              Results from businesses that sell <em className="italic">the way you do.</em>
            </h2>
            <p className="body-clean text-muted-foreground text-lg leading-relaxed">
              No retreat centres on this list yet. These are the closest matches: a considered
              purchase, where trust comes before the booking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {studies.map((s) => (
              <div key={s.company} className="flex flex-col gap-4">
                <StudyCard study={s} />
                <p className="body-clean text-sm lg:text-base text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Why it transfers: </span>
                  {transfers[s.company]}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="bg-sunken">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="heading-elegant text-4xl lg:text-6xl leading-[1.05] mb-12 lg:mb-16 max-w-3xl">
            One season, built to <em className="italic">outlast my stay.</em>
          </h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-primary/50 pt-6">
                <span className="heading-elegant italic text-primary text-3xl block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-elegant text-2xl mb-3">{s.title}</h3>
                <p className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 lg:gap-20 items-center">
            <img
              src={aboutPortrait}
              alt="Rihards Zeila"
              loading="lazy"
              className="rt-sun w-56 sm:w-72 md:w-full max-w-sm mx-auto"
            />
            <div>
              <Eyebrow>Why I'm doing this</Eyebrow>
              <h2 className="heading-elegant text-4xl lg:text-6xl leading-[1.05] mb-6">
                I want a season of <em className="italic">real practice.</em>
              </h2>
              <p className="body-clean text-foreground/85 text-lg lg:text-xl leading-relaxed mb-6">
                Ten years of laptops and lecture halls. This winter I want to meditate properly,
                get stronger and work on an old back problem, in a community that takes its
                practice seriously.
              </p>
              <p className="heading-elegant italic text-xl text-muted-foreground">Rihards Zeila, Riga</p>
            </div>
          </div>
        </Section>

        {/* Close: lantern path at dusk */}
        <section id="contact" className="rt-dark relative overflow-hidden">
          <Photo src={pathImg} className="absolute inset-0 h-full w-full" />
          <div className="rt-shade absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-16 py-28 lg:py-40 text-center">
            <h2 className="heading-elegant text-4xl lg:text-6xl leading-[1.08] mb-6">
              Have a spare room and a long <em className="italic text-primary">marketing to-do list?</em>
            </h2>
            <p className="body-clean text-foreground/85 text-lg lg:text-xl mb-10">
              Tell me about your centre and your season. I reply within a day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                Message me on WhatsApp
              </a>
              <a href={EMAIL} className={ghostBtn}>
                rihards.zeila@gmail.com
              </a>
            </div>
            <p className="body-clean text-sm text-foreground/75 mt-10">
              More on me: <Link to="/about" className="underline underline-offset-4 hover:text-primary">career and teaching</Link>
              {" · "}
              <Link to="/" className="underline underline-offset-4 hover:text-primary">consulting work</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Retreats;

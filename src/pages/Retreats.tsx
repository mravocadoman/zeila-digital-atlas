import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "@/i18n/lang";
import { useReveal } from "@/hooks/use-reveal";

import aboutPortrait from "@/assets/rihards-about.webp";

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
 * minimal header: the shared Navigation carries the language switch, which
 * would point at a /lv/retreats that doesn't exist.
 *
 * It also has its own look (.rt-theme in index.css): linen, ink and terracotta
 * with a Fraunces serif, because it is read by retreat owners, not ad buyers.
 */

const WHATSAPP = `https://wa.me/37126673384?text=${encodeURIComponent(
  "Hi Rihards, I run a centre and saw your residency page.",
)}`;
const EMAIL = "mailto:rihards.zeila@gmail.com?subject=Marketing%20residency";

const primaryBtn =
  "body-clean inline-block text-center bg-primary text-background px-8 py-4 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider hover:bg-primary/90 transition-colors";
const outlineBtn =
  "body-clean inline-block text-center border border-border text-foreground px-8 py-4 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider hover:border-primary transition-colors";

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
    n: "01",
    title: "Week 1: audit and quick wins",
    body: "I go through your site, booking flow, ads and reviews, and fix what's broken first. You get a written plan by the end of the week.",
  },
  {
    n: "02",
    title: "Then: build",
    body: "Campaigns, pages and automations, built in your own accounts with your team alongside. Nothing in a black box.",
  },
  {
    n: "03",
    title: "Last weeks: handover",
    body: "Short guides, a simple dashboard and a workshop, so your team keeps it running after I leave.",
  },
  {
    n: "04",
    title: "The exchange",
    body: "2 to 4 hours a day, more for a big project. You provide a room and a place in your practice, and meals if you can. No fees either way.",
  },
];

const Section = ({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) => {
  const reveal = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={reveal.ref}
      className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        <span className="eyebrow block mb-4">{eyebrow}</span>
        <h2 className="heading-elegant text-3xl lg:text-5xl mb-4 max-w-3xl">{title}</h2>
        {intro && (
          <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl">
            {intro}
          </p>
        )}
        <div className="mt-8 lg:mt-12">{children}</div>
      </div>
    </section>
  );
};

const OfferCard = ({ title, body }: { title: string; body: string }) => {
  const card = useReveal<HTMLDivElement>("card");
  return (
    <div ref={card.ref} className={`border border-border rounded-lg p-5 lg:p-7 lift ${card.className}`}>
      <h3 className="heading-elegant text-xl lg:text-2xl mb-3">{title}</h3>
      <p className="body-clean text-foreground/85 text-base lg:text-lg leading-relaxed">{body}</p>
    </div>
  );
};

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
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..600,0..100&family=Inter+Tight:wght@400;600&display=swap";
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
    <div className="min-h-screen rt-theme">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="heading-elegant text-foreground text-base lg:text-lg hover:text-primary transition-colors">
            Rihards Zeila
          </Link>
          <a href="#contact" className="body-clean text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors">
            Get in touch
          </a>
        </div>
      </header>

      <main>
        <section className="px-6 lg:px-16 pt-28 pb-6 lg:pt-36 lg:pb-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="eyebrow block mb-5 rise" style={{ animationDelay: "0.05s" }}>
                For yoga, meditation &amp; retreat centres
              </span>
              <h1
                className="heading-elegant text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6 rise"
                style={{ animationDelay: "0.15s" }}
              >
                A senior marketer in residence for your season.
              </h1>
              <p
                className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-4 rise"
                style={{ animationDelay: "0.28s" }}
              >
                I'd like to spend 2 to 4 months living at your centre, starting November or
                December, working 2 to 4 hours a day on whatever fills your retreats, trainings
                and rooms.
              </p>
              <p
                className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8 rise"
                style={{ animationDelay: "0.36s" }}
              >
                In return: a room, a place in your daily practice, and meals if you can.
                Everything I build stays yours, and your team learns to run it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 rise" style={{ animationDelay: "0.46s" }}>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                  Message me on WhatsApp
                </a>
                <a href={EMAIL} className={outlineBtn}>
                  Email me
                </a>
              </div>
            </div>
            <img
              src={aboutPortrait}
              alt="Rihards Zeila"
              className="order-1 lg:order-2 w-52 sm:w-64 lg:w-full lg:max-w-sm mx-auto rt-sun rise"
              style={{ animationDelay: "0.2s" }}
              loading="eager"
            />
          </div>
        </section>

        <ResultsBand />

        <Section
          eyebrow="What I bring"
          title="The marketing a small centre rarely has time for."
          intro="Ten years running paid growth for e-commerce and service businesses, and I teach digital marketing on the Riga Business School MBA. At your centre that turns into six things."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {offers.map((o) => (
              <OfferCard key={o.title} {...o} />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="At a centre"
          title="What this looks like in practice."
          intro="Five situations I see at most retreat centres, and what I'd build for each. These are plans, not past results."
        >
          <ol className="border-b border-border">
            {situations.map((s) => (
              <li key={s.problem} className="grid lg:grid-cols-[1fr_2fr] gap-3 lg:gap-12 py-6 lg:py-8 border-t border-border">
                <h3 className="heading-elegant text-xl lg:text-2xl">{s.problem}</h3>
                <div className="body-clean text-base lg:text-lg leading-relaxed space-y-2">
                  <p className="text-foreground/85">
                    <span className="font-semibold text-foreground">What I'd build: </span>
                    {s.build}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">What you keep: </span>
                    {s.keep}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          eyebrow="Proof"
          title="Results from businesses that sell the way you do."
          intro="No retreat centres on this list yet. These are the closest matches: a considered purchase, where trust comes before the booking."
        >
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

        <Section eyebrow="How it works" title="One season, built to outlast my stay.">
          <ol className="stagger grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="border-t-2 border-primary/40 pt-5">
                <span className="numeral text-primary text-lg block mb-3">{s.n}</span>
                <h3 className="heading-elegant text-xl lg:text-2xl mb-3">{s.title}</h3>
                <p className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Why I'm doing this" title="I want a season of real practice.">
          <p className="body-clean text-foreground/85 text-lg lg:text-xl leading-relaxed max-w-3xl">
            Ten years of laptops and lecture halls. This winter I want to meditate properly, get
            stronger and work on an old back problem, in a community that takes its practice
            seriously. I'd rather give a centre the skills I'm best at than a pair of spare hands.
          </p>
        </Section>

        <section id="contact" className="px-6 lg:px-16 py-16 lg:py-28 bg-sunken">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-elegant text-3xl lg:text-5xl mb-5">
              Have a spare room and a long marketing to-do list?
            </h2>
            <p className="body-clean text-muted-foreground text-lg lg:text-xl mb-8">
              Tell me about your centre and your season. I reply within a day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                Message me on WhatsApp
              </a>
              <a href={EMAIL} className={outlineBtn}>
                rihards.zeila@gmail.com
              </a>
            </div>
            <p className="body-clean text-sm text-muted-foreground mt-8">
              More on me: <Link to="/about" className="text-primary hover:underline">career and teaching</Link>
              {" · "}
              <Link to="/" className="text-primary hover:underline">consulting work</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Retreats;

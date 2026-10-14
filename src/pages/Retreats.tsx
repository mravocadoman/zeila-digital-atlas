import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/i18n/lang";
import { useReveal } from "@/hooks/use-reveal";

import aboutPortrait from "@/assets/rihards-about.webp";
import shalaImg from "@/assets/retreat/shala.webp";
import palmsImg from "@/assets/retreat/palms.webp";
import deskImg from "@/assets/retreat/desk.webp";
import oceanImg from "@/assets/retreat/ocean.webp";
import pathImg from "@/assets/retreat/path.webp";
import morningImg from "@/assets/retreat/morning.webp";
import breakfastImg from "@/assets/retreat/breakfast.webp";
import bodyworkImg from "@/assets/retreat/bodywork.webp";

/**
 * The page sent to yoga, meditation and retreat centres in outreach: a season
 * on site as "marketer in residence", paid in a room and the practice.
 *
 * Deliberately unlisted and English-only. It's noindex, absent from the nav and
 * sitemap, and has no /lv mirror, because a room-and-board offer sitting on the
 * public consulting site would undercut the consulting rates. So it carries its
 * own header and footer rather than the site's (the shared Navigation's
 * language switch would point at a /lv/retreats that doesn't exist).
 *
 * It is written in the reader's language, not the consultant's: the offer is
 * laid out like one of their own retreat packages, and the hours as a daily
 * schedule. Look and motion live in .rt-theme in index.css. The photos
 * (src/assets/retreat) show no people and no real place, so none of them can
 * read as a client claim.
 */

const WHATSAPP = `https://wa.me/37126673384?text=${encodeURIComponent(
  "Hi Rihards, I run a centre and saw your residency page.",
)}`;
const EMAIL = "mailto:rihards.zeila@gmail.com?subject=Marketing%20residency";

const places = ["Costa Rica", "Mexico", "Guatemala", "Bali", "Sri Lanka", "Goa", "Kerala", "Thailand", "Canary Islands", "Morocco"];

const receives = [
  ["Full retreats and trainings", "Ads aimed at the people who actually book, with tracking that shows which euro brought which guest."],
  ["A website that takes bookings", "Broken forms and stale calendars fixed first, then a booking path a guest can finish on a phone."],
  ["Offers and landing pages", "Packages, early-bird and seasonal offers, each with its own page and a reason to book now."],
  ["Follow-up that runs itself", "Enquiries answered in minutes, reviews requested after checkout, cancelled spots refilled from a waitlist."],
  ["AI your team will use", "Replies, posts and newsletters drafted in your voice."],
  ["Workshops for your team", "So the ads, emails and automations keep running after I leave."],
];

const inReturn = ["A room.", "A place in your daily practice.", "Meals, if you can.", "No fees, either way."];

const day = [
  { time: "06:30", title: "Practice", body: "Morning class, or sitting with the community.", img: morningImg },
  { time: "08:00", title: "Breakfast with the team", body: "Where most of the good marketing ideas start.", img: breakfastImg },
  { time: "09:00", title: "Three hours of focused work", body: "Campaigns, pages and automations, built in your own accounts.", img: deskImg },
  { time: "16:30", title: "Bodywork or evening class", body: "The back gets its share of the day too.", img: bodyworkImg },
  { time: "18:15", title: "Sunset, laptop closed", body: "Quiet. Then dinner.", img: oceanImg },
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
    build: "A free online class that leads into the application: the funnel shape that turned €1,175 of ads into €10K of course sales for a training company.",
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

// Real clients only, figures as in CaseStudies.tsx. None are retreat centres
// yet, so each one says why it transfers.
const proof = [
  {
    figure: "12.55",
    unit: "ROAS on Meta",
    client: "Instant Change, a transformation coach selling across Germany, Austria and Switzerland.",
    transfer: "A coach sells transformation, not a product. So does a retreat.",
  },
  {
    figure: "€10K",
    unit: "from €1,175 of ads",
    client: "Excel Know How: free webinars into €250 courses, 2,000+ leads at €0.59 each.",
    transfer: "The same shape as a free class into a teacher training.",
  },
  {
    figure: "#3",
    unit: "on Google",
    client: "LIFT, an EU-funded training programme: five course pages and 300+ leads.",
    transfer: "The same work as filling a retreat calendar.",
  },
];

/** A section that rises in once it reaches the fold. See use-reveal for why it's safe. */
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) => {
  const reveal = useReveal<HTMLElement>();
  return (
    <section id={id} ref={reveal.ref} className={`px-5 sm:px-8 lg:px-12 py-24 lg:py-36 ${className} ${reveal.className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`rt-label block ${className}`}>{children}</span>
);

/** Decorative mood photo in a clipping frame, drifting gently with scroll where supported. */
const Photo = ({ src, className, eager }: { src: string; className: string; eager?: boolean }) => (
  <div className={`rt-frame ${className}`}>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="rt-parallax h-full w-full object-cover"
    />
  </div>
);

const Retreats = () => {
  usePageMeta(
    "The Season Residency: a marketer for your retreat centre | Rihards Zeila",
    "A senior marketer living at your centre for a season, working on bookings, ads, website and automations in exchange for a room and the practice.",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!document.getElementById("rt-fonts")) {
      const fonts = document.createElement("link");
      fonts.id = "rt-fonts";
      fonts.rel = "stylesheet";
      fonts.href =
        "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap";
      document.head.appendChild(fonts);
    }
    // index.html ships "index, follow"; a second tag would contradict it, so swap
    // the content and put it back when the visitor moves on to a listed page.
    const robots = document.querySelector('meta[name="robots"]');
    const listed = robots?.getAttribute("content") ?? "";
    robots?.setAttribute("content", "noindex, follow");
    return () => robots?.setAttribute("content", listed);
  }, []);

  return (
    <div className="min-h-screen rt-theme rt-grain">
      <header className="px-5 sm:px-8 lg:px-12 pt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="rt-serif text-2xl hover:text-primary transition-colors">
            Rihards Zeila
          </Link>
          <span className="rt-label hidden md:block">The Season Residency</span>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Write to me &rarr;
          </a>
        </div>
      </header>

      <main>
        {/* Hero: headline on linen, the photo shown bright and whole beside the offer */}
        <section className="px-5 sm:px-8 lg:px-12 pt-14 lg:pt-16 pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between gap-2 mb-8 lg:mb-10">
              <Label>Winter 2026/27</Label>
              <Label>For yoga, meditation &amp; retreat centres</Label>
            </div>
            <h1 className="text-[3.4rem] sm:text-7xl lg:text-[8.5rem] leading-[0.92] mb-10 lg:mb-12">
              A marketer <em className="text-primary">in residence,</em>
              <br className="hidden sm:block" /> for one season.
            </h1>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-4 lg:pt-2">
                <p className="text-lg lg:text-xl leading-relaxed text-foreground/85 mb-8">
                  I'll live at your centre for two to four months and spend the mornings on whatever
                  fills your retreats, trainings and rooms. You give me a room and a place in your
                  practice.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-10">
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rt-btn rt-btn-solid">
                    Write to me on WhatsApp
                  </a>
                  <a href={EMAIL} className="text-sm font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors">
                    or send an email
                  </a>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  10+ years in paid media · $5M+ a year in ad spend · digital marketing lecturer on
                  the Riga Business School MBA
                </p>
              </div>
              <figure className="lg:col-span-8">
                <Photo src={shalaImg} eager className="aspect-[4/3] sm:aspect-[16/10] rounded-[1.75rem]" />
                <figcaption className="rt-serif italic text-muted-foreground text-lg mt-4">
                  Somewhere warm, from November. A place like yours.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="border-y border-border py-5 overflow-hidden" aria-label={`Open to warm places: ${places.join(", ")}`}>
          <div className="rt-marquee" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {places.map((p) => (
                  <span key={p} className="rt-serif italic text-2xl lg:text-3xl px-6 whitespace-nowrap">
                    {p} <span className="text-primary not-italic px-4">✺</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* The offer, laid out like one of their own retreat packages */}
        <Section id="residency">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Photo src={palmsImg} className="hidden lg:block lg:col-span-4 aspect-[2/3] rounded-t-full self-start lg:sticky lg:top-10" />
            <div className="lg:col-span-8">
              <Label className="mb-6">The Season Residency</Label>
              <h2 className="text-5xl lg:text-7xl leading-[0.98] mb-6">
                Eight to sixteen weeks, from November or December.
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-14">
                Two to four hours a day, more when a project needs it. Everything I build stays
                yours, and your team learns to run it.
              </p>

              <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-10">
                <div>
                  <Label className="mb-2">Your centre receives</Label>
                  <ul>
                    {receives.map(([title, body]) => (
                      <li key={title} className="border-b border-border py-5">
                        <h3 className="text-2xl mb-1.5">{title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:pl-10 md:border-l border-border">
                  <Label className="mb-6">I ask in return</Label>
                  <ul className="space-y-3 mb-10">
                    {inReturn.map((line) => (
                      <li key={line} className="rt-serif text-3xl lg:text-4xl leading-tight">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rt-btn rt-btn-line">
                    Ask if it fits your season
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* The hours, written as the schedule every retreat already prints */}
        <Section id="day" className="rt-dark">
          <div className="grid lg:grid-cols-12 gap-6 mb-12 lg:mb-16 items-end">
            <div className="lg:col-span-7">
              <Label className="mb-6">A day at your centre</Label>
              <h2 className="text-5xl lg:text-7xl leading-[0.98]">
                Mornings for the work. <em className="text-primary">The rest for the place.</em>
              </h2>
            </div>
            <p className="lg:col-span-4 lg:col-start-9 text-lg text-muted-foreground leading-relaxed">
              The rhythm I'd keep, so you know what to expect. I'm part of the community, not a
              consultant on a laptop all day.
            </p>
          </div>
          <ol className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 scroll-px-5 sm:-mx-8 sm:px-8 sm:scroll-px-8 lg:mx-0 lg:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {day.map((d) => (
              <li key={d.time} className="rt-zoom snap-start shrink-0 basis-[72%] sm:basis-[42%] lg:basis-auto">
                <div className="overflow-hidden rounded-2xl aspect-[3/4] mb-5">
                  <img src={d.img} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <span className="text-sm tabular-nums tracking-[0.2em] text-primary">{d.time}</span>
                <h3 className="text-2xl lg:text-[1.65rem] leading-tight mt-2 mb-2">{d.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{d.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section className="bg-sunken">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Label className="mb-6">Where I'd start</Label>
              <h2 className="text-5xl lg:text-6xl leading-[0.98] mb-6">Five things most centres put off.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What I'd build for each. These are plans, not past results; the proof is further down.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 border-t border-border">
              {situations.map((s, i) => (
                <details key={s.problem} className="rt-qa border-b border-border" open={i === 0}>
                  <summary className="flex items-center justify-between gap-6 py-6 lg:py-7">
                    <h3 className="text-2xl lg:text-3xl">{s.problem}</h3>
                    <span className="rt-plus text-3xl text-primary leading-none shrink-0" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-8 grid sm:grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 text-lg leading-relaxed">
                    <span className="rt-label pt-1.5">Build</span>
                    <p className="text-foreground/85">{s.build}</p>
                    <span className="rt-label pt-1.5">Keep</span>
                    <p className="text-muted-foreground">{s.keep}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid lg:grid-cols-12 gap-6 mb-14 lg:mb-20 items-end">
            <div className="lg:col-span-7">
              <Label className="mb-6">Proof</Label>
              <h2 className="text-5xl lg:text-7xl leading-[0.98]">Results from rooms I've filled before.</h2>
            </div>
            <p className="lg:col-span-4 lg:col-start-9 text-lg text-muted-foreground leading-relaxed">
              No retreat centres yet. These are the closest matches: a considered purchase, where
              trust comes before the booking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-10">
            {proof.map((p) => (
              <article key={p.figure} className="border-t border-foreground/80 pt-6">
                <div className="rt-serif text-7xl lg:text-8xl leading-none mb-2">{p.figure}</div>
                <Label className="mb-6">{p.unit}</Label>
                <p className="text-lg leading-relaxed mb-4">{p.client}</p>
                <p className="rt-serif italic text-xl text-primary leading-snug">{p.transfer}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="!pt-0">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-border pt-24 lg:pt-36">
            <img
              src={aboutPortrait}
              alt="Rihards Zeila"
              loading="lazy"
              className="rt-sun md:col-span-5 w-60 sm:w-72 md:w-full max-w-md mx-auto"
            />
            <div className="md:col-span-7">
              <Label className="mb-8">A note from me</Label>
              <div className="rt-serif text-3xl lg:text-[2.6rem] leading-[1.18] space-y-6 mb-10">
                <p>
                  Ten years of laptops and lecture halls taught me a lot about filling rooms, and very
                  little about sitting still.
                </p>
                <p>
                  This winter I want to meditate properly, get stronger and finally deal with an old
                  back problem, in a community that takes its practice seriously.
                </p>
                <p className="text-primary italic">
                  I'd rather give a centre the skills I'm best at than a pair of spare hands.
                </p>
              </div>
              <p className="rt-serif italic text-4xl">Rihards</p>
              <p className="text-sm text-muted-foreground mt-1">Riga, October 2026</p>
            </div>
          </div>
        </Section>

        {/* Close: the lantern path, bright, with a card rather than a dark wash */}
        <section id="contact" className="relative px-5 sm:px-8 lg:px-12 py-16 lg:py-28 min-h-[80svh] flex items-center overflow-hidden">
          <Photo src={pathImg} className="absolute inset-0" />
          <div className="relative z-10 max-w-7xl w-full mx-auto">
            <div className="max-w-xl bg-background/95 backdrop-blur-sm rounded-[1.75rem] p-8 sm:p-12">
              <Label className="mb-6">Winter 2026/27</Label>
              <h2 className="text-5xl lg:text-6xl leading-[0.98] mb-5">
                Have a room <em className="text-primary">for the season?</em>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Tell me about your centre and your season. I reply within a day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rt-btn rt-btn-solid">
                  Write on WhatsApp
                </a>
                <a href={EMAIL} className="rt-btn rt-btn-line">
                  Send an email
                </a>
              </div>
              <p className="text-sm text-muted-foreground">+371 2667 3384 · rihards.zeila@gmail.com</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 sm:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 Rihards Zeila · Riga</span>
          <span className="flex gap-6">
            <Link to="/" className="hover:text-foreground transition-colors">Consulting</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Retreats;

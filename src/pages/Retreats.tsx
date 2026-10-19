import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/i18n/lang";
import { useReveal } from "@/hooks/use-reveal";
import { useCountUp } from "@/hooks/use-count-up";

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
 * Deliberately unlisted and English-only: noindex, absent from the nav and
 * sitemap, no /lv mirror, its own header and footer. A room-and-board offer on
 * the public consulting site would undercut the consulting rates. Its link
 * previews come from retreats/index.html, a second Vite entry, because chat
 * apps read meta tags without running this component.
 *
 * It is written in the reader's language: the offer is a treatment menu, the
 * hours are a day's schedule, the note is a postcard. Look and motion live in
 * .rt-theme in index.css. Every animation either only moves things that are
 * already visible, or is armed from inside a real animation frame (`live`), so
 * nothing is ever hidden in a browser that can't play it back.
 */

const WHATSAPP = `https://wa.me/37126673384?text=${encodeURIComponent(
  "Hi Rihards, I run a centre and saw your residency page.",
)}`;
const EMAIL = "mailto:rihards.zeila@gmail.com?subject=Marketing%20residency";

const places = ["Costa Rica", "Mexico", "Guatemala", "Bali", "Sri Lanka", "Goa", "Kerala", "Thailand", "Canary Islands", "Morocco"];

// [text, emphasised] — the emphasised run is the exchange itself.
const manifesto: [string, boolean][] = [
  ["I'll live at your centre for a season and give my mornings to filling your retreats, trainings and rooms. In return I ask for", false],
  ["a room, a place in your practice,", true],
  ["and meals if you can. Everything I build stays yours.", false],
];

const stats = [
  { value: "10+", label: "years in paid media" },
  { value: "$5M+", label: "ad spend managed a year" },
  { value: "20+", label: "marketing programs taught" },
  { value: "MBA", label: "lecturer, Riga Business School" },
];

const menu = [
  ["Full retreats & trainings", "Ads aimed at the people who actually book, and tracking that shows which euro brought which guest."],
  ["A website that takes bookings", "Broken forms and stale calendars first, then a booking path a guest can finish on a phone."],
  ["Offers & landing pages", "Packages, early-bird and seasonal offers, each with its own page and a reason to book now."],
  ["Follow-up that runs itself", "Enquiries answered in minutes, reviews asked for after checkout, cancelled spots refilled from a waitlist."],
  ["AI your team will use", "Replies, posts and newsletters drafted in your voice."],
  ["Workshops for your team", "So all of it keeps running after I leave."],
];

const day = [
  { title: "Practice", body: "Morning class, or sitting with the community.", img: morningImg, pos: "center" },
  { title: "Breakfast with the team", body: "Where most of the good marketing ideas start.", img: breakfastImg, pos: "center" },
  { title: "Three hours of focused work", body: "Campaigns, pages and automations, built in your own accounts with your team alongside.", img: deskImg, pos: "45% center" },
  { title: "Bodywork or evening class", body: "The back gets its share of the day too.", img: bodyworkImg, pos: "center" },
  { title: "Sunset, laptop closed", body: "Quiet. Then dinner.", img: oceanImg, pos: "78% center" },
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

/* ---------- small pieces ---------- */

const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`rt-label block ${className}`}>{children}</span>
);

/** A section that rises in once it reaches the fold. See use-reveal for why it's safe. */
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) => {
  const reveal = useReveal<HTMLElement>();
  return (
    <section id={id} ref={reveal.ref} className={`px-5 sm:px-8 lg:px-12 py-24 lg:py-40 ${className} ${reveal.className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

/** Decorative mood photo in a clipping frame, drifting gently with scroll where supported. */
const Photo = ({ src, className, pos }: { src: string; className: string; pos?: string }) => (
  <div className={`overflow-hidden ${className}`}>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="rt-parallax h-full w-full object-cover"
      style={pos ? { objectPosition: pos } : undefined}
    />
  </div>
);

/** One headline line that slides up out of its own mask once the page is live. */
const Line = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <span className="rt-line-mask">
    <span className="rt-line" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </span>
  </span>
);

const Stat = ({ value, label }: { value: string; label: string }) => {
  const { ref, text } = useCountUp(value);
  return (
    <div ref={ref} className="border-t border-foreground/70 pt-5">
      <div className="rt-serif text-5xl lg:text-6xl leading-none mb-3 tabular-nums">{text}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const Figure = ({ value }: { value: string }) => {
  const { ref, text } = useCountUp(value, 1400);
  return (
    <div ref={ref} className="rt-serif text-7xl lg:text-[7.5rem] leading-[0.85] mb-4 tabular-nums">
      {text}
    </div>
  );
};

/* ---------- the sun over the day ---------- */

// Position on a sunrise-to-sunset arc, by the moment's order in the day rather than
// a clock time: no timestamps on the routine (Rihards' call, 2026-10-19).
const sunAt = (step: number) => {
  const t = 0.05 + (0.9 * step) / (day.length - 1);
  const a = Math.PI * (1 - t);
  return { x: 100 + 88 * Math.cos(a), y: 98 - 88 * Math.sin(a) };
};

const SunArc = ({ step }: { step: number }) => {
  const { x, y } = sunAt(step);
  return (
    <svg viewBox="0 0 200 116" className="w-56 overflow-visible drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]" aria-hidden="true">
      <path d="M12 98 A88 88 0 0 1 188 98" fill="none" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.2" strokeDasharray="1.5 5" strokeLinecap="round" />
      <line x1="0" y1="98" x2="200" y2="98" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.2" />
      <text x="12" y="114" fontSize="9" letterSpacing="2" fill="currentColor" fillOpacity="0.8" fontFamily="Inter Tight, sans-serif">SUNRISE</text>
      <text x="188" y="114" fontSize="9" letterSpacing="2" fill="currentColor" fillOpacity="0.8" textAnchor="end" fontFamily="Inter Tight, sans-serif">SUNSET</text>
      <g className="rt-sun-dot" style={{ transform: `translate(${x}px, ${y}px)` }}>
        <circle r="18" fill="#f2ac83" fillOpacity="0.28" />
        <circle r="9" fill="#f2ac83" />
      </g>
    </svg>
  );
};

/** A small sun: the page's one ornament (menu head, the places ticker). */
const Sunburst = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`inline-block w-[0.8em] h-[0.8em] ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" fill="currentColor" />
    {Array.from({ length: 12 }, (_, i) => (
      <line
        key={i}
        x1="12"
        y1="1.5"
        x2="12"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        transform={`rotate(${i * 30} 12 12)`}
      />
    ))}
  </svg>
);

/* ---------- the postcard ---------- */

const Postmark = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 text-primary/80 -rotate-12" aria-hidden="true">
    <defs>
      <path id="rt-pm" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
    </defs>
    <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1" />
    <text fontSize="10.5" letterSpacing="2.6" fill="currentColor" fontFamily="Inter Tight, sans-serif" fontWeight="500">
      <textPath href="#rt-pm">RIGA · LATVIA · RIGA · LATVIA ·</textPath>
    </text>
    <text x="60" y="57" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Inter Tight, sans-serif" fontWeight="600">
      14 OCT
    </text>
    <text x="60" y="71" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Inter Tight, sans-serif">
      2026
    </text>
  </svg>
);

/* ---------- page ---------- */

const Retreats = () => {
  usePageMeta(
    "The Season Residency: a marketer for your retreat centre | Rihards Zeila",
    "A senior marketer living at your centre for a season, working on bookings, ads, website and automations in exchange for a room and the practice.",
  );

  const [live, setLive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const [step, setStep] = useState(0);
  const stepsRef = useRef<HTMLOListElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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
    // The served HTML for /retreats already says noindex; this covers arriving
    // here through the SPA from a page that said "index, follow".
    const robots = document.querySelector('meta[name="robots"]');
    const listed = robots?.getAttribute("content") ?? "";
    robots?.setAttribute("content", "noindex, follow");

    // Only arm the entrance once a frame has really painted. No frame, no hiding.
    const raf = requestAnimationFrame(() => setLive(true));

    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      robots?.setAttribute("content", listed);
    };
  }, []);

  // Which moment of the day sits mid-screen. Without IntersectionObserver the
  // stage simply stays on the morning; every step's text is in the flow anyway.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const steps = Array.from(stepsRef.current?.children ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(steps.indexOf(e.target));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    steps.forEach((s) => io.observe(s));

    const contact = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.15 });
    if (contactRef.current) contact.observe(contactRef.current);

    return () => {
      io.disconnect();
      contact.disconnect();
    };
  }, []);

  return (
    <div className={`min-h-screen rt-theme rt-grain ${live ? "rt-live" : ""}`}>
      {/* Nav: cream over the photo, linen once past it */}
      <nav
        className={`fixed inset-x-0 top-0 z-[80] px-5 sm:px-8 lg:px-12 transition-colors duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border text-foreground" : "text-[#f3ede3]"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 lg:h-20 flex items-center justify-between">
          <Link to="/" className="rt-serif text-2xl lg:text-[1.7rem]">
            Rihards Zeila
          </Link>
          <div className="hidden md:flex items-center gap-9 text-sm">
            <a href="#residency" className="rt-link">The residency</a>
            <a href="#day" className="rt-link">A day</a>
            <a href="#proof" className="rt-link">Proof</a>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={`rt-btn rt-btn-sm ${scrolled ? "rt-btn-solid" : "rt-btn-glass"}`}
          >
            Write to me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[100svh] min-h-[620px] overflow-hidden text-[#f3ede3]">
        <img
          src={shalaImg}
          alt=""
          aria-hidden="true"
          className="rt-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="rt-leak absolute inset-0" aria-hidden="true" />
        <div className="rt-hero-fade absolute inset-0" aria-hidden="true" />

        <div className="rt-hero-text relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-10 lg:pb-14">
          <span className="rt-label rt-fade !text-[#f3ede3]/85" style={{ animationDelay: "100ms" }}>
            The Season Residency · Winter 2026/27
          </span>
          <h1 className="text-[3.5rem] sm:text-8xl lg:text-[9.25rem] leading-[0.9] mt-5 mb-8 lg:mb-10">
            <Line delay={180}>
              A marketer <em className="text-[#f2ac83]">in residence,</em>
            </Line>
            <Line delay={300}>for one season.</Line>
          </h1>
          <div className="rt-fade flex flex-col lg:flex-row lg:items-end justify-between gap-7" style={{ animationDelay: "650ms" }}>
            <p className="max-w-md text-lg lg:text-xl leading-relaxed text-[#f3ede3]/90">
              For yoga, meditation and retreat centres somewhere warm. Two to four months on site,
              from November.
            </p>
            <div className="flex items-center gap-6">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rt-btn rt-btn-cream">
                Write to me on WhatsApp
              </a>
              <a href="#idea" className="rt-link text-sm font-medium hidden sm:inline-flex items-center gap-2">
                Read on <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-border py-5 overflow-hidden" aria-label={`Open to warm places: ${places.join(", ")}`}>
        <div className="rt-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {places.map((p) => (
                <span key={p} className="rt-serif italic text-2xl lg:text-3xl px-6 whitespace-nowrap">
                  {p} <Sunburst className="text-primary mx-5 -translate-y-[0.08em]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* The idea, in one sentence that fills in as it's read */}
        <Section id="idea">
          <Label className="mb-10">The idea</Label>
          <p className="rt-serif text-[2.1rem] sm:text-5xl lg:text-[4.25rem] leading-[1.1] max-w-6xl mb-20 lg:mb-28">
            {manifesto.map(([text, em], i) =>
              text.split(" ").map((w, j) => (
                <span key={`${i}-${j}`} className={`rt-word ${em ? "italic text-primary" : ""}`}>
                  {w}{" "}
                </span>
              )),
            )}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Section>

        {/* The offer, as a treatment menu where the price is a room */}
        <Section id="residency" className="bg-sunken">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <Label className="mb-6">The residency</Label>
              <h2 className="text-5xl lg:text-7xl leading-[0.98] mb-6">
                Everything on the menu is <em className="text-primary">included.</em>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-12">
                Laid out the way you'd present one of your own retreats. Only the price is different.
              </p>
              <div className="hidden lg:block relative">
                <Photo src={palmsImg} className="w-[78%] aspect-[2/3] rounded-t-full" />
                <Photo
                  src={morningImg}
                  className="absolute right-0 bottom-10 w-[42%] aspect-square rounded-full ring-8 ring-[hsl(var(--sunken))]"
                />
              </div>
            </div>

            <article className="lg:col-span-7 rt-menu self-start">
              <div className="text-center mb-10">
                <Sunburst className="text-primary text-2xl mb-4" />
                <h3 className="rt-kicker mb-3">The Season Residency</h3>
                <p className="rt-serif italic text-xl text-muted-foreground">
                  Eight to sixteen weeks · from November or December
                </p>
              </div>
              <ul className="space-y-7 mb-12">
                {menu.map(([title, body]) => (
                  <li key={title}>
                    <div className="flex items-baseline gap-3">
                      <h4 className="text-2xl lg:text-[1.75rem] leading-tight">{title}</h4>
                      <span className="rt-leader" aria-hidden="true" />
                      <span className="rt-label shrink-0">Included</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-1.5 max-w-[34rem]">{body}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-foreground/20 pt-10 text-center">
                <h3 className="rt-kicker mb-5">The exchange</h3>
                <p className="rt-serif text-3xl lg:text-4xl leading-tight mb-4">
                  A room · a place in your practice · <em className="text-primary">meals, if you can</em>
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  No fees either way. Two to four hours a day, more when a project needs it.
                </p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rt-btn rt-btn-solid">
                  Ask if it fits your season
                </a>
              </div>
            </article>
          </div>
        </Section>

        {/* A day: the photo and the sun hold still while the schedule scrolls past */}
        <section id="day" className="rt-dark px-5 sm:px-8 lg:px-12 pt-24 lg:pt-40 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 mb-10 lg:mb-4 items-end">
              <div className="lg:col-span-7">
                <Label className="mb-6">A day at your centre</Label>
                <h2 className="text-5xl lg:text-7xl leading-[0.98]">
                  Mornings for the work. <em className="text-primary">The rest for the place.</em>
                </h2>
              </div>
              <p className="lg:col-span-4 lg:col-start-9 text-lg text-muted-foreground leading-relaxed">
                The rhythm I'd keep, so you know what to expect. Part of the community, not a
                consultant on a laptop all day.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="hidden lg:block lg:col-span-7">
                <div className="sticky top-0 h-screen flex items-center pt-16">
                  <div className="relative w-full h-[74vh] rounded-[2rem] overflow-hidden">
                    {day.map((d, i) => (
                      <img
                        key={d.title}
                        src={d.img}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className={`rt-stage absolute inset-0 h-full w-full object-cover ${i === step ? "rt-stage-on" : ""}`}
                        style={{ objectPosition: d.pos }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" aria-hidden="true" />
                    <div className="absolute top-7 right-7 text-[#f3ede3]">
                      <SunArc step={step} />
                    </div>
                  </div>
                </div>
              </div>

              <ol ref={stepsRef} className="lg:col-span-5 lg:pt-[18vh] lg:pb-[30vh]">
                {day.map((d, i) => (
                  <li
                    key={d.title}
                    className={`rt-step py-8 lg:py-0 lg:min-h-[62vh] lg:flex lg:flex-col lg:justify-center ${i === step ? "rt-step-on" : ""}`}
                  >
                    <div className="lg:hidden overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                      <img
                        src={d.img}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: d.pos }}
                      />
                    </div>
                    <h3 className="text-4xl lg:text-5xl leading-[1.02] mb-4">{d.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">{d.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Section id="start" className="bg-sunken">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Label className="mb-6">Where I'd start</Label>
              <h2 className="text-5xl lg:text-6xl leading-[0.98] mb-6">Five things most centres put off.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What I'd build for each. Plans, not past results: the proof is next.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 border-t border-foreground/25">
              {situations.map((s, i) => (
                <details key={s.problem} className="rt-qa border-b border-foreground/25" open={i === 0}>
                  <summary className="flex items-center gap-5 lg:gap-8 py-6 lg:py-8">
                    <span className="rt-serif italic text-primary text-xl w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-2xl lg:text-[2rem] leading-tight flex-1">{s.problem}</h3>
                    <span className="rt-plus" aria-hidden="true" />
                  </summary>
                  <div className="pb-9 pl-[3.25rem] lg:pl-16 grid sm:grid-cols-[5rem_1fr] gap-x-4 gap-y-3 text-lg leading-relaxed">
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

        <Section id="proof">
          <div className="grid lg:grid-cols-12 gap-6 mb-16 lg:mb-24 items-end">
            <div className="lg:col-span-7">
              <Label className="mb-6">Proof</Label>
              <h2 className="text-5xl lg:text-7xl leading-[0.98]">Rooms I've filled before.</h2>
            </div>
            <p className="lg:col-span-4 lg:col-start-9 text-lg text-muted-foreground leading-relaxed">
              No retreat centres yet. These are the closest matches: a considered purchase, where
              trust comes before the booking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-14 md:gap-10">
            {proof.map((p) => (
              <article key={p.figure} className="border-t border-foreground/80 pt-7">
                <Figure value={p.figure} />
                <Label className="mb-7">{p.unit}</Label>
                <p className="text-lg leading-relaxed mb-5">{p.client}</p>
                <p className="rt-serif italic text-2xl text-primary leading-snug">{p.transfer}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* The ocean, with the line set in its own pale sky: no wash needed */}
        <figure id="quote" className="relative h-[88svh] min-h-[560px] overflow-hidden">
          <Photo src={oceanImg} className="absolute inset-0" pos="center 70%" />
          <blockquote className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 lg:pt-28">
            <p className="rt-serif italic text-[2.6rem] sm:text-6xl lg:text-[5.5rem] leading-[1.02] max-w-4xl text-[#2a2119]">
              &ldquo;I'd rather give a centre the skills I'm best at than a pair of spare hands.&rdquo;
            </p>
          </blockquote>
        </figure>

        {/* A postcard from Riga */}
        <Section id="note">
          <Label className="mb-10 text-center">A note from me</Label>
          <div className="rt-postcard max-w-5xl mx-auto grid md:grid-cols-[1.25fr_1fr]">
            <div className="p-8 sm:p-12 md:border-r border-foreground/15">
              <div className="rt-serif text-[1.65rem] lg:text-[2.1rem] leading-[1.22] space-y-5">
                <p>Hello from Riga,</p>
                <p>
                  ten years of laptops and lecture halls taught me a lot about filling rooms, and
                  very little about sitting still.
                </p>
                <p>
                  This winter I want to meditate properly, get stronger and finally deal with an old
                  back problem, in a community that takes its practice seriously.
                </p>
                <p className="italic text-primary">Could it be yours?</p>
              </div>
              <p className="rt-serif italic text-5xl mt-8">Rihards</p>
            </div>
            <div className="p-8 sm:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <Postmark />
                <div className="rt-stamp">
                  <img
                    src={aboutPortrait}
                    alt="Rihards Zeila"
                    loading="lazy"
                    className="rt-sun w-24 sm:w-28 h-32 sm:h-36 object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-auto space-y-5 rt-serif text-2xl">
                <p className="border-b border-foreground/25 pb-2">To the people who run your centre</p>
                <p className="border-b border-foreground/25 pb-2 italic">Somewhere warm</p>
                <p className="border-b border-foreground/25 pb-2">Winter 2026/27</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Close: the lantern path, bright, with a card rather than a wash */}
        <section
          id="contact"
          ref={contactRef}
          className="relative px-5 sm:px-8 lg:px-12 py-16 lg:py-28 min-h-[88svh] flex items-center overflow-hidden"
        >
          <Photo src={pathImg} className="absolute inset-0" />
          <div className="relative z-10 max-w-7xl w-full mx-auto">
            <div className="max-w-xl bg-background/95 backdrop-blur-sm rounded-[1.75rem] p-8 sm:p-12 shadow-[0_30px_80px_-30px_rgba(30,20,10,0.55)]">
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

      <footer className="px-5 sm:px-8 lg:px-12 pt-16 pb-28 md:pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="rt-serif text-[19vw] xl:text-[17.25rem] leading-[0.8] tracking-[-0.02em] mb-10 whitespace-nowrap" aria-hidden="true">
            Rihards Zeila
          </p>
          <div className="flex flex-wrap justify-between gap-4 text-sm text-muted-foreground border-t border-border pt-6">
            <span>© 2026 Rihards Zeila · Riga, Latvia</span>
            <span className="flex gap-6">
              <Link to="/" className="rt-link">Consulting</Link>
              <Link to="/about" className="rt-link">About</Link>
              <a href={EMAIL} className="rt-link">Email</a>
            </span>
          </div>
        </div>
      </footer>

      {/* Phones: the one action, a thumb away once past the hero */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={scrolled && !atContact ? 0 : -1}
        aria-hidden={!(scrolled && !atContact)}
        className={`rt-dock md:hidden rt-btn rt-btn-solid ${scrolled && !atContact ? "rt-dock-on" : ""}`}
      >
        Write to me on WhatsApp
      </a>
    </div>
  );
};

export default Retreats;

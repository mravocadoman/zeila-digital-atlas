import { useEffect, useState } from "react";
import { ArrowRight, GraduationCap, Building2, Users, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import headshot from "@/assets/rihards-synthwave.jpg";

import rbsLogo from "@/assets/partners/rbs-logo.png";
import unalLogo from "@/assets/partners/unal-logo.png";
import risebaLogo from "@/assets/partners/riseba-logo.png";
import itcLogo from "@/assets/partners/itc-logo.png";
import lsuaLogo from "@/assets/partners/lsua-logo.png";
import unilusLogo from "@/assets/partners/unilus-logo.png";

const trustedLogos = [
  { name: "Riga Business School", logo: rbsLogo },
  { name: "RISEBA University", logo: risebaLogo },
  { name: "University of Lusaka", logo: unilusLogo },
  { name: "International Trade Centre", logo: itcLogo },
  { name: "Universidad Nacional de Colombia", logo: unalLogo },
  { name: "LSUA", logo: lsuaLogo },
];

const stats = [
  { value: "10+", label: "Years in the field" },
  { value: "20+", label: "Programs delivered" },
  { value: "3", label: "Universities taught at" },
  { value: "€10M+", label: "Revenue driven for clients" },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Universities & Business Schools",
    body: "Semester-long modules and guest lectures for MBA and BBA programs — from digital strategy fundamentals to advanced paid media and analytics.",
  },
  {
    icon: Building2,
    title: "Corporate & SME teams",
    body: "In-house upskilling for marketing teams, founders, and cross-functional squads. Built around your channels, tools, and revenue goals.",
  },
  {
    icon: Users,
    title: "NGOs & Public programs",
    body: "Practical training for EU-funded initiatives, associations, and social enterprises. Delivered for LIFT, ITC, and Latvian government-backed programs.",
  },
];

const formats = [
  {
    title: "Meta Ads Intensive",
    duration: "1-day workshop",
    audience: "Marketers, founders, agency teams",
    outcome: "Leave with a live campaign structure, creative brief, and measurement plan.",
    bullets: ["Account & pixel setup", "Audience & creative strategy", "Reading the numbers that matter"],
  },
  {
    title: "Digital Growth for SMEs",
    duration: "Multi-session course",
    audience: "Small & mid-sized business owners",
    outcome: "A working growth system: funnel, channels, weekly rhythm, and reporting.",
    bullets: ["Positioning & offer", "Channel prioritization", "Funnel & automation basics"],
  },
  {
    title: "Custom MBA / BBA module",
    duration: "Semester-long",
    audience: "Universities & business schools",
    outcome: "A syllabus co-designed with your program, with assessments and industry cases.",
    bullets: ["Lectures & case studies", "Group projects with live briefs", "Guest practitioners"],
  },
  {
    title: "Team enablement & coaching",
    duration: "Ongoing retainer",
    audience: "In-house marketing teams",
    outcome: "Your team runs paid media and automation confidently — with me as a sparring partner.",
    bullets: ["Weekly working sessions", "Playbooks & SOPs", "Ad account audits"],
  },
];

const curriculum = [
  { q: "Strategy & positioning", a: "Turning fuzzy goals into a channel plan: ICP work, offer design, funnel mapping, and choosing where to actually spend the next euro." },
  { q: "Meta advertising (Facebook & Instagram)", a: "Account structure, campaign objectives, audience & creative strategy, iOS/attribution realities, scaling and troubleshooting." },
  { q: "Landing pages & funnels", a: "Designing pages that convert, split-testing frameworks, lead magnets, email/SMS follow-up, and CRO fundamentals." },
  { q: "Marketing automation", a: "Zapier/Make workflows, CRM hygiene, lead scoring, and automating the boring parts of client & prospect communication." },
  { q: "Analytics & measurement", a: "GA4, server-side tracking basics, dashboards teams actually read, and connecting ad spend to revenue." },
  { q: "AI in marketing", a: "Practical use of LLMs for research, briefs, creative variants, and analysis — with guardrails for teams." },
];

const programs = [
  { org: "Riga Business School", role: "MBA Lecturer, Digital Marketing", period: "2021 – Present" },
  { org: "Riga Business School — Executive Education", role: "Digital Growth Strategies for SMEs", period: "Nov 2024" },
  { org: "RISEBA University", role: "BBA Lecturer, Social Media & Meta Ads", period: "2023 – 2024" },
  { org: "University of Lusaka", role: "Guest Lecturer (Erasmus+)", period: "May 2024" },
  { org: "LIFT Program (EU-funded)", role: "Course leader — Meta Ads & Automation for SMEs", period: "2024 – Present" },
  { org: "International Trade Centre", role: "Workshop facilitator — Digital marketing for exporters", period: "2023" },
  { org: "Latvijas Digitālo ekspertu biedrība", role: "Trainer — Digital marketing programs", period: "2023" },
  { org: "Vidusdaugavas NVO centrs", role: "Digital campaign workshop leader", period: "2023" },
  { org: "Medijpratējs", role: "Trainer — Media & digital literacy", period: "2022 – 2023" },
];

const testimonials = [
  { quote: "Rihards is an exceptional marketer with a deep understanding of the digital marketing ecosystem. He promoted data-led decisions from day one and highlighted the importance of measuring performance.", author: "Bence Etele Baráth", company: "AppsFlyer" },
  { quote: "Rihards is THE expert on Facebook advertising. Excellent communication, deep knowledge, and an outstanding public speaker who gets the message across to any audience.", author: "Regita Zeiļa", company: "Director, Social Entrepreneurship Association" },
  { quote: "Highly skilled, passionate and dedicated. Whenever I need advice on digital marketing — I go to him. His international experience and know-how excels his peers.", author: "Kristina Berga", company: "CEO, HuskySense" },
];

const steps = [
  { n: "01", title: "Discovery call", body: "30 minutes to understand your team, goals, current stack, and timeline." },
  { n: "02", title: "Curriculum design", body: "A tailored outline with learning outcomes, formats, and success metrics." },
  { n: "03", title: "Delivery", body: "Workshops, lectures, or ongoing coaching — in-person in Riga or remote worldwide." },
  { n: "04", title: "Post-training support", body: "Recordings, playbooks, and follow-up sessions so the learning actually sticks." },
];

const faqs = [
  { q: "In-person, remote or hybrid?", a: "All three. I'm based in Riga and travel across Europe. Remote sessions run on Zoom or Google Meet with interactive workbooks." },
  { q: "What languages do you teach in?", a: "English and Latvian. Materials are typically in English." },
  { q: "Ideal group size?", a: "Workshops work best with 8–25 participants. University modules follow the program's cohort size." },
  { q: "Can we record sessions?", a: "Yes — recording rights are agreed up front and included in most engagements." },
  { q: "How is pricing structured?", a: "Day-rate for workshops, project fee for multi-session courses, and monthly retainer for ongoing coaching. Custom quote after the discovery call." },
];

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </section>
  );
};

const WorkWithMe = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", organization: "", type: "", message: "" });

  useEffect(() => {
    document.title = "Digital Marketing Trainer & Workshop Facilitator — Rihards Zeila";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Book Rihards Zeila for digital marketing training, Meta ads workshops, MBA/BBA modules, and team enablement. MBA lecturer at Riga Business School.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }

    // Inject Fraunces + Inter Tight for this page only
    const fontId = "wwm-fonts";
    if (!document.getElementById(fontId)) {
      const preconnect1 = document.createElement("link");
      preconnect1.rel = "preconnect";
      preconnect1.href = "https://fonts.googleapis.com";
      preconnect1.id = fontId;
      const preconnect2 = document.createElement("link");
      preconnect2.rel = "preconnect";
      preconnect2.href = "https://fonts.gstatic.com";
      preconnect2.crossOrigin = "anonymous";
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
      document.head.append(preconnect1, preconnect2, link);
    }
  }, []);

  const scrollToForm = () => document.getElementById("wwm-contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPrograms = () => document.getElementById("wwm-programs")?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.type || !form.message) {
      toast({ title: "Missing information", description: "Please fill in name, email, program type, and message.", variant: "destructive" });
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: form });
      if (error) throw error;
      toast({ title: "Request sent", description: "Thanks — I'll get back to you within 2 business days." });
      setForm({ name: "", email: "", organization: "", type: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong", description: "Please try again or email rihards.zeila@gmail.com directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wwm-theme min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[color:var(--wwm-ivory)]/85 backdrop-blur-md border-b wwm-hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="wwm-display text-lg md:text-xl tracking-tight">
            Rihards Zeila<span className="wwm-display-italic text-[color:var(--wwm-accent)]">.</span>
          </div>
          <div className="hidden md:block text-xs uppercase tracking-[0.22em] wwm-muted">
            Digital Marketing Training
          </div>
          <button onClick={scrollToForm} className="wwm-cta px-4 py-2 text-sm">
            Book a training
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-32 lg:pb-36 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="wwm-mono text-[color:var(--wwm-accent)]">Digital Marketing Training · Est. 2015</div>
            <h1 className="wwm-display text-[2.75rem] md:text-6xl lg:text-[5.25rem] leading-[1.0] tracking-[-0.035em]" style={{ fontWeight: 500 }}>
              Training that turns marketing teams into <span className="wwm-underline-acid"><span className="wwm-display-italic">operators</span></span>.
            </h1>
            <p className="text-lg md:text-xl wwm-muted leading-relaxed max-w-2xl">
              MBA lecturer at Riga Business School. Course leader for the EU-funded LIFT program. Workshop
              facilitator for the International Trade Centre. Ten years in the trenches, up to $5M/year of ad
              spend managed — packaged into training your team will actually use on Monday morning.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={scrollToForm} className="wwm-cta px-6 py-3 inline-flex items-center gap-2">
                Request a training <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={scrollToPrograms} className="wwm-ghost px-6 py-3">
                See past programs
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="wwm-portrait-frame absolute inset-0 rounded-sm" />
              <div className="relative bg-[color:var(--wwm-plum)] overflow-hidden rounded-sm">
                <img
                  src={headshot}
                  alt="Rihards Zeila"
                  className="wwm-portrait w-full block"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[color:var(--wwm-ink)] text-[color:var(--wwm-acid)] px-4 py-2 wwm-mono">
                Riga · Latvia
              </div>
              <div className="absolute -top-3 -right-3 bg-[color:var(--wwm-electric)] text-[color:var(--wwm-ivory)] px-3 py-1 wwm-mono text-[0.65rem]">
                Booking 2026
              </div>
            </div>
          </div>
        </div>

        {/* Trusted-by strip */}
        <div className="border-t wwm-hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="wwm-eyebrow shrink-0 md:pr-8 md:border-r wwm-hairline">Trained teams at</div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 flex-1">
              {trustedLogos.map((l) => (
                <img
                  key={l.name}
                  src={l.logo}
                  alt={l.name}
                  className="h-8 md:h-9 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="border-y wwm-hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => {
            const themes = ["t-ivory", "t-accent", "t-electric", "t-plum"];
            return (
              <div key={s.label} className={`wwm-stat-tile ${themes[i % themes.length]}`}>
                <div className="num">{s.value}</div>
                <div className="wwm-mono mt-4 opacity-80">{s.label}</div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Who I train */}
      <Section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-4">
              <div className="wwm-eyebrow mb-4">Who I train</div>
              <h2 className="wwm-display text-4xl md:text-5xl">
                For teams that need <span className="wwm-display-italic">results</span>, not another slide deck.
              </h2>
            </div>
            <p className="lg:col-span-7 lg:col-start-6 text-lg wwm-muted leading-relaxed self-end">
              I work with three distinct audiences. The through-line is the same: practical frameworks, live
              ad accounts, and content people will use the week after training ends.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="wwm-card p-8">
                <a.icon className="w-6 h-6 text-[color:var(--wwm-accent)] mb-6" strokeWidth={1.5} />
                <h3 className="wwm-display text-2xl mb-3">{a.title}</h3>
                <p className="wwm-muted leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Formats */}
      <Section className="wwm-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">Training formats</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-16 max-w-3xl">
            Four ways to work <span className="wwm-display-italic">together</span>.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-[rgba(245,242,236,0.12)] border wwm-hairline">
            {formats.map((f) => (
              <div key={f.title} className="bg-[color:var(--wwm-ink)] p-8 lg:p-10 flex flex-col">
                <div className="text-xs uppercase tracking-[0.22em] text-[#e8a892] mb-4">{f.duration}</div>
                <h3 className="wwm-display text-3xl mb-3">{f.title}</h3>
                <div className="text-sm wwm-muted mb-5 italic">For {f.audience}</div>
                <p className="text-[color:var(--wwm-ivory)]/85 mb-6 leading-relaxed">{f.outcome}</p>
                <ul className="space-y-2 mt-auto pt-4 border-t wwm-hairline">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[color:var(--wwm-ivory)]/75">
                      <span className="text-[color:var(--wwm-accent)] mt-1">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Curriculum */}
      <Section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">Curriculum snapshot</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-12">
            What we can <span className="wwm-display-italic">cover</span>.
          </h2>
          <Accordion type="single" collapsible defaultValue="c-0" className="border-t wwm-hairline">
            {curriculum.map((c, i) => (
              <AccordionItem key={c.q} value={`c-${i}`} className="border-b wwm-hairline">
                <AccordionTrigger className="text-left wwm-display text-xl md:text-2xl hover:no-underline py-6 font-normal">
                  {c.q}
                </AccordionTrigger>
                <AccordionContent className="wwm-muted leading-relaxed text-base pb-6">
                  {c.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Programs */}
      <Section className="py-24 lg:py-32 bg-[color:var(--wwm-sand)]">
        <div id="wwm-programs" className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">Selected programs & institutions</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-12">
            Where I've taught & <span className="wwm-display-italic">trained</span>.
          </h2>
          <div className="border-t wwm-hairline">
            {programs.map((p) => (
              <div key={p.org + p.role} className="py-6 grid grid-cols-12 gap-4 items-baseline border-b wwm-hairline hover:bg-[color:var(--wwm-ivory)] transition px-2 -mx-2">
                <div className="col-span-3 md:col-span-2 wwm-display wwm-display-italic text-[color:var(--wwm-accent)] text-lg">{p.period}</div>
                <div className="col-span-9 md:col-span-5 wwm-display text-xl">{p.org}</div>
                <div className="col-span-12 md:col-span-5 wwm-muted">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="wwm-dark py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">In their words</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-16 max-w-3xl">
            From colleagues, clients, and program <span className="wwm-display-italic">leads</span>.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="flex flex-col">
                <div className="wwm-display wwm-display-italic text-6xl text-[color:var(--wwm-accent)] leading-none mb-4">"</div>
                <p className="wwm-display text-xl leading-snug mb-8 text-[color:var(--wwm-ivory)]">{t.quote}</p>
                <footer className="mt-auto pt-6 border-t wwm-hairline">
                  <div className="text-[color:var(--wwm-ivory)] font-medium">{t.author}</div>
                  <div className="wwm-muted text-sm mt-1">{t.company}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">How an engagement works</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-16 max-w-2xl">
            Simple, transparent, no <span className="wwm-display-italic">bloat</span>.
          </h2>
          <div className="grid md:grid-cols-4 gap-px bg-[color:var(--wwm-rule)] border wwm-hairline">
            {steps.map((s) => (
              <div key={s.n} className="bg-[color:var(--wwm-ivory)] p-8">
                <div className="wwm-display wwm-display-italic text-5xl text-[color:var(--wwm-accent)] mb-6">{s.n}</div>
                <div className="wwm-display text-xl mb-3">{s.title}</div>
                <p className="wwm-muted text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-24 lg:py-32 bg-[color:var(--wwm-sand)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">FAQ</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-12">
            Common <span className="wwm-display-italic">questions</span>.
          </h2>
          <Accordion type="single" collapsible className="border-t wwm-hairline">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border-b wwm-hairline">
                <AccordionTrigger className="text-left wwm-display text-xl hover:no-underline py-6 font-normal">{f.q}</AccordionTrigger>
                <AccordionContent className="wwm-muted leading-relaxed pb-6">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contact form */}
      <section id="wwm-contact" className="wwm-dark py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="wwm-eyebrow">Book a training</div>
            <h2 className="wwm-display text-4xl md:text-5xl leading-tight">
              Tell me about your <span className="wwm-display-italic">team</span>.
            </h2>
            <p className="text-[color:var(--wwm-ivory)]/75 leading-relaxed text-lg">
              A short note about your organization, goals, and timeline is enough to get started.
              I reply within two business days.
            </p>
            <div className="pt-6 space-y-3 text-sm border-t wwm-hairline">
              <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-3 text-[color:var(--wwm-ivory)]/85 hover:text-[color:var(--wwm-ivory)] transition pt-6">
                <Mail className="w-4 h-4" /> rihards.zeila@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/rihards-ze/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[color:var(--wwm-ivory)]/85 hover:text-[color:var(--wwm-ivory)] transition">
                <Linkedin className="w-4 h-4" /> linkedin.com/in/rihards-ze
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[color:var(--wwm-ivory)] text-[color:var(--wwm-ink)] p-8 md:p-10 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="wwm-field h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="wwm-field h-11" required />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">Organization</label>
              <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Company, university, program…" className="wwm-field h-11" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">Program type</label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger className="wwm-field h-11">
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">Workshop / 1-day intensive</SelectItem>
                  <SelectItem value="mba-module">University module (MBA / BBA)</SelectItem>
                  <SelectItem value="corporate-training">Corporate / in-house training</SelectItem>
                  <SelectItem value="public-program">Public / EU-funded program</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Team size, goals, timeline, format preferences…" rows={5} className="wwm-field" required />
            </div>
            <Button type="submit" disabled={submitting} className="wwm-cta w-full h-12 text-base">
              {submitting ? "Sending…" : "Send request"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t wwm-hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm wwm-muted">
          <div>© {new Date().getFullYear()} Rihards Zeila — Digital marketing training & consulting.</div>
          <a href="mailto:rihards.zeila@gmail.com" className="hover:text-[color:var(--wwm-ink)] transition">
            rihards.zeila@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WorkWithMe;

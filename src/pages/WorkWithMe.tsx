import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap, Building2, Users, Sparkles, Check, Mail, Linkedin } from "lucide-react";
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
  {
    q: "Strategy & positioning",
    a: "Turning fuzzy goals into a channel plan: ICP work, offer design, funnel mapping, and choosing where to actually spend the next euro.",
  },
  {
    q: "Meta advertising (Facebook & Instagram)",
    a: "Account structure, campaign objectives, audience & creative strategy, iOS/attribution realities, scaling and troubleshooting.",
  },
  {
    q: "Landing pages & funnels",
    a: "Designing pages that convert, split-testing frameworks, lead magnets, email/SMS follow-up, and CRO fundamentals.",
  },
  {
    q: "Marketing automation",
    a: "Zapier/Make workflows, CRM hygiene, lead scoring, and automating the boring parts of client & prospect communication.",
  },
  {
    q: "Analytics & measurement",
    a: "GA4, server-side tracking basics, dashboards teams actually read, and connecting ad spend to revenue.",
  },
  {
    q: "AI in marketing",
    a: "Practical use of LLMs for research, briefs, creative variants, and analysis — with guardrails for teams.",
  },
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
  {
    quote: "Rihards is an exceptional marketer with a deep understanding of the digital marketing ecosystem. He promoted data-led decisions from day one and highlighted the importance of measuring performance.",
    author: "Bence Etele Baráth",
    company: "AppsFlyer",
  },
  {
    quote: "Rihards is THE expert on Facebook advertising. Excellent communication, deep knowledge, and an outstanding public speaker who gets the message across to any audience.",
    author: "Regita Zeiļa",
    company: "Director, Social Entrepreneurship Association",
  },
  {
    quote: "Highly skilled, passionate and dedicated. Whenever I need advice on digital marketing — I go to him. His international experience and know-how excels his peers.",
    author: "Kristina Berga",
    company: "CEO, HuskySense",
  },
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
  }, []);

  const scrollToForm = () => document.getElementById("wwm-contact")?.scrollIntoView({ behavior: "smooth" });

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
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[hsla(220,55%,10%,0.75)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to main site</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="heading-elegant text-sm md:text-base tracking-wide">RIHARDS ZEILA</div>
          <button onClick={scrollToForm} className="wwm-cta px-4 py-2 rounded-md text-sm font-semibold">
            Book a training
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="wwm-hero-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-28 grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-6">
            <div className="wwm-eyebrow">Digital Marketing Trainer & Workshop Facilitator</div>
            <h1 className="heading-elegant text-4xl md:text-5xl lg:text-6xl leading-tight">
              Train your team to run digital marketing that actually performs.
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              I teach digital marketing at Riga Business School's MBA, run EU-funded workshops for SMEs, and train
              in-house teams to own their Meta ads, funnels, and automation. Ten years in the trenches, up to
              $5M/year of ad spend managed — packaged into training your team will actually use on Monday morning.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={scrollToForm} className="wwm-cta px-6 py-3 rounded-md font-semibold flex items-center gap-2">
                Request a training <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#wwm-programs" className="px-6 py-3 rounded-md font-semibold border border-white/20 hover:border-white/50 hover:bg-white/5 transition">
                See past programs
              </a>
            </div>

            {/* Trusted-by row */}
            <div className="pt-8">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Trusted by</div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {trustedLogos.map((l) => (
                  <img
                    key={l.name}
                    src={l.logo}
                    alt={l.name}
                    className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#3b6fa0]/40 to-transparent blur-2xl" />
              <img
                src={headshot}
                alt="Rihards Zeila"
                className="relative rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="border-y border-white/5 bg-[hsla(220,55%,12%,0.6)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="heading-elegant text-3xl md:text-4xl text-white">{s.value}</div>
              <div className="text-sm text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Who I train */}
      <Section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">Who I train</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10 max-w-2xl">
            Built for teams that need results, not another slide deck.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="wwm-card p-8">
                <a.icon className="w-8 h-8 text-[hsl(210,60%,70%)] mb-4" />
                <h3 className="heading-elegant text-xl mb-3">{a.title}</h3>
                <p className="text-white/70 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Formats */}
      <Section className="py-20 lg:py-28 bg-[hsla(220,55%,12%,0.5)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">Training formats</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10 max-w-2xl">
            Four ways to work together.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formats.map((f) => (
              <div key={f.title} className="wwm-card p-8 flex flex-col">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="heading-elegant text-xl">{f.title}</h3>
                  <span className="text-xs uppercase tracking-widest text-[hsl(210,60%,70%)]">{f.duration}</span>
                </div>
                <div className="text-sm text-white/50 mb-4">For: {f.audience}</div>
                <p className="text-white/80 mb-5">{f.outcome}</p>
                <ul className="space-y-2 mt-auto">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[hsl(210,60%,70%)] mt-0.5 shrink-0" />
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
      <Section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">Curriculum snapshot</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10">
            What we can cover.
          </h2>
          <Accordion type="single" collapsible defaultValue="c-0" className="space-y-3">
            {curriculum.map((c, i) => (
              <AccordionItem key={c.q} value={`c-${i}`} className="wwm-card px-6 border-0">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold hover:no-underline">
                  {c.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  {c.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Programs */}
      <Section className="py-20 lg:py-28 bg-[hsla(220,55%,12%,0.5)]" >
        <div id="wwm-programs" className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">Selected programs & institutions</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10">
            Where I've taught & trained.
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {programs.map((p) => (
              <div key={p.org + p.role} className="py-5 grid grid-cols-12 gap-4 items-baseline hover:bg-white/[0.02] transition px-2">
                <div className="col-span-12 md:col-span-4 heading-elegant text-white text-lg">{p.org}</div>
                <div className="col-span-9 md:col-span-6 text-white/75">{p.role}</div>
                <div className="col-span-3 md:col-span-2 text-right text-sm text-white/50">{p.period}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">What people say</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10">
            From colleagues, clients, and program leads.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="wwm-card p-8">
                <Sparkles className="w-5 h-5 text-[hsl(210,60%,70%)] mb-4" />
                <p className="text-white/85 leading-relaxed mb-5 italic">"{t.quote}"</p>
                <footer className="text-sm">
                  <div className="text-white font-semibold">{t.author}</div>
                  <div className="text-white/50">{t.company}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="py-20 lg:py-28 bg-[hsla(220,55%,12%,0.5)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">How an engagement works</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10 max-w-2xl">
            Simple, transparent, no bloat.
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="wwm-card p-6">
                <div className="heading-elegant text-3xl text-[hsl(210,60%,70%)] mb-3">{s.n}</div>
                <div className="heading-elegant text-lg mb-2">{s.title}</div>
                <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-3">FAQ</div>
          <h2 className="heading-elegant text-3xl md:text-4xl mb-10">Common questions.</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="wwm-card px-6 border-0">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contact form */}
      <section id="wwm-contact" className="py-20 lg:py-28 bg-[hsla(220,55%,10%,0.7)] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <div className="wwm-eyebrow">Book a training</div>
            <h2 className="heading-elegant text-3xl md:text-4xl">Tell me about your team.</h2>
            <p className="text-white/70 leading-relaxed">
              A short note about your organization, goals, and timeline is enough to get started. I reply within
              two business days.
            </p>
            <div className="pt-4 space-y-3 text-sm">
              <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-white transition">
                <Mail className="w-4 h-4" /> rihards.zeila@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/rihards-ze/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition">
                <Linkedin className="w-4 h-4" /> linkedin.com/in/rihards-ze
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 wwm-card p-6 md:p-8 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-white/80">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" required />
              </div>
              <div>
                <label className="block text-sm mb-2 text-white/80">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" required />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-white/80">Organization</label>
              <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Company, university, program…" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-white/80">Program type</label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
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
              <label className="block text-sm mb-2 text-white/80">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Team size, goals, timeline, format preferences…" rows={5} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" required />
            </div>
            <Button type="submit" disabled={submitting} className="wwm-cta w-full h-12 text-base font-semibold">
              {submitting ? "Sending…" : "Send request"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-sm text-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Rihards Zeila — Digital marketing training & consulting.</div>
          <Link to="/" className="hover:text-white transition inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to main site
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default WorkWithMe;

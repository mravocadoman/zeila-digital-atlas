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
import headshot from "@/assets/rihards-about.webp";
import LanguageSwitch from "@/components/LanguageSwitch";
import { T, useLang, usePageMeta } from "@/i18n/lang";

import rbsLogo from "@/assets/partners/rbs-logo.webp";
import unalLogo from "@/assets/partners/unal-logo.webp";
import risebaLogo from "@/assets/partners/riseba-logo.webp";
import itcLogo from "@/assets/partners/itc-logo.webp";
import lsuaLogo from "@/assets/partners/lsua-logo.webp";
import unilusLogo from "@/assets/partners/unilus-logo.webp";

const trustedLogos = [
  { name: "Riga Business School", logo: rbsLogo },
  { name: "RISEBA University", logo: risebaLogo },
  { name: "University of Lusaka", logo: unilusLogo },
  { name: "International Trade Centre", logo: itcLogo },
  { name: "Universidad Nacional de Colombia", logo: unalLogo },
  { name: "LSUA", logo: lsuaLogo },
];

const stats = (t: T) => [
  { value: "10+", label: t("Years in the field", "Gadi nozarē") },
  { value: "20+", label: t("Programs delivered", "Vadītas mācību programmas") },
  { value: "3", label: t("Universities taught at", "Augstskolas, kurās pasniedzu") },
  { value: "€10M+", label: t("Revenue driven for clients", "Ieņēmumi klientiem") },
];

const audiences = (t: T) => [
  {
    icon: GraduationCap,
    title: t("Universities & Business Schools", "Augstskolas un biznesa skolas"),
    body: t(
      "Semester-long modules and guest lectures for MBA and BBA programs — from digital strategy fundamentals to advanced paid media and analytics.",
      "Semestra kursi un vieslekcijas MBA un BBA programmās — no digitālās stratēģijas pamatiem līdz maksātajai reklāmai un analītikai padziļinātā līmenī.",
    ),
  },
  {
    icon: Building2,
    title: t("Corporate & SME teams", "Uzņēmumu komandas"),
    body: t(
      "In-house upskilling for marketing teams, founders, and cross-functional squads. Built around your channels, tools, and revenue goals.",
      "Apmācības mārketinga komandām, uzņēmumu vadītājiem un jauktām komandām. Pielāgotas taviem kanāliem, rīkiem un pārdošanas mērķiem.",
    ),
  },
  {
    icon: Users,
    title: t("NGOs & Public programs", "NVO un valsts programmas"),
    body: t(
      "Practical training for EU-funded initiatives, associations, and social enterprises. Delivered for LIFT, ITC, and Latvian government-backed programs.",
      "Praktiskas apmācības ES finansētām iniciatīvām, biedrībām un sociālajiem uzņēmumiem. Esmu strādājis ar LIFT, ITC un valsts atbalstītām programmām Latvijā.",
    ),
  },
];

const formats = (t: T) => [
  {
    title: t("Meta Ads Intensive", "Meta reklāmu intensīvais kurss"),
    duration: t("1-day workshop", "1 dienas darbnīca"),
    audience: t("Marketers, founders, agency teams", "mārketinga speciālistiem, dibinātājiem, aģentūru komandām"),
    outcome: t(
      "Leave with a live campaign structure, creative brief, and measurement plan.",
      "Beigās tev ir gatava kampaņas struktūra, reklāmu uzdevums un mērīšanas plāns.",
    ),
    bullets: [
      t("Account & pixel setup", "Konta un pikseļa iestatīšana"),
      t("Audience & creative strategy", "Auditorijas un reklāmu idejas"),
      t("Reading the numbers that matter", "Kurus skaitļus skatīties"),
    ],
  },
  {
    title: t("Digital Growth for SMEs", "Digitālā izaugsme uzņēmējiem"),
    duration: t("Multi-session course", "Vairāku nodarbību kurss"),
    audience: t("Small & mid-sized business owners", "mazo un vidējo uzņēmumu īpašniekiem"),
    outcome: t(
      "A working growth system: funnel, channels, weekly rhythm, and reporting.",
      "Strādājoša izaugsmes sistēma: pārdošanas piltuve, kanāli, iknedēļas ritms un atskaites.",
    ),
    bullets: [
      t("Positioning & offer", "Pozicionēšana un piedāvājums"),
      t("Channel prioritization", "Kuri kanāli ir svarīgākie"),
      t("Funnel & automation basics", "Piltuves un automatizācijas pamati"),
    ],
  },
  {
    title: t("Custom MBA / BBA module", "Pielāgots MBA / BBA kurss"),
    duration: t("Semester-long", "Semestra garumā"),
    audience: t("Universities & business schools", "augstskolām un biznesa skolām"),
    outcome: t(
      "A syllabus co-designed with your program, with assessments and industry cases.",
      "Kursa programma, ko veidojam kopā ar tavu augstskolu, ar pārbaudījumiem un reāliem uzņēmumu piemēriem.",
    ),
    bullets: [
      t("Lectures & case studies", "Lekcijas un gadījumu analīze"),
      t("Group projects with live briefs", "Grupu projekti ar reālu uzņēmumu uzdevumiem"),
      t("Guest practitioners", "Vieslektori no nozares"),
    ],
  },
  {
    title: t("Team enablement & coaching", "Komandas apmācība un konsultācijas"),
    duration: t("Ongoing retainer", "Ilgtermiņa sadarbība"),
    audience: t("In-house marketing teams", "iekšējām mārketinga komandām"),
    outcome: t(
      "Your team runs paid media and automation confidently — with me as a sparring partner.",
      "Tava komanda droši vada maksāto reklāmu un automatizāciju, un man var jautāt, kad vien vajag.",
    ),
    bullets: [
      t("Weekly working sessions", "Iknedēļas darba sesijas"),
      t("Playbooks & SOPs", "Rokasgrāmatas un instrukcijas"),
      t("Ad account audits", "Reklāmas kontu auditi"),
    ],
  },
];

const curriculum = (t: T) => [
  {
    q: t("Strategy & positioning", "Stratēģija un pozicionēšana"),
    a: t(
      "Turning fuzzy goals into a channel plan: ICP work, offer design, funnel mapping, and choosing where to actually spend the next euro.",
      "Kā no neskaidriem mērķiem nonākt pie konkrēta plāna: ideālais klients, piedāvājums, pārdošanas piltuve un lēmums, kur ieguldīt nākamo eiro.",
    ),
  },
  {
    q: t("Meta advertising (Facebook & Instagram)", "Meta reklāma (Facebook un Instagram)"),
    a: t(
      "Account structure, campaign objectives, audience & creative strategy, iOS/attribution realities, scaling and troubleshooting.",
      "Konta struktūra, kampaņu mērķi, auditorijas un reklāmas, iOS un atribūcijas realitāte, budžeta palielināšana un problēmu risināšana.",
    ),
  },
  {
    q: t("Landing pages & funnels", "Landing lapas un pārdošanas piltuves"),
    a: t(
      "Designing pages that convert, split-testing frameworks, lead magnets, email/SMS follow-up, and CRO fundamentals.",
      "Lapas, kas pārdod, A/B testi, bezmaksas materiāli kontaktu piesaistei, e-pasta un SMS sekvences un konversiju optimizācijas pamati.",
    ),
  },
  {
    q: t("Marketing automation", "Mārketinga automatizācija"),
    a: t(
      "Zapier/Make workflows, CRM hygiene, lead scoring, and automating the boring parts of client & prospect communication.",
      "Zapier/Make procesi, kārtība CRM, potenciālo klientu vērtēšana un garlaicīgās saziņas daļas automatizācija.",
    ),
  },
  {
    q: t("Analytics & measurement", "Analītika un mērījumi"),
    a: t(
      "GA4, server-side tracking basics, dashboards teams actually read, and connecting ad spend to revenue.",
      "GA4, servera puses izsekošanas pamati, atskaites, ko komanda tiešām lasa, un reklāmas izdevumu sasaiste ar ieņēmumiem.",
    ),
  },
  {
    q: t("AI in marketing", "MI mārketingā"),
    a: t(
      "Practical use of LLMs for research, briefs, creative variants, and analysis — with guardrails for teams.",
      "Kā praktiski izmantot ChatGPT un līdzīgus rīkus izpētei, uzdevumu aprakstiem, reklāmu variantiem un analīzei — ar skaidriem noteikumiem komandai.",
    ),
  },
];

const programs = (t: T) => [
  { org: t("Riga Business School", "Rīgas Biznesa skola"), role: t("MBA Lecturer, Digital Marketing", "MBA lektors digitālajā mārketingā"), period: t("2021 – Present", "2021 – šobrīd") },
  { org: t("Riga Business School — Executive Education", "Rīgas Biznesa skola — vadītāju izglītība"), role: t("Digital Growth Strategies for SMEs", "Digitālās izaugsmes stratēģijas MVU"), period: t("Nov 2024", "2024. nov.") },
  { org: t("RISEBA University", "Augstskola RISEBA"), role: t("BBA Lecturer, Social Media & Meta Ads", "BBA lektors — sociālie mediji un Meta reklāma"), period: "2023 – 2024" },
  { org: t("University of Lusaka", "Lusakas Universitāte"), role: t("Guest Lecturer (Erasmus+)", "Vieslektors (Erasmus+)"), period: t("May 2024", "2024. maijs") },
  { org: t("LIFT Program (EU-funded)", "LIFT programma (ES finansēta)"), role: t("Course leader — Meta Ads & Automation for SMEs", "Kursu vadītājs — Meta reklāma un automatizācija uzņēmējiem"), period: t("2024 – Present", "2024 – šobrīd") },
  { org: t("International Trade Centre", "Starptautiskais tirdzniecības centrs"), role: t("Workshop facilitator — Digital marketing for exporters", "Darbnīcu vadītājs — digitālais mārketings eksportētājiem"), period: "2023" },
  { org: "Latvijas Digitālo ekspertu biedrība", role: t("Trainer — Digital marketing programs", "Pasniedzējs — digitālā mārketinga programmas"), period: "2023" },
  { org: "Vidusdaugavas NVO centrs", role: t("Digital campaign workshop leader", "Digitālo kampaņu darbnīcas vadītājs"), period: "2023" },
  { org: "Medijpratējs", role: t("Trainer — Media & digital literacy", "Pasniedzējs — medijpratība un digitālā pratība"), period: "2022 – 2023" },
];

const testimonials = (t: T) => [
  {
    quote: t(
      "Rihards is an exceptional marketer with a deep understanding of the digital marketing ecosystem. He promoted data-led decisions from day one and highlighted the importance of measuring performance.",
      "Rihards ir izcils mārketinga speciālists, kurš digitālo mārketingu pārzina no A līdz Z. Jau no pirmās dienas viņš uzstāja, ka lēmumi jāpieņem, balstoties datos, un ka rezultāti ir jāmēra.",
    ),
    author: "Bence Etele Baráth",
    company: "AppsFlyer",
  },
  {
    quote: t(
      "Rihards is THE expert on Facebook advertising. Excellent communication, deep knowledge, and an outstanding public speaker who gets the message across to any audience.",
      "Rihards ir mans galvenais Facebook reklāmas eksperts. Skaidri komunicē, lieliski pārzina savu jomu un spēj uzrunāt jebkuru auditoriju.",
    ),
    author: "Regita Zeiļa",
    company: t("Director, Social Entrepreneurship Association", "Direktore, Sociālās uzņēmējdarbības asociācija"),
  },
  {
    quote: t(
      "Highly skilled, passionate and dedicated. Whenever I need advice on digital marketing — I go to him. His international experience and know-how excels his peers.",
      "Ļoti zinošs, aizrautīgs un uzticams. Kad man vajag padomu digitālajā mārketingā, eju pie viņa. Ar savu starptautisko pieredzi viņš ir soli priekšā citiem.",
    ),
    author: "Kristina Berga",
    company: t("CEO, HuskySense", "Vadītāja, HuskySense"),
  },
];

const steps = (t: T) => [
  { n: "01", title: t("Discovery call", "Iepazīšanās saruna"), body: t("30 minutes to understand your team, goals, current stack, and timeline.", "Pusstunda, lai saprastu tavu komandu, mērķus, rīkus un termiņus.") },
  { n: "02", title: t("Curriculum design", "Programmas izstrāde"), body: t("A tailored outline with learning outcomes, formats, and success metrics.", "Pielāgots plāns ar mācību mērķiem, formātu un to, kā mērīsim rezultātu.") },
  { n: "03", title: t("Delivery", "Apmācības"), body: t("Workshops, lectures, or ongoing coaching — in-person in Riga or remote worldwide.", "Darbnīcas, lekcijas vai ilgtermiņa apmācība — klātienē Rīgā vai attālināti no jebkuras vietas.") },
  { n: "04", title: t("Post-training support", "Atbalsts pēc apmācībām"), body: t("Recordings, playbooks, and follow-up sessions so the learning actually sticks.", "Ieraksti, rokasgrāmatas un papildu tikšanās, lai zināšanas nepazūd.") },
];

const faqs = (t: T) => [
  { q: t("In-person, remote or hybrid?", "Klātienē, attālināti vai hibrīdi?"), a: t("All three. I'm based in Riga and travel across Europe. Remote sessions run on Zoom or Google Meet with interactive workbooks.", "Visi trīs varianti der. Dzīvoju Rīgā un braucu pa visu Eiropu. Attālinātās nodarbības notiek Zoom vai Google Meet ar interaktīvām darba lapām.") },
  { q: t("What languages do you teach in?", "Kādā valodā notiek apmācības?"), a: t("English and Latvian. Materials are typically in English.", "Latviešu un angļu valodā. Materiāli parasti ir angļu valodā.") },
  { q: t("Ideal group size?", "Cik lielai jābūt grupai?"), a: t("Workshops work best with 8–25 participants. University modules follow the program's cohort size.", "Darbnīcām vislabāk der 8–25 dalībnieki. Augstskolās — tik, cik studentu ir kursā.") },
  { q: t("Can we record sessions?", "Vai nodarbības var ierakstīt?"), a: t("Yes — recording rights are agreed up front and included in most engagements.", "Jā — par ierakstiem vienojamies iepriekš, un vairumā gadījumu tie ir iekļauti cenā.") },
  { q: t("How is pricing structured?", "Cik tas maksā?"), a: t("Day-rate for workshops, project fee for multi-session courses, and monthly retainer for ongoing coaching. Custom quote after the discovery call.", "Darbnīcām — dienas likme, kursiem ar vairākām nodarbībām — projekta cena, ilgtermiņa apmācībai — ikmēneša maksa. Precīzu piedāvājumu sagatavoju pēc iepazīšanās sarunas.") },
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
  const { t } = useLang();

  usePageMeta(
    t(
      "Digital Marketing Trainer & Workshop Facilitator — Rihards Zeila",
      "Digitālā mārketinga apmācības un darbnīcas — Rihards Zeila",
    ),
    t(
      "Book Rihards Zeila for digital marketing training, Meta ads workshops, MBA/BBA modules, and team enablement. MBA lecturer at Riga Business School.",
      "Digitālā mārketinga apmācības, Meta reklāmu darbnīcas, MBA/BBA kursi un komandu apmācība. Rihards Zeila — MBA lektors Rīgas Biznesa skolā.",
    ),
  );

  useEffect(() => {
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
      toast({
        title: t("Missing information", "Trūkst informācijas"),
        description: t("Please fill in name, email, program type, and message.", "Lūdzu, aizpildi vārdu, e-pastu, programmas veidu un ziņu."),
        variant: "destructive",
      });
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      toast({
        title: t("Invalid email", "Nederīgs e-pasts"),
        description: t("Please enter a valid email address.", "Lūdzu, ievadi derīgu e-pasta adresi."),
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: form });
      if (error) throw error;
      toast({
        title: t("Request sent", "Pieprasījums nosūtīts"),
        description: t("Thanks — I'll get back to you within 2 business days.", "Paldies — atbildēšu divu darba dienu laikā."),
      });
      setForm({ name: "", email: "", organization: "", type: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: t("Something went wrong", "Kaut kas nogāja greizi"),
        description: t(
          "Please try again or email rihards.zeila@gmail.com directly.",
          "Lūdzu, mēģini vēlreiz vai raksti tieši uz rihards.zeila@gmail.com.",
        ),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wwm-theme min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[color:var(--wwm-ink)]/85 backdrop-blur-md border-b wwm-hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="wwm-display text-lg md:text-xl tracking-tight">
            Rihards Zeila<span className="wwm-display-italic text-[color:var(--wwm-accent)]">.</span>
          </div>
          <div className="hidden md:block text-xs uppercase tracking-[0.22em] wwm-muted">
            {t("Digital Marketing Training", "Digitālā mārketinga apmācības")}
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <button onClick={scrollToForm} className="wwm-cta px-4 py-2 text-sm hidden sm:block">
              {t("Book a training", "Pieteikt apmācības")}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-32 lg:pb-36 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="wwm-mono text-[color:var(--wwm-accent)]">{t("Digital Marketing Training · Est. 2015", "Digitālā mārketinga apmācības · kopš 2015")}</div>
            <h1 className="wwm-display text-[2.75rem] md:text-6xl lg:text-[5.25rem] leading-[1.0] tracking-[-0.035em]" style={{ fontWeight: 500 }}>
              {t(
                <>Training that turns marketing teams into <span className="wwm-underline-acid"><span className="wwm-display-italic">operators</span></span>.</>,
                <>Apmācības, pēc kurām komanda sāk <span className="wwm-underline-acid"><span className="wwm-display-italic">darīt</span></span>, nevis tikai zināt.</>,
              )}
            </h1>
            <p className="text-lg md:text-xl wwm-muted leading-relaxed max-w-2xl">
              {t(
                "MBA lecturer at Riga Business School. Course leader for the EU-funded LIFT program. Workshop facilitator for the International Trade Centre. Ten years in the trenches, up to $5M/year of ad spend managed — packaged into training your team will actually use on Monday morning.",
                "MBA lektors Rīgas Biznesa skolā, kursu vadītājs ES finansētajā LIFT programmā un Starptautiskā tirdzniecības centra darbnīcu vadītājs. Desmit gadu prakse un līdz $5M reklāmas budžeta gadā — apmācībās, kuras tava komanda izmantos jau pirmdienas rītā.",
              )}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={scrollToForm} className="wwm-cta px-6 py-3 inline-flex items-center gap-2">
                {t("Request a training", "Pieteikt apmācības")} <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={scrollToPrograms} className="wwm-ghost px-6 py-3">
                {t("See past programs", "Kur esmu mācījis")}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="wwm-portrait-frame absolute inset-0 rounded-sm" />
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={headshot}
                  alt="Rihards Zeila"
                  className="wwm-portrait w-full block"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[color:var(--wwm-ink)] text-[color:var(--wwm-accent)] px-4 py-2 wwm-mono border wwm-hairline">
                {t("Riga · Latvia", "Rīga · Latvija")}
              </div>
              <div className="absolute -top-3 -right-3 bg-[color:var(--wwm-sand)] text-[color:var(--wwm-accent)] px-3 py-1 wwm-mono text-[0.65rem] border wwm-hairline">
                {t("Booking 2026", "Pieteikšanās 2026")}
              </div>
            </div>
          </div>
        </div>

        {/* Trusted-by strip */}
        <div className="border-t wwm-hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="wwm-eyebrow shrink-0 md:pr-8 md:border-r wwm-hairline">{t("Trained teams at", "Esmu apmācījis")}</div>
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
          {stats(t).map((s, i) => {
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
              <div className="wwm-eyebrow mb-4">{t("Who I train", "Kam apmācības")}</div>
              <h2 className="wwm-display text-4xl md:text-5xl">
                {t(
                  <>For teams that need <span className="wwm-display-italic">results</span>, not another slide deck.</>,
                  <>Komandām, kurām vajag <span className="wwm-display-italic">rezultātus</span>, nevis vēl vienu prezentāciju.</>,
                )}
              </h2>
            </div>
            <p className="lg:col-span-7 lg:col-start-6 text-lg wwm-muted leading-relaxed self-end">
              {t(
                "I work with three distinct audiences. The through-line is the same: practical frameworks, live ad accounts, and content people will use the week after training ends.",
                "Strādāju ar trīs dažādām auditorijām, bet pieeja ir viena: praktiskas metodes, īsti reklāmas konti un saturs, ko cilvēki izmanto jau nākamajā nedēļā.",
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences(t).map((a) => (
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
          <div className="wwm-eyebrow mb-4">{t("Training formats", "Apmācību formāti")}</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-16 max-w-3xl">
            {t(
              <>Four ways to work <span className="wwm-display-italic">together</span>.</>,
              <>Četri veidi, kā strādāt <span className="wwm-display-italic">kopā</span>.</>,
            )}
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-[rgba(245,242,236,0.12)] border wwm-hairline">
            {formats(t).map((f) => (
              <div key={f.title} className="bg-[color:var(--wwm-ink)] p-8 lg:p-10 flex flex-col">
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--wwm-accent)] mb-4">{f.duration}</div>
                <h3 className="wwm-display text-3xl mb-3">{f.title}</h3>
                <div className="text-sm wwm-muted mb-5 italic">{t("For", "Kam:")} {f.audience}</div>
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
          <div className="wwm-eyebrow mb-4">{t("Curriculum snapshot", "Ko mācu")}</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-12">
            {t(
              <>What we can <span className="wwm-display-italic">cover</span>.</>,
              <>Tēmas, ko varam <span className="wwm-display-italic">apgūt</span>.</>,
            )}
          </h2>
          <Accordion type="single" collapsible defaultValue="c-0" className="border-t wwm-hairline">
            {curriculum(t).map((c, i) => (
              <AccordionItem key={i} value={`c-${i}`} className="border-b wwm-hairline">
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
          <div className="wwm-eyebrow mb-4">{t("Selected programs & institutions", "Programmas un iestādes")}</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-12">
            {t(
              <>Where I've taught & <span className="wwm-display-italic">trained</span>.</>,
              <>Kur esmu pasniedzis un <span className="wwm-display-italic">apmācījis</span>.</>,
            )}
          </h2>
          <div className="border-t wwm-hairline">
            {programs(t).map((p) => (
              <div key={p.org + p.role} className="wwm-program-row py-6 grid grid-cols-12 gap-4 items-baseline border-b wwm-hairline px-4 -mx-4">
                <div className="col-span-3 md:col-span-2 wwm-mono text-[color:var(--wwm-accent)]">{p.period}</div>
                <div className="col-span-9 md:col-span-5 wwm-display text-xl">{p.org}</div>
                <div className="col-span-12 md:col-span-5 wwm-muted">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="wwm-dark py-24 lg:py-32 relative overflow-hidden">
        <div className="wwm-quote-glyph absolute -top-6 -left-4 md:left-8" aria-hidden>"</div>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
          <div className="wwm-mono text-[color:var(--wwm-acid)] mb-4">{t("In their words", "Viņu vārdiem")}</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-16 max-w-3xl">
            {t(
              <>From colleagues, clients, and program <span className="wwm-display-italic">leads</span>.</>,
              <>Kolēģi, klienti un programmu <span className="wwm-display-italic">vadītāji</span>.</>,
            )}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials(t).map((q) => (
              <blockquote key={q.author} className="flex flex-col">
                <div className="wwm-display wwm-display-italic text-6xl text-[color:var(--wwm-acid)] leading-none mb-4">"</div>
                <p className="wwm-display text-xl leading-snug mb-8 text-[color:var(--wwm-ivory)]">{q.quote}</p>
                <footer className="mt-auto pt-6 border-t wwm-hairline">
                  <div className="text-[color:var(--wwm-ivory)] font-medium">{q.author}</div>
                  <div className="wwm-muted text-sm mt-1">{q.company}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="wwm-plum py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="wwm-mono text-[color:var(--wwm-acid)] mb-4">{t("How an engagement works", "Kā notiek sadarbība")}</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-20 max-w-2xl">
            {t(
              <>Simple, transparent, no <span className="wwm-display-italic">bloat</span>.</>,
              <>Vienkārši, skaidri, bez <span className="wwm-display-italic">liekā</span>.</>,
            )}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps(t).map((s) => (
              <div key={s.n} className="wwm-broken-tile p-8 border wwm-hairline bg-[rgba(245,242,236,0.03)]">
                <div className="wwm-display wwm-display-italic text-6xl text-[color:var(--wwm-acid)] mb-6 leading-none">{s.n}</div>
                <div className="wwm-display text-xl mb-3 text-[color:var(--wwm-ivory)]">{s.title}</div>
                <p className="wwm-muted text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-24 lg:py-32 bg-[color:var(--wwm-sand)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="wwm-eyebrow mb-4">{t("FAQ", "Jautājumi")}</div>
          <h2 className="wwm-display text-4xl md:text-5xl mb-12">
            {t(
              <>Common <span className="wwm-display-italic">questions</span>.</>,
              <>Biežāk uzdotie <span className="wwm-display-italic">jautājumi</span>.</>,
            )}
          </h2>
          <Accordion type="single" collapsible className="border-t wwm-hairline">
            {faqs(t).map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-b wwm-hairline">
                <AccordionTrigger className="text-left wwm-display text-xl hover:no-underline py-6 font-normal">{f.q}</AccordionTrigger>
                <AccordionContent className="wwm-muted leading-relaxed pb-6">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contact form */}
      <section id="wwm-contact" className="wwm-callout py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="wwm-eyebrow">{t("Book a training", "Pieteikt apmācības")}</div>
            <h2 className="wwm-display text-4xl md:text-5xl leading-tight">
              {t(
                <>Tell me about your <span className="wwm-display-italic">team</span>.</>,
                <>Pastāsti par savu <span className="wwm-display-italic">komandu</span>.</>,
              )}
            </h2>
            <p className="text-[color:var(--wwm-ivory)]/75 leading-relaxed text-lg">
              {t(
                "A short note about your organization, goals, and timeline is enough to get started. I reply within two business days.",
                "Pietiek ar īsu ziņu par savu organizāciju, mērķiem un laiku. Atbildēšu divu darba dienu laikā.",
              )}
            </p>
            <div className="pt-6 space-y-3 text-sm border-t wwm-hairline">
              <a href="mailto:rihards.zeila@gmail.com" className="flex items-center gap-3 text-[color:var(--wwm-ivory)]/85 hover:text-[color:var(--wwm-accent)] transition pt-6">
                <Mail className="w-4 h-4" /> rihards.zeila@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/rihards-ze/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[color:var(--wwm-ivory)]/85 hover:text-[color:var(--wwm-accent)] transition">
                <Linkedin className="w-4 h-4" /> linkedin.com/in/rihards-ze
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[color:var(--wwm-sand)] text-[color:var(--wwm-ivory)] p-8 md:p-10 space-y-5 border wwm-hairline">

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">{t("Name", "Vārds")}</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("Your name", "Tavs vārds")} className="wwm-field h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">{t("Email", "E-pasts")}</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t("you@company.com", "tu@uznemums.lv")} className="wwm-field h-11" required />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">{t("Organization", "Organizācija")}</label>
              <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder={t("Company, university, program…", "Uzņēmums, augstskola, programma…")} className="wwm-field h-11" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">{t("Program type", "Programmas veids")}</label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger className="wwm-field h-11">
                  <SelectValue placeholder={t("Select program type", "Izvēlies programmas veidu")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">{t("Workshop / 1-day intensive", "Darbnīca / 1 dienas intensīvais kurss")}</SelectItem>
                  <SelectItem value="mba-module">{t("University module (MBA / BBA)", "Augstskolas modulis (MBA / BBA)")}</SelectItem>
                  <SelectItem value="corporate-training">{t("Corporate / in-house training", "Uzņēmuma iekšējās apmācības")}</SelectItem>
                  <SelectItem value="public-program">{t("Public / EU-funded program", "Publiska / ES finansēta programma")}</SelectItem>
                  <SelectItem value="other">{t("Other", "Cits")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] mb-2 wwm-muted">{t("Message", "Ziņa")}</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t("Team size, goals, timeline, format preferences…", "Komandas lielums, mērķi, termiņi, vēlamais formāts…")} rows={5} className="wwm-field" required />
            </div>
            <Button type="submit" disabled={submitting} className="wwm-cta w-full h-12 text-base uppercase tracking-wider">
              {submitting ? t("Sending…", "Sūta…") : t("Send request", "Nosūtīt pieprasījumu")}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t wwm-hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm wwm-muted">
          <div>
            © {new Date().getFullYear()} Rihards Zeila —{" "}
            {t("Digital marketing training & consulting.", "Digitālā mārketinga apmācības un konsultācijas.")}
          </div>
          <a href="mailto:rihards.zeila@gmail.com" className="hover:text-[color:var(--wwm-ink)] transition">
            rihards.zeila@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WorkWithMe;

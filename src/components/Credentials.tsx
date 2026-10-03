import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WorldMap from "./WorldMap";
import { useLang } from "@/i18n/lang";
import { Target, TrendingUp, Zap, Lightbulb, BookOpen, Users, BarChart3, Settings, Sparkles, Globe, Search, Mail } from "lucide-react";

const Credentials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLang();

  const skills = [
    { title: t("Meta Advertising", "Meta reklāmas"), description: t("Expert in full-funnel Meta ad systems that drive measurable ROAS and client acquisition.", "Pilnas pārdošanas piltuves Meta reklāmās, kas nes izmērāmu ROAS un jaunus klientus."), icon: Target },
    { title: t("Digital Marketing Strategy", "Digitālā mārketinga stratēģija"), description: t("Building scalable systems that combine paid, organic, and AI-driven growth.", "Sistēmas, kas aug līdzi uzņēmumam un apvieno maksāto reklāmu, organisko saturu un MI."), icon: TrendingUp },
    { title: t("Business Automations", "Biznesa automatizācija"), description: t("Streamlining operations and client workflows with Make, n8n, and GoHighLevel.", "Procesu un klientu saziņas automatizācija ar Make, n8n un GoHighLevel."), icon: Zap },
    { title: t("Creative Strategy", "Kreatīvā stratēģija"), description: t("Designing data-backed ad concepts, visuals, and copy that convert.", "Datos balstītas reklāmu idejas, vizuāļi un teksti, kas pārdod."), icon: Lightbulb },
    { title: t("Digital Course Creation", "Digitālo kursu veidošana"), description: t("Developing practical, high-ROI marketing courses for SMEs and professionals.", "Praktiski mārketinga kursi uzņēmējiem un speciālistiem, kas ātri atmaksājas."), icon: BookOpen },
    { title: t("Leadership & Mentorship", "Vadība un mentorēšana"), description: t("Guiding teams, interns, and MBA students to think strategically and execute precisely.", "Palīdzu komandām, praktikantiem un MBA studentiem domāt stratēģiski un precīzi īstenot iecerēto."), icon: Users }
  ];

  const toolCategories = [
    {
      category: t("Advertising & Analytics", "Reklāma un analītika"),
      tools: "Meta, Google Ads, LinkedIn, TikTok, GA4, CAPI, Hotjar, Looker Studio",
      icon: BarChart3
    },
    {
      category: t("Automation & CRM", "Automatizācija un CRM"),
      tools: "Make, Zapier, GoHighLevel, Google Sheets",
      icon: Settings
    },
    {
      category: t("AI & Creative", "MI un radošie rīki"),
      tools: "ChatGPT, Manus, Midjourney, VEO3, Photoshop, Canva",
      icon: Sparkles
    },
    {
      category: t("Web & Design", "Web un dizains"),
      tools: "Shopify, WordPress, HTML/CSS/JS, Figma, Lovable",
      icon: Globe
    },
    {
      category: "SEO",
      tools: "Ahrefs, Search Console",
      icon: Search
    },
    {
      category: t("Email & Outreach", "E-pasts un tiešā uzrunāšana"),
      tools: "MailerLite, Apollo, Instantly, Woodpecker, MillionVerifier",
      icon: Mail
    }
  ];

  const languages = [
    { name: t("Latvian", "Latviešu"), level: t("Native", "Dzimtā") },
    { name: t("Latgalian", "Latgaliešu"), level: t("Native", "Dzimtā") },
    { name: t("English", "Angļu"), level: t("Bilingual", "Brīvi") },
    { name: t("Russian", "Krievu"), level: t("Professional working", "Darba līmenī") },
    { name: t("Polish", "Poļu"), level: t("Professional working", "Darba līmenī") },
    { name: t("Spanish", "Spāņu"), level: t("Elementary", "Pamatlīmenis") }
  ];

  const certifications = [
    "Meta Certified Media Buying Professional",
    "Meta Certified Media Planning Professional",
    "Pinterest Advertising Essentials Certification",
    "Amazon Advertising Foundations Certification",
    "Amazon Ads Retail Certification",
    "OpenAI Whisper, GPT3, Codex"
  ];

  const courses = [
    "Advanced Coding Masterclass - HTML, CSS and JavaScript",
    "Ascend Viral - Instagram Domination",
    "Ben Malol's Social Marketing Masterclass",
    "Facebook Blueprint"
  ];

  const education = [
    {
      degree: t("AP in Multimedia Design", "AP grāds multimediju dizainā"),
      institution: t("Copenhagen School of Business and Technology", "Kopenhāgenas Biznesa un tehnoloģiju skola"),
      location: t("Copenhagen", "Kopenhāgena"),
      period: t("September 2017 - June 2019", "2017. sept. – 2019. jūn."),
      details: [
        t("Interaction development: front-end development (HTML, CSS & JavaScript)", "Interakciju izstrāde: front-end (HTML, CSS un JavaScript)"),
        t("Design and visualization: User Interface Design (UI), digital design principles, prototyping, and design processes", "Dizains un vizualizācija: lietotāja saskarnes dizains (UI), digitālā dizaina principi, prototipēšana un dizaina procesi"),
        t("Communication: User Experience Design (UX) and user testing", "Komunikācija: lietotāja pieredzes dizains (UX) un lietotāju testēšana")
      ]
    },
    {
      degree: t("BA in Economics", "Bakalaura grāds ekonomikā"),
      institution: t("University of Latvia", "Latvijas Universitāte"),
      location: t("Riga", "Rīga"),
      period: t("September 2012 - June 2016", "2012. sept. – 2016. jūn."),
      grade: t("Grade: 8.2 / 10", "Vidējā atzīme: 8,2 / 10"),
      details: [
        t("Developed leadership skills by organizing activities for new members of the Student Council", "Attīstīju līderības prasmes, organizējot pasākumus jaunajiem Studentu padomes biedriem"),
        t("Gained the ability to orient in the global economic and business environment during three study exchange semesters abroad", "Trīs apmaiņas semestros ārzemēs iemācījos orientēties globālajā ekonomikā un biznesa vidē"),
        t("Activities: Activist of the student council; Member of Student Fraternity 'Selonija'", "Aktivitātes: Studentu padomes aktīvists; studentu korporācijas “Selonija” biedrs")
      ]
    },
    {
      degree: t("International Study Semesters", "Starptautiskie studiju semestri"),
      institution: "Erasmus+",
      location: t("Istanbul, Valencia, Lisbon, Chiang Mai", "Stambula, Valensija, Lisabona, Čiangmai"),
      period: "2014 - 2016"
    }
  ];

  return (
    <section 
      ref={ref}
      id="credentials" 
      className="py-12 lg:py-32 px-0 bg-sunken"
    >
      <div className="w-full lg:max-w-6xl lg:mx-auto lg:px-6">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="heading-elegant text-3xl lg:text-display mb-4 lg:mb-6 text-center">
            {t("Full Credentials & Background", "Izglītība, prasmes un pieredze")}
          </h2>
          <p className="body-clean text-lg lg:text-2xl text-muted-foreground mb-8 lg:mb-12 text-center max-w-3xl mx-auto">
            {t(
              "For those who want to dive deeper into my qualifications, tools, and experience.",
              "Visiem, kas grib uzzināt vairāk par manu kvalifikāciju, rīkiem un pieredzi.",
            )}
          </p>

          <div className="w-full">
            <Accordion type="multiple" className="w-full max-w-none space-y-3">
              {/* Core Skills */}
              <AccordionItem value="skills" className="card-luxury !p-2 lg:!p-6">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-2 lg:px-6 py-3 justify-center lg:justify-start [&>svg]:ml-2 lg:[&>svg]:ml-auto">
                  {t("Core Skills", "Galvenās prasmes")}
                </AccordionTrigger>
                <AccordionContent className="px-2 lg:px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 pt-2">
                    {skills.map(skill => {
                      const SkillIcon = skill.icon;
                      return (
                        <div key={skill.title} className="border-hover p-3 lg:p-4 rounded-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <SkillIcon className="w-5 h-5 text-primary flex-shrink-0" />
                            <p className="body-clean text-large">
                              <strong className="font-bold">{skill.title}</strong>
                            </p>
                          </div>
                          <p className="body-clean text-lg lg:text-xl text-muted-foreground pl-7">{skill.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Tools & Platforms */}
              <AccordionItem value="tools" className="card-luxury !p-2 lg:!p-6">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-2 lg:px-6 py-3 justify-center lg:justify-start [&>svg]:ml-2 lg:[&>svg]:ml-auto">
                  {t("Tools & Platforms", "Rīki un platformas")}
                </AccordionTrigger>
                <AccordionContent className="px-2 lg:px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 pt-2">
                    {toolCategories.map(category => {
                      const CategoryIcon = category.icon;
                      return (
                        <div key={category.category} className="border-hover p-3 lg:p-4 rounded-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <CategoryIcon className="w-5 h-5 text-primary flex-shrink-0" />
                            <h4 style={{ textShadow: 'none' }} className="body-clean text-foreground text-large">
                              <strong className="font-bold">{category.category}</strong>
                            </h4>
                          </div>
                          <p className="body-clean text-lg lg:text-xl text-muted-foreground pl-7">{category.tools}</p>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Education & Certifications */}
              <AccordionItem value="education" className="card-luxury !p-2 lg:!p-6">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-2 lg:px-6 py-3 justify-center lg:justify-start [&>svg]:ml-2 lg:[&>svg]:ml-auto">
                  {t("Education & Certifications", "Izglītība un sertifikāti")}
                </AccordionTrigger>
                <AccordionContent className="px-2 lg:px-6 pb-6">
                  <div className="space-y-6 pt-2">
                    {/* Certifications */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">{t("Certifications", "Sertifikāti")}</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                        {certifications.map((cert) => (
                          <div key={cert} className="border-hover p-3 lg:p-3 rounded-sm">
                            <p className="body-clean text-lg lg:text-xl">{cert}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Advanced Courses */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">{t("Advanced Courses", "Papildu kursi")}</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                        {courses.map((course) => (
                          <div key={course} className="border-hover p-3 lg:p-3 rounded-sm">
                            <p className="body-clean text-lg lg:text-xl">{course}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">{t("Education", "Izglītība")}</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                        {education.map((edu) => (
                          <div key={edu.degree} className="border-hover p-3 lg:p-4 rounded-sm">
                            <h5 className="body-clean text-large font-bold mb-1">{edu.degree}</h5>
                            <p className="body-clean text-lg lg:text-xl text-muted-foreground mb-2">
                              {edu.institution}
                            </p>
                            <p className="body-clean text-sm text-muted-foreground mb-2">
                              {edu.location} • {edu.period}
                              {edu.grade && <> • {edu.grade}</>}
                            </p>
                            {edu.details && (
                              <ul className="space-y-1 mt-3">
                                {edu.details.map((detail, idx) => (
                                  <li key={idx} className="body-clean text-muted-foreground text-lg lg:text-xl flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Honor */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">{t("Honor", "Apbalvojums")}</h4>
                      <div className="border-hover p-3 lg:p-4 rounded-sm">
                        <p className="body-clean text-lg lg:text-xl text-muted-foreground leading-relaxed">
                          {t(
                            "Kristaps Morbergs' Scholarship of Excellence - Annually awarded to 15 selected University of Latvia students for outstanding academic and extracurricular achievements.",
                            "Kristapa Morberga izcilības stipendija — katru gadu tiek piešķirta 15 izraudzītiem Latvijas Universitātes studentiem par izciliem akadēmiskajiem un ārpusstudiju sasniegumiem.",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Languages */}
              <AccordionItem value="languages" className="card-luxury !p-2 lg:!p-6">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-2 lg:px-6 py-3 justify-center lg:justify-start [&>svg]:ml-2 lg:[&>svg]:ml-auto">
                  {t("Languages", "Valodas")}
                </AccordionTrigger>
                <AccordionContent className="px-2 lg:px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 pt-2">
                    {languages.map(lang => (
                      <div key={lang.name} className="border-hover p-3 lg:p-4 rounded-sm flex justify-between items-center">
                        <span className="body-clean font-medium text-lg lg:text-xl">{lang.name}</span>
                        <span className="body-clean text-lg lg:text-xl text-muted-foreground">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Global Perspective */}
              <AccordionItem value="global" className="card-luxury !p-2 lg:!p-6">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-2 lg:px-6 py-3 justify-center lg:justify-start [&>svg]:ml-2 lg:[&>svg]:ml-auto">
                  {t("Global Perspective", "Globāls skatījums")}
                </AccordionTrigger>
                <AccordionContent className="px-2 lg:px-6 pb-6">
                  <div className="pt-2">
                    <blockquote className="heading-elegant text-base lg:text-large text-center italic border-l-2 lg:border-l-4 border-foreground pl-4 lg:pl-8 mb-8">
                      {t(
                        "\"Every culture teaches something new about connection, communication, and creativity. These experiences directly influence how I solve marketing challenges.\"",
                        "“Katra kultūra man iemāca ko jaunu par to, kā cilvēki sazinās un rada. Tas tieši ietekmē to, kā risinu mārketinga uzdevumus.”",
                      )}
                    </blockquote>

                    {/* Interactive World Map */}
                    <div className="mb-8 p-4 lg:p-8 border border-border rounded-lg bg-background/50">
                      <WorldMap />
                    </div>

                    {/* Regions */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 mb-8">
                      <Accordion type="single" collapsible defaultValue="europe" className="lg:col-span-1">
                        {[
                          { id: "europe", name: t("Europe", "Eiropa"), countries: t("Latvia, Lithuania, Estonia, Poland, Finland, Sweden, Norway, Croatia, Romania, Italy, Germany, Denmark, Spain, Portugal, Austria, Czechia, Hungary, Greece, Turkey, Georgia", "Latvija, Lietuva, Igaunija, Polija, Somija, Zviedrija, Norvēģija, Horvātija, Rumānija, Itālija, Vācija, Dānija, Spānija, Portugāle, Austrija, Čehija, Ungārija, Grieķija, Turcija, Gruzija"), description: t("Deep understanding of European business culture and digital marketing landscapes", "Labi pārzinu Eiropas biznesa kultūru un digitālā mārketinga vidi") },
                          { id: "southeast asia", name: t("Southeast Asia", "Dienvidaustrumāzija"), countries: t("Thailand, Malaysia, Indonesia, Singapore, Vietnam", "Taizeme, Malaizija, Indonēzija, Singapūra, Vjetnama"), description: t("Experience with emerging markets and diverse consumer behaviors", "Pieredze jaunajos tirgos ar ļoti atšķirīgiem pircēju paradumiem") },
                          { id: "middle east", name: t("Middle East", "Tuvie Austrumi"), countries: t("Jordan, Israel", "Jordānija, Izraēla"), description: t("Cross-cultural marketing experience in complex markets", "Mārketings dažādās kultūrās un sarežģītos tirgos") }
                        ].map((region) => (
                          <AccordionItem key={region.id} value={region.id}>
                            <AccordionTrigger className="heading-elegant text-lg lg:text-xl py-2">
                              {region.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="body-clean text-lg lg:text-xl font-bold text-muted-foreground mb-3">{region.countries}</p>
                              <p className="body-clean text-lg lg:text-xl text-muted-foreground">{region.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      <Accordion type="single" collapsible className="lg:col-span-1">
                        {[
                          { id: "africa", name: t("Africa", "Āfrika"), countries: t("Zambia, Botswana", "Zambija, Botsvāna"), description: t("Implemented fin-tech and digital marketing solutions in developing economies", "Finanšu tehnoloģiju un digitālā mārketinga risinājumi jaunattīstības valstīs") },
                          { id: "americas", name: t("Americas", "Amerika"), countries: t("United States, Colombia, Mexico", "ASV, Kolumbija, Meksika"), description: t("Experience across diverse American markets from North to South", "Pieredze dažādos Amerikas tirgos — no ziemeļiem līdz dienvidiem") }
                        ].map((region) => (
                          <AccordionItem key={region.id} value={region.id}>
                            <AccordionTrigger className="heading-elegant text-lg lg:text-xl py-2">
                              {region.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="body-clean text-lg lg:text-xl font-bold text-muted-foreground mb-3">{region.countries}</p>
                              <p className="body-clean text-lg lg:text-xl text-muted-foreground">{region.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>

                    {/* Stats box */}
                    <div className="p-6 lg:p-12 border border-border rounded-sm bg-background/50 relative overflow-hidden">
                      <div className="relative text-center">
                        <p className="heading-elegant text-xl lg:text-heading text-white">{t("36+ Countries Visited", "Apceļotas 36+ valstis")}</p>
                        <p className="body-clean text-sm lg:text-body text-muted-foreground mt-1 lg:mt-2">{t("4 Continents • Endless Insights", "4 kontinenti • neskaitāmas atziņas")}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;

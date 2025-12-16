import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WorldMap from "./WorldMap";

const Credentials = () => {
  const { ref, isVisible } = useScrollAnimation();

  const skills = [
    "Meta Advertising – Expert in full-funnel Meta ad systems that drive measurable ROAS and client acquisition.",
    "Digital Marketing Strategy – Building scalable systems that combine paid, organic, and AI-driven growth.",
    "Business Automations – Streamlining operations and client workflows with Make, n8n, and GoHighLevel.",
    "Creative Strategy – Designing data-backed ad concepts, visuals, and copy that convert.",
    "Digital Course Creation – Developing practical, high-ROI marketing courses for SMEs and professionals.",
    "Leadership & Mentorship – Guiding teams, interns, and MBA students to think strategically and execute precisely."
  ];

  const toolCategories = [
    {
      category: "Advertising & Analytics",
      tools: "Meta, Google Ads, LinkedIn, TikTok, GA4, CAPI, Hotjar, Looker Studio"
    },
    {
      category: "Automation & CRM",
      tools: "Make, Zapier, GoHighLevel, Google Sheets"
    },
    {
      category: "AI & Creative",
      tools: "ChatGPT, Manus, Midjourney, VEO3, Photoshop, Canva"
    },
    {
      category: "Web & Design",
      tools: "Shopify, WordPress, HTML/CSS/JS, Figma, Lovable"
    },
    {
      category: "SEO",
      tools: "Ahrefs, Search Console"
    },
    {
      category: "Email & Outreach",
      tools: "MailerLite, Apollo, Instantly, Woodpecker, MillionVerifier"
    }
  ];

  const languages = [
    { name: "Latvian", level: "Native" },
    { name: "Latgalian", level: "Native" },
    { name: "English", level: "Bilingual" },
    { name: "Russian", level: "Professional working" },
    { name: "Polish", level: "Professional working" },
    { name: "Spanish", level: "Elementary" }
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
      degree: "AP in Multimedia Design",
      institution: "Copenhagen School of Business and Technology",
      location: "Copenhagen",
      period: "September 2017 - June 2019",
      details: [
        "Interaction development: front-end development (HTML, CSS & JavaScript)",
        "Design and visualization: User Interface Design (UI), digital design principles, prototyping, and design processes",
        "Communication: User Experience Design (UX) and user testing"
      ]
    },
    {
      degree: "BA in Economics",
      institution: "University of Latvia",
      location: "Riga",
      period: "September 2012 - June 2016",
      grade: "Grade: 8.2 / 10",
      details: [
        "Developed leadership skills by organizing activities for new members of the Student Council",
        "Gained the ability to orient in the global economic and business environment during three study exchange semesters abroad",
        "Activities: Activist of the student council; Member of Student Fraternity 'Selonija'"
      ]
    },
    {
      degree: "International Study Semesters",
      institution: "Erasmus+",
      location: "Istanbul, Valencia, Lisbon, Chiang Mai",
      period: "2014 - 2016"
    }
  ];

  return (
    <section 
      ref={ref}
      id="credentials" 
      className="py-12 lg:py-32 px-6 lg:px-16 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="heading-elegant text-3xl lg:text-display mb-4 lg:mb-6 text-center">
            Full Credentials & Background
          </h2>
          <p className="body-clean text-body lg:text-large text-muted-foreground mb-8 lg:mb-12 text-center max-w-3xl mx-auto">
            For those who want to dive deeper into my qualifications, tools, and experience.
          </p>

          <div className="max-w-5xl mx-auto">
            <Accordion type="multiple" className="space-y-3">
              {/* Core Skills */}
              <AccordionItem value="skills" className="card-luxury">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-6 py-3">
                  Core Skills
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {skills.map(skill => {
                      const [title, description] = skill.split(' – ');
                      return (
                        <div key={skill} className="border-hover p-4 rounded-sm">
                          <p className="body-clean text-large mb-1">
                            <strong className="font-bold">{title}</strong>
                          </p>
                          <p className="body-clean text-body text-muted-foreground">{description}</p>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Tools & Platforms */}
              <AccordionItem value="tools" className="card-luxury">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-6 py-3">
                  Tools & Platforms
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {toolCategories.map(category => (
                      <div key={category.category} className="border-hover p-4 rounded-sm">
                        <h4 style={{ textShadow: 'none' }} className="body-clean text-foreground mb-2 text-large">
                          <strong className="font-bold">{category.category}</strong>
                        </h4>
                        <p className="body-clean text-body text-muted-foreground">{category.tools}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Education & Certifications */}
              <AccordionItem value="education" className="card-luxury">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-6 py-3">
                  Education & Certifications
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-2">
                    {/* Certifications */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">Certifications</h4>
                      <div className="grid gap-2">
                        {certifications.map((cert) => (
                          <div key={cert} className="border-hover p-3 rounded-sm">
                            <p className="body-clean text-body">{cert}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Advanced Courses */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">Advanced Courses</h4>
                      <div className="grid gap-2">
                        {courses.map((course) => (
                          <div key={course} className="border-hover p-3 rounded-sm">
                            <p className="body-clean text-body">{course}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="heading-elegant text-large mb-4">Education</h4>
                      <div className="grid gap-4">
                        {education.map((edu) => (
                          <div key={edu.degree} className="border-hover p-4 rounded-sm">
                            <h5 className="body-clean text-large font-bold mb-1">{edu.degree}</h5>
                            <p className="body-clean text-body text-muted-foreground mb-2">
                              {edu.institution}
                            </p>
                            <p className="body-clean text-sm text-muted-foreground mb-2">
                              {edu.location} • {edu.period}
                              {edu.grade && <> • {edu.grade}</>}
                            </p>
                            {edu.details && (
                              <ul className="space-y-1 mt-3">
                                {edu.details.map((detail, idx) => (
                                  <li key={idx} className="body-clean text-body text-muted-foreground text-sm flex items-start gap-2">
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
                      <h4 className="heading-elegant text-large mb-4">Honor</h4>
                      <div className="border-hover p-4 rounded-sm">
                        <p className="body-clean text-body text-muted-foreground leading-relaxed">
                          Kristaps Morbergs' Scholarship of Excellence - Annually awarded to 15 selected University of Latvia students for outstanding academic and extracurricular achievements.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Languages */}
              <AccordionItem value="languages" className="card-luxury">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-6 py-3">
                  Languages
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {languages.map(lang => (
                      <div key={lang.name} className="border-hover p-4 rounded-sm flex justify-between items-center">
                        <span className="body-clean font-medium text-body">{lang.name}</span>
                        <span className="body-clean text-body text-muted-foreground">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Career Journey */}
              <AccordionItem value="career" className="card-luxury">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-6 py-3">
                  Career Journey
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pt-2">
                    <p className="body-clean text-body text-muted-foreground mb-6">
                      A decade of growth spanning marketing, education, and entrepreneurship across multiple continents.
                    </p>
                    <div className="space-y-4">
                      {[
                        { period: "Nov 2024 - Present", title: "Lecturer", company: "LIFT", description: "Lead monthly workshops for Latvian SMEs on Meta ads and marketing automation. Built a unified lead generation system used across the full LIFT digital marketing cohort." },
                        { period: "Sep 2022 - Jun 2024", title: "Key Account Lead", company: "Aleph", description: "Managed $50K–$300K monthly budgets across Meta, TikTok, Reddit, and Pinterest. Identified growth blockers and optimized performance for top-tier clients." },
                        { period: "Jan 2023 - Feb 2024", title: "BBA Lecturer", company: "RISEBA", description: "Developed and recorded lectures on social media management, content strategy, and Meta advertising for undergraduate students." },
                        { period: "Sep 2021 - Present", title: "MBA Lecturer", company: "Riga Business School", description: "Created a hands-on digital marketing syllabus covering strategy, analytics, and performance KPIs. Mentored MBA students through live client projects." },
                        { period: "Jan 2020 - Present", title: "Founder", company: "Mārketinga Skola", description: "Founded and scaled a marketing education and agency platform helping Latvian SMEs build predictable lead generation systems through ads, automation, and strategy." },
                        { period: "Jan - Mar 2019", title: "Digital Marketing Consultant", company: "International Trade Centre (ITC)", description: "Implemented digital marketing programs in Kenya, Palestine, Gambia, and Jordan. Trained 100+ students and delivered fintech solutions for international SMEs." },
                        { period: "Feb 2018 - Oct 2020", title: "Social Media Specialist", company: "Addtwo", description: "Streamlined client acquisition, built paid social strategies, and managed high-performing campaigns across Facebook and Instagram." },
                        { period: "Nov 2015 - Jun 2017", title: "Founder", company: "Steampunk Tribe", description: "Created a Shopify dropshipping store targeting the U.S. market. Designed and tested Facebook ad campaigns, optimized product pages, and successfully generated international sales." }
                      ].map((milestone) => (
                        <div key={milestone.title + milestone.company} className="border-hover p-4 rounded-sm">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                            <div>
                              <h4 className="body-clean text-large font-bold">{milestone.title}</h4>
                              <p className="body-clean text-body text-foreground">{milestone.company}</p>
                            </div>
                            <span className="body-clean text-sm text-muted-foreground whitespace-nowrap">{milestone.period}</span>
                          </div>
                          <p className="body-clean text-body text-muted-foreground">{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Global Perspective */}
              <AccordionItem value="global" className="card-luxury">
                <AccordionTrigger className="heading-elegant text-xl lg:text-heading px-6 py-3">
                  Global Perspective
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pt-2">
                    <blockquote className="heading-elegant text-base lg:text-large text-center italic border-l-2 lg:border-l-4 border-foreground pl-4 lg:pl-8 mb-8">
                      "Every culture teaches something new about connection, communication, and creativity. These experiences directly influence how I solve marketing challenges."
                    </blockquote>

                    {/* Interactive World Map */}
                    <div className="mb-8 p-4 lg:p-8 border border-border rounded-lg bg-background/50">
                      <WorldMap />
                    </div>

                    {/* Regions */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 mb-8">
                      <Accordion type="single" collapsible defaultValue="europe" className="lg:col-span-1">
                        {[
                          { name: "Europe", countries: "Latvia, Lithuania, Estonia, Poland, Finland, Sweden, Norway, Croatia, Romania, Italy, Germany, Denmark, Spain, Portugal, Austria, Czechia, Hungary, Greece, Turkey, Georgia", description: "Deep understanding of European business culture and digital marketing landscapes" },
                          { name: "Southeast Asia", countries: "Thailand, Malaysia, Indonesia, Singapore, Vietnam", description: "Experience with emerging markets and diverse consumer behaviors" },
                          { name: "Middle East", countries: "Jordan, Israel", description: "Cross-cultural marketing experience in complex markets" }
                        ].map((region) => (
                          <AccordionItem key={region.name} value={region.name.toLowerCase()}>
                            <AccordionTrigger className="heading-elegant text-lg lg:text-xl py-2">
                              {region.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="body-clean text-lg lg:text-xl font-bold text-muted-foreground mb-3">{region.countries}</p>
                              <p className="body-clean text-base lg:text-lg text-muted-foreground">{region.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      <Accordion type="single" collapsible className="lg:col-span-1">
                        {[
                          { name: "Africa", countries: "Zambia, Botswana", description: "Implemented fin-tech and digital marketing solutions in developing economies" },
                          { name: "Americas", countries: "United States, Colombia, Mexico", description: "Experience across diverse American markets from North to South" }
                        ].map((region) => (
                          <AccordionItem key={region.name} value={region.name.toLowerCase()}>
                            <AccordionTrigger className="heading-elegant text-lg lg:text-xl py-2">
                              {region.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="body-clean text-lg lg:text-xl font-bold text-muted-foreground mb-3">{region.countries}</p>
                              <p className="body-clean text-base lg:text-lg text-muted-foreground">{region.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>

                    {/* Stats box */}
                    <div className="p-6 lg:p-12 border border-border rounded-sm bg-background/50 relative overflow-hidden">
                      <div className="relative text-center">
                        <p className="heading-elegant text-xl lg:text-heading text-white">36+ Countries Visited</p>
                        <p className="body-clean text-sm lg:text-body text-muted-foreground mt-1 lg:mt-2">4 Continents • Endless Insights</p>
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

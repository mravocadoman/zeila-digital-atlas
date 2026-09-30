import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLang } from "@/i18n/lang";
const Timeline = () => {
  const { t } = useLang();
  const milestones = [{
    year: "2024",
    title: t("Lecturer", "Lektors"),
    company: "LIFT",
    period: t("Nov 2024 - Present", "2024. nov. — šobrīd"),
    description: t(
      "Lead monthly workshops for Latvian SMEs on Meta ads and marketing automation. Built a unified lead generation system used across the full LIFT digital marketing cohort.",
      "Katru mēnesi vadu darbnīcas Latvijas uzņēmējiem par Meta reklāmām un mārketinga automatizāciju. Izveidoju vienotu dalībnieku piesaistes sistēmu, ko izmanto visā LIFT digitālā mārketinga programmā.",
    )
  }, {
    year: "2024",
    title: t("Key Account Lead", "Galveno klientu vadītājs"),
    company: "Aleph",
    period: t("Sep 2022 - Jun 2024", "2022. sept. — 2024. jūn."),
    description: t(
      "Managed $50K–$300K monthly budgets across Meta, TikTok, Reddit, and Pinterest. Identified growth blockers and optimized performance for top-tier clients.",
      "Vadīju $50K–$300K mēneša budžetus Meta, TikTok, Reddit un Pinterest. Atradu, kas bremzē izaugsmi, un uzlaboju rezultātus lielākajiem klientiem.",
    )
  }, {
    year: "2023",
    title: t("BBA Lecturer", "BBA lektors"),
    company: "RISEBA",
    period: t("Jan 2023 - Feb 2024", "2023. janv. — 2024. febr."),
    description: t(
      "Developed and recorded lectures on social media management, content strategy, and Meta advertising for undergraduate students.",
      "Izveidoju un ierakstīju lekcijas bakalaura studentiem par sociālo tīklu vadību, satura stratēģiju un Meta reklāmām.",
    )
  }, {
    year: "2021",
    title: t("MBA Lecturer", "MBA lektors"),
    company: t("Riga Business School", "Rīgas Biznesa skola"),
    period: t("Sep 2021 - Present", "2021. sept. — šobrīd"),
    description: t(
      "Created a hands-on digital marketing syllabus covering strategy, analytics, and performance KPIs. Mentored MBA students through live client projects.",
      "Izveidoju praktisku digitālā mārketinga kursu par stratēģiju, analītiku un KPI. Vadu MBA studentus reālos klientu projektos.",
    )
  }, {
    year: "2020",
    title: t("Founder", "Dibinātājs"),
    company: "Mārketinga Skola",
    period: t("Jan 2020 - Present", "2020. janv. — šobrīd"),
    description: t(
      "Founded and scaled a marketing education and agency platform helping Latvian SMEs build predictable lead generation systems through ads, automation, and strategy.",
      "Izveidoju mārketinga skolu un aģentūru. Palīdzam Latvijas uzņēmumiem nodrošināt stabilu klientu plūsmu ar reklāmām, automatizāciju un skaidru stratēģiju.",
    )
  }, {
    year: "2019",
    title: t("Digital Marketing Consultant", "Digitālā mārketinga konsultants"),
    company: t("International Trade Centre (ITC)", "Starptautiskais tirdzniecības centrs (ITC)"),
    period: t("Jan - Mar 2019", "2019. janv. — marts"),
    description: t(
      "Implemented digital marketing programs in Kenya, Palestine, Gambia, and Jordan. Trained 100+ students and delivered fintech solutions for international SMEs.",
      "Vadīju digitālā mārketinga programmas Kenijā, Palestīnā, Gambijā un Jordānijā. Apmācīju vairāk nekā 100 cilvēku un ieviesu finanšu tehnoloģiju risinājumus vietējiem uzņēmumiem.",
    )
  }, {
    year: "2018",
    title: t("Social Media Specialist", "Sociālo mediju speciālists"),
    company: "Addtwo",
    period: t("Feb 2018 - Oct 2020", "2018. febr. — 2020. okt."),
    description: t(
      "Streamlined client acquisition, built paid social strategies, and managed high-performing campaigns across Facebook and Instagram.",
      "Sakārtoju klientu piesaisti, veidoju reklāmas stratēģijas sociālajos tīklos un vadīju Facebook un Instagram kampaņas ar ļoti labiem rezultātiem.",
    )
  }, {
    year: "2015",
    title: t("Founder", "Dibinātājs"),
    company: "Steampunk Tribe",
    period: t("Nov 2015 - Jun 2017", "2015. nov. — 2017. jūn."),
    description: t(
      "Created a Shopify dropshipping store targeting the U.S. market. Designed and tested Facebook ad campaigns, optimized product pages, and successfully generated international sales.",
      "Izveidoju Shopify dropshipping veikalu ASV tirgum. Pats veidoju un testēju Facebook reklāmas, uzlaboju produktu lapas un veiksmīgi pārdevu preces ārvalstu pircējiem.",
    )
  }];
  return <section id="timeline" className="py-12 lg:py-32 px-6 lg:px-16 bg-sunken">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">{t("Career Journey", "Karjeras ceļš")}</h2>
        <p className="body-clean text-muted-foreground mb-8 lg:mb-12 max-w-3xl text-center lg:text-left text-lg lg:text-2xl">
          {t(
            "A decade of growth spanning marketing, education, and entrepreneurship across multiple continents.",
            "Desmit gadi mārketingā, izglītībā un uzņēmējdarbībā — vairākos kontinentos.",
          )}
        </p>

        {/* Mobile Accordion */}
        <div className="lg:hidden">
          <Accordion type="single" collapsible defaultValue="m0">
            {milestones.map((milestone, index) => <AccordionItem key={index} value={`m${index}`}>
                <AccordionTrigger className="text-left py-6">
                  <div>
                    <div className="heading-elegant text-xs mb-2 font-bold">{milestone.period}</div>
                    <h3 className="heading-elegant text-large text-foreground text-2xl uppercase !font-extrabold">{milestone.title}</h3>
                    <p className="body-clean text-foreground !font-bold text-lg">{milestone.company}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <p className="body-clean text-lg lg:text-xl text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* Desktop Timeline View */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />

          <div className="space-y-8 lg:space-y-12">
            {milestones.map((milestone, index) => {
            const TimelineItem = () => {
              const {
                ref,
                isVisible
              } = useScrollAnimation(0.2);
              return <div ref={ref} className={`relative flex items-start gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 w-3 lg:w-4 h-3 lg:h-4 rounded-full bg-foreground border-2 lg:border-4 border-background md:left-1/2 md:-translate-x-1/2" />

                    {/* Content */}
                    <div className={`flex-1 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="heading-elegant text-[10px] lg:text-sm mb-1 lg:mb-2 font-bold">{milestone.period}</div>
                      <h3 className="heading-elegant text-large mb-1 text-foreground lg:text-3xl uppercase text-4xl !font-extrabold">{milestone.title}</h3>
                      <p className="body-clean text-body text-foreground mb-2 lg:text-xl !font-bold text-2xl">{milestone.company}</p>
                      <p className="body-clean text-lg lg:text-xl text-muted-foreground">{milestone.description}</p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>;
            };
            return <TimelineItem key={index} />;
          })}
          </div>
        </div>
      </div>
    </section>;
};
export default Timeline;
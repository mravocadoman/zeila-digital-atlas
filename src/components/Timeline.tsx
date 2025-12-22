import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const Timeline = () => {
  const milestones = [{
    year: "2024",
    title: "Lecturer",
    company: "LIFT",
    period: "Nov 2024 - Present",
    description: "Lead monthly workshops for Latvian SMEs on Meta ads and marketing automation. Built a unified lead generation system used across the full LIFT digital marketing cohort."
  }, {
    year: "2024",
    title: "Key Account Lead",
    company: "Aleph",
    period: "Sep 2022 - Jun 2024",
    description: "Managed $50K–$300K monthly budgets across Meta, TikTok, Reddit, and Pinterest. Identified growth blockers and optimized performance for top-tier clients."
  }, {
    year: "2023",
    title: "BBA Lecturer",
    company: "RISEBA",
    period: "Jan 2023 - Feb 2024",
    description: "Developed and recorded lectures on social media management, content strategy, and Meta advertising for undergraduate students."
  }, {
    year: "2021",
    title: "MBA Lecturer",
    company: "Riga Business School",
    period: "Sep 2021 - Present",
    description: "Created a hands-on digital marketing syllabus covering strategy, analytics, and performance KPIs. Mentored MBA students through live client projects."
  }, {
    year: "2020",
    title: "Founder",
    company: "Mārketinga Skola",
    period: "Jan 2020 - Present",
    description: "Founded and scaled a marketing education and agency platform helping Latvian SMEs build predictable lead generation systems through ads, automation, and strategy."
  }, {
    year: "2019",
    title: "Digital Marketing Consultant",
    company: "International Trade Centre (ITC)",
    period: "Jan - Mar 2019",
    description: "Implemented digital marketing programs in Kenya, Palestine, Gambia, and Jordan. Trained 100+ students and delivered fintech solutions for international SMEs."
  }, {
    year: "2018",
    title: "Social Media Specialist",
    company: "Addtwo",
    period: "Feb 2018 - Oct 2020",
    description: "Streamlined client acquisition, built paid social strategies, and managed high-performing campaigns across Facebook and Instagram."
  }, {
    year: "2015",
    title: "Founder",
    company: "Steampunk Tribe",
    period: "Nov 2015 - Jun 2017",
    description: "Created a Shopify dropshipping store targeting the U.S. market. Designed and tested Facebook ad campaigns, optimized product pages, and successfully generated international sales."
  }];
  return <section id="timeline" className="py-12 lg:py-32 px-6 lg:px-16 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">Career Journey</h2>
        <p className="body-clean text-muted-foreground mb-8 lg:mb-12 max-w-3xl text-center lg:text-left text-xl lg:text-xl">
          A decade of growth spanning marketing, education, and entrepreneurship across multiple continents.
        </p>

        {/* Mobile Accordion */}
        <div className="lg:hidden">
          <Accordion type="single" collapsible defaultValue={milestones[0].title.toLowerCase()}>
            {milestones.map((milestone, index) => <AccordionItem key={index} value={milestone.title.toLowerCase()}>
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
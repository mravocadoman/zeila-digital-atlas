const Timeline = () => {
  const milestones = [{
    year: "2024",
    title: "Lecturer",
    company: "LIFT",
    period: "Nov 2024 - Present",
    description: "Led monthly workshops for Latvian SMEs, teaching Meta ads and marketing automation. Created a lead generation system for entire LIFT digital marketing course cohort."
  }, {
    year: "2024",
    title: "Key Account Lead",
    company: "Aleph",
    period: "Sep 2022 - Jun 2024",
    description: "Managed $50k-$300k/mo accounts on Meta, TikTok, Reddit, Pinterest. Resolved growth blockers and improved campaign performance."
  }, {
    year: "2023",
    title: "BBA Lecturer",
    company: "RISEBA",
    period: "Jan 2023 - Feb 2024",
    description: "Created syllabus and recorded lectures on Social Media Marketing management, content strategy, and Meta advertising."
  }, {
    year: "2021",
    title: "MBA Lecturer",
    company: "Riga Business School",
    period: "Sep 2021 - Present",
    description: "Developed comprehensive Digital Marketing syllabus covering trends, email marketing, social media, and KPIs with hands-on projects."
  }, {
    year: "2020",
    title: "Founder",
    company: "Marketinga Skola",
    period: "Jan 2020 - Present",
    description: "Built predictable lead generation systems for Latvian SMEs. Services include social media management, advertising, and cold outreach."
  }, {
    year: "2019",
    title: "Digital Marketing Consultant",
    company: "International Trade Centre (ITC)",
    period: "Jan - Mar 2019",
    description: "Implemented fintech solutions in Kenya, Palestine, Gambia, and Jordan. Developed training materials and assessed 100+ students."
  }, {
    year: "2018",
    title: "Social Media Specialist",
    company: "Addtwo",
    period: "Feb 2018 - Oct 2020",
    description: "Streamlined client acquisition, managed campaign delivery, and designed Facebook/Instagram campaigns."
  }];
  return <section id="timeline" className="py-20 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-display mb-4">Career Journey</h2>
        <p className="body-clean text-body text-muted-foreground mb-12 max-w-3xl">
          A decade of growth spanning marketing, education, and entrepreneurship across multiple continents.
        </p>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => <div key={index} className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-8 w-4 h-4 rounded-full bg-foreground border-4 border-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="heading-elegant text-sm mb-2">{milestone.period}</div>
                  <h3 className="body-clean font-black text-large mb-1 text-foreground text-4xl uppercase">{milestone.title}</h3>
                  <p className="body-clean text-body text-foreground mb-2 font-bold">{milestone.company}</p>
                  <p className="body-clean text-body text-muted-foreground">{milestone.description}</p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Timeline;
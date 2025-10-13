const Timeline = () => {
  const milestones = [
    { year: "2012", event: "Started BA in Economics at University of Latvia" },
    { year: "2014-16", event: "International Study Exchange (Istanbul, Valencia, Lisbon, Chiang Mai)" },
    { year: "2016", event: "Graduated with BA in Economics • Received Kristaps Morbergs' Scholarship" },
    { year: "2017-18", event: "Digital Marketing Specialist at Reckitt, Copenhagen" },
    { year: "2017-19", event: "AP in Multimedia Design • Copenhagen School of Business and Technology, Copenhagen" },
    { year: "2018-19", event: "Digital Marketing Manager at Growthbond" },
    { year: "2019", event: "Digital Marketing Consultant at International Trade Centre" },
    { year: "2020", event: "Founded Marketinga Skola" },
    { year: "2021", event: "Started MBA Lecturer role at Riga Business School" },
    { year: "2022-24", event: "Key Account Lead at Aleph (managing $50k-$300k/mo accounts)" },
    { year: "2025", event: "Continuing to scale businesses & educate marketers globally" }
  ];

  return (
    <section id="timeline" className="py-20 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">Journey</h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 w-4 h-4 rounded-full bg-foreground border-4 border-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="heading-elegant text-2xl mb-2">{milestone.year}</div>
                  <p className="body-clean text-muted-foreground">{milestone.event}</p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

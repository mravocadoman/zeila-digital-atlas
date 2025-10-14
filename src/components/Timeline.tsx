const Timeline = () => {
  const milestones = [
    { 
      year: "2024", 
      title: "Key Account Lead",
      company: "Aleph",
      period: "Sep 2022 - Jun 2024",
      description: "Managed $50k-$300k/mo accounts on Meta, TikTok, Reddit, Pinterest. Resolved growth blockers and improved campaign performance."
    },
    { 
      year: "2023", 
      title: "BBA Lecturer - Social Media Marketing",
      company: "RISEBA",
      period: "Jan 2023 - Feb 2024",
      description: "Created syllabus and recorded lectures on management, content strategy, and Meta advertising."
    },
    { 
      year: "2021", 
      title: "MBA Lecturer - Digital Marketing",
      company: "Riga Business School",
      period: "Sep 2021 - Present",
      description: "Developed comprehensive syllabus covering trends, email marketing, social media, and KPIs with hands-on projects."
    },
    { 
      year: "2020", 
      title: "Founder - Marketinga Skola",
      company: "Full-Funnel Marketing Agency",
      period: "Jan 2020 - Present",
      description: "Built predictable lead generation systems for Latvian SMEs. Services include social media management, advertising, and cold outreach."
    },
    { 
      year: "2019", 
      title: "AP in Multimedia Design",
      company: "Copenhagen School of Business",
      period: "2017 - 2019",
      description: "Focused on interaction development (HTML/CSS/JS), UI/UX design, prototyping, and user testing."
    },
    { 
      year: "2019", 
      title: "Digital Marketing Consultant",
      company: "International Trade Centre (ITC)",
      period: "Jan - Mar 2019",
      description: "Implemented fintech solutions in Kenya, Palestine, Gambia, and Jordan. Developed training materials and assessed 100+ students."
    },
    { 
      year: "2018", 
      title: "Social Media Specialist",
      company: "Addtwo",
      period: "Feb 2018 - Oct 2020",
      description: "Streamlined client acquisition, managed campaign delivery, and designed Facebook/Instagram campaigns."
    },
    { 
      year: "2016", 
      title: "BA in Economics",
      company: "University of Latvia",
      period: "2012 - 2016",
      description: "Grade 8.2/10. Leadership roles in Student Council and Fraternity 'Selonija'. International semesters in Istanbul, Valencia, Lisbon, and Chiang Mai."
    },
    { 
      year: "2014", 
      title: "Kristaps Morbergs' Scholarship of Excellence",
      company: "Fonds.lv",
      period: "2013-2014",
      description: "Awarded to 15 top University of Latvia students for outstanding academic and extracurricular achievements."
    }
  ];

  return (
    <section id="timeline" className="py-20 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-4">Career Journey</h2>
        <p className="body-clean text-lg text-muted-foreground mb-12 max-w-3xl">
          A decade of growth spanning marketing, education, and entrepreneurship across multiple continents.
        </p>

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
                  <h3 className="heading-elegant text-xl mb-1">{milestone.title}</h3>
                  <p className="body-clean text-foreground mb-1">{milestone.company}</p>
                  <p className="body-clean text-sm text-muted-foreground mb-2">{milestone.period}</p>
                  <p className="body-clean text-muted-foreground">{milestone.description}</p>
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

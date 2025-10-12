const Experience = () => {
  const experiences = [
    {
      role: "Lecturer of MBA course \"Digital Marketing\"",
      company: "Riga Business School",
      location: "Riga",
      period: "September 2021 - ongoing",
      achievements: [
        "Developed and implemented the course syllabus",
        "Covered key modules: Digital Marketing Trends & Brand Identity, Email Marketing, Social Media Management & Paid Advertising, Digital Marketing Metrics and KPIs",
        "Facilitated hands-on learning through case studies and projects"
      ]
    },
    {
      role: "Founder",
      company: "Marketinga Skola",
      location: "Riga",
      period: "January 2020 - ongoing",
      achievements: [
        "Built a full-funnel agency client acquisition system from the ground up",
        "Generated and closed leads for digital marketing courses and services",
        "Offering: Social media management, Social media advertising, Lead generation & cold outreach"
      ]
    },
    {
      role: "Key Account Lead",
      company: "Aleph",
      location: "Riga",
      period: "September 2022 - June 2024",
      achievements: [
        "Managed relationships with accounts ranging from $50k-$300k/mo. ad spend in Meta, TikTok, Reddit & Pinterest",
        "Identified, addressed, and resolved key clients' marketing growth blockers",
        "Consulted and improved the effectiveness of advertising campaigns"
      ]
    },
    {
      role: "Lecturer of BBA Course \"Social Media Marketing\"",
      company: "RISEBA",
      location: "Riga",
      period: "January 2023 - February 2024",
      achievements: [
        "Created the course syllabus, and recorded online lectures for RISEBA Bachelor's students",
        "Covering: Social media management, Social media content creation, Meta advertising & campaign creation"
      ]
    },
    {
      role: "Digital Marketing Consultant",
      company: "Latvian Digital Experts Association",
      location: "Riga",
      period: "November 2019 - December 2020",
      achievements: [
        "Created entry-to-mid-level Facebook advertising & digital marketing courses",
        "Led Facebook advertising workshops in Riga to improve the advertising expertise of local businesses"
      ]
    },
    {
      role: "Social Media Marketing Specialist",
      company: "Addtwo",
      location: "Remote",
      period: "February 2018 - October 2020",
      achievements: [
        "Streamlined Addtwo clients' customer acquisition channels",
        "Managed the delivery and workload of Addtwo's clients",
        "Designed and implemented Facebook & Instagram advertising campaigns"
      ]
    },
    {
      role: "Digital Marketing Consultant",
      company: "International Trade Centre",
      location: "Remote",
      period: "January 2019 - March 2019",
      achievements: [
        "Implemented fin-tech solutions in Kenya, Palestine, The Gambia, and Jordan",
        "Developed digital marketing educational materials and online classes",
        "Prepared and assessed 100+ Gambian freelance students' online assignments"
      ]
    },
    {
      role: "Digital Marketing Manager",
      company: "Growthbond",
      location: "Copenhagen",
      period: "August 2018 - June 2019",
      achievements: [
        "Designed paid advertising campaigns for Growthbond and its partners",
        "Structured Growthbond brand assets, UI & UX",
        "Streamlined general digital marketing strategy and user acquisition funnels"
      ]
    },
    {
      role: "Digital Marketing Specialist",
      company: "Reckitt",
      location: "Copenhagen",
      period: "October 2017 - May 2018",
      achievements: [
        "Coordinated Facebook, YouTube, and TV media-buying agencies",
        "Managed eCommerce linking process between retailers and agencies",
        "Conducted PPC and SOV analysis and conducted performance reports"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">Experience & Projects</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="card-luxury">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="heading-elegant text-2xl mb-1">{exp.role}</h3>
                  <p className="body-clean text-lg text-muted-foreground">{exp.company} • {exp.location}</p>
                </div>
                <span className="body-clean text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
              </div>
              
              <ul className="space-y-2 mt-4">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="body-clean text-muted-foreground flex gap-3">
                    <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

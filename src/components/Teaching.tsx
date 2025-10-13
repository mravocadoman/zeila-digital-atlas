const Teaching = () => {
  const certifications = ["Meta Certified Media Buying Professional", "Meta Certified Media Planning Professional", "Pinterest Advertising Essentials Certification", "Amazon Advertising Foundations Certification", "Amazon Ads Retail Certification", "OpenAI Whisper, GPT3, Codex"];
  const courses = ["Advanced Coding Masterclass - HTML, CSS and JavaScript", "Ascend Viral - Instagram Domination", "Ben Malol's Social Marketing Masterclass", "Facebook Blueprint"];
  const education = [{
    degree: "AP in Multimedia Design",
    institution: "Copenhagen School of Business and Technology",
    location: "Copenhagen",
    period: "September 2017 - June 2019",
    details: ["Interaction development: front-end development (HTML, CSS & JavaScript)", "Design and visualization: User Interface Design (UI), digital design principles, prototyping, and design processes", "Communication: User Experience Design (UX) and user testing"]
  }, {
    degree: "BA in Economics",
    institution: "University of Latvia",
    location: "Riga",
    period: "September 2012 - June 2016",
    grade: "8.2 / 10",
    details: ["Developed leadership skills by organizing activities for new members of the Student Council", "Gained the ability to orient in the global economic and business environment during three study exchange semesters abroad", "Activities: Activist of the student council; Member of Student Fraternity 'Selonija'"]
  }];
  return <section id="teaching" className="py-20 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">Teaching & Credentials</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="heading-elegant text-3xl mb-6">Certifications</h3>
            <div className="space-y-3">
              {certifications.map(cert => <div key={cert} className="border-hover p-4 rounded-sm">
                  <p className="body-clean">{cert}</p>
                </div>)}
            </div>

            <h3 className="heading-elegant text-3xl mb-6 mt-12">Advanced Courses</h3>
            <div className="space-y-3">
              {courses.map(course => <div key={course} className="border-hover p-4 rounded-sm">
                  <p className="body-clean">{course}</p>
                </div>)}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <h3 className="heading-elegant text-3xl mb-6">Education</h3>
            {education.map((edu, index) => <div key={index} className="card-luxury">
                <h4 className="heading-elegant text-2xl mb-2">{edu.degree}</h4>
                <p className="body-clean text-lg text-muted-foreground mb-1">{edu.institution}</p>
                <p className="body-clean text-sm text-muted-foreground mb-4">
                  {edu.location} • {edu.period}
                  {edu.grade && ` • Grade: ${edu.grade}`}
                </p>
                <ul className="space-y-2 mt-4">
                  {edu.details.map((detail, i) => <li key={i} className="body-clean text-sm text-muted-foreground flex gap-3">
                      <span className="text-foreground mt-1 flex-shrink-0">•</span>
                      <span>{detail}</span>
                    </li>)}
                </ul>
              </div>)}

            <div className="card-luxury">
              <h4 className="heading-elegant text-xl mb-3">International Study Semesters</h4>
              <p className="body-clean text-muted-foreground">
                Istanbul, Valencia, Lisbon, Chiang Mai | Erasmus+ (2014 - 2016)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Teaching;
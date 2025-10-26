import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  return <section id="teaching" className="py-12 lg:py-32 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-8 lg:mb-12 animate-fade-in text-center lg:text-left">Education & Credentials</h2>

        {/* Mobile Accordion View */}
        <div className="lg:hidden">
          <Accordion type="multiple" defaultValue={["certifications"]}>
            <AccordionItem value="certifications">
              <AccordionTrigger className="heading-elegant text-xl">Certifications</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pt-2">
                  {certifications.map(cert => <div key={cert} className="border border-border px-4 py-2 rounded-sm flex items-center justify-center text-center min-h-[100px]">
                      <p className="body-clean leading-snug text-lg"><strong className="font-bold">{cert}</strong></p>
                    </div>)}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="courses">
              <AccordionTrigger className="heading-elegant text-xl">Advanced Courses</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pt-2">
                  {courses.map(course => <div key={course} className="border border-border px-4 py-2 rounded-sm flex items-center justify-center text-center min-h-[100px]">
                      <p className="body-clean text-lg leading-snug"><strong className="font-bold">{course}</strong></p>
                    </div>)}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger className="heading-elegant text-xl">Education</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pt-2">
                  {education.map((edu, index) => <div key={index} className="card-luxury">
                      <h4 className="heading-elegant text-large mb-2">{edu.degree}</h4>
                      <p className="body-clean text-large text-muted-foreground mb-1">{edu.institution}</p>
                      <p className="body-clean text-body text-muted-foreground mb-4">
                        {edu.location} • {edu.period}
                        {edu.grade && ` • Grade: ${edu.grade}`}
                      </p>
                      <ul className="space-y-2 mt-4">
                        {edu.details.map((detail, i) => <li key={i} className="body-clean text-body text-muted-foreground flex gap-3">
                            <span className="text-foreground mt-1 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </li>)}
                      </ul>
                    </div>)}

                  <div className="card-luxury">
                    <h4 className="heading-elegant text-large mb-3">International Study Semesters</h4>
                    <p className="body-clean text-body text-muted-foreground">
                      Istanbul, Valencia, Lisbon, Chiang Mai | Erasmus+ (2014 - 2016)
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="heading-elegant text-xl lg:text-heading mb-4 lg:mb-6">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => <div key={cert} className="border border-border px-4 py-2 lg:px-6 lg:py-3 rounded-sm flex items-center justify-center text-center min-h-[100px] lg:min-h-[140px] transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(3,195,248,0.6)] hover-scale animate-fade-in" style={{
              animationDelay: `${0.1 * index}s`,
              animationFillMode: 'both'
            }}>
                  <p className="body-clean text-sm lg:text-body leading-snug"><strong className="font-bold">{cert}</strong></p>
                </div>)}
            </div>

            <h3 className="heading-elegant text-xl lg:text-heading mb-4 lg:mb-6 mt-8 lg:mt-12">Advanced Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course, index) => <div key={course} className="border border-border px-4 py-2 lg:px-6 lg:py-3 rounded-sm flex items-center justify-center text-center min-h-[100px] lg:min-h-[140px] transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(3,195,248,0.6)] hover-scale animate-fade-in" style={{
              animationDelay: `${0.1 * index}s`,
              animationFillMode: 'both'
            }}>
                  <p className="body-clean text-sm lg:text-body leading-snug"><strong className="font-bold">{course}</strong></p>
                </div>)}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6 lg:space-y-8">
            <h3 className="heading-elegant text-xl lg:text-heading mb-4 lg:mb-6">Education</h3>
            {education.map((edu, index) => <div key={index} className="card-luxury hover-scale animate-fade-in" style={{
            animationDelay: `${0.2 * index}s`,
            animationFillMode: 'both'
          }}>
                <h4 className="heading-elegant text-large mb-2">{edu.degree}</h4>
                <p className="body-clean text-large text-muted-foreground mb-1">{edu.institution}</p>
                <p className="body-clean text-body text-muted-foreground mb-4">
                  {edu.location} • {edu.period}
                  {edu.grade && ` • Grade: ${edu.grade}`}
                </p>
                <ul className="space-y-2 mt-4">
                  {edu.details.map((detail, i) => <li key={i} className="body-clean text-body text-muted-foreground flex gap-3">
                      <span className="text-foreground mt-1 flex-shrink-0">•</span>
                      <span>{detail}</span>
                    </li>)}
                </ul>
              </div>)}

            <div className="card-luxury">
              <h4 className="heading-elegant text-large mb-3">International Study Semesters</h4>
              <p className="body-clean text-body text-muted-foreground">
                Istanbul, Valencia, Lisbon, Chiang Mai | Erasmus+ (2014 - 2016)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Teaching;
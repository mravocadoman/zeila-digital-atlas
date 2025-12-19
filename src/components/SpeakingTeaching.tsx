import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Mic, Radio, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const speakingExperiences = [
  {
    type: "lecture",
    title: "MBA Digital Marketing Lecturer",
    organization: "Riga Business School",
    period: "2021 – Present",
    description: "Hands-on syllabus with live client projects; mentoring MBA students on strategy, analytics, and KPIs.",
    link: null
  },
  {
    type: "lecture",
    title: "BBA Lecturer",
    organization: "RISEBA University",
    period: "2023 – 2024",
    description: "Developed and recorded lectures on social media management, content strategy, and Meta advertising.",
    link: null
  },
  {
    type: "workshop",
    title: "Course Leader & Workshop Facilitator",
    organization: "LIFT Program (EU-Funded)",
    period: "2024 – Present",
    description: "Lead monthly workshops on Meta ads and automation for Latvian SMEs; developed multiple digital marketing courses including Meta Advertising Basics one-day intensives.",
    link: null
  },
  {
    type: "guest",
    title: "Guest Lecturer",
    organization: "University of Lusaka",
    period: "May 2024",
    description: "International guest role sharing digital marketing expertise with Zambian students.",
    link: null
  },
  {
    type: "podcast",
    title: "Guest Appearance",
    organization: "#5BREINUMI Podcast/YouTube",
    period: "2019",
    description: "Discussed digital marketing, global travel experiences, and professional insights.",
    link: null
  },
  {
    type: "mentor",
    title: "Volunteer Mentor",
    organization: "Future Heroes",
    period: "2023 – 2024",
    description: "Mentored aspiring marketers and young professionals.",
    link: null
  }
];

const typeConfig = {
  lecture: { icon: GraduationCap, label: "Lecture", color: "bg-primary/20 text-primary" },
  workshop: { icon: Mic, label: "Workshop", color: "bg-accent/20 text-accent" },
  guest: { icon: Users, label: "Guest", color: "bg-secondary/50 text-secondary-foreground" },
  podcast: { icon: Radio, label: "Podcast", color: "bg-muted text-muted-foreground" },
  mentor: { icon: Users, label: "Mentoring", color: "bg-primary/10 text-primary" }
};

const SpeakingTeaching = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="speaking" className="py-12 lg:py-20 px-4 lg:px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Speaking & Teaching
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing digital marketing expertise through lectures, workshops, and mentorship across universities, programs, and media platforms.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {speakingExperiences.map((experience, index) => {
            const config = typeConfig[experience.type as keyof typeof typeConfig];
            const Icon = config.icon;

            return (
              <Card
                key={index}
                className="card-luxury border-hover group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 lg:p-6">
                  {/* Type Badge & Period */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {experience.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-primary/80 font-medium mb-3">
                    {experience.organization}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Link Button */}
                  {experience.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 p-0 h-auto text-primary hover:text-accent"
                      asChild
                    >
                      <a href={experience.link} target="_blank" rel="noopener noreferrer">
                        Watch Episode <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpeakingTeaching;

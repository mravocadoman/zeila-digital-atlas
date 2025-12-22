import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Mic, Radio, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "teaching",
    title: "Teaching",
    icon: GraduationCap,
    items: [
      {
        title: "MBA Digital Marketing Lecturer",
        organization: "Riga Business School",
        period: "2021 – Present",
        description: "Hands-on syllabus with live client projects; mentoring MBA students on strategy, analytics, and KPIs.",
        link: null
      },
      {
        title: "BBA Lecturer",
        organization: "RISEBA University",
        period: "2023 – 2024",
        description: "Developed and recorded lectures on social media management, content strategy, and Meta advertising.",
        link: null
      },
      {
        title: "Guest Lecturer",
        organization: "University of Lusaka",
        period: "May 2024",
        description: "International guest role sharing digital marketing expertise with Zambian students.",
        link: null
      }
    ]
  },
  {
    id: "courses",
    title: "Courses & Workshops",
    icon: Mic,
    items: [
      {
        title: "Course Leader & Workshop Facilitator",
        organization: "LIFT Program (EU-Funded)",
        period: "2024 – Present",
        description: "Lead monthly workshops on Meta ads and automation for Latvian SMEs; developed Meta Advertising Basics one-day intensives.",
        link: null
      },
      {
        title: "Digital Marketing Consultant",
        organization: "Latvijas Digitālo ekspertu biedrība",
        period: "2019 – 2020",
        description: "Developed entry-to-mid-level Facebook advertising course framework; conducted Facebook advertising workshops in Riga.",
        link: null
      }
    ]
  },
  {
    id: "appearances",
    title: "Guest Appearances",
    icon: Radio,
    items: [
      {
        title: "Podcast Guest",
        organization: "#5BREINUMI (YouTube/Podcast)",
        period: "2019",
        description: "Discussed digital marketing, global travel experiences, and professional insights.",
        link: null
      },
      {
        title: "Podcast Guest",
        organization: "BSMS Podcast",
        period: "2020",
        description: "Episode on digital nomadism, having traveled to 33+ countries as founder of Mārketinga Skola.",
        link: "https://open.spotify.com/episode/7IwveDKWopyuJAgGd0eQiJ"
      },
      {
        title: "Youth Lecturer",
        organization: "Medijpratējs / Digitālā Akadēmija",
        period: "2022",
        description: "Delivered lectures on NGO work, digital tools, and digital marketing to youth at Ādažu vidusskola.",
        link: null
      },
      {
        title: "Panel Speaker",
        organization: "Printful",
        period: "Aug 2023",
        description: "Panel discussion on business-academia collaboration and entrepreneurship education.",
        link: null
      },
      {
        title: "TV/Radio Guest",
        organization: "Žik! Raidījums",
        period: "Oct 2022",
        description: "Episode about influencers, bloggers, and youth entrepreneurship.",
        link: null
      },
      {
        title: "Interview Feature",
        organization: "Delfi",
        period: "Oct 2022",
        description: "Featured interview on digital nomad lifestyle and working remotely from Thailand.",
        link: null
      }
    ]
  },
  {
    id: "volunteering",
    title: "Volunteering",
    icon: Heart,
    items: [
      {
        title: "Volunteer Mentor",
        organization: "Future Heroes",
        period: "2023 – 2024",
        description: "Mentored aspiring marketers and young professionals.",
        link: null
      },
      {
        title: "Volunteer",
        organization: "Universidad Nacional de Colombia",
        period: "Mar – Jun 2020",
        description: "Supported educational initiatives and community outreach.",
        link: null
      },
      {
        title: "TEDx Volunteer",
        organization: "TEDx Chiang Mai",
        period: "Feb 2016",
        description: "Contributed to event organization and attendee experience.",
        link: null
      }
    ]
  }
];

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
          <h2 className="heading-elegant text-3xl lg:text-display mb-3 lg:mb-4 animate-fade-in">
            Speaking & Teaching
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing digital marketing expertise through lectures, workshops, and mentorship across universities, programs, and media platforms.
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-12 lg:space-y-16">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            
            return (
              <div key={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {category.items.map((item, index) => (
                    <Card
                      key={index}
                      className="card-luxury border-hover"
                    >
                      <CardContent className="p-4 lg:p-6">
                        {/* Period */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm lg:text-base text-muted-foreground font-medium">
                            {item.period}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h4 className="text-lg lg:text-xl font-semibold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-base lg:text-lg text-primary/80 font-medium mb-3">
                          {item.organization}
                        </p>

                        {/* Description */}
                        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>

                        {/* Link Button */}
                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-4 p-0 h-auto text-primary hover:text-accent"
                            asChild
                          >
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              Listen <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpeakingTeaching;

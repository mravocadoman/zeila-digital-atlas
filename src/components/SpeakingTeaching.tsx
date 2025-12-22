import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Mic, Radio, Heart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  {
    id: "teaching",
    title: "Academic Teaching & Lecturing",
    icon: GraduationCap,
    items: [
      {
        title: "Guest Lecturer",
        organization: "University of Lusaka",
        period: "May 2024",
        description: "International guest role sharing digital marketing expertise with Zambian students.",
        link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0sbHi7MSF7Du61X8KCUM2qDwNdsBCd2dGGhQFa7fCBkpREh9Cz75VCHzvHZvPVEaUl&id=100000487541249"
      },
      {
        title: "BBA Lecturer",
        organization: "RISEBA University",
        period: "2023 – 2024",
        description: "Developed and recorded lectures on social media management, content strategy, and Meta advertising.",
        link: null
      },
      {
        title: "MBA Digital Marketing Lecturer",
        organization: "Riga Business School",
        period: "2021 – Present",
        description: "Hands-on syllabus with live client projects; mentoring MBA students on strategy, analytics, and KPIs.",
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
        title: "Executive Education Course",
        organization: "Riga Business School",
        period: "Nov 2024",
        description: "Digital Marketing Growth Strategies for SMEs — practical course for small and medium-sized enterprises.",
        link: "https://www.facebook.com/RigaBusinessSchool/posts/pfbid0XEj9zWkXS18GTgPWW6rKHhkLT1BXdgzwb1TiNLtH4gEeBi1u37HtXTLZnwkBzGuSl"
      },
      {
        title: "Digital Campaign Workshop Leader",
        organization: "Vidusdaugavas NVO centrs",
        period: "Apr 2023",
        description: "Hands-on training for NGOs on creating effective digital campaigns — combining theory with practical group exercises.",
        link: "https://www.vidusdaugavasnvo.lv/lv/jaunumi/projekti/turpinas-vidusdaugavas-nvo-centra-realizetais-projekts-vidusdaugavas-nvo-centrs-digitalo-speju-attistisana-/"
      },
      {
        title: "Youth Lecturer",
        organization: "Medijpratējs / Digitālā Akadēmija",
        period: "2022",
        description: "Delivered lectures on NGO work, digital tools, and digital marketing.",
        link: "https://www.facebook.com/medijpratejs/posts/pfbid02aYPbLyQqHhkDPfdqtqejx5jAdAF7GVe5QZhwY3caXEpBLvzbFSkKBkKnpdPzQtZTl"
      },
      {
        title: "Workshop Facilitator",
        organization: "Latvijas Digitālo ekspertu biedrība",
        period: "2019 – 2020",
        description: "Developed entry-to-mid-level Facebook advertising course framework; conducted Facebook advertising workshops in Riga.",
        link: "https://www.lde.lv/lektors/rihards/"
      },
      {
        title: "Digital Marketing Consultant",
        organization: "International Trade Centre (ITC)",
        period: "Jan – Mar 2019",
        description: "Implemented digital marketing programs in Kenya, Palestine, Gambia, and Jordan. Trained 100+ students and delivered fintech solutions for international SMEs.",
        link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0xVEbQHkGsJcLBf4PiN32sP6hyzVFxGo5xZou81eQVJmYdjRKbNq45CTivWirz67nl&id=100000487541249"
      }
    ]
  },
  {
    id: "appearances",
    title: "Guest Appearances",
    icon: Radio,
    items: [
      {
        title: "Interview Feature",
        organization: "LAKUGA",
        period: "Dec 2024",
        description: "In-depth interview about world travel experiences, career journey, and digital marketing trends.",
        link: "https://www.lakuga.lv/2024/12/05/digitalais-pasauls-i-celuosona-kai-dzeivis-veids-saruna-ar-rihardu-zeilu/"
      },
      {
        title: "Webinar Speaker",
        organization: "Latvia IT Cluster / European Digital Innovation Centre",
        period: "Oct 2024",
        description: "AI in Digital Marketing — LIFT program webinar on leveraging artificial intelligence for business growth.",
        link: "https://www.facebook.com/events/551552717574429/"
      },
      {
        title: "Podcast Guest",
        organization: "BSMS Podcast",
        period: "Oct 2024",
        description: "Episode on digital nomadism, having traveled to 33+ countries as founder of Mārketinga Skola.",
        link: "https://www.facebook.com/BSMSLatvia/posts/pfbid0jMPHXF5NihWx2QE8quEzC3FcC7iXmV6xFkxGzU8xFc4f5CZ7NUS69Y9ztUQUAdZPl"
      },
      {
        title: "Podcast Guest",
        organization: "The Career Sensei",
        period: "May 2024",
        description: "Exploring a Career in Digital Marketing — discussing insights on social media advertising, strategies, and trends reshaping the digital marketing landscape.",
        link: "https://www.youtube.com/watch?v=JR9IiTZel9k"
      },
      {
        title: "Panel Speaker",
        organization: "Printful & Draugiem Group",
        period: "Aug 2023",
        description: "Panel discussion on business-academia collaboration and entrepreneurship education.",
        link: "https://www.facebook.com/events/1380105802543065/"
      },
      {
        title: "TV/Radio Guest",
        organization: "Žik! Raidījums",
        period: "Oct 2022",
        description: "Episode about influencers, bloggers, and youth entrepreneurship.",
        link: "https://www.facebook.com/watch/?v=810501230240311"
      },
      {
        title: "Interview Feature",
        organization: "Delfi",
        period: "Oct 2022",
        description: "Featured interview on digital nomad lifestyle and working remotely from Thailand.",
        link: "https://www.delfi.lv/pieredzi-erasmus-plus/erasmus-ka-piedzivojums-un-iedvesma-mainit-nodarbosanos-riharda-stasts.d?id=54802938"
      },
      {
        title: "Webinar Host",
        organization: "LSUA",
        period: "Aug 2020",
        description: "Free webinar on effective client acquisition with Facebook paid ads, covering Ads Manager, Facebook Pixel, and targeting strategies.",
        link: "https://www.facebook.com/events/629017494698296/"
      },
      {
        title: "Panel Speaker",
        organization: "Marketing Shake 2020 Conference",
        period: "2020",
        description: "Panel on Facebook advertising strategies for low-budget or zero-budget scenarios.",
        link: null
      },
      {
        title: "Webinar Host",
        organization: "DarbaVieta",
        period: "Oct 2019",
        description: "Introduction to Facebook platform capabilities and trends, demonstrating how to find target audiences and create effective campaigns.",
        link: null
      },
      {
        title: "Podcast Guest",
        organization: "#5BREINUMI (YouTube/Podcast)",
        period: "2019",
        description: "Discussed digital marketing, global travel experiences, and professional insights.",
        link: "https://www.youtube.com/watch?v=B6BE6QBBGYo&t=931s"
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
        link: "https://www.facebook.com/FutureHeroesLatvia/posts/pfbid0gTCfSNRYscVtBPpjWNttRCfg33L3fWg5GZvXzsk7pxCE2DKj21fHXT1yvsw8gs1ml"
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
        <div className="space-y-10 lg:space-y-14">
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

                {/* Category Carousel */}
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {category.items.map((item, index) => (
                      <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <Card className="card-luxury border-hover h-full">
                          <CardContent className="p-4 lg:p-6 h-full flex flex-col">
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
                            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed flex-grow">
                              {item.description}
                            </p>

                            {/* Link Button */}
                            {item.link && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-4 p-0 h-auto text-primary hover:text-accent self-start"
                                asChild
                              >
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                  View <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <CarouselPrevious className="static translate-y-0 h-8 w-8" />
                    <CarouselNext className="static translate-y-0 h-8 w-8" />
                  </div>
                </Carousel>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpeakingTeaching;

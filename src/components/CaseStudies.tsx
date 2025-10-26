import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const caseStudies = [
  {
    company: "The Brew Company",
    description: "I helped The Brew Company, a specialty coffee brand, transition from traditional retail to a fully digital e-commerce model. I created and implemented a cross-channel advertising strategy using Meta (Facebook + Instagram), TikTok, Google, and YouTube Ads.",
    details: "The collaboration started as a three-month pilot during Q4 — their most competitive season — and quickly turned into a long-term partnership after seeing strong results. I managed ad budgets exceeding €75,000 per month, achieving an average ROAS of 13.36 and generating over €1M in revenue. After the iOS14 privacy update (the ad apocalypse), results naturally normalized, yet I still maintained a consistent 4–7 ROAS, well above the industry average.",
    metrics: [
      { label: "Monthly Budget", value: "€75K+" },
      { label: "Peak ROAS", value: "13.36" },
      { label: "Revenue Generated", value: "€1M+" },
    ],
  },
  {
    company: "Četras Zoles",
    description: "Četras Zoles is a Latvian outlet store offering branded fashion at big discounts. The goal was simple: reach as many buyers as possible with minimal ad spend.",
    details: "I focused on strong creative testing and Advantage+ Sales campaigns across Facebook and Instagram. The products already had strong appeal — my job was to let the algorithm do its magic with high-performing creatives. After the first €1,000 spent, the campaign delivered an incredible 36.34 ROAS. Sometimes, great products just need the right structure and creative direction.",
    metrics: [
      { label: "ROAS", value: "36.34" },
      { label: "Initial Spend", value: "€1K" },
    ],
  },
  {
    company: "Instant Change",
    description: "For Daniel Weinstock, a German transformation coach active in Germany, Switzerland, and Austria, I built a three-layer Meta Ads funnel to fill his webinars and coaching events.",
    details: "Video view campaigns to build awareness, remarketing to video viewers for webinar sign-ups, and conversion campaigns using lookalike audiences of registrants. The result was a seamless client-acquisition system with a 12.55 ROAS across all campaigns.",
    metrics: [
      { label: "ROAS", value: "12.55" },
      { label: "Funnel Layers", value: "3" },
    ],
  },
  {
    company: "Excel Know How",
    description: "Excel Know How offers corporate and individual Excel and Power BI training. My goal was to turn educational content into a predictable lead-generation engine.",
    details: "I designed a free live-webinar funnel, promoted through Facebook Ads. Registrants left their name and email, triggering an automated sequence leading to a paid course offer. With a €1,175 ad budget, I generated 2,000+ new leads at just €0.38 per email. Around 2% converted into €250 course buyers, resulting in €10,000 in revenue and an 8.5 ROAS.",
    metrics: [
      { label: "Leads Generated", value: "2,000+" },
      { label: "Cost Per Lead", value: "€0.38" },
      { label: "ROAS", value: "8.5" },
      { label: "Revenue", value: "€10K" },
    ],
  },
];

const CaseStudies = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="case-studies" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="heading-large font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Case Studies
          </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Real results from real campaigns — from e-commerce to coaching, fashion to fintech.
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="heading-medium font-bold mb-3 text-primary">
                          {study.company}
                        </h3>
                        
                        {/* Key Metrics - Emphasized */}
                        <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                          {study.metrics.map((metric, idx) => (
                            <div key={idx} className="text-center">
                              <div className="heading-large font-bold text-primary mb-1">
                                {metric.value}
                              </div>
                              <div className="body-small text-muted-foreground">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="body-clean text-body text-foreground/80 mb-3">
                          {study.description}
                        </p>
                        
                        <p className="body-small text-muted-foreground mt-auto">
                          {study.details}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

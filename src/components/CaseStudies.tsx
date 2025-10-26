import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section id="case-studies" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">
          Case Studies
        </h2>
        <p className="body-clean lg:text-body text-muted-foreground mb-8 lg:mb-12 max-w-3xl text-center lg:text-left text-lg">
          Real results from real campaigns — from e-commerce to coaching, fashion to fintech.
        </p>

        {/* Slider Container */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center z-10 pointer-events-none px-4">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {caseStudies.map((study, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-primary/20 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm shadow-xl">
                    <CardContent className="p-8 md:p-12">
                      {/* Company Name */}
                      <div className="text-center mb-8">
                        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
                          {study.company}
                        </h3>
                        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                      </div>

                      {/* Key Metrics - Featured */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {study.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all"
                          >
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                              {metric.value}
                            </div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <div className="space-y-4">
                        <p className="text-lg text-foreground/90 leading-relaxed">
                          {study.description}
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {study.details}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

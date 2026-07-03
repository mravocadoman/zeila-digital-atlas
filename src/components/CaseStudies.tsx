import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    company: "The Brew Company",
    category: "E-commerce",
    description: "Helped a specialty coffee brand transition from retail to digital with a cross-channel strategy across Meta, TikTok, Google, and YouTube. Started as a Q4 pilot, turned into a long-term partnership.",
    details: "Managed €75K+ monthly budgets with 13.36 peak ROAS, generating €1M+ in revenue. Post-iOS14, maintained 4–7 ROAS consistently above industry average.",
    metrics: [
      { label: "Monthly Budget", value: "€75K+" },
      { label: "Peak ROAS", value: "13.36" },
      { label: "Revenue Generated", value: "€1M+" },
    ],
  },
  {
    company: "Cetras Zoles",
    category: "E-commerce",
    description: "Latvian outlet store selling branded fashion at major discounts. Goal: maximum reach, minimal spend.",
    details: "Strong creative testing + Advantage+ campaigns on Meta. First €1K delivered 36.34 ROAS. Great products just need the right structure.",
    metrics: [
      { label: "ROAS", value: "36.34" },
      { label: "Initial Spend", value: "€1K" },
      { label: "Revenue", value: "€36K+" },
      { label: "Platform", value: "Meta" },
    ],
  },
  {
    company: "Instant Change",
    category: "Coaching",
    description: "Built a three-layer Meta Ads funnel for a German transformation coach covering DACH region.",
    details: "Video awareness → webinar remarketing → lookalike conversions. Seamless client acquisition with 12.55 ROAS.",
    metrics: [
      { label: "ROAS", value: "12.55" },
      { label: "Funnel Layers", value: "3" },
      { label: "Regions", value: "DACH" },
      { label: "Platform", value: "Meta" },
    ],
  },
  {
    company: "Excel Know How",
    category: "Education",
    description: "Turned Excel and Power BI training into a predictable lead-gen engine with free webinar funnels.",
    details: "€1,175 ad spend generated 2,000+ leads at €0.38 each. 2% converted to €250 courses = €10K revenue, 8.5 ROAS.",
    metrics: [
      { label: "Leads Generated", value: "2,000+" },
      { label: "Cost Per Lead", value: "€0.38" },
      { label: "ROAS", value: "8.5" },
      { label: "Revenue", value: "€10K" },
    ],
  },
  {
    company: "LIFT Digitalisation Program",
    category: "Education",
    description: "As part of the EU-funded LIFT initiative, I developed five digital marketing courses, built dedicated landing pages, and helped marketingaskola.lv rank #3 on Google for \"digitālā mārketinga kursi.\"",
    details: "Using Meta ads, email outreach, and automations, I generated 300+ high-quality leads, resulting in 75–105 new course participants and B2B email reply rates of 5% (well above industry average).",
    metrics: [
      { label: "Google Ranking", value: "#3" },
      { label: "Leads Generated", value: "300+" },
      { label: "Participants", value: "75-105" },
      { label: "B2B Reply Rate", value: "5%" },
    ],
  },
];

const categories = ["All", "E-commerce", "Coaching", "Education"];

const CaseStudies = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const touchStartX = useRef<number | null>(null);

  const filtered = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeCategory);

  const safeIndex = Math.min(currentIndex, filtered.length - 1);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % filtered.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="case-studies" ref={ref} className="py-20 px-2 lg:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">
          Case Studies
        </h2>
        <p className="body-clean text-muted-foreground mb-6 lg:mb-8 max-w-3xl text-center lg:text-left text-xl lg:text-2xl">
          Real results from real campaigns — from e-commerce to coaching, fashion to fintech.
        </p>

        {/* Summary strip */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mb-6 lg:mb-8 px-4">
          <span className="body-clean text-sm lg:text-base text-primary font-semibold">5 case studies</span>
          <span className="text-primary/40">·</span>
          <span className="body-clean text-sm lg:text-base text-primary font-semibold">€1M+ generated</span>
          <span className="text-primary/40">·</span>
          <span className="body-clean text-sm lg:text-base text-primary font-semibold">avg 15× ROAS</span>
          <span className="text-primary/40">·</span>
          <span className="body-clean text-sm lg:text-base text-primary font-semibold">4 industries</span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 lg:mb-8 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentIndex(0); }}
              className={`body-clean px-4 py-1.5 text-sm lg:text-base rounded-full border transition-all ${
                activeCategory === cat
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-primary/30 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Slider Container */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Buttons */}
          {filtered.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center z-10 pointer-events-none px-4">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                aria-label="Previous case study"
                className="pointer-events-auto bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                aria-label="Next case study"
                className="pointer-events-auto bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {filtered.map((study, index) => (
                <div key={`${study.company}-${index}`} className="w-full flex-shrink-0 px-1 lg:px-4">
                  <Card className="border-primary/20 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm shadow-xl">
                    <CardContent className="p-4 md:p-12">
                      {/* Company Name */}
                      <div className="text-center mb-8">
                        <div className="body-clean text-xs lg:text-sm uppercase tracking-[0.25em] text-primary mb-2">{study.category}</div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
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
                        <p className="text-lg lg:text-xl text-foreground/90 leading-relaxed font-medium">
                          {study.description}
                        </p>
                        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
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
          {filtered.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {filtered.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === safeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

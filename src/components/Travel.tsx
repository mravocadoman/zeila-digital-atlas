import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Travel = () => {
  const mapAnimation = useScrollAnimation(0.3);
  
  const regions = [{
    name: "Europe",
    countries: "Latvia, Lithuania, Estonia, Poland, Finland, Sweden, Norway, Croatia, Romania, Italy, Germany, Denmark, Spain, Portugal, Austria, Czechia, Hungary, Greece, Turkey, Georgia",
    description: "Deep understanding of European business culture and digital marketing landscapes"
  }, {
    name: "Southeast Asia",
    countries: "Thailand, Malaysia, Indonesia, Singapore",
    description: "Experience with emerging markets and diverse consumer behaviors"
  }, {
    name: "Middle East",
    countries: "Jordan, Israel",
    description: "Cross-cultural marketing experience in complex markets"
  }, {
    name: "Africa",
    countries: "Zambia, Botswana",
    description: "Implemented fin-tech and digital marketing solutions in developing economies"
  }, {
    name: "Americas",
    countries: "United States, Colombia, Mexico",
    description: "Experience across diverse American markets from North to South"
  }];
  return <section id="travel" className="py-12 lg:py-32 px-6 lg:px-16 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="heading-elegant text-3xl lg:text-display mb-8 lg:mb-12 animate-fade-in text-center lg:text-left">Global Perspective</h2>

        <div className="max-w-3xl mx-auto mb-12 lg:mb-16 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <blockquote className="heading-elegant text-base lg:text-large text-center italic border-l-2 lg:border-l-4 border-foreground pl-4 lg:pl-8">
            "Every culture teaches something new about connection, communication, and creativity. These experiences directly influence how I solve marketing challenges."
          </blockquote>
        </div>

        {/* Accordion for both mobile and desktop */}
        <Accordion type="single" collapsible defaultValue="europe">
          {regions.map((region) => (
            <AccordionItem key={region.name} value={region.name.toLowerCase()}>
              <AccordionTrigger className="heading-elegant text-lg lg:text-xl">
                {region.name}
              </AccordionTrigger>
              <AccordionContent>
                <p className="body-clean text-base lg:text-lg text-muted-foreground mb-3">{region.countries}</p>
                <p className="body-clean text-base lg:text-lg text-muted-foreground">{region.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Simple world map representation */}
        <div 
          ref={mapAnimation.ref}
          className={`mt-12 lg:mt-16 p-6 lg:p-12 border border-border rounded-sm bg-background/50 relative overflow-hidden transition-all duration-700 ${
            mapAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative text-center">
            <p className="heading-elegant text-xl lg:text-heading text-white">35+ Countries Visited</p>
            <p className="body-clean text-sm lg:text-body text-muted-foreground mt-1 lg:mt-2">4 Continents • Endless Insights</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Travel;
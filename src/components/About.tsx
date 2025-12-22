import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const About = () => {
  const statsAnimation = useScrollAnimation(0.3);

  return (
    <section id="about" className="py-12 lg:py-32 px-6 lg:px-16 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-3xl lg:text-display mb-8 lg:mb-12 animate-fade-in text-center">
          Helping Businesses Scale with Proven Meta Ad Systems
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <p className="body-clean leading-relaxed text-muted-foreground text-2xl lg:text-2xl text-center">
            Experienced <span className="text-foreground font-semibold">Digital Marketing Manager, Consultant, and Lecturer</span> with extensive experience building, maintaining, and running successful digital marketing and advertising campaigns with up to <span className="text-foreground font-semibold">$5M yearly ad spend</span>.
          </p>

          <div ref={statsAnimation.ref} className={`grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8 transition-all duration-700 ${statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <div className="heading-elegant text-2xl lg:text-heading mb-1 lg:mb-2 text-white">10+</div>
              <div className="body-clean text-sm lg:text-body text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="heading-elegant text-2xl lg:text-heading mb-1 lg:mb-2 text-white">36x</div>
              <div className="body-clean text-sm lg:text-body text-muted-foreground">Best ROAS</div>
            </div>
            <div className="text-center">
              <div className="heading-elegant text-2xl lg:text-heading mb-1 lg:mb-2 text-white">€10M+</div>
              <div className="body-clean text-sm lg:text-body text-muted-foreground">Revenue Generated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

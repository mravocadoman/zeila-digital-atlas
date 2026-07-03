import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import headshotImage from "@/assets/rihards-synthwave.jpg";
import neonPalms from "@/assets/neon-palms.png";
const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* 80s Neon Background Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img 
          src={neonPalms} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left: Content (2 columns) */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 lg:col-span-2">
            <h1 className="heading-elegant text-[8vw] sm:text-4xl lg:text-7xl leading-snug tracking-normal break-words max-w-[92vw] mx-auto lg:mx-0 animate-fade-in text-center lg:text-left" style={{ wordBreak: 'break-word' }}>RIHARDS ZEILA</h1>
            <h2 className="heading-elegant text-foreground leading-snug font-bold text-[5.5vw] sm:text-2xl md:text-3xl lg:text-4xl max-w-[92vw] mx-auto lg:mx-0 animate-fade-in text-center lg:text-left" style={{
            animationDelay: '0.2s',
            animationFillMode: 'both'
          }}>I build predictable growth systems and teach teams how to run them.</h2>

            {/* Trust chips */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {['10+ yrs experience', '€10M+ revenue generated', '36× best ROAS'].map((chip) => (
                <span key={chip} className="body-clean px-3 py-1 text-xs sm:text-sm lg:text-base border border-primary/40 rounded-full text-primary bg-primary/5">
                  {chip}
                </span>
              ))}
            </div>
            
            <div style={{
            animationDelay: '0.4s',
            animationFillMode: 'both'
          }} className="body-clean text-foreground leading-tight text-xl lg:text-2xl animate-fade-in lg:text-left text-center font-extrabold space-y-2">
              <p>You don't need more clicks or views. You need a system that turns traffic into revenue.</p>
              <p>I help SMEs, e-commerce brands, and service businesses scale through Meta ads, automation, smart funnel design, and hands-on teaching.</p>
            </div>

            <div className="pt-2 sm:pt-4 animate-fade-in flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center" style={{
            animationDelay: '0.6s',
            animationFillMode: 'both'
          }}>
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="bg-secondary text-foreground border border-border hover:border-primary transition-all duration-200 px-6 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-md font-extrabold text-base sm:text-lg lg:text-2xl hover-scale w-full sm:w-auto">GET IN TOUCH</Button>
              <Button asChild variant="outline" size="lg" className="border-primary/60 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary px-6 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-md font-extrabold text-base sm:text-lg lg:text-2xl hover-scale w-full sm:w-auto">
                <Link to="/work-with-me">Training & Workshops →</Link>
              </Button>
            </div>
          </div>

          {/* Right: Image & Video */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in order-1 lg:order-2" style={{
          animationDelay: '0.3s',
          animationFillMode: 'both'
        }}>
            <div className="relative">
              <img 
                src={headshotImage} 
                alt="Rihards Zeila - Full-Stack Digital Marketer and Educator based in Riga, Latvia" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs mx-auto rounded-sm border-3 border-primary hover-scale" 
                style={{ boxShadow: '0 0 30px hsl(var(--primary))' }}
                loading="eager"
                width="400"
                height="400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
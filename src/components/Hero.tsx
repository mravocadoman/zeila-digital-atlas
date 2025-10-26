import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.png";
import neonPalms from "@/assets/neon-palms.png";
const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center px-6 py-20 lg:py-32 relative overflow-hidden">
      {/* 80s Neon Background Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src={neonPalms} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="heading-elegant text-3xl sm:text-4xl lg:text-7xl animate-fade-in text-center lg:text-left">RIHARDS ZEILA</h1>
            <h2 className="heading-elegant text-display text-foreground leading-tight font-bold text-2xl sm:text-3xl lg:text-4xl animate-fade-in text-center lg:text-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>Helping Businesses Grow. Building Impactful Projects.</h2>
            
            <p className="body-clean text-body text-muted-foreground leading-relaxed text-lg sm:text-xl lg:text-2xl font-semibold animate-fade-in text-center lg:text-left" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              You don't need more clicks or views—you need a predictable system that turns traffic into revenue.
            </p>

            <div className="space-y-4">
              
            </div>

            <div className="pt-4 animate-fade-in flex justify-center lg:justify-start" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="bg-secondary text-foreground border border-border hover:border-primary transition-all duration-200 px-6 py-4 lg:px-8 lg:py-6 rounded-md font-extrabold text-lg lg:text-2xl hover-scale w-full sm:w-auto">GET IN TOUCH</Button>
            </div>
          </div>

          {/* Right: Image & Video */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="relative">
              <img src={headshotImage} alt="Rihards Zeila - Full-Stack Digital Marketer and Educator based in Riga, Latvia" className="w-full max-w-md mx-auto rounded-sm border border-border hover-scale" />
            </div>

            {/* Video Embed Placeholder */}
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.png";
import neonPalms from "@/assets/neon-palms.png";
const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* 80s Neon Background Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src={neonPalms} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h1 className="heading-elegant text-[9vw] sm:text-4xl lg:text-7xl leading-snug tracking-normal break-words max-w-[92vw] mx-auto lg:mx-0 animate-fade-in text-center lg:text-left">RIHARDS ZEILA</h1>
            <h2 className="heading-elegant text-foreground leading-snug font-bold text-[5.5vw] sm:text-2xl md:text-3xl lg:text-4xl max-w-[92vw] mx-auto lg:mx-0 animate-fade-in text-center lg:text-left" style={{
            animationDelay: '0.2s',
            animationFillMode: 'both'
          }}>Helping Businesses Grow. Building Impactful Projects.</h2>
            
            <p style={{
            animationDelay: '0.4s',
            animationFillMode: 'both'
          }} className="body-clean text-body text-muted-foreground leading-relaxed text-xl sm:text-lg md:text-xl lg:text-xl animate-fade-in lg:text-left text-center font-extrabold">
              You don't need more clicks or views—you need a predictable system that turns traffic into revenue.
            </p>

            <div className="pt-2 sm:pt-4 animate-fade-in flex justify-center lg:justify-start" style={{
            animationDelay: '0.6s',
            animationFillMode: 'both'
          }}>
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="bg-secondary text-foreground border border-border hover:border-primary transition-all duration-200 px-6 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-md font-extrabold text-base sm:text-lg lg:text-2xl hover-scale w-full sm:w-auto">GET IN TOUCH</Button>
            </div>
          </div>

          {/* Right: Image & Video */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in order-1 lg:order-2" style={{
          animationDelay: '0.3s',
          animationFillMode: 'both'
        }}>
            <div className="relative">
              <img src={headshotImage} alt="Rihards Zeila - Full-Stack Digital Marketer and Educator based in Riga, Latvia" className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-sm border border-border hover-scale" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
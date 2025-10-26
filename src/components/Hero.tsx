import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.png";
import neonPalms from "@/assets/neon-palms.png";
import retroSunset from "@/assets/retro-sunset.png";
const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center px-6 py-20 lg:py-32 relative overflow-hidden">
      {/* 80s Neon Background Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img 
          src={neonPalms} 
          alt="" 
          className="absolute bottom-0 left-0 w-full h-2/3 object-cover opacity-20 mix-blend-screen"
        />
        <div className="absolute top-20 right-10 w-48 h-48 lg:w-64 lg:h-64 opacity-30">
          <img 
            src={retroSunset} 
            alt="" 
            className="w-full h-full object-contain animate-pulse"
            style={{ animationDuration: '4s' }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <h1 className="heading-elegant text-5xl lg:text-7xl">RIHARDS ZEILA</h1>
            <h2 className="heading-elegant lg:text-5xl text-muted-foreground leading-tight text-4xl">Helping Businesses Grow. Building Impactful Projects.</h2>
            
            <p className="body-clean lg:text-2xl text-muted-foreground leading-relaxed text-lg">
              You don't need more clicks or views—you need a predictable system that turns traffic into revenue.
            </p>

            <div className="space-y-4">
              <p className="body-clean text-lg text-muted-foreground">
                <span className="text-foreground font-semibold">Passionate about:</span> Travel, Improvisation, Entrepreneurship, Crypto & Generative AI
              </p>
            </div>

            <div className="pt-4">
              <Button size="lg" className="bg-secondary text-foreground border border-border hover:border-primary transition-all duration-200 px-8 py-6 text-lg rounded-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right: Image & Video */}
          <div className="space-y-8">
            <div className="relative">
              <img src={headshotImage} alt="Rihards Zeila - Full-Stack Digital Marketer and Educator based in Riga, Latvia" className="w-full max-w-md mx-auto rounded-sm border border-border" />
            </div>

            {/* Video Embed Placeholder */}
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
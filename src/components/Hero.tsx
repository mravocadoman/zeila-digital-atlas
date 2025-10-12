import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <h1 className="heading-elegant text-5xl lg:text-7xl leading-tight">
              Helping Businesses Grow. Teaching Marketers. Building Impactful Projects.
            </h1>
            
            <p className="body-clean text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              You don't need more clicks or views—you need a predictable system that turns traffic into revenue.
            </p>

            <div className="space-y-4">
              <p className="body-clean text-lg text-muted-foreground">
                <span className="text-foreground font-semibold">Passionate about:</span> Travel, Improvisation, Entrepreneurship, Crypto & Generative AI
              </p>
            </div>

            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-secondary text-foreground border border-border hover:border-primary transition-all duration-200 px-8 py-6 text-lg rounded-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right: Image & Video */}
          <div className="space-y-8">
            <div className="relative">
              <img 
                src={headshotImage} 
                alt="Rihards Zeila - Full-Stack Digital Marketer and Educator based in Riga, Latvia"
                className="w-full max-w-md mx-auto rounded-sm border border-border"
              />
            </div>

            {/* Video Embed Placeholder */}
            <div className="relative aspect-video bg-card border border-border rounded-sm overflow-hidden group cursor-pointer hover:border-primary transition-all duration-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-foreground flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <div className="w-0 h-0 border-l-[20px] border-l-foreground border-y-[12px] border-y-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="body-clean text-sm text-muted-foreground">30-Second Introduction Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

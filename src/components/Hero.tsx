import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.png";
const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center px-6 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <h2 className="heading-elegant text-3xl lg:text-4xl text-muted-foreground">
              Rihards Zeiļa
            </h2>
            <h1 className="heading-elegant lg:text-7xl leading-tight text-5xl">
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
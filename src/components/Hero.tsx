import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/rihards-headshot.webp";

const Hero = () => {
  const navigate = useNavigate();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="px-4 sm:px-6 lg:px-16 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-center lg:items-end">
          <div className="order-2 lg:order-1">
            <span
              className="eyebrow block mb-5 rise"
              style={{ animationDelay: "0.05s" }}
            >
              {"AI marketing teams · Riga"}
            </span>

            <h1
              className="heading-elegant text-foreground text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6 rise"
              style={{ animationDelay: "0.15s" }}
            >
              {"I build the AI helpers that run your marketing, then hand them to your team."}
            </h1>

            <p
              className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-4 rise"
              style={{ animationDelay: "0.28s" }}
            >
              {"Every morning an AI checks your ads against real orders and tells you what is losing money. Posts go out on their own, leads get routed, quiet clients get a follow-up draft, and a person approves what matters."}
            </p>
            <p
              className="body-clean text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8 rise"
              style={{ animationDelay: "0.36s" }}
            >
              {"I have bought ads for 12 years, up to $5M a year, and I run two businesses on 40+ of these helpers. I taught digital marketing on the Riga Business School MBA from 2021 to 2026."}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 rise"
              style={{ animationDelay: "0.46s" }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/apply?from=hero")}
                className="bg-primary text-background hover:bg-primary/90 transition-all px-8 py-6 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider"
              >
                {"Apply to work with me"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("engagements")}
                className="bg-background border border-border text-foreground hover:border-primary hover:bg-background transition-all px-8 py-6 rounded-md font-bold text-sm lg:text-base uppercase tracking-wider"
              >
                {"See what the helpers do"}
              </Button>
            </div>
          </div>

          <div
            className="order-1 lg:order-2 lg:pb-6 rise"
            style={{ animationDelay: "0.2s" }}
          >
            {/* He stands on the horizon line, which runs off to the right with the
                grid receding below it. See .hero-stage in index.css. */}
            <div className="hero-stage w-56 sm:w-72 lg:w-full lg:max-w-md mx-auto">
              <img
                src={headshotImage}
                alt={"Rihards Zeila, who builds AI marketing teams, based in Riga, Latvia"}
                loading="eager"
                width="900"
                height="1200"
              />
              <div className="hero-line" aria-hidden="true" />
              <div className="hero-grid" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

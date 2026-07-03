import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Rihards is an exceptional marketer with a deep understanding of the digital marketing ecosystem. From day 1, he promoted data-led decisions and highlighted the importance of measuring campaign performance. On top of being outstanding in digital marketing, Rihards is also a great colleague - open to challenges, performs very well in a fast-paced environment, great in communication and problem solving.",
    author: "Bence Etele Baráth",
    role: "Colleague",
    company: "AppsFlyer"
  },
  {
    quote: "Rihards is THE expert on Facebook advertising and the one I would go to for any question related to that. He has excellent communication skills and knowledge of design, marketing, project management, and web design. He is an excellent public speaker, easily getting the message to any audience. His international experience and focus on individual solutions make him an excellent choice for any organization.",
    author: "Regita Zeiļa",
    role: "Director",
    company: "Social Entrepreneurship Association"
  },
  {
    quote: "Highly skilled, passionate and dedicated young man. Whenever I need an advice on digital marketing - I go to him. His international experience and valuable know-how excels his peers. Twice.",
    author: "Kristina Berga",
    role: "CEO",
    company: "HuskySense"
  },
  {
    quote: "Goal-oriented, brave and active professional who always strives for growth and development, while maintaining the belief that work should bring joy and be interesting. Rihards has excellent sales and persuasion skills. He creates a pleasant, open and friendly first impression. For any employer looking for a colleague with passion, Rihards will definitely be a suitable candidate.",
    author: "Evita Jaunozola",
    role: "Colleague",
    company: "StartSchooler"
  }
];

const PREVIEW_CHARS = 220;

const TestimonialCard = ({ t }: { t: typeof testimonials[number] }) => {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = t.quote.length > PREVIEW_CHARS;
  const display = expanded || !needsToggle ? t.quote : t.quote.slice(0, PREVIEW_CHARS).trimEnd() + "…";

  return (
    <div className="card-luxury border-l-4 border-l-primary flex flex-col h-full">
      <Quote className="w-6 h-6 text-primary/60 mb-3" />
      <p className="body-clean text-lg lg:text-xl leading-relaxed italic text-muted-foreground flex-1">
        "{display}"
      </p>
      {needsToggle && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="body-clean text-sm lg:text-base text-primary hover:text-white transition-colors self-start mt-3 font-semibold"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-5 pt-4 border-t border-primary/20">
        <div className="body-clean font-bold text-lg lg:text-xl text-foreground">{t.author}</div>
        <div className="body-clean text-sm lg:text-base text-muted-foreground">
          {t.role} · {t.company}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="testimonials" className="py-12 lg:py-32 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-7xl mb-8 lg:mb-12 animate-fade-in text-center lg:text-left">What People Say</h2>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useReveal } from "@/hooks/use-reveal";
/**
 * All quotes visible — no accordion. Social proof behind a click is social
 * proof nobody reads.
 *
 * The fourth reference (Evita Jaunozola, StartSchooler) reads as an employment
 * reference — "for any employer looking for a colleague" — so it now lives on
 * /about rather than here, where it would undercut the consulting positioning.
 */
const testimonials = [
  {
    quote:
      "An exceptional marketer with a deep understanding of the digital marketing ecosystem. From day one he promoted data-led decisions and the importance of measuring campaign performance.",
    author: "Bence Etele Baráth",
    company: "AppsFlyer",
  },
  {
    quote:
      "Rihards is THE expert on Facebook advertising — the one I go to for any question related to it. An excellent public speaker who gets the message across to any audience.",
    author: "Regita Zeiļa",
    company: "Director, Social Entrepreneurship Association",
  },
  {
    quote:
      "Highly skilled, passionate and dedicated. Whenever I need advice on digital marketing — I go to him. His international experience and valuable know-how excels his peers.",
    author: "Kristina Berga",
    company: "CEO, HuskySense",
  },
];

const Testimonials = () => {
  const reveal = useReveal<HTMLElement>();
  return (
  <section
    id="testimonials"
    ref={reveal.ref}
    className={`py-12 lg:py-24 px-6 lg:px-16 ${reveal.className}`}
  >
    <div className="max-w-6xl mx-auto">
      <span className="eyebrow block mb-4">In their words</span>
      <h2 className="heading-elegant text-3xl lg:text-5xl mb-8 lg:mb-12">
        From colleagues and clients.
      </h2>

      <div className="stagger grid md:grid-cols-3 gap-4 lg:gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.author}
            className="border border-border rounded-lg p-5 lg:p-7 flex flex-col lift"
          >
            <span
              className="numeral text-muted-foreground/40 text-3xl leading-none mb-3"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="pt-4 border-t border-border">
              <p className="body-clean font-semibold text-foreground">{t.author}</p>
              <p className="body-clean text-sm text-muted-foreground">{t.company}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Testimonials;

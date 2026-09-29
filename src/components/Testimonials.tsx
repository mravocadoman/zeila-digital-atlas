import { useReveal } from "@/hooks/use-reveal";
import { T, useLang } from "@/i18n/lang";
/**
 * All quotes visible — no accordion. Social proof behind a click is social
 * proof nobody reads.
 *
 * The fourth reference (Evita Jaunozola, StartSchooler) reads as an employment
 * reference — "for any employer looking for a colleague" — so it now lives on
 * /about rather than here, where it would undercut the consulting positioning.
 */
const testimonials = (t: T) => [
  {
    quote: t(
      "An exceptional marketer with a deep understanding of the digital marketing ecosystem. From day one he promoted data-led decisions and the importance of measuring campaign performance.",
      "Izcils mārketinga speciālists ar dziļu izpratni par digitālā mārketinga ekosistēmu. Jau no pirmās dienas viņš iestājās par datos balstītiem lēmumiem un kampaņu rezultātu mērīšanas nozīmi.",
    ),
    author: "Bence Etele Baráth",
    company: "AppsFlyer",
  },
  {
    quote: t(
      "Rihards is THE expert on Facebook advertising — the one I go to for any question related to it. An excellent public speaker who gets the message across to any audience.",
      "Rihards ir TAS eksperts Facebook reklāmā — tas, pie kura vēršos ar jebkuru jautājumu par to. Lielisks runātājs, kurš savu vēstījumu nodod jebkurai auditorijai.",
    ),
    author: "Regita Zeiļa",
    company: t("Director, Social Entrepreneurship Association", "Direktore, Sociālās uzņēmējdarbības asociācija"),
  },
  {
    quote: t(
      "Highly skilled, passionate and dedicated. Whenever I need advice on digital marketing — I go to him. His international experience and valuable know-how excels his peers.",
      "Ļoti prasmīgs, aizrautīgs un apņēmīgs. Kad vien man vajag padomu digitālajā mārketingā — eju pie viņa. Ar savu starptautisko pieredzi un vērtīgajām zināšanām viņš pārspēj kolēģus.",
    ),
    author: "Kristina Berga",
    company: t("CEO, HuskySense", "Vadītāja, HuskySense"),
  },
];

const Testimonials = () => {
  const reveal = useReveal<HTMLElement>();
  const { t } = useLang();
  return (
  <section
    id="testimonials"
    ref={reveal.ref}
    className={`py-12 lg:py-24 px-6 lg:px-16 section-rule ${reveal.className}`}
  >
    <div className="max-w-6xl mx-auto">
      <span className="eyebrow block mb-4">{t("In their words", "Viņu vārdiem")}</span>
      <h2 className="heading-elegant text-3xl lg:text-5xl mb-8 lg:mb-12">
        {t("From colleagues and clients.", "Kolēģi un klienti par mani.")}
      </h2>

      <div className="stagger grid md:grid-cols-3 gap-4 lg:gap-6">
        {testimonials(t).map((q) => (
          <figure
            key={q.author}
            className="border border-border rounded-lg p-5 lg:p-7 flex flex-col lift"
          >
            <span
              className="numeral text-muted-foreground/40 text-3xl leading-none mb-3"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="body-clean text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 flex-1">
              {q.quote}
            </blockquote>
            <figcaption className="pt-4 border-t border-border">
              <p className="body-clean font-semibold text-foreground">{q.author}</p>
              <p className="body-clean text-sm text-muted-foreground">{q.company}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Testimonials;

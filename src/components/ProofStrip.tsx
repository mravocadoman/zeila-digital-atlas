import rbsLogo from "@/assets/partners/rbs-logo.webp";
import unalLogo from "@/assets/partners/unal-logo.webp";
import risebaLogo from "@/assets/partners/riseba-logo.webp";
import itcLogo from "@/assets/partners/itc-logo.webp";
import lsuaLogo from "@/assets/partners/lsua-logo.webp";
import unilusLogo from "@/assets/partners/unilus-logo.webp";

const partners = [
  { name: "Riga Business School", logo: rbsLogo },
  { name: "Universidad Nacional de Colombia", logo: unalLogo },
  { name: "RISEBA University", logo: risebaLogo },
  { name: "International Trade Centre", logo: itcLogo },
  { name: "Latvijas Sociālās Uzņēmējdarbības Asociācija", logo: lsuaLogo },
  { name: "University of Lusaka", logo: unilusLogo },
];

/**
 * Logos only. The stats used to sit directly above these and the two bands read
 * as one undifferentiated slab — the numbers now live in <ResultsBand /> at the
 * head of the case studies, where the evidence for them sits right underneath.
 */
const ProofStrip = () => (
  <section className="bg-card border-y border-primary/15 py-8 lg:py-10 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <span className="eyebrow block text-center lg:text-left mb-5">
        Taught &amp; trained at
      </span>
    </div>

    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden">
        <div className="flex w-max items-center animate-marquee will-change-transform transform-gpu">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center flex-nowrap gap-14 md:gap-20 pr-14 md:pr-20"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {partners.map((partner) => (
                <img
                  key={`${partner.name}-${copy}`}
                  src={partner.logo}
                  alt={copy === 0 ? partner.name : ""}
                  loading="lazy"
                  decoding="async"
                  className="flex-shrink-0 h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProofStrip;

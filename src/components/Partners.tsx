import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import rbsLogo from "@/assets/partners/rbs-logo.png";
import unalLogo from "@/assets/partners/unal-logo.png";
import risebaLogo from "@/assets/partners/riseba-logo.png";
import itcLogo from "@/assets/partners/itc-logo.png";
import lsuaLogo from "@/assets/partners/lsua-logo.png";
import unilusLogo from "@/assets/partners/unilus-logo.png";

const partners = [
  { name: "Riga Business School", logo: rbsLogo },
  { name: "Universidad Nacional de Colombia", logo: unalLogo },
  { name: "RISEBA University", logo: risebaLogo },
  { name: "International Trade Centre", logo: itcLogo },
  { name: "Latvijas Sociālās Uzņēmējdarbības Asociācija", logo: lsuaLogo },
  { name: "University of Lusaka", logo: unilusLogo },
];

const Partners = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="pt-2 pb-8 md:pt-4 md:pb-12 bg-card overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="heading-elegant text-xl md:text-2xl lg:text-3xl text-center mb-8 md:mb-10">
          Partners
        </h2>

        <div className="relative">
          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div className="flex w-max items-center animate-marquee will-change-transform transform-gpu">
              <div className="flex items-center flex-nowrap gap-16 md:gap-24 pr-16 md:pr-24">
                {partners.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      decoding="async"
                      className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>

              <div
                className="flex items-center flex-nowrap gap-16 md:gap-24 pr-16 md:pr-24"
                aria-hidden="true"
              >
                {partners.map((partner, index) => (
                  <div
                    key={`${partner.name}-duplicate-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      decoding="async"
                      className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

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
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-12 md:mb-16">
          Partners
        </h2>

        <div className="relative">
          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex animate-marquee" aria-hidden="true">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-duplicate-${index}`}
                  className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

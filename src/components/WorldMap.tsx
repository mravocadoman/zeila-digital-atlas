import { useState } from "react";

interface Country {
  id: string;
  name: string;
  path: string;
}

const WorldMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // List of visited countries
  const visitedCountries = [
    "LV", "LT", "EE", "PL", "FI", "SE", "NO", "HR", "RO", "IT", "DE", "DK", 
    "ES", "PT", "AT", "CZ", "HU", "GR", "TR", "GE", // Europe
    "TH", "MY", "ID", "SG", // Southeast Asia
    "JO", "IL", // Middle East
    "ZM", "BW", // Africa
    "US", "CO", "MX" // Americas
  ];

  const countryNames: Record<string, string> = {
    LV: "Latvia", LT: "Lithuania", EE: "Estonia", PL: "Poland", FI: "Finland",
    SE: "Sweden", NO: "Norway", HR: "Croatia", RO: "Romania", IT: "Italy",
    DE: "Germany", DK: "Denmark", ES: "Spain", PT: "Portugal", AT: "Austria",
    CZ: "Czechia", HU: "Hungary", GR: "Greece", TR: "Turkey", GE: "Georgia",
    TH: "Thailand", MY: "Malaysia", ID: "Indonesia", SG: "Singapore",
    JO: "Jordan", IL: "Israel", ZM: "Zambia", BW: "Botswana",
    US: "United States", CO: "Colombia", MX: "Mexico"
  };

  // Simplified world map paths (key countries only for cleaner visual)
  const countries: Country[] = [
    // North America
    { id: "US", name: "United States", path: "M55 95 L145 95 L145 140 L55 140 Z" },
    { id: "CA", name: "Canada", path: "M55 45 L145 45 L145 95 L55 95 Z" },
    { id: "MX", name: "Mexico", path: "M55 140 L100 140 L100 170 L55 170 Z" },
    // Central/South America
    { id: "CO", name: "Colombia", path: "M95 175 L120 175 L120 200 L95 200 Z" },
    { id: "BR", name: "Brazil", path: "M110 195 L160 195 L160 260 L110 260 Z" },
    { id: "AR", name: "Argentina", path: "M100 260 L130 260 L130 320 L100 320 Z" },
    // Europe
    { id: "PT", name: "Portugal", path: "M195 115 L200 115 L200 130 L195 130 Z" },
    { id: "ES", name: "Spain", path: "M200 115 L220 115 L220 135 L200 135 Z" },
    { id: "FR", name: "France", path: "M210 95 L230 95 L230 115 L210 115 Z" },
    { id: "GB", name: "United Kingdom", path: "M205 75 L218 75 L218 95 L205 95 Z" },
    { id: "DE", name: "Germany", path: "M230 85 L250 85 L250 105 L230 105 Z" },
    { id: "IT", name: "Italy", path: "M235 105 L250 105 L250 135 L235 135 Z" },
    { id: "PL", name: "Poland", path: "M250 80 L275 80 L275 100 L250 100 Z" },
    { id: "NO", name: "Norway", path: "M235 35 L250 35 L250 75 L235 75 Z" },
    { id: "SE", name: "Sweden", path: "M250 35 L265 35 L265 80 L250 80 Z" },
    { id: "FI", name: "Finland", path: "M265 30 L285 30 L285 65 L265 65 Z" },
    { id: "EE", name: "Estonia", path: "M275 65 L290 65 L290 75 L275 75 Z" },
    { id: "LV", name: "Latvia", path: "M275 75 L290 75 L290 85 L275 85 Z" },
    { id: "LT", name: "Lithuania", path: "M275 85 L290 85 L290 95 L275 95 Z" },
    { id: "DK", name: "Denmark", path: "M230 70 L245 70 L245 85 L230 85 Z" },
    { id: "AT", name: "Austria", path: "M240 100 L260 100 L260 110 L240 110 Z" },
    { id: "CZ", name: "Czechia", path: "M245 95 L265 95 L265 105 L245 105 Z" },
    { id: "HU", name: "Hungary", path: "M255 105 L275 105 L275 115 L255 115 Z" },
    { id: "RO", name: "Romania", path: "M275 100 L300 100 L300 115 L275 115 Z" },
    { id: "HR", name: "Croatia", path: "M245 110 L265 110 L265 120 L245 120 Z" },
    { id: "GR", name: "Greece", path: "M265 120 L285 120 L285 140 L265 140 Z" },
    { id: "TR", name: "Turkey", path: "M285 110 L340 110 L340 135 L285 135 Z" },
    { id: "GE", name: "Georgia", path: "M330 95 L350 95 L350 110 L330 110 Z" },
    // Middle East
    { id: "IL", name: "Israel", path: "M295 140 L305 140 L305 160 L295 160 Z" },
    { id: "JO", name: "Jordan", path: "M305 140 L320 140 L320 160 L305 160 Z" },
    { id: "SA", name: "Saudi Arabia", path: "M305 160 L350 160 L350 200 L305 200 Z" },
    // Africa
    { id: "EG", name: "Egypt", path: "M280 145 L305 145 L305 175 L280 175 Z" },
    { id: "ZM", name: "Zambia", path: "M285 235 L315 235 L315 260 L285 260 Z" },
    { id: "BW", name: "Botswana", path: "M285 260 L310 260 L310 285 L285 285 Z" },
    { id: "ZA", name: "South Africa", path: "M280 285 L320 285 L320 320 L280 320 Z" },
    // Asia
    { id: "RU", name: "Russia", path: "M290 30 L480 30 L480 95 L290 95 Z" },
    { id: "CN", name: "China", path: "M380 95 L460 95 L460 160 L380 160 Z" },
    { id: "IN", name: "India", path: "M350 140 L400 140 L400 200 L350 200 Z" },
    { id: "TH", name: "Thailand", path: "M405 165 L425 165 L425 200 L405 200 Z" },
    { id: "MY", name: "Malaysia", path: "M415 200 L445 200 L445 215 L415 215 Z" },
    { id: "SG", name: "Singapore", path: "M420 215 L430 215 L430 222 L420 222 Z" },
    { id: "ID", name: "Indonesia", path: "M420 220 L490 220 L490 250 L420 250 Z" },
    { id: "JP", name: "Japan", path: "M475 100 L495 100 L495 145 L475 145 Z" },
    // Australia
    { id: "AU", name: "Australia", path: "M430 260 L510 260 L510 320 L430 320 Z" },
  ];

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 550 350"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 0 10px hsl(196 97% 49% / 0.3))" }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="hsl(196 97% 49% / 0.1)" strokeWidth="0.5" />
          </pattern>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pink-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <rect width="550" height="350" fill="url(#grid)" />
        
        {/* Render all countries */}
        {countries.map((country) => {
          const isVisited = visitedCountries.includes(country.id);
          const isHovered = hoveredCountry === country.id;
          
          return (
            <path
              key={country.id}
              d={country.path}
              fill={isVisited 
                ? isHovered 
                  ? "hsl(320 100% 65%)" // Pink on hover
                  : "hsl(196 97% 49%)" // Cyan for visited
                : "hsl(205 100% 15%)" // Dark for unvisited
              }
              stroke={isVisited ? "hsl(196 97% 60%)" : "hsl(196 97% 49% / 0.3)"}
              strokeWidth={isHovered ? 2 : 1}
              filter={isVisited ? (isHovered ? "url(#pink-glow)" : "url(#neon-glow)") : "none"}
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: isVisited ? 1 : 0.4,
              }}
              onMouseEnter={() => setHoveredCountry(country.id)}
              onMouseLeave={() => setHoveredCountry(null)}
            />
          );
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredCountry && visitedCountries.includes(hoveredCountry) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border border-primary rounded-lg shadow-[0_0_20px_rgba(3,195,248,0.4)] animate-fade-in">
          <span className="heading-elegant text-sm text-primary">
            {countryNames[hoveredCountry]}
          </span>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-sm shadow-[0_0_10px_rgba(3,195,248,0.5)]" />
          <span className="body-clean text-sm text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded-sm opacity-40" />
          <span className="body-clean text-sm text-muted-foreground">Not yet</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;

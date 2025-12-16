import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 alpha-3 codes for visited countries
const visitedCountries = [
  "LVA", "LTU", "EST", "POL", "FIN", "SWE", "NOR", "HRV", "ROU", "ITA", 
  "DEU", "DNK", "ESP", "PRT", "AUT", "CZE", "HUN", "GRC", "TUR", "GEO", // Europe
  "THA", "MYS", "IDN", "SGP", // Southeast Asia
  "JOR", "ISR", // Middle East
  "ZMB", "BWA", // Africa
  "USA", "COL", "MEX" // Americas
];

const countryNames: Record<string, string> = {
  LVA: "Latvia", LTU: "Lithuania", EST: "Estonia", POL: "Poland", FIN: "Finland",
  SWE: "Sweden", NOR: "Norway", HRV: "Croatia", ROU: "Romania", ITA: "Italy",
  DEU: "Germany", DNK: "Denmark", ESP: "Spain", PRT: "Portugal", AUT: "Austria",
  CZE: "Czechia", HUN: "Hungary", GRC: "Greece", TUR: "Turkey", GEO: "Georgia",
  THA: "Thailand", MYS: "Malaysia", IDN: "Indonesia", SGP: "Singapore",
  JOR: "Jordan", ISR: "Israel", ZMB: "Zambia", BWA: "Botswana",
  USA: "United States", COL: "Colombia", MEX: "Mexico"
};

const WorldMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="relative w-full">
      <div 
        className="w-full rounded-lg overflow-hidden"
        style={{ 
          filter: "drop-shadow(0 0 15px hsl(196 97% 49% / 0.2))",
          background: "linear-gradient(180deg, hsl(205 100% 9%) 0%, hsl(205 100% 12%) 100%)"
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [20, 30],
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.ISO_A3 || geo.id;
                  const isVisited = visitedCountries.includes(countryCode);
                  const isHovered = hoveredCountry === countryCode;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (isVisited) {
                          setHoveredCountry(countryCode);
                          setTooltipContent(countryNames[countryCode] || geo.properties.name);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredCountry(null);
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: isVisited 
                            ? "hsl(196 97% 49%)" 
                            : "hsl(205 100% 15%)",
                          stroke: isVisited 
                            ? "hsl(196 97% 60%)" 
                            : "hsl(196 97% 49% / 0.2)",
                          strokeWidth: isVisited ? 0.8 : 0.3,
                          outline: "none",
                          filter: isVisited ? "drop-shadow(0 0 4px hsl(196 97% 49% / 0.6))" : "none",
                          transition: "all 0.3s ease",
                        },
                        hover: {
                          fill: isVisited 
                            ? "hsl(320 100% 65%)" 
                            : "hsl(205 100% 18%)",
                          stroke: isVisited 
                            ? "hsl(320 100% 70%)" 
                            : "hsl(196 97% 49% / 0.3)",
                          strokeWidth: isVisited ? 1.2 : 0.3,
                          outline: "none",
                          filter: isVisited ? "drop-shadow(0 0 8px hsl(320 100% 65% / 0.8))" : "none",
                          cursor: isVisited ? "pointer" : "default",
                          transition: "all 0.3s ease",
                        },
                        pressed: {
                          fill: isVisited 
                            ? "hsl(320 100% 55%)" 
                            : "hsl(205 100% 15%)",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border border-primary rounded-lg shadow-[0_0_20px_rgba(3,195,248,0.4)] animate-fade-in z-10">
          <span className="heading-elegant text-sm text-primary">
            {tooltipContent}
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
          <div className="w-4 h-4 bg-secondary rounded-sm opacity-60" />
          <span className="body-clean text-sm text-muted-foreground">Not yet</span>
        </div>
      </div>
    </div>
  );
};

export default memo(WorldMap);

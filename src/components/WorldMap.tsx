import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useLang } from "@/i18n/lang";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric codes for visited countries
const visitedCountryCodes: Record<string, string> = {
  // Europe
  "428": "Latvia",
  "440": "Lithuania", 
  "233": "Estonia",
  "616": "Poland",
  "246": "Finland",
  "752": "Sweden",
  "578": "Norway",
  "191": "Croatia",
  "642": "Romania",
  "380": "Italy",
  "276": "Germany",
  "208": "Denmark",
  "724": "Spain",
  "620": "Portugal",
  "040": "Austria",
  "203": "Czechia",
  "348": "Hungary",
  "300": "Greece",
  "792": "Turkey",
  "268": "Georgia",
  // Southeast Asia
  "764": "Thailand",
  "458": "Malaysia",
  "360": "Indonesia",
  "702": "Singapore",
  "704": "Vietnam",
  // Middle East
  "400": "Jordan",
  "376": "Israel",
  // Africa
  "894": "Zambia",
  "072": "Botswana",
  // Americas
  "840": "United States",
  "170": "Colombia",
  "484": "Mexico"
};

const visitedIds = Object.keys(visitedCountryCodes);

const WorldMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const { t } = useLang();

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
                  const countryId = geo.id;
                  const isVisited = visitedIds.includes(countryId);
                  const isHovered = hoveredCountry === countryId;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (isVisited) {
                          setHoveredCountry(countryId);
                          setTooltipContent(visitedCountryCodes[countryId] || geo.properties.name);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredCountry(null);
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: isVisited 
                            ? "hsl(196, 97%, 49%)" 
                            : "hsl(205, 100%, 15%)",
                          stroke: isVisited 
                            ? "hsl(196, 97%, 60%)" 
                            : "hsl(196, 97%, 49%, 0.2)",
                          strokeWidth: isVisited ? 0.8 : 0.3,
                          outline: "none",
                        },
                        hover: {
                          fill: isVisited 
                            ? "hsl(320, 100%, 65%)" 
                            : "hsl(205, 100%, 18%)",
                          stroke: isVisited 
                            ? "hsl(320, 100%, 70%)" 
                            : "hsl(196, 97%, 49%, 0.3)",
                          strokeWidth: isVisited ? 1.2 : 0.3,
                          outline: "none",
                          cursor: isVisited ? "pointer" : "default",
                        },
                        pressed: {
                          fill: isVisited 
                            ? "hsl(320, 100%, 55%)" 
                            : "hsl(205, 100%, 15%)",
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
          <span className="body-clean text-sm text-muted-foreground">{t("Visited", "Apmeklēta")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded-sm opacity-60" />
          <span className="body-clean text-sm text-muted-foreground">{t("Not yet", "Vēl ne")}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(WorldMap);

const Travel = () => {
  const regions = [{
    name: "Europe",
    countries: "15+ countries including Latvia, Denmark, Spain, Portugal, Turkey",
    description: "Deep understanding of European business culture and digital marketing landscapes"
  }, {
    name: "Southeast Asia",
    countries: "Thailand, Vietnam, Malaysia",
    description: "Experience with emerging markets and diverse consumer behaviors"
  }, {
    name: "Africa",
    countries: "Gambia, Kenya, Zambia",
    description: "Implemented fin-tech and digital marketing solutions in developing economies"
  }, {
    name: "Middle East",
    countries: "Palestine, Jordan",
    description: "Cross-cultural marketing experience in complex markets"
  }];
  return <section id="travel" className="py-20 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">Global Perspective</h2>

        <div className="max-w-3xl mx-auto mb-16">
          <blockquote className="heading-elegant text-2xl lg:text-3xl text-center italic border-l-4 border-foreground pl-8">
            "Every culture teaches something new about connection, communication, and creativity. These experiences directly influence how I solve marketing challenges."
          </blockquote>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {regions.map(region => <div key={region.name} className="card-luxury">
              <h3 className="heading-elegant text-2xl mb-3">{region.name}</h3>
              <p className="body-clean text-sm text-muted-foreground mb-4">{region.countries}</p>
              <p className="body-clean text-muted-foreground">{region.description}</p>
            </div>)}
        </div>

        {/* Simple world map representation */}
        <div className="mt-16 p-12 border border-border rounded-sm bg-background/50 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              {/* Simplified continents */}
              <path d="M 20 15 L 35 10 L 40 15 L 35 20 L 30 18 L 25 20 Z" fill="white" />
              <path d="M 45 20 L 65 15 L 70 25 L 60 30 L 50 28 Z" fill="white" />
              <path d="M 25 25 L 35 23 L 38 30 L 30 35 Z" fill="white" />
              <path d="M 70 12 L 85 10 L 88 18 L 82 20 L 75 17 Z" fill="white" />
            </svg>
          </div>
          <div className="relative text-center">
            <p className="heading-elegant text-3xl">35+ Countries Visited</p>
            <p className="body-clean text-muted-foreground mt-2">4 Continents • Endless Insights</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Travel;
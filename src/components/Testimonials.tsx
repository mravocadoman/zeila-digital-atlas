const Testimonials = () => {
  const testimonials = [
    {
      quote: "Rihards is an exceptional marketer with a deep understanding of the digital marketing ecosystem. From day 1, he promoted data-led decisions and highlighted the importance of measuring campaign performance. On top of being outstanding in digital marketing, Rihards is also a great colleague - open to challenges, performs very well in a fast-paced environment, great in communication and problem solving.",
      author: "Bence Etele Baráth",
      company: "AppsFlyer"
    },
    {
      quote: "Rihards is THE expert on Facebook advertising and the one I would go to for any question related to that. He has excellent communication skills and knowledge of design, marketing, project management, and web design. He is an excellent public speaker, easily getting the message to any audience. His international experience and focus on individual solutions make him an excellent choice for any organization.",
      author: "Regita Zeiļa",
      company: "Marketing Professional"
    },
    {
      quote: "Highly skilled, passionate and dedicated young man. Whenever I need an advice on digital marketing - I go to him. His international experience and valuable know-how excels his peers. Twice.",
      author: "Kristina Berga",
      company: "Digital Marketing Expert"
    },
    {
      quote: "Goal-oriented, brave and active professional who always strives for growth and development, while maintaining the belief that work should bring joy and be interesting. Rihards has excellent sales and persuasion skills. He creates a pleasant, open and friendly first impression. For any employer looking for a colleague with passion, Rihards will definitely be a suitable candidate.",
      author: "Evita Jaunozola",
      company: "StartSchooler"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12 animate-fade-in">What People Say</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-luxury hover-scale animate-fade-in" style={{ animationDelay: `${0.15 * index}s`, animationFillMode: 'both' }}>
              <p className="body-clean text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="body-clean font-semibold">{testimonial.author}</p>
                <p className="body-clean text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

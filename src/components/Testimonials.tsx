const Testimonials = () => {
  const testimonials = [
    {
      quote: "Rihards resolved our growth blockers and significantly boosted campaign effectiveness. His strategic insights transformed our advertising approach.",
      author: "Marketing Director",
      company: "Aleph Client"
    },
    {
      quote: "Outstanding lecturer with real-world expertise. The MBA course provided actionable strategies we implemented immediately.",
      author: "MBA Student",
      company: "Riga Business School"
    },
    {
      quote: "His ability to simplify complex marketing concepts while maintaining depth is remarkable. Students consistently rate his courses highly.",
      author: "Academic Director",
      company: "RISEBA"
    },
    {
      quote: "Working with Rihards on our digital transformation was a game-changer. His global perspective brought fresh solutions to our challenges.",
      author: "Business Owner",
      company: "Latvian SME"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">What People Say</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-luxury">
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

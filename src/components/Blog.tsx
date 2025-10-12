const Blog = () => {
  const posts = [
    {
      title: "Scaling Paid Ads in 2025: What's Actually Working",
      excerpt: "The landscape of paid advertising has shifted dramatically. Here's what drives results now: predictable attribution, AI-assisted creative testing, and channel diversification beyond Meta.",
      date: "January 2025",
      readTime: "8 min read"
    },
    {
      title: "No-Code Automation for High-Class Marketing",
      excerpt: "How to build sophisticated marketing workflows without engineering resources. From lead routing to client onboarding, automation unlocks scale.",
      date: "December 2024",
      readTime: "6 min read"
    },
    {
      title: "The CMO's Guide to Marketing in Emerging Markets",
      excerpt: "Lessons from implementing digital strategies across Europe, Africa, and Southeast Asia. Cultural nuances that make or break campaigns.",
      date: "November 2024",
      readTime: "10 min read"
    }
  ];

  return (
    <section id="blog" className="py-20 lg:py-32 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="heading-elegant text-4xl lg:text-6xl">Insights</h2>
          <a href="#blog" className="body-clean text-sm text-muted-foreground hover:text-foreground transition-colors">
            View All →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article key={index} className="card-luxury group cursor-pointer">
              <div className="space-y-4">
                <div className="flex justify-between items-start text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="heading-elegant text-2xl group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h3>
                
                <p className="body-clean text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-4">
                  <span className="body-clean text-sm group-hover:text-foreground transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

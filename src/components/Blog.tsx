const Blog = () => {
  const posts = [{
    title: "Scaling Paid Ads in 2025: What's Actually Working",
    excerpt: "The landscape of paid advertising has shifted dramatically. Here's what drives results now: predictable attribution, AI-assisted creative testing, and channel diversification beyond Meta.",
    date: "January 2025",
    readTime: "8 min read"
  }, {
    title: "No-Code Automation for High-Class Marketing",
    excerpt: "How to build sophisticated marketing workflows without engineering resources. From lead routing to client onboarding, automation unlocks scale.",
    date: "December 2024",
    readTime: "6 min read"
  }, {
    title: "The CMO's Guide to Marketing in Emerging Markets",
    excerpt: "Lessons from implementing digital strategies across Europe, Africa, and Southeast Asia. Cultural nuances that make or break campaigns.",
    date: "November 2024",
    readTime: "10 min read"
  }];
  
  return (
    <section id="blog" className="py-20 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="heading-elegant text-4xl lg:text-5xl mb-4">Insights & Perspectives</h2>
          <p className="body-clean text-lg text-muted-foreground">Thoughts on digital marketing, growth, and global entrepreneurship</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-background border border-border rounded-sm p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="heading-elegant text-2xl mb-3">{post.title}</h3>
              <p className="body-clean text-muted-foreground mb-6">{post.excerpt}</p>
              <button className="text-foreground hover:text-primary transition-colors font-semibold">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Blog;
import { useNavigate } from "react-router-dom";
import type { ArticleCtaKind } from "@/lib/blog-core";
import NewsletterSignup from "@/components/NewsletterSignup";

// The one invitation under an article, picked by its `cta` front matter (Founder OS: one deliberate CTA per piece).
const COPY = {
  consult: {
    eyebrow: "Work with me",
    heading: "Want this running in your business?",
    body: "I set up the ads, the funnel and the automation, then teach your team to run them.",
    button: "Book a consultation",
  },
  audit: {
    eyebrow: "Start smaller",
    heading: "Want a second pair of eyes on your account first?",
    body: "A fixed-fee account audit, one to two weeks: I go through the ad account, tracking setup and funnel, then tell you what's costing you money, in priority order.",
    button: "Ask about an audit",
  },
} as const;

const ArticleCta = ({ kind }: { kind: ArticleCtaKind }) => {
  const navigate = useNavigate();
  if (kind === "newsletter") {
    return (
      <section className="px-6 lg:px-16 py-14 lg:py-20">
        <div className="max-w-[760px] mx-auto rounded-lg border border-white/10 bg-card p-6 lg:p-10">
          <NewsletterSignup source="blog-cta" />
        </div>
      </section>
    );
  }
  const c = COPY[kind];
  return (
    <section className="px-6 lg:px-16 py-14 lg:py-20">
      <div className="max-w-[760px] mx-auto rounded-lg border border-white/10 bg-card p-6 lg:p-10">
        <span className="eyebrow block mb-3">{c.eyebrow}</span>
        <h2 className="heading-elegant text-2xl lg:text-3xl mb-4">{c.heading}</h2>
        <p className="body-clean text-muted-foreground text-lg mb-6 max-w-xl">{c.body}</p>
        <button
          onClick={() => navigate("/#contact")}
          className="body-clean bg-primary text-background px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          {c.button}
        </button>
      </div>
    </section>
  );
};

export default ArticleCta;

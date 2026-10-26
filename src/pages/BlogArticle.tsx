import { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePageMeta } from "@/i18n/lang";
import { formatDate, getArticle, getArticles, renderBody } from "@/lib/blog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import NotFound from "./NotFound";

/**
 * Title on navy, the article on warm white. Nothing here waits on an animation:
 * this is the page a LinkedIn DM lands on, and it has to read on the first paint.
 */
const BlogArticle = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const article = getArticle(slug);
  const html = useMemo(() => (article ? renderBody(article.body) : ""), [article]);
  const body = useRef<HTMLElement>(null);

  // A Copy button on every prompt and code box: the readers are on phones, and long-press
  // selection inside a scrolling box is where a copy-paste step falls apart. Added after render,
  // so the boxes read fine without it.
  useEffect(() => {
    const boxes = body.current?.querySelectorAll<HTMLPreElement>("pre:not(.flow)") ?? [];
    boxes.forEach((pre) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.onclick = () =>
        navigator.clipboard?.writeText(pre.querySelector("code")?.innerText ?? pre.innerText).then(() => {
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        });
      pre.appendChild(btn);
    });
    return () => boxes.forEach((pre) => pre.querySelector(".copy-btn")?.remove());
  }, [html]);

  usePageMeta(
    article ? `${article.title} | Rihards Zeila` : "Page not found | Rihards Zeila",
    article?.description,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <NotFound />;
  const others = getArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <header className="px-6 lg:px-16 pt-28 pb-12 lg:pt-36 lg:pb-16">
          <div className="max-w-[760px] mx-auto">
            <Link to="/blog" className="body-clean text-sm text-muted-foreground hover:text-foreground">
              ← Blog
            </Link>
            <p className="eyebrow mt-6 mb-4">
              {article.topic} · {article.readingMinutes} min read
            </p>
            <h1 className="heading-elegant text-3xl sm:text-4xl lg:text-5xl mb-6">{article.title}</h1>
            <p className="body-clean text-muted-foreground">Rihards Zeila · {formatDate(article.date)}</p>
          </div>
        </header>

        <div className="bg-[#fbfaf7] px-6 lg:px-16 py-12 lg:py-16">
          <article
            ref={body}
            className="article-body prose prose-lg mx-auto max-w-[680px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <section className="px-6 lg:px-16 py-14 lg:py-20">
          <div className="max-w-[760px] mx-auto rounded-lg border border-white/10 bg-card p-6 lg:p-10">
            <span className="eyebrow block mb-3">Work with me</span>
            <h2 className="heading-elegant text-2xl lg:text-3xl mb-4">
              Want this running in your business?
            </h2>
            <p className="body-clean text-muted-foreground text-lg mb-6 max-w-xl">
              I set up the ads, the funnel and the automation, then teach your team to run them.
            </p>
            <button
              onClick={() => navigate("/#contact")}
              className="body-clean bg-primary text-background px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Book a consultation
            </button>
          </div>
        </section>

        {others.length > 0 && (
          <section className="px-6 lg:px-16 pb-20 lg:pb-28">
            <div className="max-w-6xl mx-auto">
              <h2 className="heading-elegant text-2xl lg:text-3xl mb-8">More articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {others.map((a) => (
                  <BlogCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;

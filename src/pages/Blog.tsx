import { useEffect } from "react";
import { usePageMeta } from "@/i18n/lang";
import { getArticles } from "@/lib/blog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";

/**
 * English only. Latvian articles live on marketingaskola.lv/blogs, which is where the
 * /lv menu and the LV flag on blog pages send people.
 */
const Blog = () => {
  usePageMeta(
    "Blog | Rihards Zeila",
    "How I run ads and automation in practice: the systems, the prompts, the code and the numbers.",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="px-6 lg:px-16 pt-28 pb-10 lg:pt-36 lg:pb-14">
          <div className="max-w-6xl mx-auto">
            <span className="eyebrow block mb-4">Articles</span>
            <h1 className="heading-elegant text-4xl lg:text-6xl mb-6">Blog</h1>
            <p className="body-clean text-muted-foreground text-lg lg:text-xl max-w-2xl leading-relaxed">
              How I run ads and automation in practice: the systems, the prompts, the code and
              the numbers.
            </p>
          </div>
        </section>
        <section className="px-6 lg:px-16 pb-20 lg:pb-28">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
            {getArticles().map((a) => (
              <BlogCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

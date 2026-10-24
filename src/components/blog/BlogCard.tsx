import { Link } from "react-router-dom";
import type { Article } from "@/lib/blog-core";
import { drawings } from "./drawings";

const BlogCard = ({ article }: { article: Article }) => {
  const Drawing = drawings[article.drawing];
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="lift block rounded-lg border border-white/10 bg-card overflow-hidden"
    >
      <div className="bg-sunken flex items-center justify-center px-8 py-8">
        {Drawing && <Drawing />}
      </div>
      <div className="p-5 lg:p-6">
        <span className="eyebrow">{article.topic}</span>
        <h3 className="heading-elegant text-xl lg:text-2xl text-foreground mt-2">{article.title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;

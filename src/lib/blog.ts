import { marked } from "marked";
import { parseArticle, sortArticles } from "./blog-core";

/*
 * Articles are src/content/blog/<slug>.md, bundled at build time. To add one, drop in a
 * file with the front matter blog-core.ts requires and a drawing key from
 * components/blog/drawings.tsx. Nothing else changes.
 */
const files = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const articles = sortArticles(
  Object.entries(files).map(([path, raw]) =>
    parseArticle(path.slice(path.lastIndexOf("/") + 1, -".md".length), raw),
  ),
);

export const getArticles = () => articles;
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/** Our own files only, so the HTML they carry (styled blocks) is trusted. */
export const renderBody = (md: string) => marked.parse(md, { gfm: true, async: false }) as string;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

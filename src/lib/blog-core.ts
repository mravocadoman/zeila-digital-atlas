/*
 * Blog core, shared by the app (src/lib/blog.ts), the link-preview plugin in
 * vite.config.ts and the Node self-check (src/lib/blog-core.test.ts). It must stay
 * import-free and use only erasable TypeScript, so Node can run it as is.
 */

/** What the box under an article asks for: a consultation (default), the fixed-fee audit, or the newsletter. */
export const CTA_KINDS = ["consult", "audit", "newsletter"] as const;
export type ArticleCtaKind = (typeof CTA_KINDS)[number];

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  topic: string;
  drawing: string;
  order: number;
  cta: ArticleCtaKind;
  body: string; // Markdown, may hold the styled-block HTML
  readingMinutes: number;
};

const REQUIRED = ["title", "description", "date", "topic", "drawing"] as const;

/** Flat front matter between the first two `---` lines: one `key: value` per line. */
export const parseArticle = (slug: string, raw: string): Article => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  for (const line of (m?.[1] ?? "").split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const k of REQUIRED) if (!meta[k]) throw new Error(`${slug}: missing ${k}`);
  const cta = (meta.cta || "consult") as ArticleCtaKind;
  if (!CTA_KINDS.includes(cta)) throw new Error(`${slug}: unknown cta ${meta.cta}`);
  const body = m?.[2] ?? raw;
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    topic: meta.topic,
    drawing: meta.drawing,
    order: meta.order ? Number(meta.order) : 99,
    cta,
    body,
    readingMinutes: Math.max(1, Math.ceil(words / 220)),
  };
};

/** Newest first, then by `order`. Returns a new array. */
export const sortArticles = (list: Article[]): Article[] =>
  [...list].sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The built index.html with one page's head tags, for link previews: chat apps and
 * LinkedIn read these without running JavaScript. Matches the tag shapes in index.html.
 */
export const previewHtml = (
  base: string,
  m: { title: string; description: string; url: string; image: string },
): string => {
  const t = esc(m.title);
  const d = esc(m.description);
  const set = (html: string, attr: string, key: string, value: string) =>
    html.replace(
      new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`),
      (_, a, b) => `${a}${value}${b}`,
    );
  let out = base.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  out = set(out, "name", "description", d);
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${m.url}${b}`);
  out = set(out, "property", "og:type", "article");
  out = set(out, "property", "og:url", m.url);
  out = set(out, "property", "og:title", t);
  out = set(out, "property", "og:description", d);
  out = set(out, "property", "og:image", m.image);
  out = set(out, "property", "og:image:width", "1200");
  out = set(out, "property", "og:image:height", "630");
  out = set(out, "name", "twitter:url", m.url);
  out = set(out, "name", "twitter:title", t);
  out = set(out, "name", "twitter:description", d);
  out = set(out, "name", "twitter:image", m.image);
  return out;
};

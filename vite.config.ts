import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { componentTagger } from "lovable-tagger";
import { parseArticle, previewHtml } from "./src/lib/blog-core";

const SITE = "https://rihardszeila.com";

/*
 * Link previews for the blog. Chat apps and LinkedIn read meta tags without running
 * JavaScript, so each article gets its own copy of the built index.html with its own
 * title, description and image: dist/blog/<slug>/index.html, plus dist/blog/index.html.
 * Same app, same bundle; any host that serves a real file before the SPA fallback works.
 */
const blogPreviews = (): Plugin => ({
  name: "blog-previews",
  apply: "build",
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const src = path.resolve(__dirname, "src/content/blog");
    const base = readFileSync(path.join(dist, "index.html"), "utf8");
    const write = (dir: string, meta: Parameters<typeof previewHtml>[1]) => {
      mkdirSync(path.join(dist, dir), { recursive: true });
      writeFileSync(path.join(dist, dir, "index.html"), previewHtml(base, meta));
    };
    write("blog", {
      title: "Blog | Rihards Zeila",
      description: "How I run ads and automation in practice: the systems, the prompts, the code and the numbers.",
      url: `${SITE}/blog`,
      image: `${SITE}/og/blog.jpg`,
    });
    for (const file of readdirSync(src).filter((f) => f.endsWith(".md"))) {
      const a = parseArticle(file.slice(0, -3), readFileSync(path.join(src, file), "utf8"));
      write(`blog/${a.slug}`, {
        title: `${a.title} | Rihards Zeila`,
        description: a.description,
        url: `${SITE}/blog/${a.slug}`,
        image: `${SITE}/og/blog-${a.slug}.jpg`,
      });
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), blogPreviews()].filter(Boolean),
  build: {
    rollupOptions: {
      // retreats/index.html only carries /retreats' own link-preview tags; see the note in it.
      input: {
        index: path.resolve(__dirname, "index.html"),
        retreats: path.resolve(__dirname, "retreats/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

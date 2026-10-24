// Self-check for the blog core: node src/lib/blog-core.test.ts
// The app, the preview plugin in vite.config.ts and this check all share blog-core.ts.
// A wrong parse hides an article; a wrong preview rewrite makes every shared link
// show the consulting card instead of the article, which is the bug this exists to stop.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseArticle, previewHtml, sortArticles } from "./blog-core.ts";

const head = "---\ntitle: T\ndescription: D\ndate: 2026-10-26\ntopic: Ads\ndrawing: bars\n---\n";

// front matter, default order, reading time at 220 words a minute
const a = parseArticle("x", head + "w ".repeat(440));
assert.equal(a.slug, "x");
assert.equal(a.title, "T");
assert.equal(a.order, 99);
assert.equal(a.readingMinutes, 2);
assert.equal(parseArticle("x", head + "w ".repeat(441)).readingMinutes, 3);
assert.equal(parseArticle("x", head + "w").readingMinutes, 1);
// tags don't count as words
assert.equal(parseArticle("x", head + '<div class="callout">' + "w ".repeat(220) + "</div>").readingMinutes, 1);
assert.equal(parseArticle("x", head.replace("---\n", "---\norder: 3\n") + "w").order, 3);
assert.throws(() => parseArticle("x", head.replace("description: D\n", "") + "w"), /x: missing description/);

// newest first, then order; input untouched
const mk = (date: string, order: number) => ({ ...a, date, order });
const list = [mk("2026-10-26", 2), mk("2026-10-26", 1), mk("2026-11-01", 5)];
const sorted = sortArticles(list);
assert.deepEqual(sorted.map((x) => [x.date, x.order]), [["2026-11-01", 5], ["2026-10-26", 1], ["2026-10-26", 2]]);
assert.deepEqual(list.map((x) => x.order), [2, 1, 5]);

// preview tags on the real index.html
const base = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const out = previewHtml(base, {
  title: 'A & "B"',
  description: "Desc <x>",
  url: "https://rihardszeila.com/blog/x",
  image: "https://rihardszeila.com/og/blog-x.jpg",
});
assert.ok(out.includes("<title>A &amp; &quot;B&quot;</title>"));
assert.ok(out.includes('name="description" content="Desc &lt;x&gt;"'));
assert.ok(out.includes('rel="canonical" href="https://rihardszeila.com/blog/x"'));
assert.ok(out.includes('property="og:type" content="article"'));
assert.ok(out.includes('property="og:url" content="https://rihardszeila.com/blog/x"'));
assert.ok(out.includes('property="og:image" content="https://rihardszeila.com/og/blog-x.jpg"'));
assert.ok(out.includes('property="og:image:width" content="1200"'));
assert.ok(out.includes('property="og:image:height" content="630"'));
assert.ok(out.includes('name="twitter:title" content="A &amp; &quot;B&quot;"'));
assert.ok(out.includes('hreflang="en" href="https://rihardszeila.com/blog/x"'));
assert.ok(out.includes('hreflang="x-default" href="https://rihardszeila.com/blog/x"'));
assert.ok(!out.includes('hreflang="lv"'));
// no head tag still carries the homepage card (the Person JSON-LD keeps it, rightly: it's the author)
assert.ok(!/<title>[^<]*Paid Growth|(og|twitter):(title|description)" content="[^"]*Paid Growth/.test(out));
assert.ok(!/(og|twitter):image" content="[^"]*headshot/.test(out));
// the app's script tags survive
assert.ok(out.includes('src="/src/main.tsx"') || out.includes("<script"));

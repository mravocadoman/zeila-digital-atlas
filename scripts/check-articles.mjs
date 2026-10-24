// Checks the blog articles converted from the kits: node scripts/check-articles.mjs
// 1. Nothing was lost: every table, code block and number in a kit is in its article.
// 2. No hint at what the print-on-demand shop sells (Rihards, 24 Oct 2026).
//    Never add the shop's real names here: they must not appear anywhere in this repo.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

// The kits as they were before they became forwarding stubs.
const KIT_REV = "306e378";
const KITS = {
  "marketing-department.html": "marketing-department-on-claude-and-n8n",
  "ads.html": "meta-ads-seven-rules",
  "carousel-generator.html": "carousel-generator",
  "25-iterations.html": "ecommerce-business-built-with-claude",
  "cheap-leads-postmortem.html": "cheap-leads-post-mortem",
  "ai-review-layer.html": "ai-review-layer",
};
// Numbers that lived only in a kit's chrome or in a reworded shop hint.
const IGNORE = {};
// Words and phrasings that give the product away. Wrapped, mirrored edges only exist on gallery canvas;
// wall-size printing points at wall art.
const HINTS = /portrait|canvas|glasses|commission(ing)? certificate|theme collection|franchise|wrapped edge|mirror setting|edge mirror|wall size|on a wall/i;
// Leftovers from the kits: "this kit", "its own kit, LEADS".
const KIT_WORDING = /\b(this|its own) kit\b|\bkit, [A-Z]{3,}/;

const decode = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
// Real tags only: code in the articles holds bare "<=" and ">" that a looser pattern would eat.
const text = (html) => decode(html.replace(/<\/?[a-z][a-z0-9]*\b[^>]*>/gi, " ")).replace(/\s+/g, " ");
const numbers = (s) => [...new Set((s.match(/\d[\d.,]*%?/g) || []).map((n) => n.replace(/[.,]+$/, "")))];

const problems = [];
for (const [kit, slug] of Object.entries(KITS)) {
  const html = execFileSync("git", ["show", `${KIT_REV}:public/kits/${kit}`], { encoding: "utf8" });
  const path = `src/content/blog/${slug}.md`;
  if (!existsSync(path)) {
    problems.push(`${slug}: missing ${path}`);
    continue;
  }
  const md = readFileSync(path, "utf8");

  const kitTables = (html.match(/<table/g) || []).length;
  const mdTables = (md.match(/<table/g) || []).length + (md.match(/^\|[ :-]*-{3}/gm) || []).length;
  if (mdTables < kitTables) problems.push(`${slug}: ${mdTables} tables, kit has ${kitTables}`);

  const kitPre = (html.match(/<pre/g) || []).length;
  const mdPre = (md.match(/<pre/g) || []).length + (md.match(/^```/gm) || []).length / 2;
  if (mdPre < kitPre) problems.push(`${slug}: ${mdPre} code blocks, kit has ${kitPre}`);

  // the kit's visible content: title and dek, then the body without header, footer and section numbers
  const body = html
    .slice(html.indexOf("</header>"), html.indexOf("<footer"))
    .replace(/<h2><span>[^<]*<\/span>/g, "<h2>");
  const head = (html.match(/<h1>[\s\S]*?<\/h1>|<p class="sub">[\s\S]*?<\/p>/g) || []).join(" ");
  const have = text(md);
  const ignore = new Set(IGNORE[slug] || []);
  const lost = numbers(text(head + body)).filter((n) => !ignore.has(n) && !have.includes(n));
  if (lost.length) problems.push(`${slug}: numbers missing: ${lost.join(" ")}`);

  // reportlab's `canvas` module in the carousel code is a library name, not a hint
  const hint = md.replace(/reportlab\.pdfgen import canvas|canvas\.Canvas\(/g, "").match(HINTS);
  if (hint) problems.push(`${slug}: shop hint "${hint[0]}"`);

  const kitWord = md.match(KIT_WORDING);
  if (kitWord) problems.push(`${slug}: kit wording "${kitWord[0]}"`);

  // "section 06", "sections 02 through 07", "see 05" must point at a numbered heading ("## 06 · …")
  const heads = new Set([...md.matchAll(/^## (\d{2}) · /gm)].map((m) => Number(m[1])));
  const refs = [...md.matchAll(/\bsections? (\d{1,2})(?: through (\d{1,2}))?|\bsee (\d{2})\b/gi)]
    .flatMap((m) => [m[1], m[2], m[3]].filter(Boolean).map(Number));
  const dangling = [...new Set(refs.filter((n) => !heads.has(n)))];
  if (dangling.length) problems.push(`${slug}: section refs with no numbered heading: ${dangling.join(" ")}`);
}

if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}

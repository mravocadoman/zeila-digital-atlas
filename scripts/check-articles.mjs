// Checks every blog article against docs/blog-style.md: node scripts/check-articles.mjs
// The parts a script can see: the article's shape, no jargon or em dashes in the main text, no dangling
// "section 06" references, no kit leftovers, and no hint at what the print-on-demand shop sells.
// Never add the shop's real names here: they must not appear anywhere in this repo.
import { readdirSync, readFileSync } from "node:fs";

const DIR = "src/content/blog";
// Words and phrasings that give the product away. Wrapped, mirrored edges only exist on gallery canvas;
// wall-size printing points at wall art.
const HINTS = /portrait|canvas|glasses|commission(ing)? certificate|theme collection|franchise|wrapped edge|mirror setting|edge mirror|wall size|on a wall/i;
// Leftovers from the kits: "this kit", "its own kit, LEADS", "comment TEAM".
const KIT_WORDING = /\b(this|its own) kit\b|\bkit, [A-Z]{3,}|\bcomment (\*\*|<b>)?[A-Z]{3,}\b/;
// Developer words. They belong in the folded "For your developer" section or in a prompt box, not in the text.
const JARGON = /\b(API|JSON|webhooks?|endpoints?|schema|SQL|Postgres|regex|cron|payloads?|nodes?|deploy(ed|s)?|repo|md5|URNs?|upsert|CBO)\b/;
const REQUIRED = ["## What you need", "## Start here today"];

// The main text: no front matter, no developer section, no code or prompt boxes, no HTML tags.
const mainText = (md) =>
  md
    .replace(/^---[\s\S]*?\n---\n/, "")
    .replace(/<details>[\s\S]*?<\/details>/g, "")
    .replace(/^```[\s\S]*?^```/gm, "")
    .replace(/<pre[\s\S]*?<\/pre>/g, "")
    .replace(/<\/?[a-z][a-z0-9]*\b[^>]*>/gi, " ")
    .replace(/`[^`]*`/g, "");

const problems = [];
for (const file of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const slug = file.slice(0, -3);
  const md = readFileSync(`${DIR}/${file}`, "utf8");
  const text = mainText(md);

  for (const h of REQUIRED) if (!md.includes(h)) problems.push(`${slug}: no "${h}" section`);

  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < 900 || words > 2400) problems.push(`${slug}: main text is ${words} words (aim for 1,300 to 2,000)`);

  const jargon = text.match(JARGON);
  if (jargon) problems.push(`${slug}: developer word "${jargon[0]}" in the main text`);

  if (text.includes("—")) problems.push(`${slug}: em dash in the main text`);

  // reportlab's `canvas` module in a code listing is a library name, not a hint
  const hint = md.replace(/reportlab\.pdfgen import canvas|canvas\.Canvas\(/g, "").match(HINTS);
  if (hint) problems.push(`${slug}: shop hint "${hint[0]}"`);

  const kitWord = md.match(KIT_WORDING);
  if (kitWord) problems.push(`${slug}: kit wording "${kitWord[0]}"`);

  const ref = text.match(/\bsections? \d{1,2}\b|\bsee \d{2}\b/i);
  if (ref) problems.push(`${slug}: numbered reference "${ref[0]}"; name the section instead`);
}

if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}

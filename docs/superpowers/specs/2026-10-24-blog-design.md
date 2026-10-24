# Blog on rihardszeila.com, as the lead-magnet destination

Status: draft for Rihards's approval, 24 Oct 2026.

## Why

The LinkedIn lead-magnet posts end with "Comment KEYWORD and I will send it to you". Rihards replies by
hand with a kit link, and the same kits are meant to be pinned in his LinkedIn Featured section. Today
each kit is a standalone page at `rihardszeila.com/kits/<name>.html`. It has no site menu and no way into
the rest of the site, so a reader who arrives from a DM never sees the consulting offer.

Rihards wants the kits "under the same website, not as separate page, so people can navigate to this
section; so it would look like a normal blog post". The blog becomes the destination for lead-magnet posts.
The links he sends and the Featured links point at `/blog/<slug>`.

English lives here. Latvian articles go on marketingaskola.lv's existing blog. That is a separate piece of
work and is not part of this document.

## Goals

- A "Blog" item in the site menu, on desktop and in the phone menu.
- `/blog`: a front page with one card per article.
- `/blog/<slug>`: article pages that read like a normal blog post.
- The six Batch One kits become six articles, and the old `/kits/` links forward to them.
- Every article has its own link preview, so a shared link shows that article and not the consulting card.
- Adding an article later means one Markdown file plus one drawing, with no other code change.

## Non-goals

- No CMS, comments, newsletter form, search, tag pages or pagination. There are six articles.
- No `/lv/blog`.
- No rewriting of the kits' substance. Edit only what is needed for them to read as articles, plus
  stripping the shop hints described below.
- Moving the hosting to SiteGround has its own design. The blog must work on today's host and on SiteGround
  without changes.

## Anti-goals (a failure even if it technically works)

- Any existing URL breaking: `/`, `/about`, `/work-with-me`, `/retreats` and its link preview, the `/lv`
  mirrors, the contact form.
- Content that is invisible until an animation runs. The repo rule is in CLAUDE.md: never hide anything
  until a real `requestAnimationFrame` has fired.
- Naming the print-on-demand business, its niche, theme or franchise. The START and REVIEW articles sit
  close to it. It is only ever "a print-on-demand ecommerce project".
- Figurative AI illustration. The CLAUDE.md "Section graphics" rule applies: abstract only.
- Cyan glow shadows coming back. CLAUDE.md says neon is section-level only.

## Decided by Rihards

- **Article page:** the normal site header and footer, with "Blog" in the menu. Topic, title, date and
  reading time sit on navy. The article body sits on warm white (`#fbfaf7`) in a narrow reading column.
  This was mockup B on 24 Oct, the same pattern as marketingaskola.lv's blog posts.
- **Front page:** cards, newest first. Each card has an abstract cyan line drawing in the homepage's
  blueprint style, a topic label and the title. This was mockup B on 24 Oct.
- **Destination:** the blog is where lead-magnet posts send people.
- **Hosting:** moving to SiteGround, so nothing here may depend on Lovable.

## Design

### Routes and menu

- Add `/blog` and `/blog/:slug` to `src/App.tsx`, above the catch-all. An unknown slug renders NotFound.
- Desktop menu: "Blog" as a route link next to About. It is not a homepage anchor like the other items.
  The desktop menu collapses below `lg`. Check that it still fits at `lg` with the extra item and the
  language switch, in both languages.
- Latvian menu (`/lv`): "Blogs" links to `https://marketingaskola.lv/blogs/`. There are no Latvian
  routes under `/lv/blog`.
- **Language switch on blog pages** (my call). Today the LV flag adds `/lv` to the current path, which
  would land on NotFound. On `/blog` pages, point the LV flag at `https://marketingaskola.lv/blogs/`
  instead, which matches the Latvian menu.
  - `LanguageSwitch` is shared with `/work-with-me`, so make this a small special case for paths
    starting with `/blog`.
  - Blog pages carry an English hreflang only, with no `lv` alternate.

### Articles as files

- One Markdown file per article in `src/content/blog/<slug>.md`. Front matter holds the title, a
  description of 160 characters or less, the date, the topic label and the drawing. Reading time is
  computed from the text.
- Render with a Markdown library that supports tables and fenced code. One new dependency is fine.
- Source text: convert each `public/kits/<name>.html` to Markdown.
  - Keep every table, code block, number and file link. The carousel kit's links to Supabase source files
    stay.
  - Drop the kit's own header, footer and "Comment KEYWORD" chips. The reader is already here.
  - Turn cross-kit references such as "the TEAM kit" into links to the matching article.
  - **Strip the hints at what the shop sells** (Rihards, 24 Oct). `25-iterations`, `ai-review-layer` and
    `carousel-generator` mention:
    - portraits and group portraits
    - canvas
    - glasses detection
    - a commissioning certificate
    - theme collections
    - iteration 03's copy that "leaned on explicit franchise terms"

    Reword all of these, and anything else that would let a reader guess the niche, into neutral terms
    such as "the product", "the photo check" or "the print". Keep the mechanism, the numbers and the
    lessons. This is the one sanctioned change to the kits' substance.
- **The kits' styled blocks stay styled** (my call). The kits are not plain prose: they hold about 30
  callouts, 29 cards in grids, 6 flow diagrams and bar charts, big stat lines such as "4 of 25",
  highlighted table rows, bold inside code, numbered section heads and the carousel kit's grid of PDF
  tiles. Flattening them would make sentences such as "Amber rows are the four AI ones" wrong.
  - Make one small, fixed set of blocks: callout, stat line, card grid, flow diagram and highlighted row.
  - Write them as plain HTML inside the Markdown, and style them once in CSS for the white page.
  - Cyan marks notes and amber marks warnings and highlights. Amber is the kits' own highlight colour.
    Red callouts become amber.
  - Later articles may use the same blocks. They are the only exception to "just Markdown".
- Starting slugs. Final names are the builder's call, but they must be stable once published:

  | Kit (current file) | Article |
  |---|---|
  | `marketing-department.html` | `/blog/marketing-department-on-claude-and-n8n` |
  | `ads.html` | `/blog/meta-ads-seven-rules` |
  | `carousel-generator.html` | `/blog/carousel-generator` |
  | `25-iterations.html` | `/blog/ecommerce-business-built-with-claude` |
  | `cheap-leads-postmortem.html` | `/blog/cheap-leads-post-mortem` |
  | `ai-review-layer.html` | `/blog/ai-review-layer` |

- Article dates: the day the blog launches, for all six. Later articles get their own publish day.

### Front page (`/blog`)

- Navy, like the rest of the site. A heading block, then a responsive card grid: two columns on desktop,
  one on phones.
- Cards use `.lift` on hover, the same as the homepage cards, with no glow.
- Drawings are inline SVG line art in cyan on navy: abstract, no text, no people, one per article,
  drawn in code. They follow the house style of `src/assets/gfx`, "engineering blueprint, flat vector,
  generous negative space". They are decorative, so `aria-hidden`.

### Article page (`/blog/<slug>`)

- **Navy block:** topic eyebrow (`.eyebrow`) with the reading time, the title (`.heading-elegant`), and
  "Rihards Zeila · <date>".
- **White reading block:**
  - About a 680px column, 18px `.body-clean` text, real `h2`/`h3` headings.
  - Tables scroll sideways on phones instead of breaking the page width.
  - Code blocks scroll sideways.
- **Links on white:** a darker cyan that passes WCAG AA (around `#0277a8`). Bright `#03c3f8` never
  appears as small text on white.
- **End of article:** a navy box inviting a consultation. Its button goes to the same contact target as the
  menu's "Book a consultation".
- **After that:** cards for the other articles, so readers keep moving through the site.

### Link previews

- Chat apps and LinkedIn read meta tags without running JavaScript. `/retreats` already solves this with a
  second HTML file, `retreats/index.html`.
- For the blog, a small Vite plugin runs inside `vite build`:
  - It writes `dist/blog/<slug>/index.html` for each article, and `dist/blog/index.html`.
  - Each is a copy of the built `index.html` with that page's title, description, canonical, `og:*` and
    `twitter:*` tags.
  - Because it is part of `vite build`, it works on any host that serves a real file before falling back
    to the SPA.
- `og:image`: one 1200×630 JPEG per article in `public/og/`. Make it the same way as `og-retreats.jpg`:
  `scripts/shoot.mjs` screenshots an HTML card with the title and drawing on navy.
- In the app, `usePageMeta` sets the title, description and canonical on both page types.
- Add `/blog` and the six articles to `public/sitemap.xml`.

### Old kit links

- Replace each `public/kits/<name>.html` with a tiny forwarding page. It holds a zero-second
  `meta refresh` to its article, a canonical link, and a visible "This kit moved to …" link. This works on
  any host. On SiteGround, `.htaccess` 301s replace the stubs, and that belongs to the hosting design.
- Once the blog is live, update the six `=== MAGNET URL ===` sections in the Notion calendar to the
  `/blog/` URLs. Rihards re-pins Featured to the blog links himself.

### Publishing and approval

- Rihards reviews each article before anything goes live. The builder shares screenshots at phone and
  desktop width from `scripts/shoot.mjs` plus the local dev URL. He says go, then it is pushed to `main`.
- All six launch together, because all six already exist as live kits. Until launch, the old kit pages
  stay as they are and keep working, so the LinkedIn posts from Mon 26 Oct don't wait on the blog.

### Verification

- `npm run build` and `npm run lint` pass.
- Every `/blog` page renders in headless Chrome through `scripts/shoot.mjs`, at 375px and desktop width,
  with no sideways page scroll. Do not use the Claude Code browser pane: it stops repainting this site.
- `dist/blog/<slug>/index.html` carries the right preview tags. After deploy, curl the live URL and grep
  the article's own title.
- Every old `/kits/` link lands on its article.
- No niche, theme or franchise words for the print-on-demand project in any article. Grep the six
  Markdown files for the words listed under "Strip the hints", plus the shop's real names. The real names
  are in the vault's project notes. Never write them into this repo, not even in a test file.

## Left to the builder

- The Markdown library, the final slugs, each drawing's design, spacing and type within the existing
  type system, and the reading-time formula.
- **The blog's heading:** the mockup used "Notes from the ad account" as a placeholder. Use plain "Blog"
  unless Rihards names it.

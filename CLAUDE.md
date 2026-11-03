# zeila-digital-atlas — rihardszeila.com

Personal site for Rihards Zeila. Vite + React 18 + TypeScript + Tailwind + shadcn/ui.
Originally built in Lovable; development moved local 2026-09-08.

## Commands

```sh
npm run dev      # vite dev server, port 8080 (fixed in vite.config.ts)
npm run build    # -> dist/
npm run lint
```

## Layout

Five routes in `src/App.tsx` (all but `/retreats` and `/blog` mirrored under `/lv`, see Languages), plus a NotFound catch-all:

- `/` — the consultation-led homepage (`pages/Index.tsx`). Section order matters: it
  runs offer → proof → process → credibility → close.
- `/about` — everything CV-shaped that doesn't sell a consultation: SpeakingTeaching,
  Timeline, Credentials. Nothing was deleted in the 2026-09-09 rebuild, it moved here.
- `/work-with-me` — the training landing page, kept as a subordinate deep link for
  universities and EU programmes. Has its own `.wwm-*` token scope and injects its own
  fonts (Fraunces / Inter Tight / JetBrains Mono) in a `useEffect`. **Deliberately not
  restyled** to match the homepage — it targets a different buyer.
- `/retreats` — added 2026-10-14, rebuilt four times that day. The outreach page sent to
  yoga and retreat centres: "The Season Residency", a marketer on site for a season, paid in
  a room and the practice. **Unlisted on purpose**: noindex, not in the nav or sitemap,
  English only with no `/lv` mirror, own header and footer. A room-and-board offer on the
  public consulting site would undercut the consulting rates.
  - **Link previews** come from `retreats/index.html`, a second Vite entry (see
    `vite.config.ts`) that the host serves for `/retreats`. Chat apps read meta tags without
    running JS, so `usePageMeta` can't reach them; without this file every shared link showed
    the consulting card. `public/og-retreats.jpg` is a headless-Chrome screenshot of a
    1200x630 HTML card over the shala photo.
  - It speaks the reader's language: the offer is a treatment menu ("Included" down the
    right, "The exchange" where the price goes), the hours are a day's rhythm (a sticky
    stage crossfades five photos while a sun travels a sunrise-to-sunset arc). **No
    timestamps on the routine** (Rihards, 2026-10-19): the moments have no times and the
    sun moves by their order, not a clock, the note is
    a postcard with a CSS-masked perforated stamp.
  - Look and motion: `.rt-theme` in index.css redefines the shadcn tokens (linen, ink,
    terracotta; `.rt-dark` olive band), Instrument Serif + Inter Tight, film grain. Anything
    that starts hidden is gated behind `.rt-live`, set from inside a real rAF; scroll-driven
    effects (`animation-timeline: view()`) only translate or fade words from 18%, never to 0.
  - Photos in `src/assets/retreat/` are gpt-image-2 mood shots ("warm analogue film, golden
    light, linen/terracotta/sage, no people, no text"). Keep them peopleless and placeless:
    on a page sent to real centres a figurative shot reads as a fake client or venue. Sora
    video (`/v1/videos`) 404s on this key and Higgsfield had 0 credits, so the hero moves
    with CSS (slow push + drifting light leak) rather than video.
  - **Verify with `node scripts/shoot.mjs URL OUTDIR WIDTH HEIGHT [#id|#id+px|px ...]`**,
    not the Claude Code browser pane: the pane stops repainting this page after a scroll
    (headline, photos and day strip all came back blank while the DOM was fine). The script
    drives headless Chrome over CDP, preloads lazy images and scrolls in steps so observers
    and scroll timelines fire.
- `/blog`, `/blog/:slug` — added 2026-10-24, the destination for the LinkedIn lead-magnet posts.
  It replaced the standalone kit pages. Design: `docs/superpowers/specs/2026-10-24-blog-design.md`.
  **English only.** Latvian articles live on marketingaskola.lv/blogs: the `/lv` menu's "Blogs" and the
  LV flag on blog pages (`LV_BLOG` in `i18n/lang.tsx`) go there, never to a `/lv/blog`.
  - **Articles** are `src/content/blog/<slug>.md` with flat front matter (`title`, `description` ≤160,
    `date`, `topic`, `drawing`, `order`), parsed by `src/lib/blog-core.ts` and rendered with `marked`.
    `drawing` keys a line drawing in `components/blog/drawings.tsx`. A new article is one file plus,
    if needed, one drawing.
  - **Styled blocks** are plain HTML in the Markdown, styled under `.article-body` in index.css:
    `.callout` (amber) / `.callout callout--cyan`, `.stat`, `.cards` > `.card`, `pre.flow`, `tr.hl` /
    `span.hl`. The article body is white (diagrams sit unframed on it); links and stats use `#0277a8`, never bright cyan.
  - **Link previews:** the `blogPreviews` plugin in `vite.config.ts` writes `dist/blog/<slug>/index.html`
    with each article's own tags, the same trick as `/retreats`. Images are `public/og/blog-<slug>.jpg`
    (1200×630, rendered from an HTML card with `scripts/shoot.mjs`).
  - **Never hint at what the print-on-demand shop sells** (Rihards, 24 Oct): no portraits, canvas,
    glasses, theme collections or franchise wording, and never its name, anywhere in this repo.
  - `public/kits/*.html` are now forwarding stubs to the articles, so old DM and Featured links still land.
  - **How articles are written: `docs/blog-style.md`** (Rihards, 2026-10-26: "make so that normal humans can
    understand and implement it"). Every article and future lead magnet is plain language for a non-developer:
    hook, "What you need", "How it works", numbered steps with copy-paste prompts, "Where it goes wrong",
    "Start here today", and all code/tables/internals folded into a `<details>` "For your developer" section.
    `BlogArticle` adds a Copy button to every prompt and code box.
  - Checks: `node src/lib/blog-core.test.ts` (parser and preview tags) and `node scripts/check-articles.mjs`
    (the article shape, no developer jargon or em dashes in the main text, 900 to 2,400 words, no shop hints,
    no kit leftovers).
- `src/components/ui/` is stock shadcn — don't hand-edit, regenerate.

## Languages (EN / LV)

Added 2026-09-29. English lives at `/`, Latvian mirrors every route under `/lv`
(`/lv`, `/lv/about`, `/lv/work-with-me`) — same components, the URL prefix picks the copy.

- `src/i18n/lang.tsx` — `useLang()` returns `{ lang, t, to }`. Copy is written inline as
  `t("English", "Latviski")` right next to the original, so editing one language makes the
  other visibly stale. `to("/about")` localises internal links; always use it for `<Link>`s.
- Data arrays that hold copy are functions of `t` (`const faqs = (t: T) => [...]`).
- `usePageMeta(title, description)` sets `<html lang>`, the title, the description and the
  **canonical** — index.html hard-codes the English canonical, and without the override
  every `/lv` page would be declared a duplicate of `/`. hreflang links are in index.html,
  `/lv` URLs are in `public/sitemap.xml`.
- `LanguageSwitch` — both flags, current one lit, top-right of the nav (and of the
  `/work-with-me` header). Flags are inline SVG because Windows shows flag emoji as letters.
- Latvian copy is written as Latvian, not translated line-by-line — short sentences, everyday
  words, no calques ("datplūsma", "nekā lieka", "melnā kaste"). It addresses the reader
  informally as "tu" (Rihards' call, 2026-09-30) — keep new copy in that register. Numerals stay in English format (`36.34`)
  because `useCountUp` parses `,` as a thousands separator.
- The desktop nav collapses to the hamburger below `xl` (was `lg`, before that `md`). The Blog item
  (2026-10-24) made the menu wrap at 1024 px in both languages and at 1280 px in Latvian.

## Type system

Two utility classes in `src/index.css` drive every heading and paragraph, so changing
them propagates site-wide:

- `.heading-elegant` — Archivo, bold, tracking-tight, **sentence case**. It used to
  apply `uppercase` globally; that was removed on purpose (all-caps at paragraph
  length is a readability problem). Don't put it back.
- `.body-clean` — Archivo 400.
- `.eyebrow` / `.numeral` — Orbitron. This is where the synthwave signature survives:
  small labels and stat numerals only, never running text.

## Motion

Added 2026-09-09 for "cool animations and SOME synthwave mood". The budget is
deliberately small — one orchestrated moment, not effects everywhere:

- `.synthwave-horizon` — a perspective grid receding to a glowing horizon, in the
  hero **only**. Magenta appears here and in `.eyebrow-rule`; nowhere else.
- `.rise` — staggered hero entrance, driven by inline `animationDelay`.
- `.lift` — cards translate up 3px on hover instead of glowing.
- `useCountUp` — stats tick up when scrolled into view.

Everything above is disabled under `prefers-reduced-motion: reduce`.

- `useReveal()` — sections rise in on scroll. `useReveal("card")` does the same
  per element, which is what the WhoFor / Engagements cards use so each one
  animates as *it* reaches the fold rather than all firing when the section top
  crosses it. `.stagger` (section-level, all at once) still exists for tight rows
  like ResultsBand.

## Hero composition

The horizon line is not decoration floating behind the hero — it is the ground
Rihards stands on, and it is aligned to the **middle of the CTA buttons**:

- the grid is `lg:items-end`, so both column bottoms meet on one baseline
- the portrait column carries `lg:pb-6` (24px = half a 48px button), which puts
  the line exactly on the buttons' mid-height
- `.hero-line` runs off to the right (`right: -60vw`) and `.hero-grid` recedes below it

Change the button padding and that alignment breaks — re-measure rather than eyeballing.

## Section graphics

`src/assets/gfx/*.webp` are generated (GPT 2.5, 2026-09-09) abstract schematics —
cyan line-art on the site navy, no text, no people. Prompts are recorded in the
session; the house style is "engineering blueprint, flat vector, generous negative
space". They are decorative: `alt=""` + `aria-hidden`, because the card heading
already carries the meaning. Keep them abstract — a figurative AI illustration
would reintroduce exactly the credibility problem the AI headshot had.

**The rule that matters here** — this bit the same way three times, so it is worth
stating plainly. **Never hide content until you have proven the render loop is
running.** `animation: … both` pins an element to the animation's *first* keyframe
when animations don't run, so "hide it, then animate it back" fails to permanently
invisible. A timer-based failsafe does not save you — it applies the same animation.
`useReveal` therefore arms only from inside a real `requestAnimationFrame` callback:
no frame ever painted ⇒ nothing is ever hidden.

**The corollary:** animation must never be what makes content correct
or visible. `useCountUp` renders the *real* string unless a live animation frame
overwrites it, so if `requestAnimationFrame` never runs the visitor sees "$5M+",
not "$0M+" — an earlier version got this backwards and rendered zeros. Same
principle as the `useScrollAnimation` note below. Neither rAF nor
IntersectionObserver fires inside the Claude Code browser pane, which is a useful
free test of these failure paths. `src/hooks/use-count-up.test.mjs` checks the
stat parser: `node src/hooks/use-count-up.test.mjs`.

**Neon is section-level only** (asked for 2026-09-09). Cyan marks main section eyebrows
and structural rules; it was deliberately stripped from card borders, hover states, the
CTA glow, and decorative glyphs. `border-hover` and `card-luxury` no longer carry glow
shadows. If a change starts adding `shadow-[0_0_Npx_rgba(3,195,248,...)]` back, that's
the thing that was removed on purpose.

## Backend

Supabase project `nxbphdutlskrslzbcknd`. **No database tables** — the only backend is
one edge function, `supabase/functions/send-contact-email`, which the contact form calls
via `supabase.functions.invoke`. It sends through Resend using the `RESEND_API_KEY`
secret set in the Supabase dashboard (not in this repo).

Deploy it with `supabase functions deploy send-contact-email` after `supabase link`.

## Photography

The real brand photo, sourced from marketingaskola.lv (`/img/team/rihards-founder-brand.webp`),
then **mirrored** so he faces into the copy, and **background-keyed to transparency**.

| File | Renders at |
|---|---|
| `src/assets/rihards-headshot.webp` | Homepage hero — sits directly on the section, no frame |
| `src/assets/rihards-about.webp` | `/about` and `/work-with-me` |
| `public/rihards-headshot.jpg` | `og:image` — flattened onto navy, 1000x1000. Social scrapers render alpha as black, so this one must stay opaque. |

**How the key was done, if it ever needs redoing:** the original background is a flat
`(2,13,28)`. Do *not* key on brightness — the subject's darkest neutrals reach `(14,14,14)`,
only ~18 units away, and a brightness key speckles holes through the shirt. Key on the blue
cast instead (`b - r > 9 and b < 70`), flood-filled inward from the frame edges so interior
dark pixels can't be reached. The `b < 70` guard is what protects the cyan disc.

Partner logos are WebP, downscaled to 600px wide (they render at 56px tall). They are
mid-grey source art, displayed with `brightness-0 invert` so they read as white on navy —
that lifted the strip from 2.40:1 to 12.85:1 contrast. Don't drop the invert.

## Gotchas

- **`.env` is committed on purpose.** It holds only `VITE_`-prefixed values — the Supabase
  URL, project ref, and the `anon` key — all of which Vite bakes into the client bundle
  anyway. Nothing secret is in it; don't "fix" it by gitignoring, that just breaks builds.
- **Hosting is SiteGround, deployed by GitHub Actions on every push to `main`** (since 2026-10-26;
  Lovable retired, it was too expensive for what it did). `.github/workflows/deploy.yml` runs these steps:
  1. `npm ci`, the two blog checks and `npm run build`.
  2. rsync of `dist/` over SSH into `www/rihardszeila.com/public_html` (`--delete`, `.well-known` kept).
  3. A file-count check on the server, a cache flush (`site-tools-client domain-all update id=1 flush_cache=1`)
     and a smoke test against the server's IP.

  A red run shows which step died. `gh workflow run deploy.yml` redeploys without a commit.
  - **SSH:** `u410-pxfgugn3qhhi@gnldm1126.siteground.biz`, port 18765, key `~/.ssh/rihardszeila_deploy`
    (no passphrase; public half imported in Site Tools → Devs → SSH Keys Manager as `github-deploy`). The
    same values are the repo's `SG_HOST`, `SG_PORT`, `SG_USER`, `SG_PATH` and `SG_SSH_KEY` secrets.
  - **DNS is at SiteGround** (`ns1/ns2.siteground.net`, set at the Namecheap registrar). The A records for
    `@` and `www` point to `35.214.201.215`. The A records still sitting in Namecheap's own zone are unused.
    Mail for the domain now routes to SiteGround (MX `mailspamprotection.com`); the old Namecheap email
    forwarding no longer applies, so any `@rihardszeila.com` forward lives in Site Tools → Email → Forwarders.
  - **TLS** is a Let's Encrypt wildcard (`*.rihardszeila.com` + apex) that SiteGround issues and renews.
  - **`public/.htaccess`** forces https without www, strips trailing slashes, serves `/retreats` and
    `/blog/<slug>` as their own preview files (`DirectorySlash Off` + an `index.html` rewrite), falls back to
    the SPA, and caches `/assets` for a year. Tested on a local Apache 2.4 and on the server.
    **SiteGround's nginx serves files that exist before `.htaccess` runs**, so the `/kits/*.html` 301s never
    fire: the forwarding stubs answer instead, and they're what makes old kit links work.
  - **Check a deploy** by asking for a title only the new commit has:
    `curl -s https://rihardszeila.com/blog/<slug> | grep -o '<title>[^<]*'`. The deploy's smoke test does
    the same against the server.
  - SiteGround's bot challenge sometimes answers datacenter IPs (GitHub runners) with a 202. The smoke test
    treats that as a warning, not a failure.
- **`useScrollAnimation` must never be the only thing making content visible.** Consumers
  gate sections behind `opacity-0`, so an IntersectionObserver that doesn't fire means
  content is invisible *forever*, not just un-animated. The hook now starts visible when
  IO is unavailable and has a 1.5s failsafe timer. (IO does not fire at all inside the
  Claude Code browser pane, which is how this surfaced.)
- `dist/assets/main-*.js` is ~806 kB, one chunk. The blog (marked + articles) is lazy-loaded into its own chunk so other pages never download it; keep it that way when adding articles.
- **Analytics are env-gated.** `src/lib/analytics.ts` injects GA4 only when
  `VITE_GA4_ID` is set in `.env`. It's empty, so nothing is measured yet.
- **Pricing is deliberately unpriced.** `Engagements.tsx` and `FAQ.tsx` describe how
  pricing is structured but publish no figures — Rihards has not set them. Both carry
  a `TODO (Rihards)` comment. Don't invent numbers.
- The homepage is ~12,900 px at 375 px wide. That's *longer* than the pre-rebuild
  page, but the composition inverted: ~44% offer where it used to be ~45% résumé.
- `synthwave-v1` (tag) and `archive/synthwave-v1` (branch) hold the pre-rebuild site
  at commit `99bf3b9`, including the 7.86 MB background music and the neon assets.
  `git worktree add ../zeila-synthwave-v1 synthwave-v1` to look at it.

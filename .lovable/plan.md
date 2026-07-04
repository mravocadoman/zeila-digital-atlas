
## Goal

Turn `/work-with-me` into a fully standalone landing page for Rihards as a **Digital Marketing Trainer & Workshop Facilitator**. It should not be discoverable from the main site's navigation — it lives as its own destination (for LinkedIn bio, proposals, RFPs, email signatures). Redesign typography and visual system so it speaks to L&D leads, deans, program directors, and corporate training buyers — not the neon-80s homepage audience.

## Changes

### 1. Remove from main navigation

- `src/components/Navigation.tsx`: drop the `"Work With Me"` item from `navItems`. Also remove the `item.href.startsWith("/")` branch since it's no longer needed (both desktop and mobile handlers).
- Route stays registered in `src/App.tsx` — page is reachable by direct URL only.

### 2. New design direction: "Editorial Enterprise"

Move away from the current navy-only "Modern Enterprise" tokens toward something more grown-up, closer to how HBS Executive Education, IMD, INSEAD Executive, Reforge, and Section land visually. Serious, editorial, confident — not corporate-stock.

**Palette (replaces current `.wwm-theme` tokens):**
- Ivory background `#f5f2ec`
- Deep ink text `#0e1116`
- Warm charcoal surfaces `#1a1d24`
- Muted terracotta accent `#b8543a` (single accent, used sparingly for CTA + eyebrows)
- Warm gray dividers `#d9d4c9`
- Sand card surface `#ece7dc`

Dark inversion band(s) for hero + testimonials + CTA (`#0e1116` on ivory text) to create editorial rhythm.

**Typography (new fonts, not Orbitron/Rajdhani):**
- Headings: **Fraunces** (serif, high-contrast, editorial) — display sizes with tight tracking
- Body: **Inter Tight** (or system sans fallback) at 18–20px, generous leading
- Eyebrows/meta: uppercase Inter Tight, 0.7rem, 0.22em tracking
- Loaded via `<link>` tags injected in the page's `useEffect` so they don't affect the homepage bundle

**Motion & surfaces:**
- Thin 1px hairline borders in `rgba(14,17,22,0.08)`
- No glows, no gradients on cards
- Subtle scroll fade-and-rise via existing `useScrollAnimation`
- Numbers set in Fraunces italic for stat tiles (editorial signature)

### 3. Page structure adjustments

Reuse the sections built previously but re-skinned:

```text
/work-with-me
├─ Slim top bar: wordmark left, "Book a training" CTA right (no back-to-home link)
├─ Hero (ivory)
│   • Eyebrow: "Digital Marketing Training"
│   • H1 in Fraunces: "Training that turns marketing teams into operators."
│   • Sub: MBA lecturer / LIFT / ITC / 10+ yrs / $5M ad spend
│   • Primary CTA + secondary "See programs"
│   • Small "Trained teams at" logo row
├─ Stat strip (4 tiles, Fraunces italic numerals)
├─ Who I train (3 columns)
├─ Training formats (4 offerings)
├─ Curriculum accordion
├─ Selected programs & institutions (editorial list, year on the left)
├─ Testimonials (dark band, pull-quote treatment)
├─ How an engagement works (4-step timeline)
├─ FAQ
├─ Inquiry form (unchanged wiring — same edge function)
└─ Minimal footer inside the page (name + email + year), not the homepage Footer
```

### 4. Files touched

- `src/index.css` — replace `.wwm-theme` block with the new ivory/ink token set + font-family overrides scoped under `.wwm-theme`.
- `src/pages/WorkWithMe.tsx` — inject Fraunces + Inter Tight `<link>` tags; drop homepage `Footer` usage; add compact in-page footer.
- `src/components/work-with-me/*` — restyle only (no structural changes to hero/stats/audiences/formats/curriculum/programs/process/faq/contact form). Swap `wwm-cta` gradient for solid terracotta, cards to sand surface with hairline borders, headings to Fraunces via a `.wwm-display` utility.
- `src/components/Navigation.tsx` — remove Work With Me link + the `/`-href branch.

### 5. Out of scope

- No changes to homepage sections.
- No changes to backend / edge function.
- No new routes, no auth, no CMS.



## Goal

Create a dedicated sub-page at **`/work-with-me`** that promotes Rihards as a **Digital Marketing Trainer & Workshop Facilitator** — targeted at universities, business schools, corporate L&D teams, NGOs, government programs (LIFT/ITC-style), and SME cohorts. Design should feel professional, modern, and confident — clearly distinct from the neon-80s homepage — while still cool.

## Design direction: "Modern Enterprise"

- **Palette (new tokens, scoped to this page):**
  - Deep navy background `#0f1b3d`
  - Mid navy surfaces `#1e3a5f`
  - Steel-blue accent `#3b6fa0`
  - Off-white text `#e8edf3`
  - Pure white for hero headline emphasis
- **Typography:** keep project fonts (Orbitron / Rajdhani) so brand stays consistent, but restyle: tighter tracking, no neon text-shadow on this page's headings, more editorial spacing. Body text at 18–20px, generous line-height.
- **Feel:** crisp SaaS/consultancy — thin dividers, subtle 1px borders in `rgba(255,255,255,0.08)`, soft blue glow only on primary CTA, no scanlines/palms/synthwave. Rounded-md, not neon boxes.
- **Motion:** quiet fade-and-rise on scroll (reuse `useScrollAnimation`), a slow subtle gradient wash in the hero, hover lift on cards. No marquee, no video background.

## Page structure

```text
/work-with-me
├─ Sub-page top bar (back to home + logo/name + Book a training CTA)
├─ Hero
│   • Eyebrow: "Digital Marketing Trainer & Workshop Facilitator"
│   • H1: "Train your team to run digital marketing that actually performs."
│   • Sub: 2–3 lines positioning (MBA lecturer at Riga Business School,
│     EU-funded LIFT program lead, ITC workshop facilitator, 10+ yrs,
│     $5M/yr ad spend managed).
│   • Primary CTA → scroll to inquiry form. Secondary → "See past programs".
│   • Right side: portrait + small "trusted by" logo row (reuse Partners logos).
├─ Credibility strip
│   • 4 stat tiles: 10+ yrs · 20+ programs delivered · 3 universities · €10M+ revenue driven
├─ Who I train
│   • 3 cards: Universities & Business Schools · Corporate & SME teams · NGOs & Public programs
├─ Training formats
│   • 4 offerings, each with outcome + duration + ideal audience:
│       1. Meta Ads Intensive (1-day workshop)
│       2. Digital Marketing Growth Strategies for SMEs (multi-session)
│       3. Custom MBA / BBA modules (semester-long)
│       4. Team enablement & automation coaching (retainer)
├─ Curriculum snapshot
│   • Accordion / tabbed list of topics I teach (strategy, Meta ads,
│     funnels, automation, analytics, creative, AI in marketing).
├─ Selected programs & institutions
│   • Editorial list pulled from SpeakingTeaching data:
│     Riga Business School (MBA), RISEBA (BBA), University of Lusaka,
│     LIFT Program, International Trade Centre, Latvijas Digitālo
│     ekspertu biedrība, Vidusdaugavas NVO centrs, Medijpratējs,
│     RBS Executive Education. Each with year + one-line context.
├─ Testimonials (2–3, restyled cards on navy)
├─ How an engagement works
│   • 4-step timeline: Discovery call → Curriculum design → Delivery →
│     Post-training support.
├─ FAQ
│   • Format (in-person/remote/hybrid), languages (EN/LV), group size,
│     recording rights, pricing model.
├─ Inquiry form (new, same backend as homepage form)
│   • Fields: Name, Email, Organization, Program type, Message.
│   • Program type options: workshop, mba-module, corporate-training,
│     public-program, other.
│   • Reuses existing `send-contact-email` edge function with an added
│     `organization` field and expanded ALLOWED_TYPES.
└─ Slim footer (reuse existing Footer, or a compact variant)
```

## Content sources

- Existing site: `About.tsx` stats, `SpeakingTeaching.tsx` programs, `Testimonials.tsx`, `Partners.tsx` logos, `Hero.tsx` headshot.
- Web research (LinkedIn `rihards-ze`, published site, RBS/RISEBA/LIFT/ITC pages) — used only to enrich program descriptions and titles; no fabricated claims. If a fact can't be verified, it stays out.

## Routing & navigation

- Add `<Route path="/work-with-me" element={<WorkWithMe />} />` in `App.tsx`.
- Add a subtle "Work with me" link in the main site's `Navigation` (desktop + mobile) so visitors can discover the page.
- Sub-page uses its own lightweight top bar (not the neon nav) with a "← Back to main site" link.

## Technical notes

- **New files:**
  - `src/pages/WorkWithMe.tsx` — page composition.
  - `src/components/work-with-me/` — `WWMNav.tsx`, `WWMHero.tsx`, `WWMStats.tsx`, `WWMAudiences.tsx`, `WWMFormats.tsx`, `WWMCurriculum.tsx`, `WWMPrograms.tsx`, `WWMProcess.tsx`, `WWMFAQ.tsx`, `WWMContactForm.tsx`.
- **Styling isolation:** wrap the page in a `.wwm-theme` root that overrides the design tokens via CSS custom properties so the neon tokens don't bleed in:
  ```css
  .wwm-theme {
    --background: 220 55% 15%;
    --foreground: 215 30% 94%;
    --card: 216 52% 24%;
    --primary: 210 47% 43%;
    --border: 215 30% 94% / 0.08;
    /* etc. */
  }
  ```
  Removes neon text-shadow via `.wwm-theme h1, .wwm-theme h2 { text-shadow: none; }`.
- **Contact form:**
  - New `WWMContactForm.tsx` posts to the existing `send-contact-email` function.
  - Edge function updated to accept optional `organization` (max 150 chars, escaped) and to add new `type` values: `workshop`, `mba-module`, `corporate-training`, `public-program`. Backwards compatible with existing homepage form.
  - Redeploy `send-contact-email` after the change.
- **SEO:** update `index.html` fine, but React Helmet isn't installed; instead set a per-route `document.title` and `<meta name="description">` via a small `useEffect` in `WorkWithMe.tsx` (title: "Digital Marketing Trainer & Workshop Facilitator — Rihards Zeila"; description under 160 chars).
- Reuse `useScrollAnimation` hook, shadcn `Accordion`, `Card`, `Button`, `Input`, `Textarea`, `Select`.

## Out of scope

- No changes to homepage layout beyond adding the nav link.
- No new backend tables or auth.
- No paid-ads landing-page copywriting for consulting services (this page is training-focused per your choice).

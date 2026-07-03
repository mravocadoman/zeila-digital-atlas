# Homepage Medium Refresh

Goal: sharper conversion, better hierarchy, more current content — without touching the 80s neon brand.

## Guiding rules
- Keep neon palette, Orbitron/Rajdhani, glow accents.
- Tone down glow only where it hurts readability (long body copy).
- Body text stays `text-lg lg:text-xl` (project standard).
- No structural rewrites of sections that are already working (Hero, Timeline, Credentials, Footer, Partners).

---

## Section-by-section changes

### 1. Hero (`Hero.tsx`) — light polish
- Add a small secondary CTA next to "GET IN TOUCH": **"See Training & Workshops →"** linking to `/work-with-me`. Currently there is no entry point to the new sub-page from the hero.
- Add 3 tiny trust chips under the sub-headline (e.g. "10+ yrs · €10M+ revenue · 36× best ROAS") so the value prop is visible before scrolling.
- Fix the odd `text-[9vw]` H1 sizing on small screens — clamp so it never overflows on 320px.

### 2. About (`About.tsx`) — content bump
- Update stat tiles to a 4-up grid instead of 3-up: add a fourth stat (e.g. "50+ Brands" or "€5M yearly ad spend managed") to fill the horizontal space better and reinforce scale.
- Reword the paragraph so it leads with the outcome, not the title. Draft:
  > "For 10+ years I've built and scaled paid-media systems that turn ad spend into predictable revenue — up to $5M/year managed, 36× peak ROAS, €10M+ generated."
- Keep heading style.

### 3. Partners (`Partners.tsx`) — leave as-is (recently fixed).

### 4. Case Studies (`CaseStudies.tsx`) — medium refresh
- Add a compact **summary strip above the slider**: 5 client logos or names + aggregated stat ("5 case studies · €1M+ generated · avg 15× ROAS"). Gives skimmers instant proof without clicking through.
- Add keyboard arrow-key nav + swipe on mobile (currently button/dot only).
- Add a **thin filter/tag row** ("E-commerce · Coaching · B2B · Education") that jumps the slider to the matching case, so visitors self-qualify.
- Consider adding one recent 2025/2026 case if Rihards has one — placeholder in code, content TBD.

### 5. SpeakingTeaching (`SpeakingTeaching.tsx`) — add bridge to /work-with-me
- Add a prominent CTA card at the end: **"Book a workshop or training → /work-with-me"** styled with `card-luxury`. Right now the sub-page is only reachable from the nav.

### 6. FreeTraining (`FreeTraining.tsx`) — light polish
- Add a view/subscriber count line under the description if available ("Watched by X marketers"). If not, skip.
- Add secondary CTA: **"Prefer a live workshop? →"** linking to `/work-with-me`.

### 7. Timeline (`Timeline.tsx`) — content only
- Add a 2025–2026 entry so the timeline doesn't feel stale. (Content TBD — placeholder entry with a note to fill in.)

### 8. Testimonials (`Testimonials.tsx`) — modernize
- Switch from double-accordion to a 2-column grid of always-visible quote cards (still short — cap ~180 chars, with "Read more" toggle). Accordions currently hide the strongest social proof behind a click.
- Add author role subline separate from company.
- Restyle cards with `card-luxury` + subtle cyan left border.

### 9. Credentials (`Credentials.tsx`) — leave as-is (already accordion-hidden per strategy).

### 10. ContactForm (`ContactForm.tsx`) — light polish
- Add "workshop" and "training" to the inquiry type dropdown so homepage form matches the expanded backend enum shipped with `/work-with-me`.
- Reduce the YouTube background iframe intensity (opacity/overlay) — currently it can be distracting behind the form on some viewports.
- Update sub-headline from "Open to high-impact projects, co-founder opportunities, and CMO roles" to also mention "workshops & training".

### 11. Navigation (`Navigation.tsx`) — small
- Make "Work With Me" visually stand out (e.g. cyan outline pill) instead of blending with anchor links, since it's the primary conversion path for training leads.

### 12. SEO (`index.html`) — content refresh
- Refresh `<title>` and `<meta description>` if they still reference an older positioning. Add "training" and "workshops" keywords.
- Verify `sitemap.xml` includes `/work-with-me`.

---

## Out of scope
- No visual redesign / new theme.
- No new backend tables or auth changes.
- No changes to Hero background art, BackgroundMusic, WorldMap, ROASChart, Blog, Resources.
- No content invented for the new Timeline entry or 2026 case study — will use clearly-marked placeholders for you to fill in.

## Files touched
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/CaseStudies.tsx`
- `src/components/SpeakingTeaching.tsx`
- `src/components/FreeTraining.tsx`
- `src/components/Timeline.tsx`
- `src/components/Testimonials.tsx`
- `src/components/ContactForm.tsx`
- `src/components/Navigation.tsx`
- `index.html`
- `public/sitemap.xml` (if `/work-with-me` missing)

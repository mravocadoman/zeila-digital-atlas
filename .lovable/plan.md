
## Goal

Keep the editorial, standalone character of `/work-with-me` — but stop it from reading as a beige business-school brochure. Bring back real color, personality, and a few "wtf that's cool" moments, without dragging the neon homepage aesthetic over.

## Design shift: "Editorial, but loud"

Think *The Face* magazine, Reforge landing pages, Pentagram case studies, Bloomberg Businessweek covers — serif headlines colliding with saturated color blocks, oversized numerals, tight grids broken on purpose.

### Palette (revised `.wwm-theme` tokens)

Keep the ivory + ink base, keep terracotta — but promote color from "one small accent" to "structural":

- `--wwm-ivory: #f2ede3` (slightly warmer)
- `--wwm-ink: #0e1116`
- `--wwm-accent: #e2542c` (brighter, more confident terracotta/vermilion)
- `--wwm-electric: #2a3bff` (deep electric blue — for links, underlines, quote marks)
- `--wwm-acid: #d6ff3d` (acid lime — used ONCE, on the hero highlight + one CTA state)
- `--wwm-plum: #3a1f2b` (deep aubergine — alt dark band, warmer than pure ink)

Two dark bands instead of one: `--wwm-ink` for testimonials, `--wwm-plum` for the process/CTA band, so the page has real chromatic rhythm.

### Typography — keep Fraunces, make it misbehave

- Fraunces stays for headlines but pushed to display weights (900) with heavy optical size and `-0.04em` tracking on the hero.
- Add **Fraunces italic** as an in-line highlight inside sans headlines (mixed serif italic + sans = editorial signature move).
- Body swaps to **Inter Tight** at 18px, but eyebrows become **JetBrains Mono** uppercase — mono meta labels give it a technical/operator edge rather than corporate polish.
- H1 gets a hand-drawn acid-lime underline SVG on one word.

### Structural funk

- **Hero**: massive Fraunces H1, one word wrapped in `<em>` styled with acid underline. Right column: not a grayscale portrait — a duotone treatment (ink + terracotta) of the headshot with a hard color block behind it, slightly rotated (-2deg).
- **Stat strip**: numerals in Fraunces italic at 8rem, each tile a different accent color background (ivory / terracotta / electric blue / plum), rotating through the palette.
- **Curriculum accordion**: numbered `01 — 07` in mono on the left, serif title, plus-icon that rotates on open.
- **Testimonials dark band**: giant electric-blue `"` glyph as decorative pull-quote mark, sized ~12rem behind the text.
- **Programs list**: editorial two-column with year on the left in mono, program in serif, hairline dividers — but hovered row slides right 8px and reveals a terracotta bar on the left edge.
- **Process (plum band)**: 4 steps, each step numbered in acid lime, arranged in a broken grid (offset every other tile) rather than a straight row.
- **Contact form**: keep functional wiring, but wrap it in a terracotta color block with the form itself on ivory inside — makes it feel like a "call-out" spread in a magazine.

### Motion

- Hero headline: word-by-word rise on mount (150ms stagger).
- Stat numerals: count up on scroll into view.
- Accent underline SVG: draws in on hero mount.
- Row hover on programs: 200ms ease-out slide + color reveal.
- Nothing bounces, nothing pulses. Editorial motion = precise, not playful.

## Files touched

- `src/index.css` — extend `.wwm-theme` block with new tokens (electric, acid, plum), add JetBrains Mono via `<link>` in page, add `.wwm-accent-underline`, `.wwm-mono`, `.wwm-plum-band`, hover states for program rows.
- `src/pages/WorkWithMe.tsx` — inject JetBrains Mono link tag alongside Fraunces + Inter Tight; restructure hero (duotone image block + rotated frame + acid underline); repaint stat strip with rotating tile colors; add plum band around process section; wrap contact section in terracotta block.
- `src/components/work-with-me/*` — restyle only. No component API changes, no new routes, no backend edits.
- Navigation stays unchanged (still hidden from nav).

## Out of scope

- Homepage.
- Backend / edge function.
- New routes, auth, CMS.
- Framer Motion install — motion done with CSS + existing `useScrollAnimation`.

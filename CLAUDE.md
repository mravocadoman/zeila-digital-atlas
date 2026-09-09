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

Three routes in `src/App.tsx`, plus a NotFound catch-all:

- `/` — the consultation-led homepage (`pages/Index.tsx`). Section order matters: it
  runs offer → proof → process → credibility → close.
- `/about` — everything CV-shaped that doesn't sell a consultation: SpeakingTeaching,
  Timeline, Credentials. Nothing was deleted in the 2026-09-09 rebuild, it moved here.
- `/work-with-me` — the training landing page, kept as a subordinate deep link for
  universities and EU programmes. Has its own `.wwm-*` token scope and injects its own
  fonts (Fraunces / Inter Tight / JetBrains Mono) in a `useEffect`. **Deliberately not
  restyled** to match the homepage — it targets a different buyer.
- `src/components/ui/` is stock shadcn — don't hand-edit, regenerate.

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
- `lovable-tagger` is still a devDependency wired into `vite.config.ts` (dev mode only).
  Harmless; remove it only when Lovable is fully retired.
- **Hosting stays on Lovable; deploys happen by pushing to `main`.** rihardszeila.com is
  the custom domain on the published Lovable app (`zeila-digital-atlas.lovable.app`,
  185.158.133.1, Cloudflare in front, DNS at Namecheap). Lovable mirrors GitHub `main`, so
  the release step is `git push origin main` — nothing is deployed until you push.
  After pushing, confirm the live site actually rebuilt:

  ```sh
  npm run build && grep -o 'assets/index-[A-Za-z0-9_-]*\.css' dist/index.html
  curl -s https://rihardszeila.com | grep -o 'assets/index-[A-Za-z0-9_-]*\.css'
  ```

  Same hash = live matches your build. If it lags, hit Publish in the Lovable editor
  (project `8429d805-0601-4a02-b9ce-60c38237c9d0`) — whether Lovable republishes on
  every push automatically is unconfirmed.
- **`useScrollAnimation` must never be the only thing making content visible.** Consumers
  gate sections behind `opacity-0`, so an IntersectionObserver that doesn't fire means
  content is invisible *forever*, not just un-animated. The hook now starts visible when
  IO is unavailable and has a 1.5s failsafe timer. (IO does not fire at all inside the
  Claude Code browser pane, which is how this surfaced.)
- `dist/assets/index-*.js` is ~721 kB — single chunk, no code splitting. Fine for now.
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

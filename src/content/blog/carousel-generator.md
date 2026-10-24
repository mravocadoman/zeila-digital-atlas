---
title: 200 LinkedIn carousels for €0. No Canva. No designer.
description: One Python file turns a finished post into a branded PDF carousel. Offline, free per deck, with the spec format, the prompt and the full code.
date: 2026-10-26
topic: Tools
drawing: slides
order: 3
---

One Python file turns a finished post into a branded PDF carousel. Runs offline, costs nothing per deck, and produces the one format LinkedIn still gives away reach to.

## 00 · Why bother

LinkedIn treats a PDF as a *document post* — the swipeable card format — and document posts consistently out-engage plain text and single images. They also hold people on the post for longer, which is the signal that actually moves distribution.

The catch has always been production. A carousel is eight slides of design work, and designing eight slides in Canva three times a week is a part-time job you will quit by week four. Templates help until the text does not fit and you spend twenty minutes nudging a text box.

So: no design step. A JSON file describes the deck, the generator lays it out, type auto-shrinks to fit, every slide is optically centred. Text length and slide count can vary freely and nothing ever overflows.

<div class="callout callout--cyan">
  <p><b>Cost per deck: zero.</b> No API call, no subscription, no font licences. It uses the
  fourteen fonts every PDF reader already has, which is also why each deck weighs about 7 KB
  instead of 400 KB. Run it two hundred times; the bill is the same.</p>
</div>

## 01 · Eight decks made with it

Open a few before you read the code. Every one of these went out as a LinkedIn document post.

<div class="cards">
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/roas.pdf"><b>ROAS is mostly product, not skill</b><span>7 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/ads-library.pdf"><b>I killed a business idea with the Ads Library</b><span>7 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/cheap-leads.pdf"><b>€0.38 a lead. 2% bought.</b><span>6 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/ai-review-layer.pdf"><b>An AI that reviews another AI&#x27;s work</b><span>6 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/ux-older-buyers.pdf"><b>Designing AI for people who distrust AI</b><span>6 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/photos-commission.pdf"><b>The best sales training I ever got</b><span>6 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/trust-checklist.pdf"><b>Selling a product that can fail</b><span>5 slides · PDF</span></a>
    <a class="card" href="https://yxdtomxgsqaguqjhutgq.supabase.co/storage/v1/object/public/post_files/latvian-ads.pdf"><b>Meta ads in a two-million-person market</b><span>5 slides · PDF</span></a>
</div>

## 02 · How it works

Five slide types. That is the whole vocabulary, and the constraint is the point — a deck that needs a sixth type is usually a deck that needs cutting.

<table>
  <thead><tr><th>Type</th><th>Fields</th><th>Use for</th></tr></thead>
  <tbody>
    <tr><td>cover</td><td>headline, kicker, swipe</td><td>Slide 1. The hook, verbatim from the post's first line.</td></tr>
    <tr><td>bignum</td><td>eyebrow, number, label, body, red</td><td>One figure as the hero. <code>red: true</code> flips the accent for bad news.</td></tr>
    <tr><td>statement</td><td>eyebrow, headline, body</td><td>A claim that needs room to land.</td></tr>
    <tr><td>list</td><td>eyebrow, headline, items[]</td><td>The mechanism. Three to five items. This is the slide people screenshot.</td></tr>
    <tr><td>outro</td><td>headline, body, name, tagline, cta</td><td>The takeaway, then the follow prompt.</td></tr>
  </tbody>
</table>

### A real spec, end to end

This is the file behind the "€0.38 a lead" deck above — nothing removed:

```
{
  "title": "Cheap leads vs good leads",
  "slides": [
    {"type":"cover","headline":"€0.38 a lead.\n2% bought.","kicker":"I was proud of that number for about a week.","swipe":true},
    {"type":"bignum","eyebrow":"The vanity number","number":"€0.38","label":"per email signup","body":"A webinar campaign. 2,000+ signups, dirt cheap, dashboard glowing. Then the sales data came in."},
    {"type":"bignum","eyebrow":"The real number","number":"2%","label":"of those signups bought anything","body":"The algorithm did exactly what I asked. I optimised for form-fills, so it found the people of this world who fill forms.","red":true},
    {"type":"statement","eyebrow":"The mechanism","headline":"Filling the form was the conversion.","body":"Buying was never part of the deal.\n\nMeta optimises toward the event you name. Name the wrong one and it will hit it perfectly."},
    {"type":"list","eyebrow":"The fix","headline":"How to stop buying form-fillers","items":["Optimise for the event closest to money that still gets volume - purchases if you can, high-intent steps if you cannot.","Cheap leads are cheap because the platform knows something about them that you do not yet.","A lookalike built on form-fillers finds more form-fillers. The seed defines the harvest.","If volume is too low to optimise for purchases, that is a funnel-economics problem. The ads are not the fix."]},
    {"type":"outro","headline":"The metric you optimise for is the product you are buying from the algorithm.","body":"Buy carefully.","cta":"Follow for the numbers with the caveats attached."}
  ]
}

```

Then:

```
python3 carousel.py cheap-leads.json cheap-leads.pdf
```

## 03 · The prompt that writes the spec

You do not hand-write JSON. You hand the model the finished post and this prompt, and it returns the spec. Constraints do the work — especially the two rules that stop a model inventing numbers and stop it padding to eight slides.

```
You turn a finished LinkedIn post into a carousel spec for carousel.py.

RULES
- 5 to 8 slides. Fewer is better. Never pad.
- Slide 1 is `cover`: a drawn visual hook (pick one art_* helper: tiles, toggle, bars2, code_to_slide, clock, circles2, gauge) above the headline. The headline is the post&#x27;s opening line, VERBATIM, with the one number or noun that carries it wrapped in **double asterisks** (it takes the accent colour).
  Use \n for a deliberate line break. Under 12 words.
- The last slide is `outro`: the takeaway, then the follow prompt.
- Between them, choose types by what the content actually is:
    bignum     one figure as the hero. Use it whenever a number carries the point.
               `red: true` for the number that is bad news.
    statement  a claim that needs room to land. Eyebrow + headline + short body.
    list       3 to 5 items. This is the slide people screenshot. Every deck needs one.
- EVERY number must appear in the source post. Invent nothing. If the post
  says "most", the slide says "most" - not "80%".
- No slide body over ~40 words. If it does not fit, it is two slides or it is cut.
- Voice: flat, specific, no hype adjectives. Same voice as the post.

OUTPUT
JSON only, no fence, matching this shape:
{"title": "...", "slides": [ {...}, ... ]}
```

<div class="callout">
  <p><b>The rule that matters most:</b> <em>every number must appear in the source post.</em>
  Left unconstrained, a model will happily turn "most of them" into "80%" because
  a specific number looks better on a slide. It looks better right up until someone asks
  where it came from.</p>
</div>

## 04 · The generator

About two hundred lines. Only dependency is `reportlab` (`pip install reportlab`). Save it as `carousel.py`:

```
#!/usr/bin/env python3
"""Brand carousel generator for LinkedIn document posts.

Renders native vector text with reportlab: crisp at any zoom, selectable,
and ~20x smaller than a rasterised deck (matters because the PDF has to be
moved into Supabase storage as base64 for Zernio to fetch).

Spine: navy #00152c, white + cyan #03c3f8, red #ff2b2b, amber #ffb020.
Usage: python3 carousel.py spec.json out.pdf
"""
import json, sys
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

PT_W, PT_H = 540, 675                 # 1080x1350 at 2x, in points
S = PT_W / 1080.0                     # design px -> pt
MARGIN, TOP_SAFE, BOT_SAFE = 84 * S, 150 * S, 1180 * S

BRAND = "acquisition.md"              # footer wordmark, every slide

def rgb(h):
    h = h.lstrip("#")
    return Color(*(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4)))

NAVY, CYAN, WHITE = rgb("00152c"), rgb("03c3f8"), rgb("ffffff")
RED, BODY, MUTED = rgb("ff2b2b"), rgb("d6e2ee"), rgb("849cb2")

# Base-14 PDF fonts: zero embedding, ~8x smaller files. WinAnsi covers EUR and
# Western European accents. Latvian diacritics are NOT covered - LV decks must
# switch EMBED_FONTS on (see below).
EMBED_FONTS = False
if EMBED_FONTS:
    pdfmetrics.registerFont(TTFont("Head", "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"))
    pdfmetrics.registerFont(TTFont("Body", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont("BodyB", "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"))
else:
    pdfmetrics.registerFont(pdfmetrics.Font("Head", "Helvetica-Bold", "WinAnsiEncoding"))
    pdfmetrics.registerFont(pdfmetrics.Font("Body", "Helvetica", "WinAnsiEncoding"))
    pdfmetrics.registerFont(pdfmetrics.Font("BodyB", "Helvetica-Bold", "WinAnsiEncoding"))

def sw(t, font, size): return pdfmetrics.stringWidth(t, font, size)

def wrap(text, font, size, max_w):
    out = []
    for para in str(text).split("\n"):
        if not para.strip():
            out.append(""); continue
        cur = ""
        for word in para.split():
            t = (cur + " " + word).strip()
            if sw(t, font, size) <= max_w: cur = t
            else:
                if cur: out.append(cur)
                cur = word
        if cur: out.append(cur)
    return out

def fit(text, max_w, max_h, start, floor, lead=1.06):
    size = start
    while size > floor:
        ls = wrap(text, "Head", size, max_w)
        if len(ls) * size * lead <= max_h: return size, ls, size * lead
        size -= 2
    return floor, wrap(text, "Head", floor, max_w), floor * lead

# ---- elements: (height, draw_fn) with y measured downward from the top ----
def e_rule(w=150, h=10, gap=44, color=CYAN):
    w, h, gap = w * S, h * S, gap * S
    def d(c, y):
        c.setFillColor(color); c.rect(MARGIN, PT_H - y - h, w, h, stroke=0, fill=1)
    return (h + gap, d)

def e_lines(lines, font, size, lh, color, gap=0):
    def d(c, y):
        c.setFont(font, size); c.setFillColor(color)
        yy = y
        for ln in lines:
            if ln: c.drawString(MARGIN, PT_H - yy - size, ln)
            yy += lh
    return (len(lines) * lh + gap, d)

def e_text(text, font, size, color, lead=1.36, gap=0, max_w=None):
    max_w = max_w or (PT_W - 2 * MARGIN)
    return e_lines(wrap(text, font, size, max_w), font, size, size * lead, color, gap)

def e_bullets(items, size, color, lead=1.36, item_gap=28):
    item_gap *= S
    indent, lh = 68 * S, size * lead
    wrapped = [wrap(i, "Body", size, PT_W - MARGIN - indent - MARGIN) for i in items]
    total = sum(len(w) * lh + item_gap for w in wrapped) - item_gap
    def d(c, y):
        yy = y
        for ws in wrapped:
            c.setFillColor(CYAN)
            c.rect(MARGIN, PT_H - yy - lh * 0.52, 38 * S, 6 * S, stroke=0, fill=1)
            c.setFont("Body", size); c.setFillColor(color)
            for ln in ws:
                c.drawString(MARGIN + indent, PT_H - yy - size, ln)
                yy += lh
            yy += item_gap
    return (total, d)

def page(c, elements, footer=None, anchor=0.46):
    c.setFillColor(NAVY); c.rect(0, 0, PT_W, PT_H, stroke=0, fill=1)
    total = sum(h for h, _ in elements)
    y = TOP_SAFE + max(0, (BOT_SAFE - TOP_SAFE - total) * anchor)
    for h, fn in elements:
        fn(c, y); y += h
    if footer:
        c.setFont("Body", 13); c.setFillColor(MUTED)
        c.drawString(MARGIN, 39, footer[0])
        c.drawRightString(PT_W - MARGIN, 39, footer[1])
    c.showPage()

def s_cover(c, s, i, n):
    size, ls, lh = fit(s["headline"], PT_W - 2 * MARGIN, 700 * S, 58, 28)
    els = [e_rule(), e_lines(ls, "Head", size, lh, WHITE, gap=40 * S)]
    if s.get("kicker"): els.append(e_text(s["kicker"], "Body", 20, MUTED, 1.38, 56 * S))
    if s.get("swipe", True): els.append(e_text("SWIPE »", "BodyB", 16, CYAN))
    page(c, els, (BRAND, f"{i}/{n}"), anchor=0.40)

def s_statement(c, s, i, n):
    els = []
    if s.get("eyebrow"): els.append(e_text(s["eyebrow"].upper(), "BodyB", 15, CYAN, 1.4, 26 * S))
    size, ls, lh = fit(s["headline"], PT_W - 2 * MARGIN, 520 * S, 46, 26)
    els.append(e_lines(ls, "Head", size, lh, WHITE, gap=44 * S))
    if s.get("body"): els.append(e_text(s["body"], "Body", 21, BODY, 1.40))
    page(c, els, (BRAND, f"{i}/{n}"))

def s_bignum(c, s, i, n):
    els = []
    if s.get("eyebrow"): els.append(e_text(s["eyebrow"].upper(), "BodyB", 15, CYAN, 1.4, 30 * S))
    size = 150
    while size > 45 and sw(s["number"], "Head", size) > PT_W - 2 * MARGIN: size -= 5
    els.append(e_text(s["number"], "Head", size, RED if s.get("red") else CYAN, 1.02, 26 * S))
    if s.get("label"): els.append(e_text(s["label"], "BodyB", 24, WHITE, 1.28, 34 * S))
    if s.get("body"): els.append(e_text(s["body"], "Body", 20, BODY, 1.40))
    page(c, els, (BRAND, f"{i}/{n}"))

def s_list(c, s, i, n):
    els = []
    if s.get("eyebrow"): els.append(e_text(s["eyebrow"].upper(), "BodyB", 15, CYAN, 1.4, 24 * S))
    size, ls, lh = fit(s["headline"], PT_W - 2 * MARGIN, 260 * S, 38, 22)
    els.append(e_lines(ls, "Head", size, lh, WHITE, gap=52 * S))
    cnt = len(s["items"])
    els.append(e_bullets(s["items"], 20 if cnt <= 4 else (18 if cnt == 5 else 16), BODY))
    page(c, els, (BRAND, f"{i}/{n}"), anchor=0.42)

def s_outro(c, s, i, n):
    size, ls, lh = fit(s["headline"], PT_W - 2 * MARGIN, 440 * S, 43, 25)
    els = [e_lines(ls, "Head", size, lh, WHITE, gap=42 * S)]
    if s.get("body"): els.append(e_text(s["body"], "Body", 21, BODY, 1.40, 70 * S))
    els.append(e_rule(gap=34))
    els.append(e_text(s.get("name", "Rihards Zeila"), "Head", 28, WHITE, 1.15, 10 * S))
    els.append(e_text(s.get("tagline", "12 years in paid ads, ecommerce and automation."),
                      "Body", 16, MUTED, 1.3, 22 * S))
    els.append(e_text(s.get("cta", "Follow for the unglamorous version."), "BodyB", 17, CYAN))
    page(c, els, None, anchor=0.38)

RENDER = {"cover": s_cover, "statement": s_statement, "bignum": s_bignum,
          "list": s_list, "outro": s_outro}

def build(spec_path, out_path):
    spec = json.load(open(spec_path))
    slides = spec["slides"]; n = len(slides)
    c = canvas.Canvas(out_path, pagesize=(PT_W, PT_H))
    c.setTitle(spec.get("title", "Carousel"))
    for i, s in enumerate(slides):
        RENDER[s["type"]](c, s, i + 1, n)
    c.save()
    print(f"built {out_path} - {n} slides")

if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2])

```

## 05 · Make it yours in two minutes

1. **Four colours.** The `rgb()` lines near the top. Swap the hexes for your brand and every deck follows.
2. **The wordmark.** One constant, `BRAND`, near the top. Change it and every slide follows.
3. **The sign-off.** Defaults live in `s_outro`: name, tagline, call to action.
4. **Latvian, Polish, Czech, Turkish?** Set `EMBED_FONTS = True` and point the three `TTFont` lines at a Unicode face. Files grow to roughly 60 KB — the base-14 fonts cover Western European accents and the euro sign, but not the full diacritic set.

## 06 · When not to make a carousel

Roughly half the posts should not have one, and the discipline is worth more than the generator.

- **Give it one** when the spine of the post is a list, a checklist, a sequence of steps, or a comparison of numbers. Tactical posts, teardowns, automation walk-throughs.
- **Never** for a personal story. A story flattened into slides loses the thing that made it a story. Those get one real photograph and nothing else.
- **Six to eight slides.** Past that, engagement falls off and you have written an article with extra steps.
- **Every number traces to the post.** A carousel is a screenshot waiting to happen; whatever is on it will outlive the caption explaining it.

## 07 · Version 2, September 2026: the data-chart generator

Everything above still works. But the decks on my profile since October 2026 come from a second generator, `deck2.py`, and if you are starting today, start there.

The v1 file draws five text-led slide types from a JSON spec. The v2 file draws **fourteen slide types from the numbers in a post**, and the two ideas that matter most in it are measurement and refusal:

- **Every line of text is measured before it is placed.** Words wrap by their real rendered width, not by a character count. If a block would not fit its box, the font shrinks in steps until it does. A single unbreakable token that is too wide for its column shrinks too.
- **The layout audit refuses to save a broken deck.** After drawing, `save()` checks every text box against the safe area and against every other text box on the slide. Anything clipped or overlapping raises, and no PDF is written. You fix the copy, not the slide.
- **Preview equals PDF.** Previews render in TeX Gyre Heros, a Helvetica clone with identical metrics; the PDF uses the Helvetica core font. So what the audit measures is what LinkedIn renders, and the file stays around 10 KB with no embedded fonts.
- **Two themes:** navy (dark) and light (paper), alternated. A cyan inverted theme was tried and dropped on 30 September: it looked bad. A week of posts should not look like one long post.
- **Dollar signs.** matplotlib treats `$...$` as maths and silently turns "$40 and $60" into italic garbage. The generator escapes them. If you write your own, you will hit this in week one.

<table>
  <tr><th>Slide type</th><th>What it is for</th></tr>
  <tr><td>cover</td><td>A drawn visual hook (art=&lt;helper&gt;: tiles, toggle, bars, code-to-slide, clock ring, two circles, gauge) above a two-tone headline (**highlight** = accent colour), a sub line, "swipe". Without art: the old layout with an optional huge number.</td></tr>
  <tr><td>statement</td><td>One sentence worth quoting, centred, with an optional muted sub line.</td></tr>
  <tr><td>bignum, stats</td><td>One number, or two to three numbers side by side with labels.</td></tr>
  <tr><td>hbars</td><td>Horizontal bars from real values; label column and value column sized by measurement so nothing clips.</td></tr>
  <tr><td>funnel</td><td>Anything that narrows: sent, opened, replied, bought. Box widths from ratios, never below the width of the value text.</td></tr>
  <tr><td>flow</td><td>A numbered mechanism. Row heights from measured text; type shrinks together so the list fits.</td></tr>
  <tr><td>bullets</td><td>A checklist with a chevron. Same shrink-to-fit.</td></tr>
  <tr><td>grid</td><td>"N of which M": 25 squares, 4 lit. Cell size from the available height.</td></tr>
  <tr><td>table</td><td>Three columns with fractional widths; row height from the tallest cell.</td></tr>
  <tr><td>compare</td><td>Two columns: before vs after, blueprint vs reality.</td></tr>
  <tr><td>gate</td><td>The kit slide: what is inside, a "Comment KEYWORD" box, the URL in small print.</td></tr>
  <tr><td>outro</td><td>The closing question and a save line, for posts without a kit.</td></tr>
</table>

### The files

- [deck2.py](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/deck2.py) — the generator, 726 lines (v2.5, 1 October: cyan and navy only, one grid on every card, drawn cover hooks, tool chips under the art, a white light theme, no reader text under 30pt, footer wordmark rihardszeila.com), matplotlib only. Every slide is capped at 32 words (`MAX_WORDS`); over that, `save()` refuses the deck and tells you to cut copy, not shrink type.
- [brand-icons.py](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/brand-icons.py) and [brand-paths.json](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/brand-paths.json) — the official marks on the tool chips: Simple Icons path data for Claude, n8n, Notion, Facebook, Instagram, Shopify, Stripe, Python, Meta ads, Telegram, Postgres, X, Threads, Gmail and Zapier, drawn in the theme ink beside the tool name. Save them next to deck2.py as `brand_icons.py` and `brand_paths.json` (underscores), `pip install svgpath2mpl`, and the build file picks them up with `import brand_icons`. Tools without a published mark keep the generic pictograms.
- [build-batch1.py](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/build-batch1.py) — the build file for the seven decks live on my profile in October 2026: one function call per slide, copy the shapes.
- The seven decks themselves, to see the output before you run anything: [team-department](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/team-department.pdf) · [ads-seven-rules](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/ads-seven-rules.pdf) · [roas-36-13](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/roas-36-13.pdf) · [carousel-330-lines](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/carousel-330-lines.pdf) · [start-six-sessions](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/start-six-sessions.pdf) · [leads-038](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/leads-038.pdf) · [review-marks-homework](https://yxdtomxgsqaguqjhutgq.supabase.co/functions/v1/download/carousels/review-marks-homework.pdf)

### Run it

```
pip install matplotlib pillow
# put deck2.py and build-batch1.py in one folder, then:
python3 build-batch1.py
# out2/<slug>.pdf is the carousel; out2/<slug>/01.png ... are the previews; out2/<slug>-sheet.png is the contact sheet
```

To write your own deck: copy one block from the build file, change the slug and theme, and replace the strings and numbers. If the audit complains, the complaint names the slide, the text and the pixels. Shorten the text; do not touch the layout.

### How it gets onto LinkedIn without hands

The PDF is stored base64 in a Postgres table and served by a tiny edge function at a stable URL. That URL goes into the post's Notion page under a `=== CAROUSEL URL ===` marker; the publishing workflow reads it and attaches the file to the LinkedIn post as a document, with the post's first line as the document title. The whole path is in [the marketing department article](/blog/marketing-department-on-claude-and-n8n).

<hr>

<div class="callout">
  <p><b>The rest of the machine.</b> This generator is one node in a nine-workflow system that
  writes, art-directs, translates, schedules and publishes everything I post, in two languages.
  The whole thing — n8n workflows, prompts, database schema — is in <a href="/blog/marketing-department-on-claude-and-n8n">the marketing department article</a>.</p>
</div>

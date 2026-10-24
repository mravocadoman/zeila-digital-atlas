---
title: Run your entire marketing department on Claude Opus 5 and n8n
description: Nine n8n workflows, two languages, one human. The whole system behind my LinkedIn posts, including the four lines of code that stop the model rewriting them.
date: 2026-10-26
topic: Automation
drawing: pipeline
order: 1
---

Nine workflows. Two languages. One human, ninety seconds a day. This article is the whole system — including the part of it that wrote the post you clicked from.

## Read this first

<div class="callout">
  <p><b>What changed since this was written (update, October 2026).</b> Four things, all in the direction of less machine, more code. (1) The fallback writer is gone: an approved entry with no human-written post is no longer drafted by the model, it is flagged back to me. (2) Images are no longer generated: every value post ships a carousel <em>drawn in code from the post's own numbers</em>, and the image art-director in section 3 is kept for the rare single-image post. (3) The publisher now also turns each post into an X and Threads thread (Claude Haiku, three hours after LinkedIn) and schedules everything itself at the local peak slot. (4) Posts are written two weeks at a time in one scheduled Claude session on Sundays, read once by me, and approved as a batch; the daily approval email is retired. The monthly planner and the Latvian adapter are paused, so today it is seven live workflows plus two on the bench. Everything else below still runs as described.</p>
</div>

The title is a big claim, so here is the honest version before you spend twenty minutes on this.

What follows genuinely runs a two-language publishing operation on autopilot: it picks the day's topic, assembles the source material, art-directs an image, builds a carousel, writes a first comment, schedules to LinkedIn and Facebook at the right local hour, produces a native Latvian version, files everything in Postgres, and pings me on Telegram when a post goes live so I can go and answer comments.

<div class="callout">
  <p><b>It does not write the posts.</b> A human still does that. Every attempt to hand the writing to a model produced content that was technically fine and completely forgettable, and the system now enforces the opposite: if a human wrote the post, the model is <em>forbidden</em> from touching it. That override is four lines of JavaScript and it is the single most important thing in this article.</p>
</div>

So: not a department that thinks. A department that *ships*. That turns out to be most of the job.

## The shape of it

<pre class="flow">  <b>NOTION</b>  content calendar        one row per post, per weekday
     │           topic · bucket · approved · the written post itself
     ▼
  <b>n8n</b>     Post Creation Automation      <i>08:00 Riga, weekdays</i>
     │           ├─ take oldest approved, not-yet-generated entry
     │           ├─ fetch the page body, split it on section markers
     │           ├─ <i>if a human wrote it → deliver verbatim, hard stop</i>
     │           ├─ else → Claude drafts from the source notes
     │           ├─ art-direct an image (deterministic mode per post type)
     │           └─ email me a one-click approval link
     ▼
  <b>SUPABASE</b>  content_log         post · image · carousel · first comment
     │             content_log_lv      the Latvian sibling
     │             lead_magnet_posts   magnet + trigger keyword
     ▼
  <b>n8n</b>     Post on Socials              <i>on approval</i>
     │           ├─ LinkedIn: document if a carousel exists, else image
     │           ├─ first comment auto-posts with the post
     │           └─ Facebook: image
     ▼
  <b>n8n</b>     LV Content Adapter           <i>12:05 Riga, daily</i>
     │           native Latvian version, composed — never translated
     ▼
  <b>n8n</b>     Golden hour reminder         <i>every 10 min, 06:00–20:00</i>
                 Telegram: "you are live, go and reply for 15 minutes"
</pre>

## The nine workflows

<table>
  <thead><tr><th>Workflow</th><th>Trigger</th><th>What it owns</th></tr></thead>
  <tbody>
    <tr><td>Monthly Content Planner</td><td>25th, monthly</td><td>Reads the founder log, lays out next month's calendar skeleton in Notion, assigns buckets and day types.</td></tr>
    <tr><td>Post Creation Automation</td><td>08:00, weekdays</td><td>The core. One approved entry → post text, image, carousel link, first comment, DB row, approval email.</td></tr>
    <tr><td>Post generator (magnet)</td><td>sub-workflow</td><td>Lead-magnet days. Builds the magnet as styled HTML, uploads it to object storage, returns a public URL.</td></tr>
    <tr><td>Post on Socials</td><td>approval click</td><td>Schedules LinkedIn + Facebook at the local peak slot. Documents when a carousel exists, images otherwise.</td></tr>
    <tr><td>Post on Socials (magnet)</td><td>approval click</td><td>Same, plus the trigger keyword and the magnet URL for delivery.</td></tr>
    <tr><td>LV Content Adapter</td><td>12:05, daily</td><td>Native Latvian version of anything approved in the last seven days.</td></tr>
    <tr><td>Golden hour reminder</td><td>every 10 min</td><td>Catches the moment a post goes live and pushes the engagement checklist to Telegram.</td></tr>
    <tr><td>Failure notifier</td><td>on any error</td><td>Shared error handler. Every content workflow names it. Telegram with node, message, execution link.</td></tr>
    <tr><td>Database keepalive</td><td>every 6 hours</td><td>Free-tier Postgres pauses after a week of low traffic. A daily-at-08:00 pipeline is exactly that profile.</td></tr>
  </tbody>
</table>

Seven touch content. Two exist purely so the other seven fail loudly instead of quietly. Build those two *first* — a silent pipeline that stopped three weeks ago is worse than no pipeline.

## The four pieces that actually matter

Everything else is plumbing you can rebuild from the diagram. These four are the decisions.

### 1. The verbatim override — the whole trick

Prompt engineering cannot make a model reliably not-edit text you hand it. It will tighten a sentence, drop a comma, "improve" your ending. Over a month that quietly sands your voice off. So the guarantee lives in code, downstream of the model, where no amount of temperature can reach it:

```
// Pre-written post wins, verbatim — code-level guarantee against paraphrase.
try {
  const ctx = $('Assemble Story Context').first().json;
  if (ctx && ctx.prewritten_post && String(ctx.prewritten_post).trim().length > 0) {
    parsed.master_linkedin_post = String(ctx.prewritten_post).trim();
  }
} catch (e) {}
```

Four lines. The model still runs — it produces the image brief, the metadata, the fallback draft if no human wrote one. It simply cannot win an argument about the text. Verified by md5 against the source: character for character, every run.

### 2. Section markers turn a Notion page into a typed payload

A Notion page is a bag of blocks. To get four different things out of one page without four different databases, mark the sections in the body and slice on the markers:

```
=== FINAL POST ===        the English post, verbatim
=== FINAL POST LV ===     the Latvian post, natively written
=== FIRST COMMENT ===     auto-posted with the post
=== CAROUSEL URL ===      the PDF to attach as a document
```

```
const ANY_MARKER = /^=+\s*(FINAL POST|FIRST COMMENT|CAROUSEL URL)/i;

function sliceSection(testFn) {
  let start = -1;
  for (let i = 0; i < items.length; i++) { if (testFn(items[i].text)) { start = i; break; } }
  if (start === -1) return [];
  let end = items.length;
  for (let i = start + 1; i < items.length; i++) {
    if (ANY_MARKER.test(items[i].text)) { end = i; break; }   // stop at the NEXT marker
  }
  return items.slice(start + 1, end);
}
```

<div class="callout callout--cyan">
  <p><b>The bug worth stealing the fix for:</b> the first version stopped only at the <em>same</em> marker type, so the Latvian post leaked onto the end of every English one. Any marker ends any section. One regex, one afternoon lost.</p>
</div>

### 3. The prompt that forbids translation

Every "AI localisation" tutorial says: ask the model to translate. The output is grammatically perfect and a native speaker smells it in one sentence — English rhythm wearing a Latvian coat. The fix is to remove translation from the table entirely:

```
DO NOT TRANSLATE. You are not given an English post to convert.
You are given the SOURCE FACTS. COMPOSE THE POST FROM SCRATCH in Latvian,
as a Latvian marketer writing for Latvians would.

If a sentence in your draft maps word-for-word onto an English sentence,
rewrite it.

Different examples, different rhythm, different opening are all CORRECT.
Same facts, same point, same voice.
```

Same source, two posts that share zero sentence structure. This ports to any second market — Polish, Estonian, Lithuanian, Spanish. It is the highest-leverage paragraph in the whole system.

### 4. Deterministic art direction beats a creative model

Asking a model to "design something on brand" gives you a different brand every day. So the mode is chosen by lookup — post type in, visual system out — and the model only fills in the details:

<table>
  <thead><tr><th>Mode</th><th>Accent</th><th>Used for</th><th>Look</th></tr></thead>
  <tbody>
    <tr><td>REBEL</td><td>red</td><td>Hot takes, lessons, failures, market commentary</td><td>Protest-poster typography, one street-art element</td></tr>
    <tr><td>BLUEPRINT</td><td>cyan</td><td>Automation hacks, tactical plays</td><td>Engineering drawing: numbered steps, node flow, real labels from the post</td></tr>
    <tr><td>MAGNET</td><td>amber</td><td>Every lead-magnet day</td><td>Flat mockup of the actual asset + the keyword chip</td></tr>
  </tbody>
</table>

Two standing rules inside all three: **charts are banned** — image models invent proportions, so numbers get rendered as typography instead — and personal stories get no generated image at all. A real photograph outperforms anything a model makes, every time.

## The database

Three tables. That is the entire persistence layer.

```
create table content_log (
  id                 uuid primary key default gen_random_uuid(),
  day                text,
  content_type       text,
  post_content       text,
  image_url          text,
  carousel_url       text,          -- PDF → posted as a LinkedIn document
  first_comment      text,          -- auto-posted with the post
  scheduled_for      timestamptz,   -- local peak slot, stored in UTC
  golden_hour_pinged boolean default false,
  status             text,          -- pending | scheduled | posted
  linkedin_post_urn  text,
  facebook_post_urn  text,
  created_at         timestamptz default now()
);

create table content_log_lv (
  id              uuid primary key default gen_random_uuid(),
  source_id       uuid references content_log(id),
  post_content_lv text,
  image_url       text,
  status          text,
  created_at      timestamptz default now()
);

create table lead_magnet_posts (
  id              uuid primary key default gen_random_uuid(),
  post_content    text,
  image_url       text,
  pdf_url         text,   -- the hosted magnet
  trigger_keyword text,   -- the word people comment
  status          varchar,
  created_at      timestamptz default now()
);

create index on content_log (status, scheduled_for);
create index on content_log (golden_hour_pinged) where golden_hour_pinged = false;
```

## What it replaced

<div class="cards">
  <div class="card"><h4>The scheduler</h4><p>Picks the topic, holds the queue, posts at the local peak hour, in two languages, without a spreadsheet.</p></div>
  <div class="card"><h4>The designer</h4><p>Every image and every carousel. Consistent because the system is deterministic, not because someone remembered the brand guide.</p></div>
  <div class="card"><h4>The translator</h4><p>A native Latvian version of every post, composed rather than converted, ready twelve minutes after approval.</p></div>
  <div class="card"><h4>The community manager</h4><p>Writes the first comment, posts it with the post, then tells me the hour that matters has started.</p></div>
  <div class="card"><h4>The ops person</h4><p>Files everything, links the URNs back, and shouts on Telegram the second anything breaks.</p></div>
  <div class="card"><h4>Not the writer</h4><p>Still me. Still the bottleneck. Still, on the evidence, the right call.</p></div>
</div>

Running cost is n8n, a Postgres you are probably already paying for, a scheduling API, and tokens. Claude Opus 5 lists at $5 per million input tokens and $25 per million output — a day's run of this pipeline is a rounding error against one freelance invoice. Do the arithmetic for your own volume; the honest answer is that infrastructure is not what this costs you. Time is.

## Where it breaks

- **Editing a workflow does not change what runs.** n8n keeps a draft and a published version. I lost a day to a post that scheduled itself to "now" in the wrong timezone because the publisher was still on its pre-change version. Publish after every single change.
- **Free-tier Postgres pauses.** A pipeline that touches the database once each weekday morning is precisely the usage profile that gets suspended. Hence the keepalive.
- **A silent pipeline is the real failure mode.** Not the crash — the branch that quietly never ticks "generated" and regenerates the same entry forever. Build the alerting before you build the features.
- **The model will drift if you let it.** Any guarantee you care about belongs in code downstream of the model, not in the prompt.
- **Automation does not buy reach.** Publishing on time is table stakes. The fifteen minutes you spend replying to comments in the first hour still does more for distribution than the entire system above.

## Build it in a weekend

1. **One table and one cron.** Read a row, post it, write the URN back. Get that working end to end before anything else exists.
2. **Add the error workflow.** Point every workflow at it. Two nodes, and it is what makes the rest safe to build.
3. **Add the human gate.** An email with an approval link beats a fully autonomous pipeline you are too nervous to leave running.
4. **Add the verbatim override.** The moment you start hand-writing anything, protect it in code.
5. **Add the second language.** Compose, never translate. Copy the prompt above.
6. **Add the reminder.** The system's real output is not the post. It is you, on the platform, in the first hour.

<hr>

<div class="callout">
  <p><b>One more thing.</b> The post that brought you here was written by a human, laid out by the art director in section 3, attached to a carousel built by a 200-line Python file, scheduled by workflow four, commented on by workflow four, and mirrored into Latvian by workflow six. The carousel generator has its own article: <a href="/blog/carousel-generator">how the carousels are drawn in code</a>.</p>
</div>

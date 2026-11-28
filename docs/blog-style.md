# How blog articles and lead magnets are written

Rihards, 26 Oct 2026: the first six articles "sound SUPER technical, and not simple at all ... make so that
normal humans can understand and implement it; and also make them more interesting ... these AND the future
magnets". This file is that rule. Every new article and lead magnet follows it. `scripts/check-articles.mjs`
enforces the parts a script can see.

## Who is reading

The person who commented a keyword on a LinkedIn post and opened the link from a DM. They run a small
business, or do marketing for one. They use ChatGPT or Claude every week, but they are not developers. They
have heard of Zapier or n8n and have never built anything in it. They are reading on a phone, between other
things.

By the end of the first read they should:

1. Get the idea in the first screen: what this does for them, in their words.
2. Know whether it is for them, and what it takes: tools, money, time, skill.
3. Be able to do the first step today, without help.

If they want the deep version, it is there, folded away at the end, for their developer.

## The shape of every article

1. **The hook (2 to 4 short paragraphs).** A real moment from Rihards's work, with one exact number. No
   throat-clearing, no "in this article".
2. **"What you'll have at the end"** in one sentence.
3. **"What you need"**, a short list: the tools (with the free or cheap option first), the money per month,
   the setup time, and the skill level ("no coding", "copy and paste", "you'll need a developer for one step").
4. **"How it works"**, the idea in plain words, with one everyday comparison (a kitchen, a receptionist, a
   checklist). At most one simple diagram.
5. **The steps.** Numbered, one action each, in the order you do them. Prompts go in copy-paste boxes,
   because a prompt is the thing a non-developer can actually use. Say what "done" looks like after each step.
6. **"Where it goes wrong"**: three to five real mistakes, each one or two sentences, from what actually broke.
7. **"Start here today"**: the single smallest first step.
8. **"For your developer"**: everything technical (code, database tables, workflow internals, exact
   settings) inside a folded `<details>` block. Nothing is deleted, just moved out of the way.

## How it sounds

- **First person, Rihards talking.** "I", "you", contractions, short sentences. A clumsy honest sentence beats a
  polished empty one. Exact small amounts are the trust device: €70 a day, €0.38 a lead.
- **One idea per paragraph,** no more than four lines on a phone. Lists for results and steps, prose for stories.
- **No jargon in the main text.** If a technical word is unavoidable, explain it in the same sentence the first
  time ("a webhook, which is just a link that starts a workflow when something visits it"). Words that belong only
  in "For your developer": API, JSON, webhook, endpoint, schema, SQL, Postgres, regex, cron, node, payload,
  deploy, repo, md5, URN, upsert, CBO, CPA without its meaning.
- **Hyphens or commas, never em dashes.** No relative dates ("last Monday"): write the date or a durable phrase.
- **Every number is true** and comes from Rihards's own work. Never invent a figure, a result or a testimonial.
- **Never hint at what the print-on-demand shop sells** (see CLAUDE.md): it is "a print-on-demand ecommerce
  project", nothing more.
- **Headings say what is in the section**, in plain words: "What you need", "Step 3: tell it the rules". No
  numbered section codes.
- **Length:** the main text reads in 6 to 9 minutes (roughly 1,300 to 2,000 words). The developer section doesn't count.

## The end of every article

The page itself adds the invitation box and the other articles. The article ends on "Start here today" or the
developer section, never on a sales line. The box is picked by `cta` in the front matter: `consult` (the default),
`audit` (the fixed-fee audit, for readers who are not ready for a retainer) or `newsletter`. Every article also gets
the one-line newsletter signup above "More articles", unless its `cta` is already the newsletter.

## Packaging (articles dated after 28 Nov 2026)

From the Founder OS course: the title, description and preview image are decided before the body, and an article is
found through one keyphrase. `node scripts/check-articles.mjs` enforces the first three:

- **Title of 55 characters or fewer**, so search results show it whole.
- **One keyphrase** of two words or more, used in the slug, the title, the description, the first paragraph and the
  preview image's alt text. The check looks for two consecutive slug words in the description.
- **A `cta` line** in the front matter, chosen on purpose for this article.
- **One offer in the middle**, once the reader has had the first useful step: a single sentence pointing at the
  matching box at the end, never a link to a sales page.
- **Read next**: the last line of "Start here today" names the one article to read after this one.

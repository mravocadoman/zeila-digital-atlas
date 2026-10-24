---
title: I handed my Meta ads to Claude. Here are the seven rules it runs by.
description: A scheduled Claude session runs a live Meta ads campaign: seven rules, real thresholds, the full daily prompt and the truth report that runs before it.
date: 2026-10-26
topic: Ads
drawing: rules
order: 2
---

A scheduled Claude session that reads yesterday's ads and yesterday's real orders, changes budgets, pauses ads, launches tests, writes down why, and tells me. Plus the one-line truth report that runs before it. Every prompt in here is the one that runs, with the account details taken out.

## Read this first

Twelve years of buying ads went into seven lines. The lines are the product. The model is just the thing that applies them at 10:22 every morning without getting bored, tired or optimistic.

What this is: two scheduled Claude sessions with data access. One posts a single line of truth to the team chat at 09:00 (spend, real orders, real ROAS against the seven-day average). One manages a live Meta campaign at 10:22 inside hard rules, logs every run with its reasoning, and reports to me. Both run against a print-on-demand ecommerce project I own, on a deliberately small campaign: $70 a day. Small enough to survive a bad decision, real enough that bad decisions cost money.

<div class="callout">
  <p><b>The honest part.</b> The campaign was handed over on 29 September 2026. When this kit went out it had run for two weeks. The rules are the interesting part; the results are not in yet, and I will publish them either way. Nothing here is a claim that a model buys ads better than a person. It is a claim that a model applies a person's rules more consistently than the person does at 7am.</p>
</div>

What it is not: attribution modelling, an MMM, or a creative studio. The machine judges, spends and stops. It does not decide what break-even is, and it does not invent your first good ad. Those are still yours.

## The shape

```
09:00  TRUTH REPORT (Claude, scheduled)
       read  ─ yesterday + 7 days of Meta spend, impressions, clicks   (Windsor.ai connector)
       read  ─ yesterday + 7 days of real orders and revenue           (the shop's own data)
       write ─ one line to the team chat via an n8n webhook
       shout ─ if ROAS under break-even, orders = 0, or CPC over the ceiling

10:22  DAILY MANAGER (Claude, scheduled)
       read  ─ per-ad numbers for yesterday and the trailing 7 days     (Windsor.ai)
       read  ─ real orders for the same days, attributed where possible (the shop's database)
       read  ─ every previous run from its own log table                (history first, always)
       act   ─ budgets, pauses, new tests, inside the seven rules
       write ─ one row to the log: numbers, actions, reasoning
       verify─ read back every change it made
       tell  ─ a five-line report to me
```

Two things matter in that diagram more than the model. First, **real orders sit next to platform numbers on every run**; the machine is never allowed to judge on Meta's purchase count alone. Second, **the log is read before anything is decided**, so today's session knows what yesterday's session did and why, and cannot flip-flop.

## The seven rules

<table>
  <tr><th>#</th><th>Rule</th><th>The numbers on my account</th></tr>
  <tr><td>1</td><td>Judge on real orders, never on the platform's purchase count.</td><td>Meta over-reports purchases by 15 to 20% here. Break-even is about $18 real cost per new customer. Platform CPA is a hint, not a verdict.</td></tr>
  <tr><td>2</td><td>Respect the learning phase, then move slowly.</td><td>No budget changes for the first four days. After that, at most one change every three days, at most 20% per step. Increases only if the three-day real CPA is at or under target. Decreases any time. Hard cap without my written OK.</td></tr>
  <tr><td>3</td><td>Pause losers by rule, keep the herd healthy.</td><td>Pause an ad at $40 spent with 0 purchases, or $60 spent with a platform CPA over $30. Keep four to eight ads live. Never pause the last good one.</td></tr>
  <tr><td>4</td><td>Replace fatigue with one clean test.</td><td>Frequency over 2.5, or link click rate down 30% from the ad's first week, means launch one new test: a new copy angle on a proven image. One variable at a time. Named so I can read the test from the name.</td></tr>
  <tr><td>5</td><td>Kill switch, and tell me.</td><td>Seven-day real CPA over $30 after $350 spent: cut the budget hard and report. Zero real sales three days running: pause the campaign and report.</td></tr>
  <tr><td>6</td><td>Copy rules the model cannot bend.</td><td>No em dashes. Never offer discounts or freebies. Never promise a delivery date. Prices only from the list I gave it.</td></tr>
  <tr><td>7</td><td>Judge only on full days, verify every write, log every run.</td><td>The ad account and the shop must share a day boundary (both run on one timezone here). Every change is read back after it is made. One log row per run with the reasoning.</td></tr>
</table>

<div class="callout callout--cyan">
  <p><b>Why the thresholds are boring.</b> $40 with zero purchases is roughly two break-evens of spend with nothing to show. $60 with CPA over $30 is a purchase that cost more than the margin. 20% per step is the largest budget move that does not reset learning on most accounts. None of these are clever. They are the things I already knew and did not do consistently.</p>
</div>

## The daily manager prompt

This is the prompt that runs, with identifiers replaced by placeholders. It is a scheduled task in Claude with two connections: a Meta data connector that can read and write (Windsor.ai here), and the shop's database. Change the placeholders and the numbers in the RULES block. Leave the structure alone; the structure is the part that took twelve years.

```
You are the daily manager of my Meta campaign "{CAMPAIGN_NAME}" for {PROJECT}. I handed it to you on {DATE}: act, then report. Don't ask me to approve routine steps.

SETUP
- Ad account {AD_ACCOUNT_ID} (timezone {TZ}), via the Meta connector: get_data for reads, list_actions / execute_action for writes.
- MANAGED: campaign {CAMPAIGN_ID} (CBO, ${DAILY_BUDGET}/day from {DATE}), ad set {ADSET_ID} (Advantage+ audience ON with {INTERESTS} as signals, {GEO}, age {AGE_RANGE}, feed/story/reels placements only, purchase-optimised on pixel {PIXEL_ID}). Ads: {N_PROVEN} proven ads plus {N_TESTS} tests ({TEST_NAMES_AND_IDS}). Page {PAGE_ID}, link {LANDING_URL}, url_tags {UTM_TEMPLATE}.
- NOT YOURS, observe only: {OTHER_CAMPAIGNS}. Keep paused campaigns paused.
- Log: table {LOG_TABLE} in the shop database. Read all rows first for history; insert one row per run.

RULES
1. Break-even is about ${BREAK_EVEN_CPA} real cost per new customer ({WHICH_PRODUCT_IS_PROFITABLE}). Meta over-reports purchases by about 15-20%. Judge on real orders.
2. Learning phase: no budget changes before {LEARNING_END_DATE}. After that, at most one budget change every 3 days, max 20% per step. Increases only if the 3-day real CPA is at or below ${TARGET_CPA}. Hard cap ${HARD_CAP}/day without my OK; decreases are fine.
3. Pause an ad at spend >= $40 with 0 purchases, or spend >= $60 with Meta CPA > $30. Keep 4-8 active ads, and never pause the last good one.
4. When an ad is paused or fatigued (frequency > 2.5, or link CTR down 30%+ from its first week), add a new test: a new copy angle on a proven image (reuse image hashes, or reuse proven creative_ids). One variable at a time. Name it "Claude <letter> | <angle> | <image>".
5. If the campaign's 7-day real CPA is > $30 after >= $350 spent: cut the budget to ${FLOOR_BUDGET} and tell me. If it has 0 real sales on 3 straight days: pause the campaign and tell me.
6. Copy: no em dashes, never offer discounts or freebies. Prices: {PRICE_LIST}. No promised delivery dates.
7. Judge only on full {TZ} days. Verify every write by reading it back.

EACH RUN
a. Load the project context ({SKILL_OR_DOC}).
b. Meta: yesterday and the last 7 days per campaign and per ad: spend, cpm, frequency, link_clicks, landing_page_views, add_to_cart, initiate_checkout, purchases, purchase_value, effective_status.
c. Real sales for the same days ({DAY_BOUNDARY_IN_UTC}): paid orders (not test orders) joined to the order table (channel, attribution; attribute to this campaign vs others where utm data allows). Count new orders vs add-ons. Funnel check from the site's event table: {STEP_A} to {STEP_B} rate (normal {NORMAL_RANGE}), and orders created per day (normally {NORMAL_ORDERS}). If the funnel breaks, flag it before blaming the ads.
d. Act per the rules, then insert a log row with the numbers, the actions and the reasoning.
e. Send me a short report: yesterday's spend, Meta vs real purchases, real CPA against ${BREAK_EVEN_CPA}, what you changed and why, and anything to flag on the other campaigns or the site. No em dashes. Brief.
```

Three lines in there do most of the work. **"Read all rows first for history"** stops the model re-deciding yesterday's decision. **"If the funnel breaks, flag it before blaming the ads"** stops it cutting a good campaign because the checkout page broke. **"Verify every write by reading it back"** is the difference between a report that says "I paused the ad" and an ad that is paused.

## The truth report prompt

Runs first, at 09:00, so the number in the team chat is the real one before anyone opens an ads dashboard. On my store the first week I ran it, the platform claimed 68 purchases against 54 real orders: 26% more orders than existed, 30% more revenue. Nobody was lying. Attribution windows and modelled conversions push the number up, in the platform's favour, every time.

```
You are the ops analyst for {PROJECT}. Produce the daily TRUE ad-performance report and post it to the team chat. Work from live data only — never from memory.

1. Pull yesterday's Meta spend: Meta connector get_data, account {AD_ACCOUNT_ID}, fields date, spend, impressions, link clicks, for yesterday plus the prior 6 days (the 7-day baseline). The connector returns dates in the ad account's timezone ({TZ}).
2. Pull yesterday's real orders and revenue from the shop for the same 8 days ({SHOP_QUERY}). The shop and the ad account must share a day boundary; if they do not, convert before comparing.
3. Compute for yesterday and the 7-day average: true ROAS = revenue / spend; true blended CPA = spend / orders; CPC = spend / link clicks.
4. Post ONE compact message (no markdown tables) to the team chat via {WEBHOOK}. Format: "📊 Ads truth <date>: spend $X · Y orders · $Z revenue · ROAS A.B (7d avg C.D) · CPA $E · CPC $F" plus ONE line of interpretation. Prefix ⚠️ and say so plainly if ROAS < {BREAK_EVEN_ROAS}, orders = 0, or CPC > ${CPC_CEILING}.
5. If a data source is unreachable, post the report with what you have and say which source was missing — never post nothing silently, and never invent numbers.
Keep total output under 6 lines. Do not modify any data anywhere — this task is read-and-report only.
```

<div class="callout">
  <p><b>The bug you will hit first.</b> Timezones. Version one of my report compared Monday's spend with Tuesday's sales because the platform reported in one timezone and the shop in another. Every automation I have ever built failed on a timezone before it failed on anything clever. Line 2 of the prompt exists because of that morning.</p>
</div>

## Before you spend: the two-hour check

The cheapest campaign is the one you never run. I killed a lead-gen idea this year in about two hours, before spending a euro, with this sequence. It applies to services and lead gen, where demand either exists or does not. It does not apply to genuinely new categories, which fail this test by definition.

1. **Meta Ad Library first.** Search the niche in the country. Who is running ads, and for how long? Long-running ads are the strongest signal there is, because nobody keeps paying for something that loses money.
2. **Search volume second.** If people had the problem and were looking, they would be typing it.
3. **Then the only question that matters:** is the silence an opportunity or a verdict? Either nobody in this niche knows how to advertise, or the market is too small to advertise into.
4. **Sanity-check the neighbour.** Look at the adjacent category to see whether the wider space has any life in it.
5. **Decide, in writing, and move on.** A written verdict stops you re-litigating it at 11pm.

The step I skipped and should not have: I never called anyone. Two hours in the Ad Library tells you what advertisers do, not what a business's phone log looks like. Three calls would have settled it properly.

## The optimisation mistake that cost more than any threshold

A campaign of mine once produced leads at €0.38 each. €1,175 of spend, 2,000+ email signups, a webinar funnel for a course. About 2% bought. The campaign returned roughly 8x, and because it worked I nearly learned nothing from it. The algorithm had been told to find lead-form completions. It did, brilliantly. It was never told a purchase exists.

The rule that came out of it: **optimise on the earliest event in your funnel that a disinterested person would not bother to complete.**

<table>
  <tr><th>Event</th><th>Effort it takes</th><th>Use it as the objective?</th></tr>
  <tr><td>Prefilled lead form</td><td>Two taps. None.</td><td>No. This is the trap.</td></tr>
  <tr><td>Manually typed form</td><td>Small but real</td><td>Weak, better than nothing</td></tr>
  <tr><td>Qualified reply</td><td>Writing a sentence to a human</td><td>Yes</td></tr>
  <tr><td>Booked call</td><td>Giving up a calendar slot</td><td>Yes, usually the best available</td></tr>
  <tr><td>Purchase</td><td>Money</td><td>Yes, if volume allows the platform to learn</td></tr>
</table>

Cost per lead is not a performance metric. It is a price. You can push it down almost arbitrarily by finding people for whom saying yes costs nothing, which is the same people for whom saying yes means nothing. The metric I run that kind of campaign on today is cost per qualified conversation: uglier, slower, impossible to screenshot. The full post-mortem is its own kit, LEADS.

## Where it breaks

- **Small budgets, small samples.** At $70 a day, one day of purchases is a handful of orders. That is why every rule reads three-day and seven-day windows, and why nothing is judged on a single day.
- **The learning phase is real.** Touch the budget in the first days and the platform resets. Rule 2 exists because I broke this one myself, repeatedly, by hand.
- **The model will drift if you let it.** Anything you actually care about belongs in a rule with a number in it, not in a sentence like "be sensible". Prompts drift. A threshold does not.
- **Data connectors change field names.** Both prompts say: if a field is rejected, look up the real field list instead of guessing. A guessed field is a confident wrong number.
- **It cannot make a good ad.** It can only recombine proven images with new angles. The first proven image is still a human job.
- **You still own break-even.** The machine applies the number. If your $18 is really $24, every rule above is quietly wrong. Recompute it monthly from real margin, real returns and real shipping.

## Run it yourself

1. Start with the truth report alone. One line a day, real orders next to platform numbers. Live with it for two weeks before anything is allowed to act.
2. Compute break-even properly: margin after product, shipping, payment fees and returns. Write it down with the date.
3. Copy the daily manager prompt. Fill the placeholders. Set the budget to something you can afford to have managed badly for a week.
4. Give it a log table before it gets write access. History first, then hands.
5. Read the log every morning for the first two weeks. Not the report, the log. The reasoning column is where you find out whether your rules say what you thought they said.

<hr>

<div class="callout">
  <p><b>The rest of the machine.</b> The truth report and the media buyer are two of six scheduled sessions that run the store's operations, and the post you came from was published by a nine-workflow system that runs the marketing. That one is in <a href="/blog/marketing-department-on-claude-and-n8n">the marketing department article</a>.</p>
</div>

---
title: I handed my Meta ads to Claude. These are the seven rules it has to follow
description: Every morning Claude checks my Meta ads against real orders, pauses the losers and tells me why. The seven rules it follows, and both prompts to copy.
date: 2026-10-24
topic: Ads
drawing: rules
order: 2
---

Every morning at 10:22, a Claude session opens my Meta ads account. It puts yesterday's ads next to yesterday's real orders and decides: raise a budget, pause an ad, launch a new test, or leave it alone. Then it writes down why, checks its own work and sends me a five-line report.

It runs a live campaign on a print-on-demand ecommerce project I own, small on purpose: $70 a day. Small enough to survive a bad decision, real enough that bad decisions cost money.

The model isn't the clever part. Twelve years of buying ads went into seven rules, and the model just applies them every morning without getting bored, tired or optimistic.

<div class="callout">
  <p><b>The honest part.</b> The campaign was handed over on 29 September 2026. When this was first written it had run for two weeks. The rules are the interesting part; the results are not in yet, and I will publish them either way. Nothing here is a claim that a model buys ads better than a person. It is a claim that a model applies a person's rules more consistently than the person does at 7am.</p>
</div>

**What you'll have at the end:** a morning line with your real sales next to what Meta claims, and later an assistant that runs one campaign inside your rules and tells you what it changed and why.

## What you need

- **Claude**, with a scheduled task: a session that starts by itself at the same time every day.
- **A connection to your Meta ads account** that can read the numbers and make changes. I use Windsor.ai.
- **Your shop's real order data**, so Claude counts the orders that actually happened.
- **A team chat** for the morning line. Mine gets it through n8n.
- **Money:** the ad budget itself. Mine is $70 a day. Pick something you can afford to have managed badly for a week.
- **Time:** two weeks of only watching, then two weeks of reading Claude's diary every morning.
- **Skill:** no coding. You copy two prompts and fill in your numbers. Connecting Claude to Meta and to your shop's orders is where a developer helps.

## How it works

Think of a careful shift manager who never gets tired. You give them three things: a till count, a rulebook and a diary.

**The till count** comes first, at 09:00. I call it the truth report. A separate Claude session posts one line to the team chat: yesterday's spend, real orders, and the real return on ad spend (revenue divided by spend) against the seven-day average. So the number in the chat is the real one before anyone opens an ads dashboard.

**The rulebook** is the seven rules below.

**The diary** is a simple log. Every run writes one entry, the numbers, what it did and why, and reads all the old entries first. So today's session knows what yesterday's did, and can't flip-flop.

<pre class="flow">  <b>09:00</b>  TRUTH REPORT    spend + real orders → one line in the team chat
  <b>10:22</b>  DAILY MANAGER   read the diary → Meta's numbers next to real orders
                         → act inside the seven rules → write the diary
                         → check every change → five lines to me
</pre>

The machine judges, spends and stops. It does not decide what break-even is, and it does not invent your first good ad. Those are still yours.

## The seven rules

The numbers are from my account. Yours will be different.

### Rule 1: count real orders, not Meta's

Meta's own purchase count runs 15 to 20% high on my account, so every decision is made on the orders that actually reached my shop. My break-even, the most I can pay in ads for one new customer, is about $18. What Meta says a sale cost is a hint, not a verdict.

### Rule 2: let it settle, then move slowly

For the first four days, nobody touches the budget. That's the learning phase, when Meta is still working out who to show the ads to, and a budget change starts it over. After that, one change every three days at most, never more than 20% at a time: the largest move that doesn't reset learning on most accounts.

It only raises the budget if real sales over the last three days cost at or under my target. Lowering is fine any time. Above a hard ceiling, it needs my written OK.

### Rule 3: pause losers by the numbers

An ad gets paused when it has spent $40 with zero purchases, or $60 while Meta says each sale cost more than $30. $40 with nothing to show is roughly two break-evens of spend. A sale that cost over $30 cost more than the margin.

Four to eight ads stay live, and the last good one is never paused.

### Rule 4: replace a tired ad with one clean test

An ad is tired when the average person has seen it more than 2.5 times, or when the share of people clicking has dropped 30% from its first week. Then Claude launches one new test: a new angle in the words, on an image that already worked. One change at a time, named so I can read the test from the name.

### Rule 5: a kill switch, and a message to me

If real sales over the last seven days cost more than $30 each, after $350 spent, it cuts the budget hard and tells me. If there are zero real sales three days running, it pauses the whole campaign and tells me.

### Rule 6: copy rules it can't bend

No em dashes. Never offer discounts or freebies. Never promise a delivery date. Prices only from the list I gave it.

### Rule 7: full days only, check every change, write it all down

The ad account and the shop must agree on when a day starts and ends (both run on one timezone here). At $70 a day, one day is a handful of orders, so the rules read three-day and seven-day windows, never a single day. Every change is read back after it's made, and every run writes one diary entry with its reasoning.

None of these are clever. They are the things I already knew and did not do consistently.

## Step 1: run the truth report alone for two weeks

Before anything is allowed to act, live with the till count alone for two weeks. Here's the first week I ran it:

<div class="cards">
  <div class="card">
    <h4>What Meta claimed</h4>
    <p class="stat">68</p>
    <p>purchases</p>
  </div>
  <div class="card">
    <h4>What my shop recorded</h4>
    <p class="stat">54</p>
    <p>real orders</p>
  </div>
</div>

That's 26% more orders than existed, and 30% more revenue. Nobody was lying. Attribution windows (how long after an ad a sale still counts for it) and modelled conversions (sales Meta estimates rather than sees) push the number up, in Meta's favour, every time.

Here's the prompt that runs, with my account details taken out. Make it a scheduled task in Claude for 09:00 every day and replace everything in curly brackets with your own. The shop's orders and the link to your team chat are your developer's part.

```
You are the ops analyst for {PROJECT}. Produce the daily TRUE ad-performance report and post it to the team chat. Work from live data only — never from memory.

1. Pull yesterday's Meta spend: Meta connector get_data, account {AD_ACCOUNT_ID}, fields date, spend, impressions, link clicks, for yesterday plus the prior 6 days (the 7-day baseline). The connector returns dates in the ad account's timezone ({TZ}).
2. Pull yesterday's real orders and revenue from the shop for the same 8 days ({SHOP_QUERY}). The shop and the ad account must share a day boundary; if they do not, convert before comparing.
3. Compute for yesterday and the 7-day average: true ROAS = revenue / spend; true blended CPA = spend / orders; CPC = spend / link clicks.
4. Post ONE compact message (no markdown tables) to the team chat via {WEBHOOK}. Format: "📊 Ads truth <date>: spend $X · Y orders · $Z revenue · ROAS A.B (7d avg C.D) · CPA $E · CPC $F" plus ONE line of interpretation. Prefix ⚠️ and say so plainly if ROAS < {BREAK_EVEN_ROAS}, orders = 0, or CPC > ${CPC_CEILING}.
5. If a data source is unreachable, post the report with what you have and say which source was missing — never post nothing silently, and never invent numbers.
Keep total output under 6 lines. Do not modify any data anywhere — this task is read-and-report only.
```

**Done when:** one line lands in your team chat every morning, and the day it shows a warning, you can see why.

## Step 2: work out your break-even

Every rule leans on your break-even. Work it out from your margin after the product, shipping, payment fees and returns. Write it down with the date.

Mine is about $18. The machine applies that number, but it can't tell you if it's wrong. If your $18 is really $24, every rule is quietly wrong. Recompute it monthly from real margin, real returns and real shipping.

**Done when:** the number is written down, with the date.

## Step 3: give it a diary before you give it hands

Before Claude is allowed to change anything, give it a place to write. Mine is a table in the shop's database: one row per run, with the numbers, the actions and the reasoning. History first, then hands.

**Done when:** the empty diary exists, and the daily manager can read it and add to it.

## Step 4: copy the daily manager prompt and fill in your numbers

This one is a scheduled task in Claude with two connections: one to Meta that can read and change things, and one to the shop's orders. Mine runs at 10:22, after the truth report.

Change the placeholders and the numbers in the RULES part. Leave the structure alone; the structure is the part that took twelve years. The placeholders about the shop's data are your developer's job.

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

Three lines in there do most of the work:

- **"Read all rows first for history"** stops the model re-deciding yesterday's decision.
- **"If the funnel breaks, flag it before blaming the ads"** stops it cutting a good campaign because the checkout page broke.
- **"Verify every write by reading it back"** is the difference between a report that says "I paused the ad" and an ad that is paused.

**Done when:** the first five-line report arrives and says what it changed and why.

## Step 5: read the diary, not the report

For the first two weeks, read the diary every morning. Not the report, the diary. The reasoning is where you find out whether your rules say what you thought they said.

**Done when:** you can read a morning's entry and say which rule made each change.

## Step 6 (optional): check a new idea before you spend on it

The cheapest campaign is the one you never run. I once killed a lead-gen idea (ads that collect contact details) in about two hours, before spending a euro. It works where demand either exists or doesn't, not for genuinely new categories.

1. **Meta Ad Library.** Search the niche in your country. Who's running ads, and for how long? Nobody keeps paying for an ad that loses money.
2. **Search volume.** If people had the problem, they'd be typing it.
3. **Opportunity or verdict?** Either nobody in this niche knows how to advertise, or the market is too small.
4. **The neighbour.** Does the category next door have any life in it?
5. **Decide in writing.** A written verdict stops you re-arguing it at 11pm.

The step I skipped: I never called anyone. Three calls would have settled it properly.

**Done when:** you have a written yes or no before any money is spent.

## Where it goes wrong

- **Timezones, first.** Version one of my truth report compared Monday's spend with Tuesday's sales, because Meta and the shop reported in different timezones. Every automation I've ever built failed on a timezone before it failed on anything clever. Line 2 of the truth report prompt exists because of that morning.
- **Touching the budget too early.** Change it in the first days and Meta starts learning over. Rule 2 exists because I broke this one myself, repeatedly, by hand.
- **Letting the model drift.** Anything you actually care about belongs in a rule with a number in it, not in a sentence like "be sensible". Prompts drift. A threshold does not.
- **Expecting it to make a good ad.** It can only put new angles on images that already worked. The first image that works is still a human job.
- **Telling Meta to find the wrong thing.** A campaign of mine once got leads at €0.38 each: €1,175 of spend, 2,000+ email signups, about 2% bought. Meta was told to find form fills and did, brilliantly. It was never told a purchase exists. Point it at the earliest step a disinterested person wouldn't bother to complete, like a booked call. More in [the post-mortem](/blog/cheap-leads-post-mortem).

## Start here today

Before you open Ads Manager today, write one line: yesterday's spend, the purchases Meta claims, and the real orders in your shop. Do it every morning for a week. That's the truth report by hand, and everything else here is built on it. When the gap starts to bother you, set up the prompt from step 1.

These two are part of six scheduled sessions that run the shop. The post you came from was published by a nine-workflow system that runs the marketing, and it has [its own article](/blog/marketing-department-on-claude-and-n8n).

<details>
<summary>For your developer: the data flow, the connections and the rules table</summary>

### The shape of it

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

### The connections

The daily manager is a scheduled task in Claude with two connections: a Meta data connector that can read and write (Windsor.ai here), and the shop's database. The truth report reads through the same connector, reads the shop's own data, and posts to the team chat through an n8n webhook.

The placeholders that need you rather than the marketer: `{SHOP_QUERY}` and `{WEBHOOK}` in the truth report; `{LOG_TABLE}`, `{DAY_BOUNDARY_IN_UTC}`, the event-table funnel check (`{STEP_A}`, `{STEP_B}`, `{NORMAL_RANGE}`, `{NORMAL_ORDERS}`) and `{SKILL_OR_DOC}` in the daily manager. The log table needs to exist, readable and writable, before the manager gets write access to Meta.

**Data connectors change field names.** Add one line to both prompts: if a field is rejected, look up the real field list instead of guessing. A guessed field is a confident wrong number.

What it is not: attribution modelling, an MMM, or a creative studio.

### The seven rules, as I set them up

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

</details>

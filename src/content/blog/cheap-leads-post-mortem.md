---
title: €0.38 a lead. 2% bought. Here is the entire postmortem.
description: €0.38 a lead and 2% bought. Why cheap leads flatter you, how to count cost per qualified conversation, and a diagnostic for your own campaigns.
date: 2026-10-24
topic: Ads
drawing: funnel
order: 5
---

A cheap lead is not a cheap customer. This is the campaign that taught me the difference, the mechanism that makes it happen to almost everyone, and a one-page diagnostic for finding which of your own metrics is currently lying to you.

## 00 · Read this first

Two numbers came out of the same campaign. Almost everyone who has ever seen this campaign has only been shown the first one.

<div class="cards">
  <div class="card">
    <h4>The number that gets screenshotted</h4>
    <p class="stat">€0.38</p>
    <p>Cost per email signup. €1,175 of budget, 2,000+ signups, a webinar funnel for an Excel course.</p>
  </div>
  <div class="card">
    <h4>The number that decides whether it worked</h4>
    <p class="stat">2%</p>
    <p>Roughly two percent of those signups went on to buy the €250 course. The other ninety-eight percent are still on a list.</p>
  </div>
</div>

Both numbers are true. They came from the same ad account, the same week, the same spreadsheet. One of them is a marketing case study and the other one is the actual result, and for a long time I told the story using only the first.

Here is the thing I want to say before anything else, because this article exists because of it: **an earlier version of this lead magnet contained a spend claim I could not substantiate.** It implied a scale of account I have not run. I took it down. Everything in this version is a number I can point at. There are exactly three campaigns referenced in this entire article, and if a figure is not attached to one of them, it is written as a formula with letters in it and labelled as a worked example. That constraint is not modesty. It is the whole argument: the reason cheap leads fool people is that nobody checks the second number, and an article about not checking numbers has no business inventing any.

<div class="callout">
  <p><b>The claim in one line.</b> Cost per lead is a <i>price</i>, not a performance metric. You can drive a price arbitrarily low by finding people for whom saying yes costs nothing — which is the same set of people for whom saying yes means nothing.</p>
</div>

## 01 · The campaign structure that produced €0.38 leads

The offer was an Excel course, priced at €250. The funnel was the standard webinar shape, and I want to describe it plainly because there is nothing clever in it — the cheapness came from the structure being frictionless, not from any skill on my part.

<pre class="flow"><b>Budget</b>  €1,175 total
   │
   ▼
<b>Ad</b>  free live webinar · "learn Excel" · broad interest targeting
   │      <i>objective: lead-form completions</i>
   ▼
<b>Lead form</b>  name + email, prefilled by the platform
   │      <i>no qualification question, no cost to say yes</i>
   ▼
<b>Result</b>  2,000+ email signups · <i>€0.38 each</i>
   │
   ▼
<b>Webinar</b>  free, live, useful
   │
   ▼
<b>Offer</b>  €250 course
   │
   ▼
<b>Bought</b>  roughly 2%
</pre>

Read that diagram as a sequence of prices. Every step before the offer costs the person nothing. A prefilled lead form is the cheapest possible yes in digital marketing: two taps, no typing, no decision. The word "free" appears in the ad. The word "webinar" implies learning rather than buying. The audience was broad because broad audiences are cheap.

Every single one of those choices makes the front number better. Not one of them makes the back number better. That is not a coincidence and it is not bad luck — it is the same mechanism running forwards. Removing friction from a funnel lowers the price of a yes for everyone, and the people most responsive to a lower price of yes are the people with the least intent to do anything after.

Now the arithmetic, done out loud, using only the two sourced figures. Two percent of 2,000-plus signups is roughly forty buyers. Forty buyers at €250 is roughly €10,000 of course revenue against €1,175 of ad spend. That arithmetic is mine, derived from the two numbers above — it is not a reported revenue figure, and I have not adjusted it for refunds, payment plans, VAT, or the cost of running the webinar itself.

Which brings up the honest complication I will come back to in section 08: **on those inputs, the campaign was fine.** It was not a disaster. That is precisely why it nearly taught me nothing.

## 02 · Where those people came from and why they never bought

The useful question is never "why was the conversion rate low." It is "who exactly did the €0.38 buy me, and what were they doing when they saw the ad."

The answer, roughly: people for whom "learn Excel" is an aspiration rather than a problem. There is an enormous population of people who would like to be better at Excel in the same way they would like to read more, and would happily attend a free webinar about it on a Thursday evening. That is a real and sizeable want. It is just not a want with €250 behind it.

Underneath that sit three distinct groups, and they fail for different reasons:

<div class="cards">
  <div class="card">
    <h4>The aspirational</h4>
    <p>Genuinely interested in the topic, genuinely not in the market. They signed up because free costs nothing. They will open your emails for two years and never buy.</p>
  </div>
  <div class="card">
    <h4>The reflexive</h4>
    <p>The form was prefilled and the thumb was already moving. They do not remember signing up. When your email arrives they read it as spam because, from their side, it is.</p>
  </div>
  <div class="card">
    <h4>The wrong-problem</h4>
    <p>Real intent, wrong shape. They wanted one formula fixed today, not a course. Nothing about the offer was ever going to match, no matter how well written.</p>
  </div>
</div>

Notice that none of these three are fixed by better copy, better email sequencing, or a better webinar. They are fixed at the point of acquisition or not at all. The email list you build out of these groups is a list of people who demonstrated exactly one behaviour: willingness to fill in a free form. If that is the only signal you collected, it is the only signal you have — and it is the signal you will unknowingly ask the ad platform to go and find more of.

<div class="callout callout--cyan">
  <p><b>The reframe that makes this concrete:</b> a lead is not a person, it is an <i>observed action</i>. The value of a lead is the value of the action you observed. If the observed action was "tapped a prefilled form for something free," you have bought exactly that, at €0.38, two thousand times over.</p>
</div>

## 03 · The optimisation trap

Here is the part that turns a one-off result into a permanent condition. It is a loop, it runs on every ad platform, and it is not a bug — the machine is doing precisely what it was told.

<pre class="flow"><b>1 · You set the objective</b>
   "Optimise for lead-form completions."
   <i>This is the only instruction the system ever receives.</i>
        │
        ▼
<b>2 · The algorithm learns</b>
   It builds a model of who completes lead forms,
   from the people who just completed lead forms.
   <i>It is extremely good at this. That is the problem.</i>
        │
        ▼
<b>3 · The audience it finds</b>
   More people who complete lead forms cheaply:
   the aspirational, the reflexive, the free-thing-collectors.
   <i>Cost per lead goes DOWN. This looks like progress.</i>
        │
        ▼
<b>4 · The outcome</b>
   Lead volume up · cost per lead down · revenue flat.
   <i>It was never told a purchase exists.</i>
        │
        ▼
        └──────▶ back to 2, with worse data, cheaper leads,
                and a dashboard that looks better every week.
</pre>

Read step 2 again, because this is where the intuition usually breaks. People imagine the algorithm as a slightly dim assistant that failed to understand what they meant. It is the opposite. It understood perfectly and it is winning. You asked for cheap form completions and it is finding you cheaper and cheaper form completions, which means it is walking steadily away from anyone who hesitates before saying yes — and hesitation is the single most reliable correlate of intent.

The loop is self-reinforcing in a way that specifically defeats normal optimisation instincts. Each round, your cost per lead improves. Improvement feels like learning. So you do more of what produced it: broader audiences, lighter creative, less friction in the form. Each of those moves accelerates the loop. The metric you are steering by improves monotonically right up until someone asks what the revenue did.

<div class="callout">
  <p><b>The diagnostic tell.</b> If your cost per lead has been improving month over month and your revenue has not moved, you are not getting better at marketing. You are getting better at finding people who will say yes to nothing. Those are different skills and only one of them is worth money.</p>
</div>

## 04 · The fix, and what it costs you

The fix is short to say and genuinely unpleasant to execute: **send the purchase event back to the platform, optimise on that event instead, and then hold your nerve while the number you have been reporting to everyone gets worse.**

In sequence:

1. **Instrument the purchase.** The purchase event must fire back to the ad platform with the identifiers that let it be matched to a click. If purchases live in a CRM or a payment processor and never travel back to the ad account, the algorithm cannot learn from them, and everything below is impossible. This is plumbing, it is boring, and it is the entire prerequisite.
2. **Change the objective.** Move the campaign objective from lead-form completions to the purchase event. Nothing else about the campaign needs to change on day one.
3. **Expect the front number to get worse.** Cost per lead will rise, often sharply. Lead volume will fall. This is the system correctly declining to buy you people who were never going to pay. It is the sound of the fix working, and it will look on the dashboard exactly like the sound of the fix failing.
4. **Watch the back number instead.** Cost per customer is the metric under management now. If cost per lead doubles and cost per customer falls, you have won, and the only casualty is a slide in a monthly report.
5. **Give it enough events to learn from.** Optimising toward an event the account almost never sees produces noise, not learning. Which leads directly to the problem below.

### The fallback when purchase volume is too low

Most accounts do not generate enough purchases for a purchase-optimised campaign to learn quickly. High-ticket B2B, long sales cycles, anything with a human in the loop — the purchase event is too rare and too late.

The fallback is not to give up and go back to lead forms. It is to **optimise on the nearest event that costs the person effort.** Effort is the proxy for intent, and you want the earliest event in your funnel that still requires some.

<table>
  <tr><th>Event</th><th>Effort required</th><th>Use as objective?</th></tr>
  <tr><td>Prefilled lead form</td><td>Two taps. None.</td><td>No — this is the trap</td></tr>
  <tr><td>Manually typed form</td><td>Small but real</td><td>Weak, better than nothing</td></tr>
  <tr><td>Qualified reply</td><td>Writing a sentence to a human</td><td>Yes</td></tr>
  <tr><td>Booked call</td><td>Giving up a calendar slot</td><td>Yes — usually the best available</td></tr>
  <tr><td>Purchase</td><td>Money</td><td>Yes, if volume allows</td></tr>
</table>

A booked call is the workhorse here. Booking a call means surrendering a named block of future time to a stranger, and almost nobody does that idly. It happens far earlier and far more often than a purchase, which makes it something a platform can actually learn from, and it correlates with intent far better than any form completion ever will.

The rule underneath the table: **optimise on the earliest event in your funnel that a disinterested person would not bother to complete.** That single sentence is most of what this article is for.

## 05 · The reframe: cost per qualified conversation

Cost per lead answers "what did it cost to make someone appear in my CRM." Almost nobody actually wants to know that. The question worth paying for is: **what does it cost me to get one real conversation with someone who could plausibly buy?**

Call it cost per qualified conversation. It is a better metric for a specific structural reason: it cannot be gamed by removing friction. Every trick that drives cost per lead down — prefilled forms, broader audiences, freer offers — either leaves this number unchanged or makes it worse, because it adds unqualified volume to the denominator without adding conversations to it. A metric that gets worse when you cheat is a metric you can steer by.

### How to actually count it

Two definitions, agreed before you measure anything, and written down somewhere other than your head.

**First, define "conversation."** Not an open. Not a click. A two-way exchange with a human: a reply you had to answer, a call that happened, a demo that ran. If nobody on your side had to spend attention on it, it was not a conversation.

**Second, define "qualified" — as a filter you apply before you know the outcome.** This is the discipline that makes the number honest. Write the criteria in advance: right kind of organisation, plausible budget, the problem you actually solve, some authority to act. Then apply them from the transcript. If you find yourself deciding whether a conversation was qualified based on whether it closed, you have built a tautology, not a metric.

Then the formula, which is deliberately trivial:

<pre><code><b>cost per qualified conversation</b>  =  <b>S</b> / <b>Q</b>

  <b>S</b> = total spend in the period, including the fees and tooling
      you would not be paying if the campaign did not exist
  <b>Q</b> = conversations in the period that met the criteria
      you wrote down <i>before</i> you read any of them

Worked example — letters, not a real account:
  S = €4,000, Q = 20  →  €200 per qualified conversation
  If your close rate on qualified conversations is <b>C</b>,
  customer acquisition cost = (S / Q) / C
  at C = 0.25  →  €800 per customer

<i>These letters are illustrative arithmetic. They are not
figures from any account I have run.</i>
</code></pre>

Attribution will not be perfect. It does not need to be. This number is for comparing your own months and your own channels against each other, not for winning an argument about attribution windows. Run it the same imperfect way every month and the trend is trustworthy even where the absolute value is not.

Two things happen when you start reporting it. Cheap channels stop looking cheap. And the argument in your team shifts from "how do we get more leads" to "which of these people is worth a conversation," which is a much better argument to be having.

## 06 · Small-market maths

I want to put the most impressive number I have on the table and then take it apart, because it is the clearest example I own of a result that flatters the marketer rather than describing them.

**A €1,000 test returned 36x ROAS.** That is the number. It is real, and it is the kind of number that gets you booked on podcasts.

Here is the honest assessment. It was a small market — Latvia, under two million people. The product-market fit was unusually good, in a way I noticed rather than engineered. The timing was right. Very little of it was skill. If I ran the same playbook with the same competence into a large, competitive, well-served market, I would not get anything close, and I know that because the mechanism that produced the result is mostly not repeatable by effort.

### Why small markets flatter you

In a market of under two million people, a €1,000 budget buys meaningful reach. Not "a test" — actual coverage of a real slice of the addressable population. In a large market that same €1,000 disappears into a rounding error and the algorithm never gets out of the learning phase. Same money, same ads, same operator: one produces a case study and one produces noise. Auction competition is thinner, so the price of attention is lower. And when product-market fit is genuinely good, a small market lets you find the responsive part of it quickly enough that the whole thing looks like a repeatable system rather than a fortunate encounter.

### Why small markets punish you — for exactly the same reason

The property that makes €1,000 go far is the same property that ends the run: there is a floor on how many people exist. Frequency spikes fast, because the pool of people to show ads to is finite and you reach the end of it. The same audience sees the same creative until it stops working, and no amount of budget produces new people. Scaling does not mean spending more — it means making new creative, finding a new segment, or leaving the country. The ceiling arrives early and it is hard.

<div class="callout">
  <p><b>The rule this gives you.</b> When a result is spectacular, ask what about the <i>conditions</i> produced it before you ask what about your <i>execution</i> produced it. Market size, competitive density, product-market fit, and timing routinely swamp skill. Attributing a 36x to your own judgement is how you end up confidently repeating a process that never worked in the first place — and it is the same error as attributing €0.38 to your targeting. Both numbers are facts about a situation, not about a marketer.</p>
</div>

## 07 · Which of your metrics is lying to you

A one-page diagnostic. Answer each question about a real campaign you are running now. Every "yes" means the number in question is flattering you, and the line under it says exactly how.

Nothing here needs a tool, an analyst, or a data warehouse. Most of them you can answer from memory in under a minute, which is the point — these are the questions that never get asked because they are too obvious to schedule.

### 1. Is your ad campaign optimising for a form completion rather than a purchase, a booked call, or a qualified reply?

**If yes:** your cost per lead is measuring the price of frictionless attention, not demand. The algorithm is actively searching for people who say yes to things they do not want, and it is getting better at it every day the campaign runs.

### 2. Has your cost per lead improved over the last three months while revenue stayed flat?

**If yes:** your improving metric is a record of the optimisation loop tightening. Cheaper leads with flat revenue is not efficiency, it is a shift in who you are buying.

### 3. Is your lead form prefilled, and does it ask nothing that requires the person to think?

**If yes:** your conversion rate is measuring thumb movement. One free-text field that requires an actual answer will raise your cost per lead and improve everything downstream of it.

### 4. Does your purchase or closed-won event get sent back to the ad platform, matched to a click?

**If no:** every optimisation number in that account is computed without knowledge that revenue exists. You are not measuring performance, you are measuring an intermediate step that the platform mistakenly believes is the goal.

### 5. Can you state, right now, what percentage of last quarter's leads became customers?

**If no:** your cost per lead has no denominator attached to it and therefore no meaning. It is a price you are paying for an object of unknown value. Until you can answer this, no acquisition metric you have is interpretable.

### 6. Are you counting email opens or clicks as engagement in any report a decision gets made from?

**If yes:** you are counting the cheapest possible actions — the ones that cost the recipient nothing and are increasingly performed by machines on their behalf. Replies cost effort. Opens do not. Report the one that costs something.

### 7. Did your best-performing channel get its result in a small market, a narrow niche, or a moment of unusual timing?

**If yes:** the number describes the conditions, not the playbook. Ask what happens to it at three times the budget, or in a market three times the size, before you build a plan on top of it.

### 8. Would a completely disinterested person plausibly complete your primary conversion action?

**If yes:** that action carries no information about intent, and it is the wrong thing to optimise on. The test is simple — could someone with zero interest do it by accident or out of idle curiosity? If so, it is not a signal.

### 9. Are you judging "qualified" after you know whether the deal closed?

**If yes:** your qualification rate is circular and your pipeline forecast is fiction. Criteria written in advance, applied blind, or the metric measures nothing but hindsight.

### 10. Is any headline number in your reporting a rate or a ratio with the absolute figures left out?

**If yes:** the ratio is doing work the underlying numbers cannot support. A 300% improvement on two conversions is two extra conversions. Always show the numerator and the denominator next to the ratio, especially when the ratio is good.

### 11. Are your reported results averaged across campaigns, audiences, or months rather than broken out?

**If yes:** the average is hiding both your best and your worst performer, and the decisions you make from it will underfund the first and keep funding the second. Averages are where dead campaigns go to look alive.

### 12. If your single best number turned out to be wrong tomorrow, would anything about your plan change?

**If no:** that number is not informing a decision, it is justifying one you already made. It is a trophy, not a metric, and its real function is reassurance. Those are the numbers that survive longest without ever being checked — including, for a long time, my €0.38.

<div class="callout callout--cyan">
  <p><b>How to use this.</b> Do not try to fix everything you found. Take the single "yes" that touches the most money and fix that one, then re-run the sheet in a month. If you answered yes to 1 and no to 4, start there — that pair is the trap in section 03, and until it is closed, improving anything else just makes the loop run faster.</p>
</div>

<hr>

### What a good number looks like, for contrast

Since this whole article is about numbers that flatter, here is one from my own work that I think holds up, and the reason it holds up is that the metric it reports costs the other person effort.

A cold email programme for the LIFT digitalisation programme: **4,837 emails** sent, roughly **50% open rate**, a **5% reply rate** against a B2B standard of 1–3%, producing **127 replies**, of which roughly **70% were positive**.

The open rate is the weakest number in that list and I would not defend it — question 6 above applies to me as much as to anyone, and opens are increasingly measured by machines rather than people. The number that matters is 127 replies. A reply is a human choosing to spend a minute writing back, which is a real cost, freely paid. Seventy percent of them being positive means the list and the message were aimed at people who had the problem.

Same operator, same year. The difference between this and the €0.38 campaign is not effort or cleverness. It is that one of them counted an action that cost the other person something, and one of them counted an action that did not.

## 08 · What this article does not do

The honest section, because a lead magnet that only tells you what it delivers is doing the same thing to you that a cost-per-lead report does.

<div class="cards">
  <div class="card">
    <h4>There is no swipe file</h4>
    <p>No ad templates, no headline formulas, no screenshots of accounts. Creative is not the variable this article is about, and copying mine into your market would be exactly the section 06 mistake.</p>
  </div>
  <div class="card">
    <h4>It will not lower your CPL</h4>
    <p>If you act on section 04, your cost per lead goes up. That is the intended outcome. If you need CPL to go down this quarter for reasons of internal politics, this article is not going to help you and may actively hurt.</p>
  </div>
  <div class="card">
    <h4>It is not a case study in failure</h4>
    <p>The €0.38 campaign worked. On €1,175 of spend, against a €250 course, with roughly 2% converting, it was fine. Nothing broke. Nobody complained.</p>
  </div>
</div>

That last one deserves the final word, because it is the actual lesson and it took me longer than it should have to see it.

**The campaign was not a failure, and that is exactly why it nearly taught me nothing.** A failure gets investigated. A modest success gets repeated. The result was good enough that the obvious next move was to run it again, bigger, with the same objective and the same frictionless form — which is the section 03 loop, entered voluntarily, by a person who thinks he is scaling a winner.

What made it useful in the end was not the outcome. It was going back and asking what the €0.38 had actually purchased, and finding that the answer was "two thousand demonstrations of willingness to fill in a free form," and then noticing that this was the only thing I had ever asked the system to buy.

<div class="callout">
  <p><b>And the reason this version exists.</b> An earlier draft of this magnet carried a spend claim I could not stand behind. That is the same failure as the €0.38 headline, just aimed outward instead of inward: a number chosen because it was impressive rather than because it was checkable. If you find a figure anywhere in this article that is not one of the three campaigns named above, it is a mistake and I want to know about it.</p>
</div>

<hr>

<div class="callout">
  <p><b>If you use one thing from this.</b> Open your main ad campaign, find what it is optimising for, and ask whether a completely disinterested person could do that thing by accident. If they could, change the objective to the nearest event that takes effort — a booked call, a qualified reply, a purchase — and then leave the cost-per-lead column alone for a month while you watch cost per customer instead.</p>
</div>

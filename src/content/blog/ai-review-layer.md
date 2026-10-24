---
title: I built an AI that marks another AI's homework, and refunds the customer when it fails
description: An AI checks every render against the photos and the brief, retries below 85%, and refunds the customer automatically when it keeps failing.
date: 2026-10-26
topic: AI
drawing: review
order: 6
---

A print-on-demand side project where the customer pays before a single pixel is generated. That only works if something checks the output before they see it — and pays them back when it cannot.

## Read this first

Selling non-deterministic output is a trust problem, not a tech problem.

The thing I run is a print-on-demand ecommerce project. The customer uploads photos, writes a specification of what they want, pays, and a physical printed product arrives. Between the payment and the parcel there is a generative model, and a generative model does not do the same thing twice.

Every piece of ordinary ecommerce infrastructure assumes it does. A SKU is a promise: you saw the picture, you get the picture. Here there is no picture until after the money moves. The customer is buying a probability distribution and hoping it lands on the good side of the curve.

<div class="callout">
  <p><b>That is the actual product problem.</b> Not prompt quality. Not model choice. The question is: what do you put between the model's output and the customer's eyes so that the customer's trust does not depend on the model having a good day?</p>
</div>

My answer was to build a second AI whose only job is to mark the first one's homework — compare what came out against what the customer asked for, score it, and refuse to ship anything that fails. And behind that, a refund that fires on its own when the scoring keeps failing, before the customer has written a single email.

This article is that architecture. Nothing here is specific to what I sell. If you sell anything that can fail in front of a customer — generated images, generated copy, transcripts, translations, agents doing tasks on someone's behalf — the shape transfers directly.

## Purchase-first, and the unit economics maths

Almost every AI product does the same thing: give the generation away, hook the user on the magic, monetise later. Free tier, watermark, upgrade prompt. It is a reasonable strategy when inference is close to free and the marginal user costs you a rounding error.

Mine costs real money per unit. A single order runs:

- **Vision analysis** of every uploaded customer photo
- **Image generation**, and not once — several candidates per order
- **A second model pass** scoring each candidate against the photos and the written spec
- **4x upscaling** of the winner, because print resolution is unforgiving in a way screens are not

Stack those and free generation stops being a growth tactic and becomes a subsidy paid to people who will never buy. So I inverted it. **The customer pays through Shopify before anything runs.**

<div class="callout callout--cyan">
  <p><b>The arithmetic that decides it.</b> Free-first: you pay full generation cost for 100% of visitors who click the button, and you recover it from the fraction who convert. Purchase-first: you pay generation cost for 100% of paying customers, and 0% of everyone else. The break-even is not close. Unit economics are positive from order number one, without a funding round to bridge the gap.</p>
</div>

<table>
  <tr><th>Dimension</th><th>Free-first (the default)</th><th>Purchase-first (this build)</th></tr>
  <tr><td>Who pays for compute</td><td>You, for everyone</td><td>The customer, for themselves</td></tr>
  <tr><td>Cost of a tyre-kicker</td><td>Full generation run</td><td>Zero</td></tr>
  <tr><td>Funnel friction</td><td>Low — try before you buy</td><td>High — buy before you see</td></tr>
  <tr><td>Where the work goes</td><td>Into acquisition volume</td><td>Into the wizard and the guarantee</td></tr>
  <tr><td>What has to be excellent</td><td>The hook</td><td>The trust mechanics</td></tr>
  <tr><td>Failure mode</td><td>Burn rate</td><td>Refunds and reputation</td></tr>
</table>

The trade-off is honest and it is severe. A higher-friction funnel means the customisation wizard has to do real work — it is not decoration on the way to the checkout button, it is the entire pre-purchase experience. It has to set expectations accurately enough that the person paying knows roughly what they will get, and it has to gather enough input that the generation has a chance of matching that expectation.

And it means the post-purchase machinery has to be built to a standard that free-first products never need. If you take money first, you owe the customer a guarantee. That guarantee is sections 02 through 07.

## The review-layer architecture

Here is the whole path from card charged to print file, in order.

<pre class="flow">  <b>SHOPIFY CHECKOUT</b>   money moves first
       │            order webhook · customer photos · written spec
       ▼
  <b>PHOTO QUALITY GATE</b>   <i>(runs pre-purchase, see 05)</i>
       │            angle · face visibility · one-tap question
       ▼
  <b>GENERATE × N</b>   several candidate renders per order
       │            prompt assembled from: spec + photo analysis
       │            + <i>prompt learning history for this product line</i>
       ▼
  <b>REVIEW LAYER</b>   a second model marks each candidate
       │            ├─ compare render ⟷ uploaded photos   → likeness score
       │            ├─ compare render ⟷ written spec      → adherence score
       │            └─ write a critique in plain language
       │
       ├─ score <b>&lt; 85%</b> ──▶ <i>REGENERATE</i>, feeding the model its own
       │                        critique back in as correction
       │                        ↑                            │
       │                        └────── up to 3 attempts ─────┘
       │                                      │
       │                                      ▼
       │                            <b>AUTO-REFUND</b>  no email required
       │
       └─ score <b>≥ 85%</b> ──▶ best render <i>auto-flagged as winner</i>
       │
       ▼
  <b>HUMAN CURATION</b>   a person looks at it before anything moves
       │            the model has no taste; this step supplies it
       ▼
  <b>CUSTOMER APPROVAL</b>   HMAC-signed expiring link
       │            approval writes an <i>immutable snapshot</i>
       ▼
  <b>4× UPSCALE → PRINT PROVIDER</b>
                  atomic lock: one order can never be pushed twice
</pre>

Read that top to bottom and you can see the design principle: **every step that can produce a wrong answer has a step after it that can catch the wrong answer.** Generation is checked by review. Review is checked by a human. The human is checked by the customer. The customer's approval is checked by an immutable record of exactly what they approved.

The interesting part is not that a model generates images. Everybody has that. The interesting part is that nothing in the chain is trusted to be right on its own.

## The scoring rubric, and why 85%

"An AI scores the output" is the kind of sentence that sounds like a solved problem and is not. Scoring against what? Compared how? The rubric is the thing that does the work, and mine has two independent axes because the two ways this can fail are unrelated.

<div class="cards">
  <div class="card">
    <h4>Likeness</h4>
    <p>Does the rendered subject match the person in the uploaded photos? This is a comparison against evidence the customer supplied. It has a ground truth.</p>
  </div>
  <div class="card">
    <h4>Instruction adherence</h4>
    <p>Does the render do what the written specification asked for? This is a comparison against language the customer wrote. It has an intent, not a pixel.</p>
  </div>
</div>

Keeping them separate matters because a render can be a beautiful, faithful likeness that ignores half of what the customer typed — and it can follow every written instruction perfectly while looking like somebody else entirely. Those are different bugs with different fixes. A single blended "quality score" would average them into uselessness and tell you nothing about what to correct on the next attempt.

<table>
  <tr><th>Axis</th><th>Compared against</th><th>Failure it catches</th><th>Correction it implies</th></tr>
  <tr><td>Likeness</td><td>Customer's uploaded photos</td><td>Wrong face, drifted features, lost identity</td><td>Strengthen photo conditioning, re-weight reference</td></tr>
  <tr><td>Adherence</td><td>Customer's written spec</td><td>Missing or ignored requested elements</td><td>Restate the spec explicitly in the next prompt</td></tr>
</table>

### Why the threshold sits at 85

85% is not a number I derived from a formula, and I will not pretend otherwise. It is a threshold chosen deliberately for what it does to the two error types, and it moves if reality argues with it.

- **Set it too low** — say 60 — and the gate stops being a gate. Mediocre renders auto-pass, the human curator becomes the only real filter, and you have built an expensive logging system.
- **Set it too high** — say 97 — and almost nothing passes. You burn three attempts on orders that were fine, refund customers who would have been happy, and the compute cost of the retry loop eats the margin that purchase-first was supposed to protect.
- **85 sits where auto-pass is defensible.** High enough that a passing render is one I am comfortable putting in front of a person without hedging; low enough that the retry loop is an exception rather than the default path.

<div class="callout">
  <p><b>The threshold is a business decision wearing a technical costume.</b> It encodes exactly how much risk you are willing to push onto the customer versus how much compute you are willing to spend to avoid it. Anyone who tells you their threshold came out of the data is describing the calibration, not the choice.</p>
</div>

One thing the score is *not*: a promise. Passing 85 means the render cleared an automated bar. It does not mean it is good. That is what section 09 is about.

## What happens below threshold

A failing score is more useful than a passing one, because it comes with a reason.

The review model does not only emit a number. It writes a critique — what specifically is wrong, on which axis. That critique is then fed back into the next generation attempt as correction. The model is, quite literally, given its own marked homework and asked to try again with the corrections in hand.

<pre class="flow">  attempt 1  ──▶  score: <b>below threshold</b>
                  critique: <i>"missing element X from the spec;
                             likeness drifts on the upper face"</i>
                       │
                       ▼
  attempt 2  ◀── prompt = original spec
                       + photo analysis
                       + <b>critique of attempt 1</b>
                       + <i>prompt learning history</i>
                       │
                       ▼
                  score: <b>below threshold</b> ──▶ attempt 3
                       │
                       ▼
                  still failing ──▶ <b>AUTOMATIC REFUND</b>
</pre>

### The learning history is the part that compounds

Per-order self-correction is nice. It fixes this order. What actually changes the economics is that **previous attempts — good and bad — are stored and fed into future prompts.**

That converts a failed generation from a pure loss into a training signal. Under a naive setup, a bad render costs you compute and teaches you nothing; the next customer with a similar request walks into the identical failure. With a learning history, the system carries forward what worked and what did not, and the failure rate on that class of request bends downward over time.

<div class="callout callout--cyan">
  <p><b>Frame it as an asset.</b> Every order leaves behind a record of which prompt shapes produced high scores and which produced low ones. That record is the only thing in this stack that gets more valuable the longer it runs — the models will be replaced, the print provider might be replaced, the accumulated knowledge of what actually scores well does not get replaced.</p>
</div>

It also inverts the emotional experience of a bad generation. A failure is no longer money on fire. It is the system finding an edge it did not know about, and writing it down.

## Gates before the money

The cheapest failure is the one that never enters the pipeline. If the input is bad, no amount of scoring downstream will rescue the output — you will just spend three attempts and a refund proving that a blurry photo taken from behind cannot become a good print.

So the quality gate runs **before the customer proceeds**, not after they pay.

<div class="cards">
  <div class="card">
    <h4>Angle</h4>
    <p>Is the subject shot from an angle the generation can actually work from? Rejected early, with a reason, not silently accepted.</p>
  </div>
  <div class="card">
    <h4>Face visibility</h4>
    <p>Is the face actually visible and usable as a likeness reference? Likeness scoring in section 03 is impossible without it.</p>
  </div>
  <div class="card">
    <h4>The one-tap question</h4>
    <p>Detected, then <em>asked about</em>: do you want this detail kept? Not guessed. This is one of the highest-regret details and the customer owns the answer.</p>
  </div>
</div>

The one-tap question is my favourite thing in the entire build, because it is not a technical feature. It is the recognition that some choices are not the system's to make. Keeping or removing a personal detail changes whether the person in the render reads as themselves, and there is no correct default. Guessing gets it wrong roughly half the time. Asking gets it right every time and costs one tap.

<div class="callout">
  <p><b>The general rule:</b> when a detail materially changes whether the customer recognises themselves, and the system cannot infer the answer better than the customer can state it, <em>ask</em>. Every ambiguity you resolve at input time is one you do not have to detect, score, critique and regenerate later.</p>
</div>

Gates before the money also do something for the funnel that is easy to miss: they make the higher-friction purchase-first flow feel like diligence rather than obstruction. Being told "this photo will not work, here is why" before paying reads as competence. Being told it after paying reads as a bait and switch.

## The refund escape hatch

This is the section that makes the rest of it defensible.

<p class="stat">3 failed generations → automatic refund</p>

Not a support ticket. Not a policy page. Not "contact us within 14 days." After three attempts that fail to clear the threshold, the money goes back on its own, **before the customer has to email anyone.**

<div class="callout">
  <p><b>Charging before you deliver is only defensible if you build the way out.</b> If you take money up front for output you cannot guarantee, and the only route to a refund runs through a human who has an incentive to say no, you have not built a business model — you have built a complaint queue. The automatic refund is the price of admission for purchase-first.</p>
</div>

### Why automatic beats generous

Plenty of companies have a generous refund policy. Very few have one that fires without being asked. The difference is where the burden sits.

<table>
  <tr><th>Model</th><th>Who acts</th><th>What the customer experiences</th></tr>
  <tr><td>Standard policy</td><td>Customer must notice, write in, and argue</td><td>Friction exactly when they are already unhappy</td></tr>
  <tr><td>Generous policy</td><td>Customer must still ask; you say yes quickly</td><td>Better, but the burden is still theirs</td></tr>
  <tr><td>Automatic</td><td>The system, on its own, at attempt three</td><td>Refunded before they thought to ask</td></tr>
</table>

There is a second-order effect that matters more than the goodwill. An automatic refund puts a hard, self-enforcing ceiling on how much a broken order can cost you in compute — three attempts and it stops — and a hard floor under how badly it can damage the customer relationship. It converts an unbounded downside into a known, bounded one.

It also keeps you honest. A refund that fires on its own is a metric you cannot ignore or explain away. If it fires often, the generation is bad, and no amount of reassuring copy on the product page will fix that.

## Snapshots, signed links, and deleted photos

Three mechanics that sound like plumbing and are actually the trust layer.

### Immutable approval snapshots

When a customer approves a render, the system writes a record of exactly what they approved and that record does not change afterwards. Not the current state of the order — the state at the moment of approval, frozen.

This resolves the single nastiest dispute class in custom manufacturing: *"that is not what I signed off on."* With a mutable order record, that argument is unwinnable by either side, because the record now reflects everything that happened since. With a snapshot, there is one artifact both parties agreed on and it still exists in the form it had when they agreed.

### HMAC-signed expiring links

The approval step happens over a link. That link shows someone's photos and their render, so it cannot be a guessable URL sitting on the open internet for ever.

- **Signed** — the link carries an HMAC, so a tampered or invented URL fails verification instead of loading someone else's order.
- **Expiring** — access is bounded in time. A link that leaks a year from now is already dead.

No accounts, no passwords, no login flow standing between a customer and approving their own order — and still not a public URL. That combination is why signed expiring links are worth the small amount of work they take.

### Photos are auto-deleted

Customer photos are inputs, not inventory. Once the pipeline no longer needs them, they are deleted automatically. Nobody has to remember to run a cleanup, and the retention window is not a promise in a privacy policy that depends on somebody's diligence — it is behaviour of the system.

<div class="callout callout--cyan">
  <p><b>And the empty review section.</b> The reviews area on the site stays empty until there are real reviews. No seeded testimonials, no placeholder five-stars, no "trusted by thousands" over a stock photo. An empty review section is a small, unglamorous credibility signal — and the moment you fake it, every other guarantee on the page becomes something a visitor has to take on faith.</p>
</div>

### And the boring one that saves you

A duplicate-push guard: an atomic lock ensuring the same order can never be pushed to the print provider twice. Retries, webhook replays and impatient clicks all try to do this eventually. Without the lock, the failure mode is two physical objects manufactured and shipped for one payment — an error that costs real money and cannot be undone with a database rollback.

## The trust checklist

Copy this. It applies to anything you sell that can fail in front of a customer — generated media, generated copy, transcription, translation, agents acting on someone's behalf.

1. **Decide who pays for failure before you launch.** Free-first puts the cost of every bad output on you. Purchase-first puts it on the customer unless you build a way out. Both are valid. Choosing by accident is not.
2. **Gate the inputs before you take the money.** Check the things that make good output impossible — resolution, angle, visibility, missing information — while the customer can still fix them for free.
3. **Ask about ambiguities instead of guessing.** Any detail where you would be right about half the time, and the customer would be right every time, is a question, not a default.
4. **Generate more than one candidate.** A single sample from a non-deterministic process is a coin flip you are asking the customer to accept.
5. **Score every candidate against the customer's own inputs.** Not against a vibe. Against the evidence they uploaded and the words they wrote.
6. **Split the score into independent axes.** Fidelity to evidence and adherence to instructions fail separately and are fixed separately. A blended number tells you nothing actionable.
7. **Pick an auto-pass threshold on purpose, and write down why.** It is a risk decision, not a measurement. Revisit it when reality argues.
8. **Make failures produce a critique, not just a rejection.** A score without a reason cannot drive a correction.
9. **Feed the critique back into the retry.** The cheapest improvement available is the model reading its own marked homework.
10. **Store good and bad attempts and use them on future work.** This is what turns a cost centre into a compounding asset.
11. **Cap the retry loop with a number, not with judgement.** Unbounded retries are an unbounded compute bill and an unbounded wait for the customer.
12. **Automate the refund at the cap.** Before the customer asks. The burden of a failure belongs on the system that failed.
13. **Keep a human before fulfilment.** Scoring catches wrongness. It does not catch tastelessness.
14. **Get explicit customer approval before anything irreversible.** Printing, sending, publishing, purchasing — anything you cannot take back.
15. **Snapshot the approval immutably.** Store what they agreed to, exactly as it was, so no dispute turns on memory.
16. **Sign and expire every link that shows private content.** Unguessable is not the same as unauthorised.
17. **Delete customer inputs automatically once you are done with them.** Retention should be a system behaviour, not a good intention.
18. **Put an atomic lock on every irreversible external action.** Retries and replays will eventually fire it twice. Assume they will.
19. **Do not fake social proof.** Empty is more credible than invented, and it costs you nothing but patience.
20. **Promise the timeline you can actually hit.** Mine launched at 24 hours and was revised to 48 once reality voted. Changing the promise to match the truth is cheaper than missing it repeatedly.

<div class="callout">
  <p><b>If you implement three of these, implement 5, 9 and 12.</b> Score the output against the customer's own inputs, feed the critique back into the retry, and refund automatically at the cap. That is the minimum viable version of everything above.</p>
</div>

## The honest section

What this does not do.

### It does not have taste

The review layer can tell you a render resembles the person in the photos and includes the elements the spec asked for. It cannot tell you the result is *good*. Composition, tone, whether something is subtly awful in a way that is obvious to a human in half a second — none of that is in the rubric, and I do not believe I could put it there.

### A human still curates

Which is exactly why there is a person in the loop before fulfilment. Not as a legacy step waiting to be automated away — as the component that supplies the judgement the scoring cannot. And the customer approves before anything is printed, which makes them the final reviewer of a chain that already has two.

### Scoring correlates with quality. It does not equal it.

An 85 is a proxy. It is a useful proxy, chosen and tuned to be useful, and it is still a proxy. There will be renders that score 90 and are lifeless, and renders that score 80 and are the best thing the system has made that week. Anyone selling you a scoring layer as a guarantee of quality is selling you a correlation and calling it a contract.

### And none of it helps if the underlying generation is bad

This is the one people skip. A review layer is a filter, and a filter cannot add quality that was never generated. If the base generation is weak, all this architecture buys you is an expensive, well-instrumented way to discover that three times per order and issue a refund.

<div class="callout">
  <p><b>Build the generation first.</b> Get the output good enough that a reasonable person would be happy with a random sample of it. <em>Then</em> add the review layer to catch the tail. In that order. Reversed, you have built quality control for a factory that does not work.</p>
</div>

<hr>

### What I would tell you to build in a weekend

1. **Generate two candidates instead of one.** Nothing else. Just stop shipping a single sample of a random process.
2. **Add a scoring pass.** One model, one prompt, comparing output to the customer's inputs. Log the score next to the order; do not act on it yet.
3. **Watch the scores for a week** against outputs you have judged yourself. That is where your threshold comes from — not from a blog post, mine included.
4. **Turn on the retry with the critique fed back.** Cap it at three.
5. **Automate the refund at the cap** before you tell anyone the guarantee exists.
6. **Then add the input gates**, and watch how many of the failures you were catching downstream simply stop happening.

<div class="callout">
  <p><b>One more thing.</b> The delivery promise on this project launched at 24 hours and is now 48. Not because the pipeline got slower — because the honest number was 48 and the ambitious one was 24, and reality voted. Every mechanic in this article exists for the same reason: it is cheaper to build the system that tells you the truth than to keep managing the consequences of a promise you cannot keep.</p>
</div>

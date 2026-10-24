---
title: 25 iterations on an AI product. Only four were about the AI.
description: 25 changes to an AI print-on-demand product, logged and categorised in order. The generation worked early. Only four were about the AI.
date: 2026-10-26
topic: Build log
drawing: sessions
order: 4
---

The full log from a print-on-demand ecommerce project I run — every change, categorised, in the order it happened. The generation worked early. Everything after that was operations.

## Read this first

Twenty-five iterations shipped on an AI product. Here is how many of them were about the AI:

<p class="stat">4 of 25</p>

That is the whole article in one number, and I would like you to sit with it before you read the log, because it is the opposite of what the internet told me to expect.

The product is a print-on-demand side project: a customer uploads a photo, a model generates artwork from it, the artwork gets printed and shipped. The AI part — the part every course, thread and launch video treats as *the* product — was working well enough to sell from within the first handful of iterations. It has needed four meaningful changes since.

The other twenty-one were order states, revision loops, integration glue, fulfilment edge cases, refunds, legal wording, print geometry, and stopping the same order being pushed to the printer twice.

<div class="callout">
  <p><b>The thesis:</b> the generation was never the hard part. Getting a generated image through approval, revision, upscale, print and a courier without a human babysitting it — that was the hard part, and it is invisible in every "build an AI business" plan I have read.</p>
</div>

What this article is: the actual log, in order, with categories. What it is not: a case study with numbers. There are no revenue figures, order counts or conversion rates here, because the point I am making does not depend on them and inventing them would ruin it. Section 06 is the template, if you want to skip the story and take the tool.

<hr>

## The full log

Twenty-five iterations, in the order they shipped. <span class="hl">Amber rows are the four AI ones.</span> "Why it happened" is the trigger — the thing that made the change necessary, which is usually more interesting than the change.

<table>
<thead>
<tr><th>#</th><th>Category</th><th>What it was</th><th>Why it happened</th></tr>
</thead>
<tbody>
<tr><td>01</td><td>UX</td><td>Landing page launch</td><td>Needed a place to send traffic and something to test demand against. Nothing behind it yet worth defending.</td></tr>
<tr><td>02</td><td>UX</td><td>Design polish for readability</td><td>The first version was legible to me and to nobody else. Line length, contrast and hierarchy, not aesthetics.</td></tr>
<tr><td>03</td><td>Legal/IP</td><td>IP-safe copy rewrite</td><td>The original copy leaned on terms the business had no right to use. Rewrote everything in its own words and removed them. This is not a detail — it is the change that decides whether the business is allowed to exist.</td></tr>
<tr><td>04</td><td>UX</td><td>Multi-step wizard</td><td>One long form asked for everything at once and people abandoned it. Split into steps so each screen asks one question.</td></tr>
<tr><td>05</td><td>Integration</td><td>Shopify integration</td><td>Stopped hand-rolling checkout. Orders, payment and customer records move to a system that already handles tax, receipts and refunds.</td></tr>
<tr><td>06</td><td>Integration</td><td>Printify integration</td><td>Same logic on the other end: stop being the printer. The order now leaves my system and enters a fulfilment network.</td></tr>
<tr><td>07</td><td>UX</td><td>Second and third art style upsell</td><td>People who had already paid wanted another version. Offering it at the right moment turned one decision into a bigger one.</td></tr>
<tr><td>08</td><td>Fulfilment</td><td>Shipping address flow</td><td>Addresses collected at the wrong moment, in the wrong shape, are the single most reliable way to produce an undeliverable parcel. Moved and restructured.</td></tr>
<tr><td>09</td><td>Order state</td><td>Proper revision lifecycle</td><td>"Customer wants a change" had no state of its own. It lived in email and in my head. Gave revisions explicit states, limits and transitions.</td></tr>
<tr><td>10</td><td>UX</td><td>Admin dashboard reorganised into phase tabs</td><td>The admin view listed orders. It needed to show <em>where</em> each order was stuck. Reorganised around lifecycle phases so the queue tells me what to do next.</td></tr>
<tr class="hl"><td>11</td><td><span class="hl">AI</span></td><td>AI review layer</td><td>A generated image that is technically successful can still be obviously wrong. Added a model-based review pass before a human ever sees it.</td></tr>
<tr class="hl"><td>12</td><td><span class="hl">AI</span></td><td>Photo quality gate</td><td>Bad input photos produce bad output, and the customer blames the output. Gate the upload instead of apologising for the result.</td></tr>
<tr><td>13</td><td>Order state</td><td>Immutable approval snapshots</td><td>Once a customer approves, that exact version must be the thing that prints — not "whatever the latest file is". Approval now freezes a snapshot.</td></tr>
<tr class="hl"><td>14</td><td><span class="hl">AI</span></td><td>4x upscale before print</td><td>Screen-resolution output is fine on a phone and unacceptable on a wall. Added an upscale step between approval and print.</td></tr>
<tr><td>15</td><td>Edge case</td><td>Duplicate push guard with an atomic lock</td><td>The same order could be pushed to the printer twice — a retry, a double click, two tabs. Every duplicate is a real physical object with a real cost. Fixed with a proper lock, not a check.</td></tr>
<tr class="hl"><td>16</td><td><span class="hl">AI</span></td><td>Known-defect detection</td><td>A specific, repeatable failure mode in the generation that needed detecting up front rather than discovering at revision time.</td></tr>
<tr><td>17</td><td>Integration</td><td>One-click Shopify status sync</td><td>Two systems disagreeing about whether an order is fulfilled is how you get a support ticket. Pushed status back with one action instead of two logins.</td></tr>
<tr><td>18</td><td>UX</td><td>Group orders for 3–4 people</td><td>Asked for repeatedly. Expanding from one subject to several changes the flow, the pricing and the review — a product decision, not a prompt change.</td></tr>
<tr><td>19</td><td>UX</td><td>New collections</td><td>More reasons to choose, and more reasons to come back. Merchandising, not engineering.</td></tr>
<tr><td>20</td><td>Fulfilment</td><td>48-hour delivery promise, revised down from 24</td><td>The 24-hour promise was true on a good day and a liability on a normal one. Revised the promise to match the system instead of forcing the system to match the promise.</td></tr>
<tr><td>21</td><td>Order state</td><td>Refund escape hatch</td><td>Some orders should end. Without an explicit exit they sit in the queue forever, consuming attention and goodwill. Made "stop, refund, close" a first-class path.</td></tr>
<tr><td>22</td><td>Fulfilment</td><td>Personalised insert card</td><td>A physical product benefits from something that makes it feel made for the buyer rather than generated. Cheap to add, disproportionate effect on how it lands.</td></tr>
<tr><td>23</td><td>UX</td><td>Email improvements</td><td>Transactional email is the product for most of the customer's waiting time. Better clarity about what happens next, and when.</td></tr>
<tr><td>24</td><td>Fulfilment</td><td>Cheaper print provider switch</td><td>Same output, better unit economics. Switching a provider is never just a switch — it is new sizes, new colour behaviour, new lead times.</td></tr>
<tr><td>25</td><td>Print quality</td><td>Edge mirror settings</td><td>The edge of the print is a real design surface. Getting the mirror settings right is the difference between a finished object and a cropped one.</td></tr>
</tbody>
</table>

<hr>

## The category breakdown

Count them and the shape appears immediately.

<table>
<thead><tr><th>Category</th><th>Count</th><th>Iterations</th><th>Share</th></tr></thead>
<tbody>
<tr><td>UX</td><td>8</td><td>01, 02, 04, 07, 10, 18, 19, 23</td><td>32%</td></tr>
<tr><td>Fulfilment</td><td>4</td><td>08, 20, 22, 24</td><td>16%</td></tr>
<tr class="hl"><td><span class="hl">AI</span></td><td>4</td><td>11, 12, 14, 16</td><td>16%</td></tr>
<tr><td>Integration</td><td>3</td><td>05, 06, 17</td><td>12%</td></tr>
<tr><td>Order state</td><td>3</td><td>09, 13, 21</td><td>12%</td></tr>
<tr><td>Legal/IP</td><td>1</td><td>03</td><td>4%</td></tr>
<tr><td>Print quality</td><td>1</td><td>25</td><td>4%</td></tr>
<tr><td>Edge case</td><td>1</td><td>15</td><td>4%</td></tr>
</tbody>
</table>

<pre class="flow">UX            <b>████████</b>  8
Fulfilment    <b>████</b>      4
<i>AI</i>            <b>████</b>      4
Integration   <b>███</b>       3
Order state   <b>███</b>       3
Legal/IP      <b>█</b>         1
Print quality <b>█</b>         1
Edge case     <b>█</b>         1
</pre>

Two readings of that chart, and both are true.

<div class="cards">
  <div class="card"><h4>The obvious one</h4><p>AI is 16% of the work on an AI product. Four changes out of twenty-five.</p></div>
  <div class="card"><h4>The sharper one</h4><p>Group fulfilment, order state, integration, print quality and edge case together — the plumbing — and you get 12 of 25. Nearly half the log is moving an order safely from A to B.</p></div>
</div>

And the UX count is not soft work. Iterations 04, 10 and 18 are structural: a wizard, a queue reorganised around lifecycle phases, and a product scope change. "UX" in this log mostly means "the system finally matched how the work actually flows."

<div class="callout callout--cyan">
  <p><b>What is missing from the chart is more interesting than what is on it.</b> There is no "model change" category. No "prompt engineering" category. No retraining, no fine-tuning, no evaluation harness rebuild. Those are the things I expected to dominate a log like this, and they are simply not here.</p>
</div>

<hr>

## The four AI ones

I picked these four because each one changes what the model does or what reaches it — a generation-path change, not a business-logic change wrapped around a model call. Iteration 18 (group orders) is arguably a fifth: it does affect the generation. I filed it under UX because the work was overwhelmingly flow, pricing and review, not the model. Iteration 24 involves image output but is a supplier decision. If you disagree with those two calls, you would have five and three respectively — the argument survives either way.

### 11 · AI review layer

The first thing you learn shipping generated images to paying customers is that "the generation succeeded" and "the image is acceptable" are different questions. A result can be technically clean, correctly composed, entirely on-brief and still obviously wrong to a human in half a second.

The review layer is a model pass that looks at the output before anyone else does and decides whether it should proceed. It is not quality scoring for its own sake — it exists so the queue that reaches a human contains fewer things a human has to reject. Every rejection caught here is a revision cycle that never happens.

This is also the only one of the four that is genuinely about making the AI better rather than making it safer to operate.

### 12 · Photo quality gate

Garbage in, garbage out — except the customer supplied the garbage and will hold you responsible for the out.

The gate moves the conversation to the front. Instead of generating from a poor input, delivering a poor result, absorbing a complaint, running a revision and generating again, the system says at upload time that this photo will not produce a good result and asks for another. The customer is more receptive to that feedback before they have paid emotionally than after they have seen a disappointing output.

Note what kind of change this really is: it is an AI change whose entire purpose is to reduce operational load downstream. It belongs to the same family as the rest of the log.

### 14 · 4x upscale before print

An image that looks perfect in a browser preview is not an image you can print at wall size. This is the single most common gap between "AI demo" and "AI product", and it is not solved by a better prompt.

The upscale sits between approval and print, which is a deliberate position: the customer approves what they saw, and the system then produces the print-ready version of exactly that. Putting it earlier means upscaling work that gets revised away. Putting it later means it is not part of the frozen snapshot.

### 16 · Known-defect detection

The most narrow and most instructive of the four. One defect was a repeatable, identifiable failure mode in the generation — a specific thing that went wrong often enough to name.

The lesson is not about that one defect. It is that mature AI work stops being "improve the model" and becomes "enumerate the known failure modes and detect each one before it reaches a customer." That is a completely different discipline. It looks like QA, not like machine learning, and it is where AI features go when a product grows up.

<div class="callout">
  <p>Three of the four AI iterations are gates and checks around generation. Only one improves generation itself. That ratio is the actual state of applied AI in a small product.</p>
</div>

<hr>

## The ones that cost the most and looked like the least

Nobody makes content about these. They are the four I would warn a past version of myself about.

### 15 · The duplicate push with an atomic lock

An order gets pushed to the printer. The request is slow. Someone clicks again, or a retry fires, or a second browser tab is open, or a webhook is redelivered. Now the same order exists twice in the fulfilment system.

In a software product a duplicate record is an annoyance you clean up. In print-on-demand it is a physical object that gets manufactured, boxed and shipped, and someone pays for it. The failure has mass.

The thing that makes this expensive is that the naive fix does not work. "Check whether it was already pushed, then push" is two operations with a gap between them, and the entire failure mode lives in that gap. The correct fix is an atomic lock: claim the right to push in a single indivisible operation, and only the claim-winner proceeds. Everything else is theatre.

<div class="callout">
  <p>If your AI product touches money, inventory or anything physical, work out where the duplicate can happen and lock it properly. This is the least glamorous paragraph in this article and possibly the most valuable.</p>
</div>

### 09 · The revision lifecycle

Before iteration 09, revisions existed — customers asked for changes and got them. What did not exist was a *lifecycle*: defined states, defined transitions, defined limits, defined endings.

Without that, "one more small change" has no natural stopping point and the order never closes. The customer is not being unreasonable; the system simply never told either party what "done" means. Giving revisions explicit states makes the boundary a property of the product rather than a conversation I have to have.

### 09, 13, 21 · Order state as a whole

Three separate iterations are really one long realisation: **the order is the product.**

Not the image — the order. An order needs to know what it is waiting on, who it is waiting on, what version was approved, whether that version is frozen, and how it can end without being fulfilled. Once approval creates an immutable snapshot (13), "print the approved thing" stops being ambiguous. Once refunds are a real path (21), orders can end deliberately rather than by exhaustion.

Every hour I spent on order state bought back hours of manual attention. Every hour I did not spend on it, I paid for later at a worse exchange rate.

### 20 · Revising 24 hours down to 48

The hardest one, because it is the only iteration where the change was to make the product sound worse.

A 24-hour promise that holds most of the time is not a 24-hour promise — it is a 24-hour promise plus a queue of exceptions, each of which costs an apology, a support exchange and some trust. Moving to 48 hours converted a frequently-broken promise into a reliably-kept one.

Every instinct in marketing pushes the other way: tighten the promise, look faster, win the comparison. But a promise is an operational commitment wearing a marketing costume, and the operations always win in the end. Revising the number down was a product improvement disguised as a downgrade.

<hr>

## What the "build an AI business in 30 days" plans leave out

Those plans are not lying. They are describing iterations 01 through 06 accurately and then stopping, because that is where the interesting-looking part ends.

<div class="cards">
  <div class="card"><h4>Order state</h4><p>Where is this order, what is it waiting on, and how does it end? No plan mentions it. Three iterations here, and they were the ones that bought back my time.</p></div>
  <div class="card"><h4>Revision loops</h4><p>Customers want changes. Without defined states and limits, "one more tweak" has no end and neither does the order.</p></div>
  <div class="card"><h4>Idempotency</h4><p>The same action firing twice. In a physical product this manufactures a real object. Locks, not checks.</p></div>
  <div class="card"><h4>Legal and IP wording</h4><p>One iteration, and it determines whether the business is permitted to exist at all. Not a growth lever — a licence to operate.</p></div>
  <div class="card"><h4>Print and physical reality</h4><p>Resolution, wrapped edges, mirror settings, provider colour behaviour. The screen is not the product.</p></div>
  <div class="card"><h4>Promises you can keep</h4><p>Delivery windows are operational commitments. Setting them by ambition rather than by capacity is a debt with interest.</p></div>
  <div class="card"><h4>Exception paths</h4><p>Refunds, undeliverable addresses, unusable uploads. The happy path is a small fraction of the work.</p></div>
  <div class="card"><h4>Your own admin view</h4><p>You are the bottleneck. A queue organised around lifecycle phases is a productivity feature for the person running it.</p></div>
</div>

There is a structural reason for the omission. A 30-day plan is written from the launch, and every category above only becomes visible *after* real orders start flowing through a real system with real failures. You cannot see iteration 15 from iteration 06. The plan is not incomplete out of dishonesty — it is incomplete because it stops at the exact point where the product starts.

<div class="callout callout--cyan">
  <p>If you want a sharper version of the advice: assume the AI part will work sooner than you expect and be a smaller share of the work than anyone told you. Budget your attention for order states, exceptions and fulfilment from day one.</p>
</div>

<hr>

## The template

This is the part worth stealing. The log above is not a retrospective I reconstructed — it exists because I recorded each iteration as I shipped it. That is the entire trick.

### The columns

<table>
<thead><tr><th>Column</th><th>What goes in it</th><th>Why it earns its place</th></tr></thead>
<tbody>
<tr><td>#</td><td>Sequential number</td><td>Order matters more than dates. You want to see what came after what.</td></tr>
<tr><td>Category</td><td>One label, from a fixed list</td><td>The categories are what turn a list into an argument. One label only — forcing the choice is the point.</td></tr>
<tr><td>What it was</td><td>One line, plain language</td><td>If you cannot describe it in a line, it was two iterations.</td></tr>
<tr><td>Why it happened</td><td>The trigger, not the justification</td><td>The most valuable column. "A customer did X" and "it broke when Y" are what you will want in six months.</td></tr>
</tbody>
</table>

### The categories

Mine are: `UX`, `integration`, `fulfilment`, `legal/IP`, `print quality`, `order state`, `edge case`, `AI`. Yours will differ — swap `fulfilment` and `print quality` for whatever your product physically or operationally has to get right. Keep `AI` as its own category even if you expect it to be large, because the whole value of the exercise is finding out that it is not.

Keep the list under ten. A category list long enough to fit everything comfortably tells you nothing.

### The one rule that makes it work

<div class="callout">
  <p><b>Log it when you do it, not at the end of the month.</b></p>
  <p>Written at the time, the "why" column contains the actual trigger — the specific failure, the specific message, the specific thing that broke. Reconstructed a month later, it contains a tidy narrative in which everything you did was part of a plan. The second version is more flattering and completely useless.</p>
</div>

The entry should take under two minutes. If it takes longer, the template is too heavy and you will stop.

### Paste this into Notion

<pre><code><b>ITERATION LOG</b>

Columns:
  #            sequential number
  Category     one of: UX | integration | fulfilment | legal/IP |
               print quality | order state | edge case | AI
               (swap the middle ones for your product's reality)
  What it was  one line, plain language
  Why          the trigger. What broke, who asked, what it cost.

Rule:  log it the day you ship it. Never reconstruct.
Rule:  one category per row. Force the choice.
Rule:  if it needs two lines to describe, it was two iterations.

Review:  every 10 rows, count the categories.
         The shape is the insight, not any single row.

---
#   | Category      | What it was              | Why
--- | ------------- | ------------------------ | ------------------------
01  |               |                          |
02  |               |                          |
03  |               |                          |
04  |               |                          |
05  |               |                          |
06  |               |                          |
07  |               |                          |
08  |               |                          |
09  |               |                          |
10  |               |                          |
---

<b>At row 10, 20, 30:</b> tally categories. Ask two questions.
  1. Which category is bigger than you assumed?
  2. Which thing you believed was the product isn't in the log much?
</code></pre>

The review step is not optional decoration. A log you never count is a diary. The counting is what produced this article.

<hr>

## The honest section

Everything above is one product, one person, one year. Please weight it accordingly.

**The sample is one.** A single print-on-demand side project run by one person. A team of six, a different market, or a product where the model output *is* the deliverable with no physical object attached would produce a different distribution. If your AI is doing something genuinely at the frontier of what models can do, your AI count will be higher than four and it should be.

**The categories are mine, not a standard.** I invented them for this product, and I made judgement calls inside them — I have already flagged iterations 18 and 24 as debatable. Change the category boundaries and the percentages move. That the plumbing outweighs the model is robust to those calls; the exact split is not.

**Categorising is retrospective even when logging is not.** I recorded the iterations as I shipped them. The category labels and the four-versus-twenty-one framing came later, looking back. That is an honest ordering, but it does mean the framing is a story told about the data rather than something the data announced on its own.

**Logging does not make you ship faster.** This is the claim I most want to avoid overselling. Keeping this log did not increase my velocity, sharpen my prioritisation, or reveal what to build next. Iteration 15 was not predicted by iteration 14.

<div class="callout callout--cyan">
  <p>What it does is narrower and still worth it: <b>it stops you misremembering what you built.</b> Without the log I would have told you — sincerely — that I spent the year working on the AI. The log says four out of twenty-five, and the log is right.</p>
</div>

That gap between what I would have reported and what actually happened is the reason to keep one. Not speed. Accuracy about your own past.

And if you are about to start something similar: the AI will probably work sooner than you fear. Save your worry for the second order that gets pushed to the printer while the first one is still in flight.

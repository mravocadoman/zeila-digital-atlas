---
title: I run two businesses on 40+ AI helpers. Here's the first one to build
description: The helpers that read my inbox, file my invoices and chase quiet clients, and how to build your first one in a weekend without coding.
date: 2026-11-21
topic: Automation
drawing: pipeline
order: 9
---

I run two businesses with a small team. One is Mārketinga Skola, the agency I started in 2020, with 48 client engagements so far. The other is a print-on-demand ecommerce project I launched in July 2026. It took $6,380 that first month and $37,900 in just the first three weeks of November.

Neither has an office manager or a support desk. What they have is a little over 40 small AI helpers, about 30 of them switched on and working at any time. They read the inbox, file the invoices, chase the clients who've gone quiet and tell me when an order gets stuck. A team of five people handles only the exceptions.

None of them is clever. Each one does one boring job, writes a draft and leaves it on my desk. That's the whole trick, and you can build the first one this weekend.

**What you'll have at the end:** one helper that reads your inbox every morning, sorts it and writes the replies for you to check, plus an alarm that tells you when it breaks.

## What you need

- **n8n**, the tool that runs the helpers. The cloud version has a free trial and a monthly plan (check their site for the current price), or it's free if a developer hosts it for you.
- **A Claude account** with pay-as-you-go credit for the reading and drafting. You set a monthly limit, so it can't run away.
- **Your Gmail** and **Telegram** (free), where the helper sends you one short message a day.
- **Time:** one weekend for the first helper, then about an hour for each new one.
- **Skill:** copy and paste. No coding for anything in the main steps.

## How it works

Think of a back office full of junior staff. Each one has exactly one job. One sorts the post, one files receipts, one keeps a list of who hasn't heard from you lately. They are quick and they never get bored, but they're new, so nobody lets them sign anything.

That's the rule every helper follows: **they read, sort and draft; a person sends and spends.** My support helper drafts replies and has never sent a single one. My client helper writes at most three reminder emails a day and leaves them in my drafts folder. When something costs money or speaks for me, a human presses the button.

Here are the five that save me the most time:

1. **The receptionist** reads the support inbox, works out what each message is about and drafts the answer.
2. **The bookkeeper** opens every invoice that arrives by email, files it in the right month's folder and tells me once a week which ones are missing.
3. **The night watch** checks for orders that have sat too long without moving and messages the team.
4. **The follow-up clerk** keeps my client list current from calls, my calendar and my inbox, and drafts a reminder to anyone who's gone quiet. My list has 90 people on it. When I switched this on, 58 of them were overdue a message, so at three drafts a day it took about three weeks to work through them, without me forgetting a single one.
5. **The scout** reads the newsletters about public funding and tenders, and only tells me about the ones I could actually win money from. Its first run shortlisted two items and sent me none, because neither was worth my time. The older version had sent me four, including one it admitted was a stretch.

You'll build the receptionist first, because everybody has an inbox.

## Step 1: write down your busywork for one week

Before you build anything, keep a note for a week. Every time you do something repetitive, write what it was and roughly how many minutes it took.

Look for jobs that are mostly reading, sorting and writing the same kind of reply. Those are perfect for a helper. Jobs that need judgement about money, people or your reputation are not, at least not yet.

**Done when:** you have a list, and the job at the top of it eats at least an hour a week.

## Step 2: build the alarm before the helper

This feels backwards, but it's the step that matters most. A helper that crashes is fine. A helper that quietly stops working, while you think it's still running, is how you miss a week of customer emails.

In n8n, make one small workflow whose only job is to message you on Telegram when any other workflow fails. Then tell every helper you build to use it. In my setup one shared alarm does this job, so I never build it twice.

**Done when:** you break something on purpose and your phone buzzes.

## Step 3: let it look before it touches

Connect your Gmail to n8n and write the search that picks the emails your helper should handle, for example everything in the support label from the last day.

Then run it so it only **counts** what it finds. Don't let it move, label or archive anything yet. I learned this the hard way: one of my searches for a single word caught 151 unrelated emails, including years-old accommodation bookings that happened to contain the word, and filed them all away. I got every one of them back, but only because the labels it added told me exactly which ones it had touched.

**Done when:** the count matches what you'd expect from looking at your inbox yourself.

## Step 4: give it the rules

Now add the Claude step. This is where you tell the helper what to do with each email. Paste this and change the parts in brackets:

```
You sort and draft replies for [business name], a [one line on what you do].

For each email:
1. Put it in one group: question, complaint, order problem, sales lead, invoice, or other.
2. Write a short reply in my voice: friendly, plain, no exclamation marks, signed [your name].
3. If you are not sure of a fact (a price, a date, an order status), do not guess.
   Write [CHECK: what you need to know] in the reply instead.
4. Never promise a refund, a discount or a deadline.

Return the group and the draft. Do not send anything.
```

Point the result at Gmail's "create draft" option, never "send". Your drafts folder becomes your to-do list.

**Done when:** you open your drafts in the morning and the replies are waiting.

## Step 5: one message a day, not a dashboard

You won't look at a dashboard. You will look at your phone. Add a last step that sends you one Telegram message each morning:

```
Write a three-line summary of today's sorted emails for [your name]:
how many came in, how many drafts are waiting, and the one that looks most urgent and why.
Plain words, no lists, no emojis.
```

**Done when:** the message arrives before you've had coffee, and it tells you where to start.

## Step 6: run it for a week, then count

For one week, read every draft before you send it. Keep a tally: sent as written, sent after an edit, or thrown away.

If most drafts go out as written, the helper has earned its place. If most need rewriting, the problem is almost always the rules in step 4, not the AI. Add the mistakes you keep fixing to the rules as new lines.

Only then build the second helper. One working helper beats five half-working ones.

## Where it goes wrong

- **Letting it send on day one.** Every horror story about AI email starts here. Drafts cost you nothing; a wrong email sent in your name costs you a customer.
- **No alarm.** One of my helpers once reported that it had sent a message that never arrived, because it was pointed at the wrong chat. Nobody noticed for five days. Now the morning summary doubles as a check: if it doesn't arrive, something's wrong.
- **Searching by keyword for anything that moves email.** Count first, use sender addresses rather than words where you can, and keep the label the helper adds, because it's your undo button.
- **Starting it twice.** A long run shows no progress until it finishes, so it looks stuck. It isn't. Starting it again is how one bad search got applied four times over.
- **Building the clever one first.** The scout is the most fun to talk about. The receptionist saves the most time. Build in that order.

## Start here today

Open a note on your phone called "busywork" and start the one-week list from step 1. Don't build anything yet. At the end of the week the first helper will choose itself, and you'll know exactly how much time it has to win back.

<details>
<summary>For your developer: how the helpers are wired</summary>

This is a setup that works, not a copy of mine line for line.

**Platform.** n8n Cloud. Every workflow sets one shared failure workflow as its `errorWorkflow`; that workflow posts the failed workflow's name, the failing node and the error to a Telegram chat.

**Receptionist.** Gmail trigger (polling, filtered by label) → Claude (Messages API, the prompt from step 4, JSON output with `group` and `draft`) → Gmail "create draft" on the same thread → optionally a row in a log sheet for the step 6 tally. Never wire a Gmail send node into this workflow; review it in the editor before you publish each version, because n8n keeps a saved draft and a live version separately.

**Bookkeeper.** Gmail trigger on attachments → Claude reads the PDF and returns supplier, date, amount, currency and invoice number → Google Drive upload into `YYYY-MM` folders → row in a sheet. A weekly run compares the sheet against bank statement lines and posts the unmatched ones to Telegram.

**Night watch.** A database scheduler (Supabase `pg_cron`) calls an n8n webhook on a schedule with orders whose status has not changed past a threshold; n8n posts them to the team chat. Read-only: it never changes an order.

**Follow-up clerk.** A daily scheduled agent reads calls, calendar, mail and the invoicing app, updates one Notion page per client, and creates at most three Gmail drafts a day for contacts past their follow-up date. A small state file keeps track of what it has already done between runs.

**Scout.** Two passes. Pass one: Claude shortlists newsletter items and must quote each link verbatim from the source. Pass two: n8n fetches each linked page and Claude judges eligibility, deadline, effort and the amount of money, against a company profile in the system prompt. Only items marked worth it are emailed.

**Gotchas worth writing down.**
- Before any workflow that labels, archives or deletes mail, run the same Gmail query with `getAll` in read-only mode and check the count.
- A running execution saves its data only at the end, so it looks stuck at the trigger. Don't start a second one. The n8n MCP cannot cancel executions; unpublishing only stops new runs.
- An HTTP 200 from a webhook means the request was accepted, not that the Telegram message was delivered. Check delivery separately; a wrong chat id hid failures for five days.
- The free Supabase tier pauses idle projects; a keepalive workflow pings it every six hours.

</details>

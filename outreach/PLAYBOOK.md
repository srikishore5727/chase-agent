# ChaseAgent — Reddit Outreach Playbook (novelty-first)
> Goal: 30 days → ≥15 waitlist emails or ≥5 "I'd pay for that today" (PLAN.md §5).
> Channel: Reddit. Everything here is designed to be *interesting*, not spammy.

## 0. The honest rules (these keep the account alive)
Reddit **bans automated posting** and moderators kill 53% of everything (68% of those removals are automated bots). So the machine does **discovery + drafting + tracking**; **you do the posting** (~15 min/day).

- **90/10**: 9 value comments → 1 mention. Every comment must be worth reading *with the product line deleted*.
- **Comment first, post later**: 7 days of pure helpful comments before any post. Karma gates: r/Entrepreneur needs 10 in-sub karma, r/selfpromotion needs 20 + 7-day account.
- **Never paste the same text twice** — AutoMod and humans both catch it.
- **Disclose** ("I'm building X") when you mention the product. Honesty reads as person, not ad.
- **No cold DMs.** Reply only to people who reply to you. DMs = spam = account/domain ban.
- **Hard-banned subs**: r/marketing, r/freelance, r/sales, r/SEO, r/DigitalMarketing, r/productivity, r/ecommerce — do not post there, ever.

## 1. The novelty campaigns (pick order = below)

### A. "Steal my 3 chase emails" — value-first comment asset 🔥
In any late-payment thread, give away the **exact escalation script inline** (no link):
- **Day 3 (polite)**: "Hey [Name], just a nudge on invoice #142, $850, due the 3rd. Anything blocking it? Happy to resend the link."
- **Day 14 (firm)**: "Hi [Name], invoice #142 is now 11 days past due. I've held the next scheduled visit. Can you confirm a payment date this week?"
- **Day 30 (final)**: "Hi [Name], invoice #142 is 30 days past due with $[late fee] accruing per our terms. If payment or a plan isn't received by [date], this goes to collections/lien per our agreement."
People screenshot scripts. Screenshots travel. The product is "this script, on autopilot" — mention it in ONE line, only where allowed.

### B. Build-in-public with self-deprecating numbers 📈 (best-performing format right now)
Proven live this week: a competitor posted "boring niche, $0 MRR, week one, honest breakdown" on r/micro_saas and got traction. Our version — **funnier + specific**:
> "I'm building an AI that chases small businesses for unpaid invoices. It has 0 users. It is now chasing ME for $0 MRR. Week 1 honest numbers: …"
Post to r/EntrepreneurRideAlong, r/micro_saas, r/SideProject. Real numbers, real struggles, one screenshot of the landing page.

### C. Free tool bait: **Chase Score** 🎯 (build once, share forever)
A 3-input mini page: (# overdue invoices, avg $ amount, avg days late) → outputs:
**"You're leaving $4,200 on the table and spending ~6 hrs/mo in awkward-email hell. Here's your 3-step chase plan →"** + copy-paste scripts.
Shareable, screenshot-able, zero-login. Posts like "I built a free calculator that tells you what late invoices really cost you" get upvoted in r/SideProject / r/smallbusiness (link allowed in comments where relevant). **Candidate for our next build task.**

### D. The "Jobber charges $99" truth bomb 💣
Target threads: people complaining about Jobber/Housecall pricing (the finder searches `Jobber expensive OR Jobber pricing`). Reply with a genuine price comparison table (their tiers vs us $5). Never start with it — start with answering their actual problem.

### E. Competitor-adjacent networking, not attacks 🤝
Payment Ping, NeatInvoice, DunningOS, Jinna are posting THIS WEEK in r/SideProject, r/micro_saas. Comment genuinely on their builds. Founders talk to each other, cross-promote, and their audiences are *our* audience. One honest "fellow invoice-chaser here — your reminder sequence looks solid" beats ten pitches.

### F. Weekly promote threads (the only sanctioned ads)
r/smallbusiness **Promote-your-business weekly thread**, r/Entrepreneur **Thank You Thursday** (needs 10 karma), r/startups monthly Share Your Startup. Sharp one-liner + link:
> "ChaseAgent, the $5 AI that sends your day 3/14/30 invoice follow-ups. You approve every message. Jobber charges $99 for less. chaseagent.pages.dev"

## 2. Subreddit matrix (verified Nov 2026)

| Sub | Size | Promo policy | Our play |
|---|---|---|---|
| r/smallbusiness | 1.9M | **Q&A only; product mentions removed since Jun 2026.** Promo in weekly thread only; relevant replies allowed | Value replies + weekly promote thread |
| r/smallbusinessowner | — | Owner chat; pain threads frequent | Value replies (hot lead source) |
| r/sweatystartup | 300k+ | Trades founders; story-style ok | Value replies, occasional build story |
| r/EntrepreneurRideAlong | — | Build-in-public **allowed** | Campaign B posts |
| r/SideProject | 802k | **Allowed** | Campaign B + C launches |
| r/micro_saas | — | Journey/numbers **allowed** | Campaign B (honest breakdowns) |
| r/SaaS | 774k | **Once per 60 days**, disclosure required, AutoMod blacklists domains | One launch post, month 2 |
| r/Entrepreneur | 5.3M | 10 in-sub karma gate; Thank You Thursday thread | Warmup first, then thread |
| r/indiehackers (sub) | — | SHOW IH, once per product | One feedback post |
| r/handyman, r/LawnCarePros, r/landscaping, r/lawncare, r/HouseCleaning, r/smallbusinessuk | — | Advice subs, no promo | Pure value replies (lead goldmines) |
| r/marketing, r/freelance, r/sales, r/SEO, r/productivity | — | **Banned** | Never |

## 3. Daily routine (15 min)
1. `node outreach/find-leads.mjs` → opens `outreach/queue.md` with scored, deduped leads + draft replies
2. Pick **2 hot leads**, personalize the draft (use their words, answer their actual question)
3. Post manually. Log row in `outreach/tracker.csv`
4. Reply to any responses within 1h (founders who answer comments read as alive)
5. Fri: check tracker vs PLAN.md criteria

## 4. Draft reply archetypes
- **Advice-giver** (default): answer fully, then optional single-line mention if allowed
- **Story-sharer**: "I had the same problem until…" + the fix; human > corporate
- **Rant-supporter**: upvote + "been there" + one tactical tip; *no pitch* (rants convert later via profile)
- **Tool-curious**: when someone asks "does anything do this?" — this is the one place a direct answer with our name is right. Be honest about what's live vs planned.

## 5. 30-day calendar
| Week | Action |
|---|---|
| 1 | Warmup: 9 value comments/day across niche subs, **zero mentions**. Set up profile bio ("building ChaseAgent") + pinned comment on profile |
| 2 | Launch Campaign A in 3 pain threads + promote thread post. First build-in-public (B) on r/SideProject |
| 3 | Chase Score tool (C) → launch post. Jobber threads (D). Second build-in-public |
| 4 | Double down on whatever got replies; AMA-style "I read 200 late-payment threads, here's what works" value post |

**Kill/Go check-ins**: end of week 2 (should be ≥5 signups trending) and day 30 (final per PLAN.md §5).

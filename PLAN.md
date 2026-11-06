# ChaseAgent — Validation & MVP Plan
> Working name (A/B test it). One-liner: **"Your AI employee chases every invoice, quote and review — so you don't have to. $5/mo."**

## 1. Why this (evidence from our mining)
- Jobber charges **$99/mo Marketing Suite** (review requests), **$29 AI receptionist**, gates job costing at **$349/mo** (myquoteiq price audit, Oct 2026)
- Jobber complaints: pricing balloons, features tier-gated, reporting/job-costing "falls apart" (Trustpilot/Capterra reviews)
- Small trades owners (lawn, handyman, cleaning, plumbing) actively search for cheaper alternatives — SEO competition pages prove demand
- Agent wave serves developers + enterprises; **small businesses have no cheap agent**

## 2. Target customer
- Solo / 2–10 person service businesses: lawn care, handyman, cleaning, plumbing, HVAC, painters
- English-speaking markets (US/UK/AU/CA), global first
- Pain: unpaid invoices, forgotten follow-ups on quotes, no Google reviews, don't know which jobs made money

## 3. The product (MVP = 2 weeks)
**In scope v1:**
1. **Invoice intake** — user forwards invoice emails to their private `@chaseagent` address (avoids Gmail OAuth verification entirely — zero-friction MVP) OR uploads CSV
2. **Chase drafts** — agent drafts escalating follow-up emails (day 3 polite, day 14 firm, day 30 final-notice tone)
3. **One-tap approval** — nothing sends without user approval (approve via email reply "YES" or web dashboard)
4. **Weekly money digest** — "3 invoices overdue, $2,400 at risk; 2 quotes awaiting reply"

**Out of scope v1 (v2+):** QuickBooks sync, Google review requests, SMS/WhatsApp, job-costing AI answers, AI receptionist

## 4. $0 stack
| Layer | Choice | Cost |
|---|---|---|
| LLM drafting | Gemini free tier / Groq free (cap: ~500 drafts/mo), BYOK option for power users | $0 |
| Web + API | Vercel free tier | $0 |
| DB | Supabase free tier (500MB) | $0 |
| Email in | User forwarding (no OAuth!) | $0 |
| Email out | Resend free (3,000/mo) or user's own Gmail SMTP | $0 |
| Payments | Stripe/Paddle later — % only | $0 fixed |
| Domain | Start on free subdomain; buy later | ~$10/yr |

**Margin guardrail:** $5 plan = 100 chase-emails/month cap. Over → upgrade $12 unlimited (BYOK = uncapped).

## 5. Validation plan (DO THIS BEFORE ANY MVP CODE)
**Week 1–2:**
1. Host `index.html` free (Cloudflare Pages / GitHub Pages) — wire form to Google Forms or Formspree free
2. Post in 3 communities (script below), share with 5 real business owners you know
3. Measure for 30 days

**Go / Kill criteria:**
- ✅ **GO:** ≥15 waitlist emails OR ≥5 owners who say "I'd pay for that today"
- ⚠️ **PIVOT:** 6–14 signups → change the promise (e.g., focus only on reviews, or only on quotes) and retest
- ❌ **KILL:** <5 signups AND <2 interested conversations → this becomes a feature of the W1 job-costing dashboard instead, or we hunt the next wedge

**Outreach script (adapt, don't spam):**
> "Hey — I'm building a cheap AI tool that chases unpaid invoices + follows up quotes for [lawn/handyman/etc] businesses. Jobber charges $99/mo for this stuff; ours will be $5. If I showed you a 2-min demo, would you look? Honest feedback wanted, no pitch."

**Where:** r/smallbusiness, r/sweatystartup, r/lawn care / r/Handyman / r/CleaningTips, local Facebook business groups, BNI/Trade groups

## 6. Risks (honest)
- **Traffic is the real cost** — $0 build ≠ $0 marketing; community posting is the work
- LLM free tiers can change → BYOK escape hatch exists
- Email deliverability (use Resend, authenticate domain when we buy it)
- If Jobber/Housecall Pro copy the standalone-agent idea later → speed + niche focus is our moat
- Name "ChaseAgent" untested — A/B against "CashChase" / "Dunly" on the landing page

## 7. Timeline
- **Days 1–3:** validation assets live + community posts + 5 owner conversations
- **Days 4–30:** measure → decide (GO / PIVOT / KILL)
- **GO → Weeks 2–4:** build MVP per section 3, sell to waitlist at founding $5

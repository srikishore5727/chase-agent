# ChaseAgent — Project State (SINGLE SOURCE OF TRUTH)
> **How any model/session resumes:** read THIS file first, top to bottom. Then read `PLAN.md` (strategy) and `outreach/VOICE.md` (writing rules) only if needed for the task.
> **Rule for the assistant:** keep this file updated at every milestone. Never let it go stale. If reality and this file disagree, fix this file.

---

## 1. What this project is
ChaseAgent = a $5/mo AI that chases unpaid invoices (day 3/14/30 follow-up emails, user approves every send) for solo/2-10 person service businesses (lawn, handyman, cleaning, plumbing). Global English market. Built $0, sold ~$5/mo.
**Phase: VALIDATION (day 1 of 30, started 2026-11-07).** Product code is intentionally NOT built yet. Demand must be proven first against PLAN.md §5 go/kill criteria before writing MVP code.

## 2. Where everything lives
- Repo: `C:\Users\sriki\chase-agent` · git identity `srikishore5727` · https://github.com/srikishore5727/chase-agent · branch `main`
- **Live site (canonical): https://chaseagent.pages.dev** (Cloudflare Pages, account `4978120b95d8875ca7eb23e030331c80`)
- Deploy: `npx wrangler pages deploy . --project-name=chaseagent --branch=main` (NOT `wrangler deploy`)
- Backup URL: https://srikishore5727.github.io/chase-agent/ (keep, do not delete)
- Waitlist form: Formspree `https://formspree.io/f/mrppdvjq` → posts to `/thanks` (thanks.html)
- User's Reddit: **u/Fun_Finish_622** (was zero-activity personal account; Day-1 outreach done 2026-11-07)

## 3. Done (with commits)
- `b68cbe9` responsive audit/fixes · `e022219` URL updates · `f634bf8` wrangler config · `0498c1c` wordmark+thanks overflow fix · site verified at 1440/768/390/360: 0 console errors, 0 overflow, forms→Formspree→/thanks OK
- `abcceec` outreach toolkit committed · `176db19` VOICE.md · `0922321` stripped em-dashes/AI tells from ALL postable content + replaced dead threads with verified-live ones · `9505139` Day-1 tracker log
- **Day-1 outreach (2026-11-07), all verified LIVE, zero removals:** pinned profile post ("Week 1, 0 users" + chaseagent.pages.dev), bio set with URL, avatar uploaded, 3 value comments (r/smallbusinessowner, r/Invoice, r/micro_saas — no links, no product name), 6 subs joined. Logged in `outreach/tracker.csv`.

## 4. Active work / next actions
1. **Awaiting user's list:** user said "before that I want you to do a few more things" — they have their own pending list. ASK for it / wait for it. Do not build Chase Score or anything new until their list is handled. (Chase Score tool: user wavered "yes" then said "why rush" → treat as ON HOLD until they re-confirm.)
2. Daily loop from Day 2: user says "run the queue" → run `node outreach/find-leads.mjs` → **assistant hand-writes 2 personalized drafts in human voice for the hottest leads** (auto-drafts in queue.md are templates only, some noise leads need filtering) → user rewords + posts manually → log in tracker.csv → reply to all responses within 1h.
3. Weekly: r/smallbusiness Promote thread + one build-in-public post (r/SideProject / r/micro_saas / r/EntrepreneurRideAlong).
4. Sunday scorecard: replies / profile clicks / signups vs GO line.
5. Day 30 final check per PLAN.md §5: **GO** ≥15 waitlist or ≥5 "I'd pay" · **PIVOT** 6-14 · **KILL** <5 and <2 conversations.

## 5. Hard rules (violating these breaks the project)
- **Reddit posting is ALWAYS manual by the user.** Automation = discovery/drafting/tracking ONLY (find-leads.mjs is read-only by design). Reddit bans automated posting; it would kill the account and blacklist the domain. User asked to auto-post "mimicking him" — DECLINED, user accepted. Do not re-offer.
- **Never ask for / use the user's Reddit password or session.**
- **VOICE rules (outreach/VOICE.md):** NO em-dashes (—/–), NO semicolons, NO (1)(2)(3) numbering, NO AI words (delve/leverage/robust/seamless/"great point"/moreover), contractions + fragments + one specific detail, no closing pleasantry. Short sentences, phone-typed feel. User is STRICT about this — he catches AI tells and calls them out.
- **URL placement:** link only in profile bio/pinned post, r/SideProject + r/micro_saas + r/EntrepreneurRideAlong build posts (disclose), weekly promote threads, "recommend a tool" threads. NEVER in advice-sub replies (r/handyman, r/lawncare, r/landscaping, r/HouseCleaning, r/sweatystartup, r/smallbusinessowner) or r/smallbusiness replies (product mentions removed since Jun 2026). Hard-banned subs: r/marketing, r/freelance, r/sales, r/SEO, r/DigitalMarketing, r/productivity, r/ecommerce.
- **Never paste identical text twice** (AutoMod fingerprints). Always verify a thread is LIVE before sending user to it (check `https://www.reddit.com/comments/{id}.rss` — main site 403s from this network, RSS works).
- **PowerShell:** never edit HTML/text files via PowerShell write (mojibake) — use the edit/write tools.
- **90/10:** 9 value comments → 1 mention. Days 1-5 = warmup, zero product mentions in comments.

## 6. How to work with THIS user (mentor style)
- He is non-technical, easily confused by long multi-option answers. **Be straight: one answer, one next action.** No hedging, no menus of options unless he asks.
- Step-by-step instructions with exact text to paste, exact links, exact file paths. He screenshots what he's doing and asks "is this right?" — answer yes/no first, then why.
- He asks smart skeptical questions (e.g. "won't they copy my idea?", "why '0 users'?") — answer honestly and briefly, don't lecture.
- He wants everything to "sound like a real human, impressive, innovative" — hold the line on VOICE.md rules; he will check.
- Language: he writes casual English; respond in clear simple English, short paragraphs, tables when comparing.

## 7. Environment quirks (learned the hard way)
- Reddit JSON API 403 from this network; **RSS works**: `https://www.reddit.com/r/{sub}/search.rss?q={terms}&restrict_sr=1&sort=new&t=week` (no quotes in q, UA header, expect 429 → backoff 8-10s, ~17min full run of 72 feeds). Profile feed: `https://www.reddit.com/user/{name}/.rss`.
- playwright-cli: `file:` protocol blocked → run local `npx http-server` on port 8384; run multi-line JS via `$code = Get-Content -Raw file; playwright-cli run-code $code`; the read tool sometimes returns stale/shuffled images → verify images via System.Drawing metadata instead.
- Background shell outputs land in `C:\Users\sriki\.local\share\opencode\shell\*.out`.
- Temp approved dir: `C:\Users\sriki\AppData\Local\Temp\opencode`.

## 8. Open questions (get answers when natural)
1. User's own "few things to do first" list — NOT YET PROVIDED (see §4.1).
2. Chase Score tool final yes/no (currently on hold).
3. Account age of u/Fun_Finish_622 (matters for karma-gated subs like r/Entrepreneur's 10-in-sub gate; asked, unanswered — less urgent now that warmup is underway).

## 9. File map
- `PLAN.md` — validation strategy, MVP scope, §5 outreach script + go/kill criteria
- `index.html` (landing, inline CSS design system: dark #05080f, emerald #34d399, Uncut Sans) · `thanks.html` · `favicon.svg` · `wrangler.jsonc`
- `outreach/VOICE.md` — human writing rules + URL map + example comments (READ before writing anything for Reddit)
- `outreach/TODAY.md` — Day-1 checklist (completed)
- `outreach/find-leads.mjs` — RSS lead scanner (`node outreach\find-leads.mjs`, flags `--hours`)
- `outreach/queue.md` — generated leads (templates, not final drafts) · `outreach/leads-seed.md` — hand-confirmed leads
- `outreach/PLAYBOOK.md` — campaigns, sub matrix, 30-day calendar · `outreach/tracker.csv` — action log (source for scorecards)
- `outreach/chaseagent-avatar.png` — 512×512 Reddit avatar (uploaded)

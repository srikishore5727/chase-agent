#!/usr/bin/env node
/**
 * ChaseAgent lead finder — pulls fresh Reddit pain threads via public RSS
 * (no API key, no login), scores them, and writes outreach/queue.md.
 *
 * Usage:
 *   node outreach/find-leads.mjs            # scan + write queue.md
 *   node outreach/find-leads.mjs --hours 72 # freshness window (default 336 = 14d)
 *
 * Rules of engagement (enforced by design):
 *   - READ-ONLY discovery. This never posts, comments, or DMs anything.
 *   - Human posts everything manually (Reddit bans automated posting).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36';

// ---- target communities (rule notes verified Nov 2026) --------------------
const SUBS = [
  { name: 'smallbusiness',        rule: 'Q&A only. NO product mentions (removed since Jun 2026). Relevant replies ok; promo ONLY in weekly Promote thread.' },
  { name: 'smallbusinessowner',   rule: 'Owner-run sub. Value replies ok. Check sidebar before any link.' },
  { name: 'sweatystartup',        rule: 'Trades/blue-collar founders. Story-style replies welcome; avoid hard pitches.' },
  { name: 'handyman',             rule: 'Advice sub. Be a peer first, no marketing.' },
  { name: 'LandCarePros',         rule: 'Pros-only lawn sub. Practical advice; tool mentions only if directly asked.' },
  { name: 'landscaping',          rule: 'Trade sub. Advice-first, no promotion.' },
  { name: 'lawncare',             rule: 'Advice sub. No promotion.' },
  { name: 'HouseCleaning',        rule: 'Advice sub. No promotion.' },
  { name: 'smallbusinessuk',      rule: 'UK small business. Advice replies ok; rules strict on self-promo — check sidebar.' },
  { name: 'EntrepreneurRideAlong',rule: 'Build-in-public ALLOWED. Journey posts + honest numbers perform.' },
  { name: 'SideProject',          rule: 'Launch/feedback posts ALLOWED. Substance > ads; disclose you built it.' },
  { name: 'micro_saas',           rule: 'Journey/numbers posts ALLOWED. Honest breakdowns outperform pitches.' },
];

// ---- pain queries per campaign (NO quotes — Reddit RSS returns 0 for quoted phrases)
const QUERIES = [
  'unpaid invoice',
  'client not paying',
  'chasing payment',
  'overdue invoice',
  'late paying',
  'jobber pricing',
];

const KEYWORDS = [
  { k: /unpaid|won'?t pay|doesn'?t pay|not paying|ghost/gi, w: 4 },
  { k: /invoice/gi, w: 2 },
  { k: /chas(e|ing)|follow.?up|remind/gi, w: 2 },
  { k: /overdue|late|30 days|60 days/gi, w: 2 },
  { k: /jobber|housecall|quickbooks|software/gi, w: 1 },
  { k: /small business|solo|freelance|contractor|lawn|handyman|cleaning|plumbing/gi, w: 2 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchRSS(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/rss+xml,application/atom+xml,application/xml;q=0.9,*/*;q=0.8' },
        signal: AbortSignal.timeout(20000),
      });
      if (res.status === 429) { console.error('  429 — backing off…'); await sleep(10000 * (i + 1)); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(4000 * (i + 1));
    }
  }
  return '';
}

const stripTags = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function parseEntries(xml) {
  const out = [];
  const entries = xml.match(/<entry[\s\S]*?<\/entry>/g) || [];
  for (const e of entries) {
    const title = stripTags((e.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]);
    const link = (e.match(/<link[^>]*href="([^"]+)"/) || [, ''])[1];
    const updated = (e.match(/<updated>([\s\S]*?)<\/updated>/) || [, ''])[1];
    const author = (e.match(/<name>([\s\S]*?)<\/name>/) || [, ''])[1];
    const content = stripTags((e.match(/<content[^>]*>([\s\S]*?)<\/content>/) || [, ''])[1]);
    if (link) out.push({ title, link, updated, author, content });
  }
  return out;
}

function score(post, ageH) {
  const text = post.title + ' ' + post.content.slice(0, 1500);
  let s = 0;
  for (const { k, w } of KEYWORDS) if (k.test(text)) s += w;
  if (ageH < 24) s += 6; else if (ageH < 72) s += 4; else if (ageH < 168) s += 2;
  if (/help|advice|what do i|how do you|recommend|suggest|does anything exist/i.test(post.title)) s += 3; // asking = open to replies
  if (/tool|app|software|built|launch/i.test(post.title)) s += 1;
  return s;
}

function draftFor(post, subRule) {
  const t = (post.title + ' ' + post.content).toLowerCase();
  let body;
  if (/jobber|housecall|quickbooks/.test(t)) {
    body = `Solid question. Quick take from someone who's looked at this space closely:\n\n1) [give ONE genuinely useful, specific tip, e.g. a late-fee line that actually works]\n2) [second tip]\n3) [third tip]\n\nThe pattern that matters most: [insight]. Happy to go deeper on any of these.`;
  } else if (/ghost|won'?t pay|not paying|unpaid/.test(t)) {
    body = `The awkwardness is the whole problem. Most late payers aren't refusing, they're avoiding the conversation.\n\nWhat works: [tip 1: escalation timing], [tip 2: wording that keeps the relationship], [tip 3: when to stop being nice].\n\n[ONE concrete example or exact line they can copy-paste today]`;
  } else {
    body = `[Answer their actual question first, with specifics. THEN, only if the sub allows relevant mentions and it fits naturally, one line like: "I'm building ChaseAgent around exactly this problem (day3/14/30 chase emails with one-tap approve), happy to share what I've learned either way."]`;
  }
  return `${body}\n\n---\nRULE REMINDER (r/${post.sub}): ${subRule}\n90/10: this comment must be worth reading even with the product line deleted.`;
}

async function main() {
  const hours = Number((process.argv.find((a) => a.startsWith('--hours')) || '').split('=')[1]) || 336;
  await mkdir(HERE, { recursive: true });
  const seenPath = path.join(HERE, 'seen.json');
  const seen = existsSync(seenPath) ? JSON.parse(await readFile(seenPath, 'utf8')) : {};
  const found = new Map();

  let reqs = 0;
  for (const sub of SUBS) {
    for (const q of QUERIES) {
      const url = `https://www.reddit.com/r/${sub.name}/search.rss?q=${encodeURIComponent(q)}&restrict_sr=1&sort=new&t=week&limit=25`;
      process.stdout.write(`[${++reqs}/${SUBS.length * QUERIES.length}] r/${sub.name} "${q}" … `);
      try {
        const xml = await fetchRSS(url);
        let n = 0;
        for (const e of parseEntries(xml)) {
          n++;
          const id = e.link.split('/').slice(-2).join('_');
          if (seen[id] || found.has(id)) continue;
          const ageH = (Date.now() - Date.parse(e.updated)) / 36e5;
          if (!(ageH >= 0 && ageH <= hours)) continue;
          e.sub = sub.name; e.rule = sub.rule; e.ageH = ageH; e.id = id;
          found.set(id, e);
        }
        console.log(`${n} entries`);
      } catch (err) {
        console.error(`FAILED: ${err.message}`);
      }
      await sleep(5000); // be polite — Reddit rate-limits aggressively
    }
  }

  const leads = [...found.values()].map((p) => ({ ...p, s: score(p, p.ageH) }))
    .filter((p) => p.s >= 6)
    .sort((a, b) => b.s - a.s);

  const fmtAge = (h) => h < 48 ? `${Math.round(h)}h ago` : `${Math.round(h / 24)}d ago`;
  let md = `# ChaseAgent — Reddit lead queue\n> Generated ${new Date().toISOString()} · ${leads.length} fresh leads (window ${hours}h, ${reqs} feeds)\n> Post MANUALLY, personalize every reply, log it in tracker.csv. Never paste identical text twice.\n`;
  const hot = leads.filter((p) => p.ageH <= 72), warm = leads.filter((p) => p.ageH > 72);
  for (const [label, list] of [['🔥 HOT (≤72h — reply fast)', hot], ['🌤 WARM (≤14d — still open)', warm]]) {
    if (!list.length) continue;
    md += `\n## ${label}\n`;
    for (const p of list) {
      md += `\n### [${p.s}] ${p.title}\n- r/${p.sub} · ${fmtAge(p.ageH)} · ${p.link}\n- Excerpt: ${p.content.slice(0, 320)}${p.content.length > 320 ? '…' : ''}\n\n**Draft (personalize!):**\n${draftFor(p, p.rule)}\n`;
    }
  }
  if (!leads.length) md += '\n_No new leads this run — run again later or widen --hours._\n';

  await writeFile(path.join(HERE, 'queue.md'), md, 'utf8');
  for (const p of leads) seen[p.id] = Date.now();
  // prune seen older than 60 days
  const cutoff = Date.now() - 60 * 864e5;
  for (const k of Object.keys(seen)) if (seen[k] < cutoff) delete seen[k];
  await writeFile(seenPath, JSON.stringify(seen, null, 1), 'utf8');
  console.log(`queue.md written: ${leads.length} leads (${hot.length} hot, ${warm.length} warm), ${Object.keys(seen).length} total tracked as seen.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

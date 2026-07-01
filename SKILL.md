---
name: ukmla-post-creator
description: >
  Use this skill whenever the user wants to create, audit, or optimize a UKMLA blog
  post — and ALWAYS when the trigger phrase "UKMLA new create" appears. Also triggers
  on: "write a UKMLA post", "add a new post to News.jsx", "create a blog post about
  [UKMLA topic]", "optimize this post for Yoast", "check keyphrase density", or any
  request touching UKMLA_Posts_Registry.xlsx / UKMLA_Internal_Linking_Map.xlsx. This
  file is the single source of truth for Yoast SEO rules, readability requirements,
  keyword placement, heading structure, internal linking, image SEO, meta title/
  description patterns, FAQ/schema, AEO, E-E-A-T, and site tone for ukmla-info.org.uk.
  It must be re-read at the start of every post-generation task, and updated the
  moment a new SEO pattern or requirement is discovered.
---

# UKMLA Post-Creation & SEO Skill

Living rulebook for generating and auditing content on the UKMLA site
(`ukmla-info.org.uk`, code in this repo). Every rule below was either extracted
directly from real Yoast SEO panel snapshots of live UKMLA posts, or reverse-engineered
from the highest-performing posts already in `src/pages/News.jsx`. Update this file
whenever you learn something new — see [§14](#14-maintaining-this-file).

---

## 0. Trigger workflow — `UKMLA new create`

**Standing rule:** before generating any new post, always read the latest version
of this file (`SKILL.md`), the Post Data Sheet (`UKMLA_Posts_Registry.xlsx`), the
Internal Linkage Sheet (`UKMLA_Internal_Linking_Map.xlsx`), and the Keyword
Cluster Sheet (`UKMLA_Keyword_Cluster_Sheet.xlsx`) to ensure consistency in SEO,
content quality, keyword clustering, and internal linking strategy. Never rely on
a previous session's memory of these files — they are updated continuously.

When this exact phrase appears, run the following pipeline in order. Do not skip steps.

1. **Read this file end-to-end.** Never generate a post from memory of a previous
   session — SEO patterns here are updated continuously and the previous run's
   version may be stale.
2. **Read the internal linking database** — open `UKMLA_Internal_Linking_Map.xlsx`
   (or regenerate it first if it looks stale — see step 6) and check the `Summary`
   sheet plus the `Incoming Links` column to find pillar pages/posts that are
   under-linked. Deliberately plan 8–15 outgoing internal links from the new post,
   favouring under-linked targets and the correct topic cluster / pillar page
   (see [§4](#4-internal-linking-standards)).
3. **Read the Keyword Cluster Sheet** (`UKMLA_Keyword_Cluster_Sheet.xlsx`, sheet
   `Keyword Cluster Sheet` — see [§13](#13-keyword-cluster-sheet)) and check it
   for the intended primary keyword / cluster **before** writing a single word.
   Confirm the new post's planned primary keyword does not already appear as
   another row's `Primary Keyword` (case-insensitive) — if it does, that's
   keyword cannibalization: either pick a more specific long-tail variant, or
   confirm with the user that this post is deliberately meant to compete with
   the existing one. Also check the `Cluster Status` column and prefer writing
   into a cluster marked "Needs More Support" or "Growing" over piling onto an
   already "Established" one, unless the topic genuinely belongs there.
4. **Generate the post** following every rule in this file — structure, word count
   (5,000–6,000 words), keyphrase placement, readability, images, FAQ, schema-ready
   content, AEO formatting, and GMC sourcing (see [§11](#11-post-requirements-checklist)).
5. **Write the post content to its own HTML file, then insert the metadata-only
   post object into `News.jsx`:**
   - Save the full `htmlContent` body as `/posts-html/{slug}.html` — the filename
     must exactly match the post's slug (e.g. slug `ukmla-registration-guide` →
     `/posts-html/ukmla-registration-guide.html`). **Only the post content goes in
     this file** — no metadata, no JSON, just the raw HTML body.
   - Insert the post's **metadata only** (everything in the schema in
     [§12](#12-post-data-schema-newsjsx) except `htmlContent`, which no longer
     lives in `News.jsx`) into the `posts` array in `src/pages/News.jsx`.
     `News.jsx` loads each post's body at build time from `/posts-html/{slug}.html`
     via `import.meta.glob` — see [§12](#12-post-data-schema-newsjsx) for how this
     wiring works.
   Then regenerate the registry:
   ```
   node scripts/sync_posts.cjs
   python scripts/sync_posts.py
   ```
   This recomputes word count, outgoing/incoming links, and the weaving reference
   for every post — including the new one — in `UKMLA_Posts_Registry.xlsx` (both
   scripts now read post bodies from `/posts-html/{slug}.html`, not from `News.jsx`).
6. **Regenerate the internal linking map:**
   ```
   node scripts/analyze-internal-links.cjs
   python scripts/build-linkage-sheet.py
   ```
   This rewrites `UKMLA_Internal_Linking_Map.xlsx` with fresh incoming/outgoing
   link counts and cluster/pillar assignments for every post and pillar page,
   including the new post. If the new post's slug doesn't match any existing
   cluster regex, add a rule to the top of `analyze-internal-links.cjs` first.
   Confirm the console output says `Posts with 0 incoming links: none` before
   moving on — every post must land with **≥2** incoming links (see [§4](#4-internal-linking-standards)).
7. **Regenerate the Keyword Cluster Sheet:**
   ```
   node scripts/extract-keyword-source-data.cjs
   python scripts/build-keyword-cluster-sheet.py
   ```
   This rewrites `UKMLA_Keyword_Cluster_Sheet.xlsx` with the new post's primary/
   secondary keywords, cluster, pillar topic, and status — and re-runs the
   cannibalization check across *all* posts and pillars, not just the new one.
   Check the console output for `WARNING: N potential keyword-cannibalization
   case(s)` — resolve any new ones before considering the post done (see
   [§13](#13-keyword-cluster-sheet)).
8. **If you discover a new Yoast rule, a new SEO/AEO pattern, or the user gives
   new content-quality feedback**, update the relevant section of this file
   immediately — before or right after finishing the post. Don't wait for a
   dedicated "update the skill" request.
9. **Never generate a future post without repeating step 1 first**, even within
   the same session, if significant time or other work has passed — this file is
   the authority, not conversation memory.

---

## 1. Yoast SEO rules (extracted from live snapshots)

Source: Yoast SEO panel screenshots from two real UKMLA pages (one at 1,306 words,
mostly green; one at 615 words, mostly red). Every check below is a real Yoast
check with the pass/fail condition observed directly in the snapshots.

### SEO analysis checks

| Check | Rule | Evidence |
|---|---|---|
| **Keyphrase in introduction** | Focus keyphrase must appear in the opening paragraph | Both pages: green when present |
| **Keyphrase density** | Keep density roughly **0.5–2.5%** — natural repetition, not stuffing. (6 hits/1,306 words ≈ 0.46% and 3 hits/615 words ≈ 0.49% both scored "great") | Green in both snapshots |
| **Keyphrase in SEO title** | Exact-match keyphrase must appear **at the very beginning** of the SEO title | Green: "exact match... appears at the beginning" |
| **Keyphrase length** | Keep the keyphrase short — 1–4 content words | Green in both |
| **Single title (H1)** | Exactly **one H1** per page — never nest a second H1 inside body HTML | Green in both |
| **Keyphrase in slug** | **More than half** of the keyphrase's words must appear in the URL slug | Green in both |
| **Keyphrase in subheading** | At least some H2/H3s must contain the keyphrase or a close synonym (8 of the subheadings did so in the 1,306-word example) | Green when present; **red** when zero subheadings reflect it (615-word example) |
| **Competing links** | No link on the page may use the keyphrase or a synonym as its anchor text | Green in both — confirms the site convention of descriptive-but-different anchor text |
| **Text length** | Yoast's own floor is very low (300 words) — both 615 and 1,306-word pages scored green. **This does NOT override the site's own 5,000–6,000 word requirement** (see [§11](#11-post-requirements-checklist)) | Green in both, but not the binding rule for this project |
| **Title** | Page must have a title | Green in both |
| **Images** | Page must contain at least one image | Green when present; **red ("No images appear on this page")** when absent |
| **Internal links** | Page needs "enough" internal links | Green in both — site convention (confirmed by `add-internal-links.cjs`) targets **≥8 internal links per post** |
| **Outbound links** | Page needs at least one **outbound/external** link | **Red in both snapshots — "No outbound links appear in this page."** This is a real, recurring gap — every new post MUST include 1–2 authoritative outbound links (GMC, NICE, Pearson VUE, etc.) |
| **Keyphrase in image alt attributes** | At least one image's alt text must contain **at least half** of the keyphrase's words | Red when images are missing or alt text lacks the keyphrase; must fix by writing keyphrase-aware alt text |
| **Keyphrase distribution** | Keyphrase/synonyms must be spread evenly across the whole text, not clustered in one section | **Red in both snapshots** — a real, recurring weakness. Actively distribute the keyphrase and its synonyms across the intro, multiple H2 sections, and the conclusion |
| **Keyphrase in meta description** | Meta description must literally contain the exact keyphrase | **Red in both** when missing — always double-check the `seoDescription` field contains the exact primary keyword |
| **Meta description length** | Must be **≤156 characters** or it gets truncated in search results | **Red in both** ("over 156 characters") — keep meta descriptions tight; 140–156 characters is the safe zone |
| **SEO title width** | Title must fit the visual SERP width (~600px, roughly ≤60 characters incl. spaces) | **Red in both** ("wider than the viewable limit") — keep `seoTitle` short and keyphrase-first |
| **Previously used keyphrase** | A focus keyphrase must not be reused across posts | Flagged **orange/red** in both — before assigning a new post's primary keyword, check it doesn't already exist in another post's `primaryKeyword` field |

### Readability analysis checks

| Check | Rule | Evidence |
|---|---|---|
| **Transition words** | At least **30%** of sentences should contain a transition word (however, therefore, in addition, as a result, for example, meanwhile, furthermore, consequently, similarly, in contrast...) | **Red in both** — 19.1% and 9.3%, both well under target. Consciously add more transitions throughout |
| **Passive voice** | Keep passive voice to **≤10%** of sentences | One example was orange at 14.8% ("more than the recommended maximum of 10%"); the other was green. Favour active voice: "The GMC sets the fee" not "The fee is set by the GMC" |
| **Consecutive sentences** | Avoid repetitive sentence beginnings (3+ sentences starting with the same word) | Green in both |
| **Subheading distribution** | Don't let more than ~300 words pass without a subheading | Green in both |
| **Paragraph length** | No paragraph should run long (~150-word Yoast ceiling) | Green in both |
| **Sentence length** | Keep the proportion of sentences over 20 words low | Green in both |
| **Word complexity** | Avoid excessive complex/long words — write in plain English | Green in both — important given the international, non-native-English-speaking audience |

---

## 2. Keyword / keyphrase placement rules

- One **primary keyphrase** per post, never reused elsewhere on the site (check
  every existing `primaryKeyword` in the registry/News.jsx first).
- Must appear: at the **start of the SEO title**, in the **first paragraph**, in
  **≥1 H2/H3**, in the **meta description**, in **>50% of the words making up
  the URL slug**, and in **at least one image's alt text** (≥half its words).
- Target density **0.5–2.5%** across the full post — for a 5,500-word post that's
  roughly **14–35 natural occurrences** of the exact phrase or a close synonym.
- **Distribute evenly** — don't cluster all mentions in the intro. Spread across
  every major H2 section and the conclusion (this was a real, recurring Yoast
  failure in both audited snapshots — treat it as the #1 thing to actively check).
- Use natural synonyms/variations liberally (e.g., "UKMLA fees" / "exam costs" /
  "AKT and CPSA fees") to avoid stuffing while still satisfying distribution and
  subheading checks.
- Never use the keyphrase (or a synonym) as anchor text for any link on the page —
  use genuinely descriptive anchor text instead (site convention: link the concept
  being referenced, e.g. `<a href="/registration-guide">GMC registration</a>`).

---

## 3. Heading structure rules

- Exactly **one H1** (the post title, rendered by the page chrome — never add a
  second `<h1>` inside `htmlContent`).
- **H2** = main sections. **H3** = sub-points within a section and every FAQ question.
- At least half of H2/H3 headings should reflect the keyphrase or a close synonym.
- Standard section order used across the site's best-performing posts:
  1. Intro (keyphrase in first sentence, 2–3 paragraphs, states what the reader
     will learn)
  2. Core factual H2 (headline numbers/definition — the "quick answer" section
     an AI Overview or featured snippet would lift)
  3. Audience-split H2s (e.g. "...for UK Medical Students" / "...for IMGs" — mirror
     the dual audience explicitly)
  4. Detail H2s with H3 sub-breakdowns for each component
  5. Comparison/context H2 (vs. other exams, historical change, etc.)
  6. Practical "how to" H2 (how to pay / how to book / how to prepare)
  7. **Frequently Asked Questions** H2, with each question as an H3
  8. **Conclusion** H2 with a single bolded CTA link back to the pillar page
- No subheading should introduce more than ~300 words of text before the next one
  (readability "subheading distribution" rule).

---

## 4. Internal linking standards

- **Minimum 8 contextual internal links per post** (this is the threshold the
  site's own `scripts/add-internal-links.cjs` audits against — posts below 8 are
  flagged as under-linked). Aim for **10–15** in a 5,000–6,000-word post.
- Weave links **naturally into sentences** — never a bare "click here" or a
  separate "related links" list. Anchor text describes the destination concept
  (e.g. `<a href="/exam-pattern/akt">Applied Knowledge Test (AKT)</a>`).
- Link to the relevant **pillar pages** (`/fees`, `/eligibility`, `/syllabus`,
  `/exam-pattern/akt`, `/exam-pattern/cpsa`, `/registration-guide`, `/key-dates`,
  `/appeals-and-resits`, `/preparation`, `/results-and-scoring`, `/ukmla-vs-plab`,
  `/official-resources`) **and** to other relevant posts via `/news#other-post-slug`.
- Before writing, check `UKMLA_Internal_Linking_Map.xlsx`'s `Incoming Links` column
  and `Summary` sheet for posts/pillars sitting at 0–1 incoming links, and
  deliberately link to a few of them.
- **Every post must end up with at least 2 in-content incoming links** — not just
  "not zero." A post with exactly 1 incoming link is one edit away from becoming
  an orphan again. **Fixed 2026-07-01:** all 51 posts + 13 pillars were brought to
  this standard (posts ≥2, pillars ≥4 incoming) after an audit found 12 posts with
  literally zero incoming links — every generic mention of their topic had been
  claimed by the equivalent *pillar-page* rule in `scripts/add-internal-links.cjs`,
  starving the *post* version of any in-content link. When a topic has both a
  pillar page and a blog post (e.g. `/fees` and `/news#ukmla-fees-explained`),
  deliberately use **different phrasing** for each — one phrase pointing at the
  pillar, a distinct phrase elsewhere pointing at the post — so neither starves.
- Whenever a new post is added, **re-run the full linking pipeline** and confirm
  `node scripts/analyze-internal-links.cjs` reports `Posts with 0 incoming links: none`
  before considering the post done. If any post (new or existing) drops to 0,
  fix it with a hand-picked link from a genuinely relevant sibling post — verify
  the anchor phrase actually appears in that sibling's *unprotected* text (not
  inside an existing `<a>` or heading) before inserting it.
- End every post with a single bolded CTA link back to its own topic's pillar
  page, arrow-terminated: `<a href="/fees">View the full UKMLA fee schedule and
  payment guide →</a>`.
- **Always include at least 1–2 outbound/authoritative external links** (see
  [§9](#9-e-e-a-t-guidelines)) — this was the single most consistent Yoast failure
  across both audited snapshots ("No outbound links appear on this page").
- Never let two links on the same page use the keyphrase/synonym as anchor text
  (Yoast "competing links" check).
- After adding a post, regenerate both `linkage-data.json` and
  `UKMLA_Internal_Linking_Map.xlsx` (see [§0](#0-trigger-workflow-ukmla-new-create)
  step 5) so incoming/outgoing counts stay accurate site-wide.

---

## 5. Image SEO requirements

- Every post needs at least **one featured image** (`.webp` preferred, stored under
  `/images/`). A post with zero images auto-fails three separate Yoast checks
  (`Images`, `Keyphrase in image alt attributes`, and indirectly hurts engagement).
- Populate all four image metadata fields (see schema in [§12](#12-post-data-schema-newsjsx)):
  `featuredImageUrl`, `featuredImageKeyword`, `featuredImageTitle`,
  `featuredImageAltText`.
- **Alt text must contain at least half of the keyphrase's words**, described
  naturally (not keyword-stuffed) — e.g. for keyphrase "UKMLA fees": *"UKMLA fees
  concept — stethoscope, calculator and British pound notes showing UKMLA exam
  costs."*
- File name and `featuredImageKeyword` should also reflect the keyphrase
  (e.g. `ukmla-fees-explained-featured.webp`).

---

## 6. Meta title & description patterns

- **`seoTitle`**: keyphrase **first**, ≤ ~60 characters (must fit the SERP pixel
  width — Yoast flagged both audited pages for being too wide). Pattern used
  site-wide: `"{Keyphrase}: {Descriptive Hook}"` e.g. *"UKMLA Fees: The Complete
  2026 Cost Breakdown"* or *"UKMLA CPSA: What the Clinical Exam Really Tests."*
- **`seoDescription`**: **140–156 characters**, must contain the exact keyphrase,
  written as a compelling promise of what the reader gets — pattern: state the
  topic, then 2–3 concrete specifics it covers. e.g. *"UKMLA fees explained for
  2026: AKT, CPSA and GMC registration costs for IMGs, what UK students pay,
  hidden costs, and figures in your local currency."*
- Never let `seoDescription` exceed 156 characters — Yoast will flag truncation
  risk (a real, recurring issue in the audited snapshots).
- `title` (H1 display) and `seoTitle` (meta `<title>`) can differ slightly — H1
  can be marginally longer/more natural since it doesn't face the same pixel
  constraint, but should still lead with the keyphrase.

---

## 7. FAQ and schema guidelines

- Every post includes an **H2 "Frequently Asked Questions"** section with
  **5–7 H3 questions**, each phrased exactly as a user would type it into Google
  or ask an AI assistant (e.g. *"Do UK medical students pay any UKMLA fees
  directly?"*), followed by a **self-contained, 2–4 sentence direct-answer
  paragraph** — the answer must make sense with zero surrounding context, since
  this is what gets lifted into featured snippets and AI Overviews.
- **Known technical gap (flag, don't silently fix without confirming scope):**
  `router.jsx` currently injects a `BreadcrumbList` JSON-LD schema per route, but
  there is **no `FAQPage` JSON-LD** emitted for individual posts even though every
  post's HTML contains a real FAQ section. This is a real opportunity to improve
  AEO/rich-result eligibility — worth a dedicated implementation task (auto-derive
  `FAQPage` schema from each post's H3 Q&A pairs and inject it the same way
  `seo-schema` is injected in `News.jsx`'s per-post `useEffect`). Until that's
  built, keep FAQ content clean and consistently structured (H3 question, then a
  single `<p>` answer, no extra markup) so it's trivial to auto-extract later.
- If/when FAQPage schema is implemented, each `mainEntity` item should map 1:1 to
  an FAQ H3/paragraph pair with no editorializing between question and answer.

---

## 8. AEO (Answer Engine Optimization) rules

Optimizing for AI Overviews, ChatGPT/Perplexity-style answer engines, and
featured snippets — these are on top of, not instead of, standard Yoast rules.

- **Answer first, elaborate second.** Open each major H2 with a 1–2 sentence
  direct answer/definition before adding supporting detail — this is the
  sentence most likely to get lifted verbatim into an AI Overview.
- **Definitional framing.** State "X is..." explicitly near the top of the intro
  and again for any major sub-concept — answer engines strongly prefer
  extractable definitions over narrative build-up.
- **Use tables for anything numeric or comparative** (`<table class="post-table">`,
  matching the site's existing convention) — tables are the single most
  snippet-friendly format for fees, dates, comparisons, and eligibility criteria.
- **Use bullet lists** for anything enumerable (requirements, steps, costs) —
  another highly extractable format.
- **Bold the specific figure/answer** inside a sentence (`<strong>£283</strong>`)
  so scanning both humans and models can locate the exact fact fast.
- **Phrase FAQ questions exactly as real queries** (see §7) — this is the
  single highest-leverage AEO lever available, since FAQ Q&A pairs map almost
  directly onto how users phrase voice/AI-assistant queries.
- **Answer both audiences explicitly** where relevant (UK students vs. IMGs) —
  don't force the reader to infer which figure/rule applies to them.
- Keep each extractable answer **self-contained** — avoid "as mentioned above"
  or "see the previous section," since answer engines often quote a single
  paragraph out of context.

---

## 9. E-E-A-T guidelines

- **Cite the GMC (or other official body) directly wherever a rule, fee, or
  process is stated**, using a real outbound link (fixes the recurring
  "Outbound links" Yoast failure and is the strongest available trust signal).
  Preferred sources, in order: `gmc-uk.org` (official rules, fees, registration),
  `nice.org.uk` (clinical guidance), Pearson VUE (test-centre logistics),
  Medical Schools Council. Populate the post's `sourceFullUrl` field with the
  single most authoritative source used.
- **Use precise, current, checkable figures** (exact fees, exact dates, exact
  score thresholds) rather than vague claims — this is what the existing
  high-quality posts already do well (e.g. exact £ figures, IELTS/OET score
  bands, currency conversions) and must be preserved in every new post.
- **State the limits of certainty honestly** — e.g. "The GMC reviews its fee
  schedule periodically; always verify current charges on the GMC website
  before booking." This hedging is itself a trust signal and must appear
  wherever a rule is subject to change.
- **Third-person, editorial-team voice** — no first-person opinion ("I think"),
  no unverifiable superlatives ("the best exam in the world"). The site reads
  as an authoritative, GMC-literate information resource, not a personal blog.
- **No agent/paid-service promotion or claims to facilitate official payments**
  — existing posts explicitly warn against this ("Any agent claiming to
  facilitate GMC payments... is operating outside official channels"); preserve
  this kind of consumer-protection framing where relevant.

---

## 10. UKMLA website writing style & tone

(Derived from the site's strongest existing post, `ukmla-fees-explained`.)

- **British English spelling throughout** (organisation, recognised, licence/
  license used correctly, GBP as default currency with other currencies
  converted for context).
- **Formal but accessible** — long-form and data-dense, but plain-English
  sentence construction suited to an international, non-native-English-speaking
  audience (matches the "word complexity" and "sentence length" readability
  passes observed in the snapshots).
- **Comprehensive and comparative** — good posts don't just state the UK rule,
  they contextualise it (cost comparisons to USMLE/AMC/MCCQE, historical fee
  changes, currency conversions for India/Nigeria/UAE/USA audiences).
- **Structured for scanning**: `<table class="post-table">` for structured data,
  `<ul><li>` for enumerable lists, `<h3>` for both sub-topics and FAQ questions,
  `<strong>` around key figures/terms.
- **Dual-audience framing is explicit**, not implied — sections and sentences
  routinely distinguish "UK medical students" from "IMGs" rather than writing
  generically and letting the reader guess which parts apply to them.
- **Every post ends with a Conclusion H2** that summarises the practical
  takeaway in 2–3 sentences and closes with one bolded, arrow-terminated CTA
  link back to the topic's pillar page.

---

## 11. Post requirements checklist

Binding requirements for every new post generated via this skill (these are the
user's own standing requirements — they take priority over Yoast's much lower
minimums, e.g. Yoast's 300-word floor):

- [ ] **Word count: 5,000–6,000 words** (supersedes the older ~4,000-word target
      used in earlier post batches — that was a prior standard, this is the
      current one going forward).
- [ ] Fully passes every Yoast rule in [§1](#1-yoast-seo-rules-extracted-from-live-snapshots)
      — including the two that were failing in both audited snapshots:
      **outbound links present** and **keyphrase evenly distributed**.
- [ ] AEO-formatted per [§8](#8-aeo-optimization-rules) (answer-first H2s, tables,
      extractable FAQ).
- [ ] Written for **international medical students preparing for the UKMLA**
      (explicitly address both UK-based students and IMGs where the rule differs).
- [ ] Uses **official GMC sources** wherever a rule, fee, date, or process is
      stated, with at least one real outbound link and a populated
      `sourceFullUrl`.
- [ ] 8–15 internal links, woven naturally, favouring under-linked
      pillars/posts per the linking map.
- [ ] Featured image with all four image metadata fields populated and
      keyphrase-aware alt text.
- [ ] Unique `primaryKeyword` not already used by another post.
- [ ] FAQ section with 5–7 real-query-phrased H3 questions.
- [ ] Conclusion H2 with one bolded CTA link to the pillar page.

---

## 12. Post data schema (`News.jsx`) + HTML file & content management

**Content and metadata are decoupled.** The post's full HTML body lives in its
own file, `/posts-html/{slug}.html` (filename exactly equal to the slug, content
only — no JSON, no metadata). `News.jsx` holds only the metadata object below,
one per post in the `posts` array:

```json
{
  "slug": "kebab-case-unique-slug",
  "title": "Display H1 title",
  "date": "DD Month YYYY",
  "tag": "Category label (used for 'related posts' grouping)",
  "image": "/images/{slug}-featured.webp",
  "summary": "1–2 sentence excerpt for the post list card",
  "seoTitle": "Keyphrase-first title, ≤ ~60 chars",
  "seoDescription": "140–156 chars, contains exact keyphrase",
  "primaryKeyword": "unique focus keyphrase",
  "featuredImageKeyword": "short image concept phrase",
  "featuredImageUrl": "/images/{slug}-featured.webp",
  "featuredImageTitle": "Human-readable image title",
  "featuredImageAltText": "Keyphrase-aware alt text (>=half keyphrase words)",
  "sourceFullUrl": "https://www.gmc-uk.org/... (primary official source)"
}
```

**How `News.jsx` loads the body:** at the top of `src/pages/News.jsx`,
`import.meta.glob('../../posts-html/*.html', { eager: true, query: '?raw', import: 'default' })`
bundles every file in `/posts-html/` as a raw string at build time, keyed by
slug (`postHtmlBySlug`). The active post's body is looked up by
`postHtmlBySlug[activePost.slug]` and passed to `enhancePost()` — there is no
runtime fetch, so a new post's `.html` file must exist on disk *before*
`vite build`/`vite dev` picks it up (a plain file save is enough; no restart
needed in dev, Vite's glob re-evaluates on file add).

`src/pages/News.jsx` reads `seoTitle`/`seoDescription` and sets `document.title`
and the `<meta name="description">` tag per-post on load — always fill both
fields; there is currently no per-post canonical-link or `FAQPage` schema
injection (see the gap noted in [§7](#7-faq-and-schema-guidelines)).

**Regenerating `/posts-html/` from an old-style `News.jsx` export:** if a post's
`htmlContent` is ever hand-pasted back into `News.jsx` instead of written
straight to `/posts-html/`, run `node scripts/extract-post-html.cjs` — it splits
every post's `htmlContent` out into `/posts-html/{slug}.html` and rewrites
`News.jsx` to drop the field. All three pipeline scripts
(`sync_posts.cjs`, `analyze-internal-links.cjs`, `add-internal-links.cjs`) read
post bodies from `/posts-html/{slug}.html`, not from `News.jsx` — keep new
content there from the start rather than round-tripping through this script.

### Registry sheet columns (`UKMLA_Posts_Registry.xlsx`, generated by
`scripts/sync_posts.cjs` + `scripts/sync_posts.py` — do not hand-edit, just re-run
the scripts after updating `News.jsx`):

`post_type, post_title, post_slug, post_excerpt, category, tags,
source_full_url, seo_title, seo_description, Primary keyword, Internal Link,
html_content, featured_image_keyword, featured_image_url, featured_image_title,
feature_image_alt_text, Word Count, Outgoing Links, Incoming Links,
Weaving Reference`

### Internal linking map columns (`UKMLA_Internal_Linking_Map.xlsx`, generated by
`scripts/analyze-internal-links.cjs` + `scripts/build-linkage-sheet.py`):

`Post/Page Title, URL, Type, Incoming Links, Outgoing Links, Linked From,
Links To, Content Cluster, Pillar Page` — plus a `Summary` sheet with
site-wide totals and under-linked posts.

A third workbook, `UKMLA_Keyword_Cluster_Sheet.xlsx`, tracks keyword/cluster
assignment and cannibalization risk — see [§13](#13-keyword-cluster-sheet) for
its schema and regeneration pipeline. All three workbooks must be regenerated
together whenever `News.jsx` changes (see [§0](#0-trigger-workflow-ukmla-new-create)
steps 5–7) — they read from the same underlying post data and will silently
drift out of sync with each other if only one or two are refreshed.

---

## 13. Keyword Cluster Sheet

`UKMLA_Keyword_Cluster_Sheet.xlsx` (sheet `Keyword Cluster Sheet`, plus a
`Summary` sheet) is the site's keyword-cannibalization guard and cluster map —
one row per blog post **and** one row per pillar page (64 rows currently: 51
posts + 13 pillars). Columns:

`Primary Keyword, Secondary Keywords, Keyword Cluster, Pillar Topic,
Associated Post Title, Post URL, Search Intent, Post Status, Cluster Status,
Last Updated Date`

- **Primary Keyword** — the post's `primaryKeyword` field (posts) or the
  highest-search-volume researched keyword mapped to that page in
  `UKMLA_SEO_Keyword_Research.xlsx`'s `Removed (On Website)` sheet (pillars).
- **Secondary Keywords** — up to 5 related keywords pulled from
  `UKMLA_SEO_Keyword_Research.xlsx`'s `All Keywords - Unique` sheet (485
  researched/extracted keywords), scored by token overlap with the post's
  primary keyword + title, weighted toward the primary keyword.
- **Keyword Cluster** — reuses the *exact same* cluster name as the Internal
  Linking Map's `Content Cluster` column (from `scripts/linkage-data.json`) so
  the two sheets never disagree about which cluster a post belongs to.
- **Pillar Topic** — the post's nearest pillar page title (same `pillarPage`
  resolution as the Internal Linking Map).
- **Cluster Status** — computed from how many posts currently sit in that
  cluster: `Established (≥5 posts)`, `Growing (2–4)`, or `Needs More Support
  (0–1)`. Recomputed on every regeneration, not hand-maintained.
- **Post Status** — `Published` for everything currently live (all 51 posts +
  13 pillars). If draft/in-progress posts are ever tracked here before going
  live, use `Draft` and update to `Published` on publish.
- Pillar-page rows are shaded blue in the sheet; any row whose Primary Keyword
  is shared with another row (case-insensitive) is shaded orange — that's the
  cannibalization flag, surfaced automatically, not something to add by hand.

### Regeneration pipeline

```
node scripts/extract-keyword-source-data.cjs   # dumps scratch/posts_min.json from News.jsx
python scripts/build-keyword-cluster-sheet.py  # merges with linkage-data.json + the keyword
                                                # research workbook, writes the xlsx
```

Run `node scripts/analyze-internal-links.cjs` first if `scripts/linkage-data.json`
is stale (the cluster sheet reads it, doesn't regenerate it) — in practice this
means step 7 always follows step 6 in the [§0 trigger workflow](#0-trigger-workflow-ukmla-new-create).

### Keyword cannibalization — check before writing, not after

`scripts/extract-keyword-source-data.cjs` also warns on duplicate
`primaryKeyword` values across posts as soon as `News.jsx` changes, and
`build-keyword-cluster-sheet.py` re-checks across the full post+pillar set
(catching post-vs-pillar collisions the first script can't see, since it only
looks at posts). **Known, unresolved cases as of 2026-07-01** (flagged, not
yet fixed — a content decision, not a script bug): `ukmla-akt-format-preparation`
(primary keyword "UKMLA AKT") competes directly with the `/exam-pattern/akt`
pillar page, which the keyword research data also identifies "UKMLA AKT" as its
best-matching real search term; same pattern for `ukmla-cpsa-what-it-tests`
("UKMLA CPSA") vs. `/exam-pattern/cpsa`. Before writing a new post, always
check it doesn't recreate this pattern — if a pillar page already owns a head
term, give the supporting post a more specific long-tail variant of it instead
of the identical phrase.

---

## 14. Maintaining this file

This file is a **living document**, not a one-time export. Update it whenever:

- A new Yoast snapshot reveals a rule not yet documented here, or contradicts a
  documented threshold (Yoast's exact thresholds do shift between versions).
- The user gives direct feedback on a generated post ("too much passive voice",
  "not enough outbound links", "keyphrase felt stuffed") — fold that feedback
  into the relevant section immediately, with a one-line note on why.
- The post schema, script pipeline, or file paths change (e.g. a new script
  replaces `sync_posts.cjs`, or a new pillar page/route is added).
- The binding word-count or structural requirement changes (update
  [§11](#11-post-requirements-checklist) directly, don't leave stale numbers).
- A new keyword-cannibalization case is found or resolved (update the "Known,
  unresolved cases" list in [§13](#13-keyword-cluster-sheet) directly).

When updating, edit the specific section in place rather than appending a
changelog — this file should always read as the current, single set of rules,
not a history of revisions.

---
name: yoast-seo-writer
description: >
  Use this skill whenever the user wants to write, generate, or optimize a blog post
  following Yoast SEO best practices. Triggers include: "UKMLA post", "write a blog post", 
  "create an SEO post", "optimize my article", "Yoast SEO content", "write content for my
  website", "SEO-friendly post", "write about [topic] for my blog", or any request
  to produce written content that should rank on search engines. Also trigger when
  the user mentions focus keyphrases, meta descriptions, readability scores, or
  asks for content structured with H1/H2/H3 headings. Even if the user just says
  "write me a post about X", use this skill to ensure every post is SEO-optimized
  by default.
---

# Yoast SEO Blog Writer

A skill for writing fully optimized blog posts following Yoast SEO methodology —
covering structure, readability, keyphrase usage, meta data, linking, and image guidance.

---

## Step 1 — Gather Requirements

Before writing, collect the following. If the user hasn't provided them, ask (all at once, not one by one):

| Field | Default if not provided |
|---|---|
| **Focus keyphrase** | Suggest one based on the topic |
| **Target audience** | General (Flesch score 60+) |
| **Word count** | 1200 words |
| **Post purpose** | Informational (adjust CTA accordingly) |

If the user says "just write it" or provides a topic without details, make reasonable assumptions and state them clearly at the top of your output.

---

## Step 2 — Output a Yoast Scorecard Header

Always begin the post output with this labeled block:

```
---
Focus Keyphrase: [keyphrase]
SEO Title (H1): [title — max 60 characters]
Meta Description: [140–155 characters, includes keyphrase, click-worthy]
URL Slug: [lowercase, hyphenated, includes keyphrase, no stop words]
Word Count: [estimated]
Readability: Easy / Medium / Hard
Keyphrase Density: ~[X]%
---
```

---

## Step 3 — Write the Post

Follow this structure in order:

### 3.1 Introduction
- Open with a hook (question, stat, or bold claim)
- Mention the focus keyphrase **within the first 100 words**
- Tell the reader what they'll learn

### 3.2 Table of Contents
- Include for posts over 800 words
- List all H2 headings as anchor links

### 3.3 Body Sections
- Use **H2** for main sections, **H3** for subsections
- At least **one H2 or H3 must contain the focus keyphrase**
- After each major section, insert an image suggestion:
  `[Image: {description} | Alt text: {keyphrase-related, under 125 chars}]`

### 3.4 FAQ Section
- Add 2–4 frequently asked questions related to the keyphrase
- Format as H3 questions with concise paragraph answers
- These naturally target long-tail search queries

### 3.5 Conclusion
- Summarize the key takeaways in 2–3 sentences
- End with a clear **call to action** (subscribe, comment, read next, contact, etc.)

---

## Step 4 — Apply Readability Rules

Every sentence and paragraph must follow these rules:

- **Sentence length**: Max 20 words per sentence
- **Paragraph length**: Max 4 lines
- **Voice**: Active voice in at least 75% of sentences
  - ❌ "The guide was written by experts."
  - ✅ "Experts wrote this guide."
- **Transition words**: Use in at least 30% of sentences
  - Examples: however, therefore, in addition, as a result, for example, meanwhile, furthermore, consequently
- **Flesch reading ease**: Target 60+ for general audiences; adjust tone for expert audiences

---

## Step 5 — Keyphrase Usage Rules

| Location | Required? |
|---|---|
| H1 Title | ✅ Yes |
| First 100 words | ✅ Yes |
| At least one H2/H3 | ✅ Yes |
| Meta description | ✅ Yes |
| URL slug | ✅ Yes |
| Image alt text | ✅ At least once |
| Body (natural repetition) | Target 1–2% density |

⚠️ Never stuff the keyphrase. If it reads awkwardly, use a natural variation or synonym.

---

## Step 6 — Linking Placeholders

Embed these inline — do not list them separately:

- **Internal links** (2–3):
  `[Internal Link: "anchor text" → suggested related topic]`
- **External links** (1–2):
  `[External Link: "anchor text" → authoritative source type, e.g. gov, .edu, major publication]`

Rules:
- Anchor text must be descriptive (never "click here" or "read more")
- External links should point to high-authority domains

---

## Step 7 — Image Suggestions

After each major H2 section, suggest one image:

```
[Image: A diagram showing {topic} | Alt text: {keyphrase} {context}, under 125 chars]
```

Also suggest a **featured image** at the top of the post for the blog thumbnail.

---

## Quality Checklist (self-verify before finishing)

Before outputting the final post, confirm:

- [ ] Keyphrase appears in title, intro, at least one subheading, meta, slug, and alt text
- [ ] SEO title ≤ 60 characters
- [ ] Meta description 140–155 characters
- [ ] Sentences mostly ≤ 20 words
- [ ] Paragraphs ≤ 4 lines
- [ ] Active voice dominant
- [ ] Transition words used throughout
- [ ] 2–3 internal link placeholders present
- [ ] 1–2 external link placeholders present
- [ ] FAQ section included
- [ ] Conclusion has a clear CTA
- [ ] Image suggestions after each major section

---

## Output Format

Write the entire post in **clean Markdown**. Order:

1. Scorecard header block (Step 2)
2. Full blog post (Steps 3–6 integrated)
3. Brief note of any assumptions made (audience, word count, etc.)

---

## Step 8 — Update the Excel Posts Registry & Weaving

Once the generated post is approved and added to `src/pages/News.jsx`, keep the Excel database updated:

1. Insert the new post object inside the `posts` array in [News.jsx](file:///c:/Users/utkar/Documents/Website/Aishwarya/UKMLA/src/pages/News.jsx).
2. Open terminal and execute the sync commands:
   ```powershell
   node scripts/sync_posts.cjs
   python scripts/sync_posts.py
   ```
3. Open the updated [UKMLA_Posts_Registry.xlsx](file:///c:/Users/utkar/Documents/Website/Aishwarya/UKMLA/UKMLA_Posts_Registry.xlsx) to inspect the newly added row and verify that the `Incoming Links`, `Outgoing Links`, and `Weaving Reference` columns are correctly updated, establishing a clear link structure connecting the post to the rest of the site's content.
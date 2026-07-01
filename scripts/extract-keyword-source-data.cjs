#!/usr/bin/env node
'use strict';
// Dumps the minimal per-post fields the Keyword Cluster Sheet builder needs
// (title/date/tag/primaryKeyword/summary) to scratch/posts_min.json. Re-run
// this (then build-keyword-cluster-sheet.py) any time News.jsx changes.

const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../src/pages/News.jsx');
const src = fs.readFileSync(FILE, 'utf-8');

const START_STR = 'const posts = [';
const END_STR = '\nconst topics';
const startIdx = src.indexOf(START_STR);
const endIdx = src.indexOf(END_STR);
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate posts array boundaries');
  process.exit(1);
}

const posts = JSON.parse(src.slice(startIdx + 'const posts = '.length, endIdx).replace(/;\s*$/, '').trim());

const minimal = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  date: p.date,
  tag: p.tag,
  primaryKeyword: p.primaryKeyword,
  summary: p.summary,
  seoTitle: p.seoTitle,
  seoDescription: p.seoDescription,
}));

const scratchDir = path.join(__dirname, '..', 'scratch');
if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

const outPath = path.join(scratchDir, 'posts_min.json');
fs.writeFileSync(outPath, JSON.stringify(minimal, null, 2));
console.log(`Wrote ${minimal.length} posts to ${outPath}`);

// Duplicate-primaryKeyword guard (keyword cannibalization check)
const seen = new Map();
let dupes = 0;
for (const p of minimal) {
  const key = (p.primaryKeyword || '').trim().toLowerCase();
  if (!key) continue;
  if (seen.has(key)) {
    console.warn(`WARNING: duplicate primaryKeyword "${p.primaryKeyword}" — ${seen.get(key)} vs ${p.slug}`);
    dupes++;
  } else {
    seen.set(key, p.slug);
  }
}
console.log(dupes === 0 ? 'No duplicate primary keywords across posts.' : `${dupes} duplicate primary keyword(s) found — resolve before publishing.`);

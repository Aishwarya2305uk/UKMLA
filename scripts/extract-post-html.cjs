#!/usr/bin/env node
'use strict';
// Splits each post's htmlContent out of src/pages/News.jsx into its own file
// under /posts-html/{slug}.html, and rewrites the posts array in News.jsx to
// drop the htmlContent field (content now lives only in /posts-html/).
//
// Run this once per new post if you ever hand-author a post's htmlContent
// directly inside News.jsx instead of writing straight to /posts-html/.

const fs = require('fs');
const path = require('path');

const NEWS_PATH = path.resolve(__dirname, '../src/pages/News.jsx');
const POSTS_HTML_DIR = path.resolve(__dirname, '../posts-html');

const src = fs.readFileSync(NEWS_PATH, 'utf-8');

const START_STR = 'const posts = [';
const END_STR = '\nconst topics';
const startIdx = src.indexOf(START_STR);
const endIdx = src.indexOf(END_STR);
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate posts array boundaries');
  process.exit(1);
}

const arrText = src.slice(startIdx + 'const posts = '.length, endIdx).replace(/;\s*$/, '').trim();
const posts = JSON.parse(arrText);

if (!fs.existsSync(POSTS_HTML_DIR)) fs.mkdirSync(POSTS_HTML_DIR, { recursive: true });

let extracted = 0;
const slimPosts = posts.map((post) => {
  const { htmlContent, ...rest } = post;
  if (htmlContent) {
    const htmlPath = path.join(POSTS_HTML_DIR, `${post.slug}.html`);
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    extracted++;
  }
  return rest;
});

const newArr = JSON.stringify(slimPosts, null, 2);
const newSrc = src.slice(0, startIdx) + 'const posts = ' + newArr + ';' + src.slice(endIdx);
fs.writeFileSync(NEWS_PATH, newSrc, 'utf-8');

console.log(`Extracted ${extracted} post(s) to ${POSTS_HTML_DIR}`);
console.log(`Rewrote ${NEWS_PATH} with htmlContent removed from every post.`);

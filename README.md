# UKMLA Guide

An independent, brand-neutral educational resource for the **UK Medical Licensing Assessment (UKMLA / MLA)**. It provides detailed guides on eligibility, exam pattern (AKT & CPSA), the GMC MLA Content Map, preparation strategies, the IMG/PLAB pathway, and a regularly updated Posts section.

> ⚕️ This is an informational site only. It is not affiliated with the GMC or MSC; all official criteria are managed by the General Medical Council.

---

## ✨ Features

- **Single‑page app** with a lightweight custom router (no router dependency) — clean URLs, SEO `<title>`/meta/JSON‑LD per route, and breadcrumbs.
- **Editorial → claymorphism UI** with a frosted‑glass navigation bar and a professional deep‑blue / medical‑teal / amber palette (fully token‑driven via CSS variables).
- **Expandable sidebar drawer** ("The Index") holding the full section tree, with a minimal top nav (Home · Syllabus · FAQ · Posts).
- **Auto‑scrolling hero carousel** with arrows, dots, captions, pause‑on‑hover, and reduced‑motion support.
- **Posts / blog** — a growing library of **169 long‑form articles**. Post metadata lives in `src/pages/News.jsx`; each article body is a standalone HTML file under `posts-html/<slug>.html`, bundled at build time. Posts open as full‑page articles (hero image + publish date), are deep‑linkable at `/news/<slug>`, and are filterable by topic.
- **Auto‑generated SEO files** — `public/sitemap.xml` and `public/robots.txt` are regenerated from the app's routes and posts on every build (and dev start), so they never drift from the site.
- **Scroll‑reveal animations** and subtle micro‑interactions, all gated behind `prefers-reduced-motion`.
- **Accessible & responsive** — WCAG‑minded contrast, keyboard‑navigable controls, and layouts from mobile to wide desktop.
- **Client‑side search** across all pages.

---

## 🛠 Tech Stack

| | |
|---|---|
| Framework | [React 19](https://react.dev) |
| Build tool | [Vite 8](https://vite.dev) |
| Linting | [Oxlint](https://oxc.rs) |
| Styling | Hand‑authored CSS with CSS custom properties (no UI framework) |
| Routing | Custom history‑based router (`src/router.jsx`) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) **18+** and npm

### Install & run

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# create a production build in /dist
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint

# manually regenerate public/sitemap.xml + robots.txt
# (also runs automatically on every build)
npm run generate:sitemap
```

---

## 📁 Project Structure

```
UKMLA/
├─ public/
│  ├─ images/           # per‑post featured images (.webp) + hero/portrait photos
│  ├─ logo.png          # navbar logo
│  ├─ favicon.svg, icons.svg, motion.gif
│  └─ robots.txt, sitemap.xml   # auto‑generated on build (do not hand‑edit)
├─ posts-html/          # one <slug>.html body file per blog post (169 total)
├─ scripts/
│  ├─ generate-sitemap.mjs   # builds sitemap.xml + robots.txt from routes/posts
│  └─ …                       # post‑sync, internal‑linking & keyword tooling
├─ src/
│  ├─ components/
│  │  ├─ Layout.jsx     # header, glass navbar, drawer, footer, scroll‑reveal
│  │  └─ Carousel.jsx   # auto‑scrolling hero gallery
│  ├─ pages/            # one component per route (Home, WhatIsUKMLA, AKT, CPSA,
│  │                    #   Eligibility, Fees, Syllabus, FAQs, News, …)
│  ├─ router.jsx        # routes table + <Router>, <Link>, navigate(), SEO head
│  ├─ App.jsx           # mounts the router
│  ├─ main.jsx          # React entry point
│  └─ index.css         # design tokens + all component styles
├─ index.html
├─ vite.config.js       # React plugin + SEO‑file generator plugin
└─ package.json
```

---

## 🧭 Routing

Routing is handled by a small custom router in [`src/router.jsx`](src/router.jsx) using the History API.

- Add a page component under `src/pages/`.
- Register it in the `routes` array with its `path`, `component`, SEO `title`/`description`/`keywords`, and optional `breadcrumbs`.
- Navigate with the `<Link to="…">` component or the `navigate()` helper.

On each route change the router updates the document title, meta description, JSON‑LD structured data, and scrolls to top.

---

## 🎨 Theming

All colours, radii, shadows, and effects are defined as CSS custom properties in the `:root` block of [`src/index.css`](src/index.css). To re‑skin the entire site, change the token **values** — every component reads from them, so no component edits are needed.

Key token groups: brand colours (`--brand-*`), surfaces (`--bg-*`), text (`--text-*`), status (`--success` / `--warning` / `--danger`), claymorphism shadows (`--clay`, `--shadow-*`), and glassmorphism (`--glass-*`). A ready‑to‑use dark‑mode palette is documented inline.

---

## ✍️ Adding a Post

Each post has two parts:

1. **Metadata** — an object in the `posts` array in [`src/pages/News.jsx`](src/pages/News.jsx):

   ```js
   {
     slug: 'unique-url-slug',          // becomes /news/unique-url-slug
     title: 'Post title',
     date: '12 June 2026',
     tag: 'Preparation',               // also feeds the topic filter
     image: '/images/your-image-featured.webp',
     summary: 'Shown in the list view.',
     // plus SEO fields: seoTitle, seoDescription, primaryKeyword,
     // featuredImage* and sourceFullUrl (see existing entries).
   }
   ```

2. **Body** — a matching HTML file at `posts-html/<slug>.html`. These are bundled at
   build time via `import.meta.glob` and rendered when the post is opened.

Place newer posts higher in the array (the list renders in array order), drop the
featured image in `public/images/`, and new `tag` values automatically appear as
filter chips. After adding a post, `sitemap.xml`/`robots.txt` refresh on the next
build (or run `npm run generate:sitemap`).

> The post library is generated and kept in sync through the `scripts/` tooling and
> the authoring workflow described in the project's SEO skill (`SKILL.md`); adding
> posts by hand as above works too.

---

## ♿ Accessibility

- Semantic landmarks, `aria-*` labels on interactive controls, and keyboard support (Enter/Space, Escape to close the drawer).
- Colour contrast targeted at WCAG AA or better for text.
- All animation is disabled for users with `prefers-reduced-motion: reduce`.

---

## 📦 Deployment

`npm run build` outputs a static site to `dist/`, deployable to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.). For client‑side routing, configure the host to fall back to `index.html` for unknown paths so deep links like `/news/<slug>` resolve.

The build regenerates `sitemap.xml`/`robots.txt` using the canonical origin `https://www.gmcukmla.com`. Override it for a different domain with the `SITE_URL` environment variable, e.g.:

```bash
SITE_URL=https://your-domain.com npm run build
```

---

## 📄 Disclaimer & License

This project is an independent educational resource and is **not** affiliated with, or endorsed by, the General Medical Council (GMC) or the Medical Schools Council (MSC). Always verify exam dates, fees, and requirements via the official GMC channels.

Released under the [MIT License](LICENSE) unless stated otherwise.

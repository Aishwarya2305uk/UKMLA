# UKMLA Guide

An independent, brand-neutral educational resource for the **UK Medical Licensing Assessment (UKMLA / MLA)**. It provides detailed guides on eligibility, exam pattern (AKT & CPSA), the GMC MLA Content Map, preparation strategies, the IMG/PLAB pathway, and a regularly updated Posts section.

> ⚕️ This is an informational site only. It is not affiliated with the GMC or MSC; all official criteria are managed by the General Medical Council.

---

## ✨ Features

- **Single‑page app** with a lightweight custom router (no router dependency) — clean URLs, SEO `<title>`/meta/JSON‑LD per route, and breadcrumbs.
- **Editorial → claymorphism UI** with a frosted‑glass navigation bar and a professional deep‑blue / medical‑teal / amber palette (fully token‑driven via CSS variables).
- **Expandable sidebar drawer** ("The Index") holding the full section tree, with a minimal top nav (Home · Syllabus · FAQ · Posts).
- **Auto‑scrolling hero carousel** with arrows, dots, captions, pause‑on‑hover, and reduced‑motion support.
- **Posts / blog** — list view (title + summary) that opens a full‑page article with a hero image and "Posted on" date, deep‑linkable via URL hash, with a **topic filter**.
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
```

---

## 📁 Project Structure

```
UKMLA/
├─ public/
│  ├─ images/           # AI‑generated medical photos used across the site
│  ├─ gallery/          # additional photography
│  ├─ logo.png          # navbar logo
│  ├─ favicon.svg, icons.svg, robots.txt, sitemap.xml
├─ src/
│  ├─ components/
│  │  ├─ Layout.jsx     # header, glass navbar, drawer, footer, scroll‑reveal
│  │  └─ Carousel.jsx   # auto‑scrolling hero gallery
│  ├─ pages/            # one component per route (Home, Syllabus, FAQs, News, …)
│  ├─ router.jsx        # routes table + <Router>, <Link>, navigate(), SEO head
│  ├─ App.jsx           # mounts the router
│  ├─ main.jsx          # React entry point
│  └─ index.css         # design tokens + all component styles
├─ index.html
├─ vite.config.js
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

Posts live in the `posts` array in [`src/pages/News.jsx`](src/pages/News.jsx). Add an object with:

```js
{
  slug: 'unique-url-slug',          // becomes /news#unique-url-slug
  title: 'Post title',
  date: '12 June 2026',
  tag: 'Preparation',               // also feeds the topic filter
  image: '/images/your-image.webp',
  summary: 'Shown in the list view.',
  body: ['Paragraph one…', 'Paragraph two…'],
  link: { to: '/syllabus', label: 'Related page →' } // or { href: 'https://…' }
}
```

Place newer posts higher in the array (the list renders in array order). New `tag` values automatically appear as filter chips.

---

## ♿ Accessibility

- Semantic landmarks, `aria-*` labels on interactive controls, and keyboard support (Enter/Space, Escape to close the drawer).
- Colour contrast targeted at WCAG AA or better for text.
- All animation is disabled for users with `prefers-reduced-motion: reduce`.

---

## 📦 Deployment

`npm run build` outputs a static site to `dist/`, deployable to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.). For client‑side routing, configure the host to fall back to `index.html` for unknown paths.

---

## 📄 Disclaimer & License

This project is an independent educational resource and is **not** affiliated with, or endorsed by, the General Medical Council (GMC) or the Medical Schools Council (MSC). Always verify exam dates, fees, and requirements via the official GMC channels.

Released under the [MIT License](LICENSE) unless stated otherwise.

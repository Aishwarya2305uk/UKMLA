import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateSeoFiles } from './scripts/generate-sitemap.mjs'

// Regenerates public/sitemap.xml + public/robots.txt from the app's routes at
// the start of every build (and dev server start), so the sitemap is always in
// sync with src/router.jsx. See scripts/generate-sitemap.mjs.
function seoFilesPlugin() {
  return {
    name: 'generate-seo-files',
    buildStart() {
      const { total, pageCount, postCount } = generateSeoFiles()
      this.info?.(`generated sitemap.xml (${total} URLs: ${pageCount} pages + ${postCount} posts) and robots.txt`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFilesPlugin()],
  server: {
    // Vite doesn't run the /api serverless functions, so forward those requests
    // to a locally-running `vercel dev` (which does). Two-terminal workflow:
    //   1) terminal A: `vercel dev`   → runs /api on :3000 (reads local .env)
    //   2) terminal B: `npm run dev`  → Vite + HMR on :5173, /api proxied below
    // Override the target with VERCEL_DEV_URL if `vercel dev` uses another port.
    proxy: {
      '/api': {
        target: process.env.VERCEL_DEV_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})

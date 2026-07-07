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
})

import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { NOINDEX, PAGES } from './src/pageMeta.js'

// Link previews (og:image) need an absolute URL. Resolved at build time, in this order:
// 1. SITE_URL, set in the Vercel project settings once there is a custom domain
// 2. VERCEL_PROJECT_PRODUCTION_URL, the production address Vercel provides automatically
// 3. VERCEL_URL, the address of this particular deployment
// Empty locally, which leaves root-relative URLs that work in dev.
function siteUrl() {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const url = process.env.SITE_URL || (host ? `https://${host}` : '')
  return url.replace(/\/+$/, '')
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fileOf = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)

// Fills the index.html template for one page from its entry in src/pageMeta.js
function render(template, page) {
  const site = siteUrl()
  const shareBlock = /<!--share:start-->[\s\S]*?<!--share:end-->/
  let html = template
  if (page.share) html = html.replace('<!--share:start-->', '').replace('<!--share:end-->', '')
  else html = html.replace(shareBlock, '') // pages without a preview (the 404) get no preview tags

  const robots = NOINDEX || page.notFound ? '<meta name="robots" content="noindex" />' : ''
  return html
    .replace('<!--__ROBOTS__-->', robots)
    .replace(/[ \t]*<!--[\s\S]*?-->\r?\n?/g, '') // notes for whoever edits the template don't belong in the published pages
    .replaceAll('__TITLE__', escapeHtml(page.title))
    .replaceAll('__DESCRIPTION__', escapeHtml(page.description))
    .replaceAll('__SHARE__', escapeHtml(page.share ?? ''))
    .replaceAll('__URL__', `${site}${page.path}`)
    .replaceAll('__SITE_URL__', site)
}

// Builds one HTML file per page from the single index.html template.
const pagesPlugin = () => ({
  name: 'pages',
  enforce: 'post',
  // Dev server: every address serves index.html, so fill in the page being requested
  transformIndexHtml: {
    order: 'pre',
    handler(html, ctx) {
      if (!ctx.server) return html // builds are filled in below, once the asset links exist
      const path = (ctx.originalUrl || ctx.path || '/').split('?')[0].replace(/\.html$/, '').replace(/\/+$/, '') || '/'
      const page = PAGES.find((p) => p.path === path) ?? PAGES.find((p) => p.notFound)
      return render(html, page)
    },
  },
  // Build: take the finished index.html (script and style links included) and write a copy for each page
  generateBundle(_, bundle) {
    const entry = bundle['index.html']
    if (!entry || entry.type !== 'asset') return
    const template = String(entry.source)
    for (const page of PAGES) {
      const fileName = fileOf(page.path)
      const source = render(template, page)
      if (fileName === 'index.html') entry.source = source
      else this.emitFile({ type: 'asset', fileName, source })
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pagesPlugin()],
  // Absolute asset paths: the site is served from the domain root, and 404.html is shown at any URL depth.
  base: '/',
})

import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { NOINDEX, PAGES } from './src/pageMeta.js'
import { llmsText, pageHtml } from './src/prerender.js'
import { structuredData } from './src/seo.js'

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

  // While the site is hidden: noindex. Once it is live, say plainly that full snippets and large previews are welcome (search results and AI answers).
  const robots =
    NOINDEX || page.notFound
      ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />'
  // The canonical address tells search engines which URL is the real one for this page (it needs the full site address)
  const canonical =
    site && !page.notFound
      ? [
          `<link rel="canonical" href="${site}${page.path}" />`,
          `<link rel="alternate" hreflang="en-PH" href="${site}${page.path}" />`,
          `<link rel="alternate" hreflang="x-default" href="${site}${page.path}" />`,
          // A short summary of the company written for AI assistants (see src/prerender.js)
          ...(NOINDEX ? [] : [`<link rel="alternate" type="text/plain" href="${site}/llms.txt" title="Summary for AI assistants" />`]),
        ].join('\n    ')
      : ''
  // "<" is written as \u003c so the data can never close the script tag early
  const jsonLd = structuredData(page, site)
    .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')

  return html
    .replace('<!--__ROBOTS__-->', () => robots)
    .replace('<!--__CANONICAL__-->', () => canonical)
    .replace('<!--__JSONLD__-->', () => jsonLd)
    // The page's text for crawlers that do not run JavaScript, inside #root (the site replaces it as it starts). A function, so "$" in the text is safe.
    .replace('<!--__PRERENDER__-->', () => pageHtml(page))
    .replace(/[ \t]*<!--[\s\S]*?-->\r?\n?/g, '') // notes for whoever edits the template don't belong in the published pages
    .replaceAll('__TITLE__', escapeHtml(page.title))
    .replaceAll('__DESCRIPTION__', escapeHtml(page.description))
    .replaceAll('__SHARE__', escapeHtml(page.share ?? ''))
    .replaceAll('__URL__', `${site}${page.path}`)
    .replaceAll('__SITE_URL__', site)
}

// Search results cut titles and snippets off past these lengths, so flag anything outside them
function checkLengths(warn) {
  for (const p of PAGES) {
    if (p.notFound) continue
    const note = (what, text, min, max) => {
      if (text.length < min || text.length > max) warn(`${p.path}: ${what} is ${text.length} characters (aim for ${min}-${max}): "${text.slice(0, 50)}..."`)
    }
    note('title', p.title, 20, 60)
    note('description', p.description, 70, 160)
    if (p.share) note('share text', p.share.trim(), 20, 200)
  }
}

// Crawlers that read the site for search results and AI answers are named, so the welcome is explicit. This file is a request, not a lock:
// well-behaved crawlers follow it, others may not.
const CRAWLERS = [
  'Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot',
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', // OpenAI
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', // Anthropic
  'PerplexityBot', 'Perplexity-User', // Perplexity
  'Google-Extended', 'Applebot-Extended', // Gemini and Apple Intelligence
  'Amazonbot', 'CCBot', 'cohere-ai', 'MistralAI-User',
]
const robotsTxt = (site) =>
  ['User-agent: *', 'Allow: /', '', ...CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']), `Sitemap: ${site}/sitemap.xml`, ''].join('\n')

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
    checkLengths((msg) => this.warn(msg))
    for (const page of PAGES) {
      const fileName = fileOf(page.path)
      const source = render(template, page)
      if (fileName === 'index.html') entry.source = source
      else this.emitFile({ type: 'asset', fileName, source })
    }

    // Once the site is meant to be found, publish a sitemap and point crawlers at it
    const site = siteUrl()
    if (!NOINDEX && site) {
      const urls = PAGES.filter((p) => !p.notFound).map((p) => `  <url><loc>${site}${p.path}</loc></url>`)
      const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(site) })
      // Plain-text summaries for AI assistants (llmstxt.org)
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsText(site) })
      this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: llmsText(site, true) })
    } else if (!NOINDEX) {
      this.warn('NOINDEX is off but no site address is set, so sitemap.xml and robots.txt were skipped (set SITE_URL, or build on Vercel)')
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pagesPlugin()],
  // Absolute asset paths: the site is served from the domain root, and 404.html is shown at any URL depth.
  base: '/',
  // No source maps in the published site, so the original source code can't be read from the browser's developer tools
  build: { sourcemap: false },
})

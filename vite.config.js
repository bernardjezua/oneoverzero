import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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

const siteUrlPlugin = () => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl()),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  // Relative asset paths in production, so the build works from the domain root or any subfolder.
  base: './',
})

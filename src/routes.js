import { PAGES } from './pageMeta.js'

// Each page has its own HTML file, generated at build time from src/pageMeta.js, so the route is simply the current path.
export const ROUTES = PAGES.filter((p) => !p.notFound).map((p) => p.path)

export function currentRoute() {
  const path = window.location.pathname
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')
  if (path === '' || path === '/index') return '/'
  return path
}

import { PAGES } from './pageMeta.js'

// Each page has its own HTML file, generated at build time from src/pageMeta.js, so the route is simply the current path.
export const ROUTES = PAGES.filter((p) => !p.notFound).map((p) => p.path)

export function routeOf(pathname) {
  const path = pathname
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')
  if (path === '' || path === '/index') return '/'
  return path
}

export function currentRoute() {
  return routeOf(window.location.pathname)
}

// When a page is swapped in without a reload, the browser tab still needs that page's title and description
export function applyPageMeta(route) {
  const page = PAGES.find((p) => p.path === route)
  if (!page) return
  document.title = page.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
}

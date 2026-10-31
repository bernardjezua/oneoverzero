// Text for crawlers and AI assistants. Used by the build in vite.config.js, so this file must stay plain JavaScript (see seo.js).
//
// The site draws its pages in the browser, so the HTML file for a page is an empty shell until JavaScript runs, and most AI crawlers
// and many search tools never run it. Two things fix that, both written from the same data the site shows:
// - pageHtml():  the page's text as plain HTML, placed inside #root. It is visually hidden and replaced the moment the site starts.
// - llmsText():  llms.txt (short) and llms-full.txt (everything), plain-text summaries made for AI assistants.
import { FAQS } from './faqData.js'
import { ORG, PAGES, SITE_NAME } from './pageMeta.js'
import { EGOV, MISSION, PROCESS_STEPS, PROJECT_LIST, SERVICES, VISION } from './siteData.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const list = (items) => `<ul>${items.map((li) => `<li>${li}</li>`).join('')}</ul>`
const named = (items) => list(items.map((it) => `<strong>${esc(it.name)}</strong>: ${esc(it.desc)}`))

const sections = {
  about: () =>
    `<h2>About ${esc(SITE_NAME)}</h2><p>${esc(PAGES[0].share)}</p>` +
    `<p>Founded in ${ORG.foundingYear}, based in ${esc(ORG.address.region)}, Philippines.</p>` +
    `<h3>Mission</h3><p>${esc(MISSION)}</p><h3>Vision</h3><p>${esc(VISION)}</p>`,
  services: () =>
    `<h2>Services</h2>` +
    SERVICES.map((s) => `<h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p>${named(s.items)}`).join(''),
  egov: () =>
    `<h2>${esc(EGOV.title)}</h2><p>${esc(EGOV.summary)}</p>` +
    EGOV.groups.map((g) => `<h3>${esc(g.label)}</h3>${named(g.items)}`).join(''),
  process: () =>
    `<h2>How we deliver</h2><ol>${PROCESS_STEPS.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.text)}</li>`).join('')}</ol>`,
  products: () =>
    `<h2>Products and projects</h2>` +
    PROJECT_LIST.map((p) => `<h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><p>${esc(p.tags.join(', '))}</p>`).join(''),
  faq: () => `<h2>Frequently asked questions</h2>` + FAQS.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(''),
  contact: () =>
    `<h2>Contact</h2><p>Email: <a href="mailto:${esc(ORG.email)}">${esc(ORG.email)}</a>. Based in ${esc(ORG.address.region)}, Philippines.</p>`,
}

// Which sections each page shows
const LAYOUT = {
  '/': ['about', 'services', 'egov', 'process', 'products', 'contact'],
  '/about': ['about'],
  '/services': ['services', 'egov'],
  '/work': ['products'],
  '/contact': ['contact'],
  '/faq': ['faq'],
}

// The plain-HTML copy of a page, for crawlers. Hidden from sight (not from the page's text) and swapped out as soon as the site starts.
export function pageHtml(page) {
  if (page.notFound) return ''
  const body = (LAYOUT[page.path] ?? []).map((k) => sections[k]()).join('')
  const style = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap'
  return `<div style="${style}"><h1>${esc(page.title)}</h1><p>${esc(page.description)}</p>${body}</div>`
}

const url = (site, path) => `${site}${path}`

// llms.txt: a short, structured summary with links. llms-full.txt (full = true) adds every service, item and answer in plain Markdown.
export function llmsText(site, full = false) {
  const pages = PAGES.filter((p) => !p.notFound && p.share)
  const out = [
    `# ${SITE_NAME}`,
    '',
    `> ${PAGES[0].share}`,
    '',
    `${SITE_NAME} (also written One Over Zero or 1/0) is a technology company founded in ${ORG.foundingYear} and based in ${ORG.address.region}, Philippines. ` +
      `Slogan: "${ORG.slogan}". It designs, builds and secures software and infrastructure for businesses and government, and supports what it delivers. ` +
      `Contact: ${ORG.email}.`,
    '',
    '## Pages',
    ...pages.map((p) => `- [${p.name}](${url(site, p.path)}): ${p.description}`),
    '',
    '## What we offer',
    ...SERVICES.map((s) => `- ${s.title}: ${s.summary}`),
    `- ${EGOV.title}: ${EGOV.summary}`,
    '',
    '## Mission and vision',
    `- Mission: ${MISSION}`,
    `- Vision: ${VISION}`,
    '',
    '## Optional',
    `- [Full details for AI assistants](${url(site, '/llms-full.txt')}): every service, item, product and answer in one file.`,
    `- [LinkedIn](${ORG.linkedin})`,
    '',
  ]
  if (!full) return out.join('\n')

  out.length = 0
  out.push(
    `# ${SITE_NAME}: full details`,
    '',
    `> ${PAGES[0].share}`,
    '',
    `Founded ${ORG.foundingYear}. Based in ${ORG.address.region}, Philippines. Email: ${ORG.email}. Website: ${url(site, '/')}`,
    '',
    '## Mission',
    MISSION,
    '',
    '## Vision',
    VISION,
    '',
    '## Services',
    ''
  )
  for (const s of SERVICES) {
    out.push(`### ${s.title}`, s.summary, '', ...s.items.map((it) => `- ${it.name}: ${it.desc}`), '')
  }
  out.push(`## ${EGOV.title}`, EGOV.summary, '')
  for (const g of EGOV.groups) out.push(`### ${g.label}`, ...g.items.map((it) => `- ${it.name}: ${it.desc}`), '')
  out.push('## How we deliver', ...PROCESS_STEPS.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`), '')
  out.push('## Products and projects', '', ...PROJECT_LIST.map((p) => `- ${p.name}: ${p.desc} (${p.tags.join(', ')})`), '')
  out.push('## Frequently asked questions', '')
  for (const f of FAQS) out.push(`### ${f.q}`, f.a, '')
  return out.join('\n')
}

// Structured data (JSON-LD) for search engines. Used by the build in vite.config.js, so this file must stay plain JavaScript with no imports from the app.
import { FAQS } from './faqData.js'
import { ORG, PAGES, SITE_NAME } from './pageMeta.js'

// Returns the JSON-LD objects for one page. `site` is the absolute site address (empty when building locally).
export function structuredData(page, site) {
  if (page.notFound) return []
  const out = []

  if (page.path === '/' && site) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORG.name,
      url: `${site}/`,
      logo: `${site}/favicon.svg`,
      email: ORG.email,
      foundingDate: String(ORG.foundingYear),
      description: PAGES[0].description,
      areaServed: ORG.address.country,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ORG.address.street,
        addressLocality: ORG.address.city,
        addressRegion: ORG.address.region,
        postalCode: ORG.address.postalCode,
        addressCountry: ORG.address.country,
      },
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: ORG.email },
      ...(ORG.linkedin ? { sameAs: [ORG.linkedin] } : {}),
    })
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${site}/` })
  }

  // Breadcrumbs: how search results show "One Over Zero > Services" under the title
  if (page.path !== '/' && site) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: PAGES[0].name, item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: page.name, item: `${site}${page.path}` },
      ],
    })
  }

  // The FAQ page lists the same questions and answers that are on screen, which makes it eligible for rich results
  if (page.path === '/faq') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }

  return out
}

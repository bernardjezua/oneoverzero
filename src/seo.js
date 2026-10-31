// Structured data (JSON-LD) for search engines and AI assistants. Used by the build in vite.config.js, so this file must stay plain JavaScript:
// it may only import other plain files (no JSX, no import.meta), see siteData.js and faqData.js.
//
// Every page gets one linked graph: the organization, the website, the page itself (typed for what it is: About, Collection, Contact, FAQ...),
// its breadcrumbs, and whatever the page is about. The offer and product data is read from siteData.js, so it always matches what is on screen.
import { FAQS } from './faqData.js'
import { ORG, PAGES, SITE_NAME } from './pageMeta.js'
import { EGOV, MISSION, PROCESS_STEPS, PROJECT_LIST, SERVICES, VISION } from './siteData.js'

const LANG = 'en-PH'

// Schema.org types for each page
const PAGE_TYPE = {
  '/about': 'AboutPage',
  '/services': 'CollectionPage',
  '/work': 'CollectionPage',
  '/contact': 'ContactPage',
  '/faq': 'FAQPage',
}

// Returns the JSON-LD objects for one page. `site` is the absolute site address (empty when building locally).
export function structuredData(page, site) {
  if (page.notFound) return []

  const id = {
    org: `${site}/#organization`,
    site: `${site}/#website`,
    page: `${site}${page.path}#webpage`,
    crumbs: `${site}${page.path}#breadcrumb`,
    offers: `${site}/services#offers`,
    egov: `${site}/services#e-government`,
    products: `${site}/work#products`,
    steps: `${site}/#how-we-deliver`,
  }
  const ref = (key) => ({ '@id': id[key] })
  const onHome = page.path === '/'
  const onServices = page.path === '/services'
  const graph = []

  // Who we are. The same node on every page, so a reader landing on any page learns who is behind it.
  graph.push({
    '@type': 'Organization',
    '@id': id.org,
    name: ORG.name,
    alternateName: ORG.alternateNames,
    url: `${site}/`,
    logo: { '@type': 'ImageObject', url: `${site}/icon-512.png`, width: 512, height: 512 },
    image: `${site}/og-image.png`,
    slogan: ORG.slogan,
    description: PAGES[0].description,
    email: ORG.email,
    foundingDate: String(ORG.foundingYear),
    areaServed: { '@type': 'Country', name: 'Philippines' },
    address: { '@type': 'PostalAddress', addressRegion: ORG.address.region, addressCountry: ORG.address.country },
    contactPoint: ['customer support', 'sales'].map((contactType) => ({
      '@type': 'ContactPoint',
      contactType,
      email: ORG.email,
      areaServed: 'PH',
      availableLanguage: ['English', 'Filipino'],
    })),
    knowsAbout: ORG.knowsAbout,
    ...(ORG.linkedin ? { sameAs: [ORG.linkedin] } : {}),
    ...(onHome || onServices ? { hasOfferCatalog: ref('offers') } : {}),
  })

  graph.push({
    '@type': 'WebSite',
    '@id': id.site,
    name: SITE_NAME,
    url: `${site}/`,
    inLanguage: LANG,
    publisher: ref('org'),
  })

  // The page itself
  const webPage = {
    '@type': PAGE_TYPE[page.path] ?? 'WebPage',
    '@id': id.page,
    url: `${site}${page.path}`,
    name: page.title,
    description: page.description,
    inLanguage: LANG,
    isPartOf: ref('site'),
    about: ref('org'),
    publisher: ref('org'),
    primaryImageOfPage: { '@type': 'ImageObject', url: `${site}/og-image.png` },
    ...(onHome ? {} : { breadcrumb: ref('crumbs') }),
  }
  graph.push(webPage)

  // Breadcrumbs: how search results show "One Over Zero > Services" under the title
  if (!onHome) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': id.crumbs,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: PAGES[0].name, item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: page.name, item: `${site}${page.path}` },
      ],
    })
  }

  // What we offer: the service cards, each with what is on the back of the card, and the e-government service with its three groups
  if (onHome || onServices) {
    graph.push({
      '@type': 'OfferCatalog',
      '@id': id.offers,
      name: `${SITE_NAME} services`,
      itemListElement: [
        ...SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.summary,
            provider: ref('org'),
            areaServed: { '@type': 'Country', name: 'Philippines' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: s.title,
              itemListElement: s.items.map((it) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: it.name, description: it.desc },
              })),
            },
          },
        })),
        { '@type': 'Offer', itemOffered: ref('egov') },
      ],
    })
    graph.push({
      '@type': 'Service',
      '@id': id.egov,
      name: EGOV.title,
      serviceType: 'E-government systems',
      description: EGOV.summary,
      provider: ref('org'),
      areaServed: { '@type': 'Country', name: 'Philippines' },
      audience: { '@type': 'Audience', audienceType: 'Local government units, municipalities, cities and provinces' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: EGOV.title,
        itemListElement: EGOV.groups.map((g) => ({
          '@type': 'OfferCatalog',
          name: g.label,
          itemListElement: g.items.map((it) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: it.name, description: it.desc },
          })),
        })),
      },
    })
    webPage.mainEntity = ref('offers')
  }

  // How we deliver: the five steps, in order
  if (onHome) {
    graph.push({
      '@type': 'HowTo',
      '@id': id.steps,
      name: `How ${SITE_NAME} delivers a project`,
      description: 'From the first conversation to support after launch, in five steps.',
      step: PROCESS_STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
    })
  }

  // About: who we are and what we stand for
  if (page.path === '/about') {
    webPage.text = `Mission: ${MISSION} Vision: ${VISION}`
    webPage.mainEntity = ref('org')
  }

  // Products: each product with what it is for
  if (page.path === '/work') {
    graph.push({
      '@type': 'ItemList',
      '@id': id.products,
      name: `Products and projects by ${SITE_NAME}`,
      numberOfItems: PROJECT_LIST.length,
      itemListElement: PROJECT_LIST.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.name,
          description: p.desc,
          applicationCategory: 'BusinessApplication',
          keywords: p.tags.join(', '),
          creator: ref('org'),
          ...(p.file ? { image: `${site}/projects/${p.file}` } : {}),
        },
      })),
    })
    webPage.mainEntity = ref('products')
  }

  // The FAQ page lists the same questions and answers that are on screen, which makes it eligible for rich results
  if (page.path === '/faq') {
    webPage.mainEntity = FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  }

  return [{ '@context': 'https://schema.org', '@graph': graph }]
}

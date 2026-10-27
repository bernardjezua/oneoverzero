// Every page in one place: its address, plus the text for the browser tab, search results and link previews.
// The build turns index.html into one HTML file per entry (see vite.config.js), so nothing else needs editing to add or rename a page.
//
// - name:        short name used in breadcrumbs (search results show "One Over Zero > Services")
// - title:       browser tab and search result title. Aim for 60 characters or fewer, with the main keywords first.
// - description: search result snippet. Aim for 70 to 160 characters: what the page offers, then a reason to click.
// - share:       text under the title in a link preview (Discord, Facebook, LinkedIn). Leave it out for pages that shouldn't have a preview.
// - notFound:    the page shown for unknown addresses (it is not a route of its own)
//
// The build prints a warning if a title, description or share text is outside those lengths.

export const SITE_NAME = 'One Over Zero Innovations'
const BRAND = 'One Over Zero'

// Tells search engines not to list the site. Set to false when you are ready to launch:
// the build then also publishes sitemap.xml and robots.txt, and drops the noindex tag.
export const NOINDEX = true

// Company details for search engines (shown to them as structured data on the home page)
export const ORG = {
  name: SITE_NAME,
  email: 'support@oneoverzero.com.ph',
  foundingYear: 2017,
  linkedin: 'https://www.linkedin.com/company/one-over-zero-technologies-inc/', // temporary: confirm this is the right company page
  address: {
    street: '4th Floor PhilCox Building, 172 Salcedo Street, Legazpi Village',
    city: 'Makati',
    region: 'Metro Manila',
    postalCode: '1229',
    country: 'PH',
  },
}

export const PAGES = [
  {
    path: '/',
    name: 'Home',
    title: `Software Development & System Integration | ${BRAND}`,
    description:
      'One Over Zero builds software and handles system integration, cloud, security and IT support for organizations in the Philippines. Talk to our team.',
    share: 'One Over Zero Innovations is a company in the Philippines, that provides development and system integration services that revolves around open-source technologies and enterprise solutions to help organizations achieve operational efficiency. ',
  },
  {
    path: '/about-us',
    name: 'About Us',
    title: `About ${BRAND} | Technology Company in the Philippines`,
    description:
      'Meet One Over Zero, a Philippines-based technology company founded in 2017. We build open-source and enterprise software, and support what we deliver.',
    share: 'A technology company in the Philippines that builds software and supports the systems behind it.',
  },
  {
    path: '/services',
    name: 'Services',
    title: `Software, Cloud, Security & IT Services | ${BRAND}`,
    description:
      'Software development, CMS, cloud, data centers, networking, cybersecurity, digital marketing and ongoing IT support from one Philippine team.',
    share: 'Software, infrastructure, security and ongoing support from one team.',
  },
  {
    path: '/products',
    name: 'Products',
    title: `Our Products: HRIS, POS, Booking & AR Games | ${BRAND}`,
    description:
      'Explore products built by One Over Zero: an HRIS and payroll system, a POS, a booking platform, AR and mobile games, and a 3D avatar lounge.',
    share: 'A look at the apps, games and platforms we have built.',
  },
  {
    path: '/contact',
    name: 'Contact',
    title: `Contact ${BRAND} | Book a Consultation in Makati`,
    description:
      'Tell us about your project. Contact One Over Zero in Legazpi Village, Makati, by form or at support@oneoverzero.com.ph to book a consultation.',
    share: 'Tell us about your project and our team will get back to you shortly.',
  },
  {
    path: '/faq',
    name: 'FAQ',
    title: `FAQ: Timelines, Pricing & Support | ${BRAND}`,
    description:
      'Answers about getting started, project timelines, pricing, support after launch and working with your existing systems at One Over Zero.',
    share: 'Answers to common questions about getting started, timelines, pricing and support.',
  },
  {
    path: '/404',
    name: 'Page not found',
    title: `Page not found | ${SITE_NAME}`,
    description: "This page can't be found.",
    notFound: true,
  },
]

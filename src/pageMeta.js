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
    region: 'Metro Manila',
    country: 'PH',
  },
}

export const PAGES = [
  {
    path: '/',
    name: 'Home',
    title: `${SITE_NAME} | Defining Infinite Possibilities`,
    description:
      'One Over Zero builds software and handles system integration, cloud, security and IT support for organizations in the Philippines. Talk to our team.',
    share: 'One Over Zero Innovations is a company in the Philippines that provides software development and system integration services to help organizations achieve operational efficiency.',
  },
  {
    path: '/about',
    name: 'About',
    title: `About Us | ${SITE_NAME}`,
    description:
      'One Over Zero is a technology company in the Philippines founded in 2017. We build software and support what we deliver.',
    share: 'One Over Zero is a technology company in the Philippines that builds software and supports the systems behind it.',
  },
  {
    path: '/services',
    name: 'Services',
    title: `Services | ${SITE_NAME}`,
    description:
      'Software development, CMS, cloud, data centers, networking, cybersecurity, digital marketing and ongoing IT support from one Philippine team.',
    share: 'Software, infrastructure, security and ongoing support from one team.',
  },
  {
    path: '/work',
    name: 'Products',
    title: `Our Products | ${SITE_NAME}`,
    description:
      'Explore products built by One Over Zero: an HRIS and payroll system, a POS, a booking platform, AR and mobile games, and a 3D avatar lounge.',
    share: 'A look at the apps, games and platforms we have built.',
  },
  {
    path: '/contact',
    name: 'Contact',
    title: `Contact Us | ${SITE_NAME}`,
    description:
      'Tell us about your project. Contact One Over Zero in Metro Manila, by form or at support@oneoverzero.com.ph to book a consultation.',
    share: 'Tell us about your project and our team will get back to you shortly.',
  },
  {
    path: '/faq',
    name: 'FAQ',
    title: `Frequently Asked Questions | ${SITE_NAME}`,
    description:
      'Answers about getting started, project timelines, pricing, support after launch and working with your existing systems at One Over Zero.',
    share: 'Answers to common questions about getting started, timelines, pricing and support.',
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'How One Over Zero Innovations collects, uses and protects your personal information under the Data Privacy Act of 2012 (RA 10173) of the Philippines.',
  },
  {
    path: '/cookie-policy',
    name: 'Cookie Policy',
    title: `Cookie Policy | ${SITE_NAME}`,
    description:
      'Which cookies the One Over Zero Innovations website uses, why, and how you can accept, reject or change your cookie choices at any time.',
  },
  {
    path: '/404',
    name: 'Page not found',
    title: `Page Not Found | ${SITE_NAME}`,
    description: "This page can't be found.",
    notFound: true,
  },
]

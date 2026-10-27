// Every page in one place: its address, plus the text for the browser tab, search results and link previews.
// The build turns index.html into one HTML file per entry (see vite.config.js), so nothing else needs editing to add or rename a page.
//
// - title:       browser tab and search result title
// - description: search result snippet
// - share:       text under the title in a link preview (Discord, Facebook, LinkedIn). Leave it out for pages that shouldn't have a preview.
// - notFound:    the page shown for unknown addresses (it is not a route of its own)

export const SITE_NAME = 'One Over Zero Innovations'

// Tells search engines not to list the site. Set to false when you are ready to launch.
export const NOINDEX = true

export const PAGES = [
  {
    path: '/',
    title: `${SITE_NAME} | Defining Infinite Possibilities`,
    description:
      'Founded in 2017, One Over Zero Innovations provides development and system integration services built around open-source technologies and enterprise solutions.',
    share: 'Software development and system integration services built around open-source technologies and enterprise solutions.',
  },
  {
    path: '/about-us',
    title: `About Us | ${SITE_NAME}`,
    description:
      'Learn about One Over Zero Innovations, a Makati-based technology company founded in 2017 that builds software and supports the systems behind it.',
    share: 'A Makati-based technology company founded in 2017, building software and supporting the systems behind it.',
  },
  {
    path: '/services',
    title: `Services | ${SITE_NAME}`,
    description:
      'Software development, content management, infrastructure, security, cloud, data centers and ongoing support, all from one team at One Over Zero Innovations.',
    share: 'Software, infrastructure, security and ongoing support from one team.',
  },
  {
    path: '/products',
    title: `Products | ${SITE_NAME}`,
    description:
      'A look at the apps, games and platforms built by One Over Zero Innovations, from HR systems and booking platforms to AR games and 3D spaces.',
    share: 'A look at the apps, games and platforms we have built.',
  },
  {
    path: '/contact',
    title: `Contact Us | ${SITE_NAME}`,
    description: 'Get in touch with One Over Zero Innovations. Tell us about your project, or visit our office in Legazpi Village, Makati.',
    share: 'Tell us about your project and our team will get back to you shortly.',
  },
  {
    path: '/faq',
    title: `FAQ | ${SITE_NAME}`,
    description: 'Answers to common questions about working with One Over Zero Innovations: getting started, timelines, pricing, support and more.',
    share: 'Answers to common questions about getting started, timelines, pricing and support.',
  },
  {
    path: '/404',
    title: `Page not found | ${SITE_NAME}`,
    description: "This page can't be found.",
    notFound: true,
  },
]

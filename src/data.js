import { ORG } from './pageMeta.js'
import { PROJECT_LIST } from './siteData.js'

// Public profiles. An empty address is not shown in the footer. The LinkedIn address is set in pageMeta.js.
export const SOCIAL = {
  linkedin: ORG.linkedin,
}

// Every header link is a real page (see src/routes.js). The landing page repeats some of them as sections.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/work' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
]

// Kept in siteData.js so the build can read it too (see src/seo.js)
export { PROCESS_STEPS, SERVICES, EGOV } from './siteData.js'

// Kept in faqData.js so the build can read it too (see src/seo.js)
export { FAQS } from './faqData.js'


export const STATS = [
  { value: 100, suffix: '+', label: 'Companies and Organizations Served' },
  { value: 93, suffix: '%', label: 'Client Retention' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 24, suffix: '/7', label: 'Managed Service' },
]

export const PRODUCTS = [
  {
    "name": "10 Hours",
    "groups": [
      {
        "title": "HRIS (Human Resource Information System)",
        "items": [
          "Timesheet",
          "Time in/out",
          "Leave approvals",
          "Project Utilization",
          "Payroll"
        ]
      },
      {
        "title": "Sales Forecast Tool",
        "items": [
          "Project status",
          "Project history",
          "Project on/off boarding",
          "Project Payment status"
        ]
      }
    ]
  },
  {
    "name": "Avatar 3D Lounge",
    "groups": []
  },
  {
    "name": "AR Games",
    "groups": [
      {
        "title": "Games",
        "items": [
          "Coin Catch",
          "Number Touch"
        ]
      }
    ]
  }
]

// The products and projects shown on the Products page: the shared list, with each screenshot's address added.
export const PROJECTS = PROJECT_LIST.map(({ file, ...p }) => ({
  ...p,
  type: 'web',
  ...(file ? { src: `${import.meta.env.BASE_URL}projects/${file}` } : {}),
}))

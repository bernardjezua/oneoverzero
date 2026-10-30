import { ORG } from './pageMeta.js'

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

export const PROCESS_STEPS = [
  { icon: 'chat', title: 'Discuss', text: 'We listen to your goals, your challenges and your timeline, and ask the questions that shape the project.' },
  { icon: 'plan', title: 'Plan', text: 'We scope the work and send a clear proposal with the approach, timeline and cost.' },
  { icon: 'code', title: 'Build', text: 'Our team designs and develops your solution, sharing progress along the way so there are no surprises.' },
  { icon: 'rocket', title: 'Launch', text: 'We test, deploy and hand everything over, with training so your team is ready on day one.' },
  { icon: 'headset', title: 'Support', text: 'Once your project is live, we keep it running, fix issues quickly and add improvements as your needs grow.' },
]

// Kept in faqData.js so the build can read it too (see src/seo.js)
export { FAQS } from './faqData.js'


export const STATS = [
  { value: 60, suffix: '+', label: 'Companies and Organizations Served' },
  { value: 93, suffix: '%', label: 'Client Retention' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 24, suffix: '/7', label: 'System Maintenance and Support' },
]

export const SERVICES = [
  {
    id: "web",
    title: "Software Development",
    icon: "code",
    summary: "Websites, web apps, mobile apps and e-commerce stores.",
    ideal: "You need a software tool built around how your business works.",
    example: "A distributor replaces its order spreadsheets with a web app the sales team uses on their phones.",
    items: [
      {
        name: "Website Application",
        desc: "Responsive web platforms, portals and internal tools, including e-government services for local government units.",
      },
      {
        name: "Mobile Application",
        desc: "iOS and Android apps for customers and field teams, built for speed and reliability.",
      },
      {
        name: "e-Commerce",
        desc: "Online stores, booking systems and point-of-sale tools that connect to your operations.",
      },
    ],
  },
  {
    id: "dc",
    title: "Data Center Fit-out",
    icon: "server",
    summary: "Design and full build-out of data centers.",
    ideal: "You are building a new server room, or upgrading one that has outgrown its power, cooling or cabling.",
    example: "A company moves its servers out of a storage room into a proper facility with contained airflow, labeled cabling and badge-controlled access.",
    items: [
      {
        name: "Data Center Design and Fit-out",
        desc: "Layout, power and cooling planning through to full build-out of new or upgraded facilities.",
      },
      {
        name: "Aisle containment",
        desc: "Hot and cold aisle enclosures that improve airflow and cut cooling costs.",
      },
      {
        name: "Structured cabling",
        desc: "Neatly routed, labeled and tested copper and fiber cabling.",
      },
      {
        name: "CCTV and door access control",
        desc: "Camera coverage plus NFC, biometric and facial recognition entry with audit trails.",
      },
    ],
  },
  {
    id: "chain",
    title: "Blockchain",
    icon: "link",
    summary: "Blockchain solutions and NFT concept design.",
    ideal: "You want to explore blockchain or digital collectibles and need a clear concept before you build.",
    example: "A brand commissions character and environment art for an NFT collection before deciding how to launch it.",
    items: [
      {
        name: "NFT Concept Design",
        desc: "Character, environment and 3D model concept art for NFT collections.",
      },
    ],
  },
  {
    id: "infra",
    title: "Infrastructure and Networking",
    icon: "plug",
    summary: "Servers, SDN and network setup.",
    ideal: "You are adding servers or reworking your network, and want it set up once and set up right.",
    example: "A growing office replaces its aging switches and gets new servers delivered configured and tested before go-live.",
    items: [
      {
        name: "Server fulfillment",
        desc: "Dell, HP and Lenovo servers sourced and delivered for your workload.",
      },
      {
        name: "Server configuration",
        desc: "Firmware, storage and OS installation, with diagnostics, before go-live.",
      },
      {
        name: "Software Defined Networking",
        desc: "Centrally managed, programmable networks that are faster to change.",
      },
      {
        name: "Network setup and assessment",
        desc: "Configuration of switching, routing and wireless, plus health checks with clear recommendations.",
      },
    ],
  },
  {
    id: "game",
    title: "Custom Game Development",
    icon: "game",
    summary: "2D/3D games, AR games and interactive 3D spaces.",
    ideal: "You want to engage customers or event visitors with something they can play or explore.",
    example: "A campaign team launches a browser-based AR game that visitors play on their own phones at an event.",
    items: [
      {
        name: "2D/3D Games",
        desc: "Casual mobile and web games built to run well on phones and browsers.",
      },
      {
        name: "AR Games",
        desc: "Web-based augmented reality games such as Coin Catch and Number Touch.",
      },
      {
        name: "Avatar 3D Lounge",
        desc: "A shared 3D space where people meet and explore virtual exhibitions.",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Implementation",
    icon: "cloud",
    summary: "Private cloud on VMware and OpenStack, plus big data.",
    ideal: "You want to consolidate servers or run your own private cloud instead of renting capacity.",
    example: "An organization virtualizes a rack of aging servers on VMware and manages them from one console.",
    items: [
      {
        name: "VMware",
        desc: "Virtualized environments for consolidating servers and simplifying management.",
      },
      {
        name: "OpenStack",
        desc: "Vanilla, HP Helion and Red Hat OpenStack private clouds.",
      },
      {
        name: "Big Data",
        desc: "Hadoop on Cloudera, Hortonworks, MapR or GreenPlum.",
      },
    ],
  },
  {
    id: "container",
    title: "Container Solutions",
    icon: "container",
    summary: "Containerized apps that deploy and scale consistently.",
    ideal: "Your apps behave differently from one environment to the next, or releases feel slow and risky.",
    example: "A development team packages its app into containers, so the version that passed testing is the one that goes live.",
    items: [
      {
        name: "Containerization",
        desc: "Packaging applications into containers for consistent, portable deployments.",
      },
    ],
  },
  {
    id: "cs",
    title: "Customer Service",
    icon: "headset",
    summary: "Live chat and AI chatbots, available around the clock.",
    ideal: "Customers expect quick answers, and your team can't be online around the clock.",
    example: "A chatbot answers common questions overnight and hands complex cases to a live agent in the morning.",
    items: [
      {
        name: "Agent based customer service",
        desc: "Live chat with routing, history and handover to a real person.",
      },
      {
        name: "Conversational AI / Chatbots",
        desc: "An AI assistant trained on your content that answers questions and escalates complex cases.",
      },
    ],
  },
  {
    id: "sec",
    title: "Cybersecurity",
    icon: "shield",
    summary: "Assessments, penetration testing, SIEM and monitoring.",
    ideal: "You want to know where your systems are exposed before someone else finds out.",
    example: "A company runs a penetration test, gets the findings ranked by severity, then adds SIEM monitoring to catch what comes next.",
    items: [
      {
        name: "Vulnerability Assessment",
        desc: "Systematic scanning for known weaknesses, ranked by severity.",
      },
      {
        name: "Penetration Testing",
        desc: "Controlled attack simulations to prove what is exploitable.",
      },
      {
        name: "SIEM via Splunk or Elastic",
        desc: "Log collection and correlation for threat detection and compliance.",
      },
      {
        name: "Command Center",
        desc: "Monitoring and managed services for your systems.",
      },
    ],
  },
  {
    id: "cms",
    title: "Content Management Systems",
    icon: "layout",
    summary: "Easy-to-update websites on WordPress or a custom CMS.",
    ideal: "Your team needs to update the website without waiting on a developer.",
    example: "A communications team publishes its own news and event pages, with an approval step before anything goes live.",
    items: [
      {
        name: "CMS website development",
        desc: "Websites built on WordPress or a custom CMS, designed around how your team publishes.",
      },
      {
        name: "Custom CMS",
        desc: "Tailor-made admin panels with roles, approvals and content workflows.",
      },
      {
        name: "Migration and training",
        desc: "Moving existing content to a new CMS, with hands-on training for your editors.",
      },
    ],
  },
  {
    id: "marketing",
    title: "Analytics and Digital Marketing",
    icon: "chart",
    summary: "Ads, SEO, social campaigns and sentiment analytics.",
    ideal: "You want more of the right visitors, and a clear view of what is working.",
    example: "A retailer runs search and social campaigns, then uses sentiment reports to shape the next one.",
    items: [
      {
        name: "Google and Facebook Ads, SEO/SEM",
        desc: "Paid campaigns and search optimization that bring the right visitors to your site.",
      },
      {
        name: "Social Media Campaigns",
        desc: "Planned content and campaigns that grow your audience and keep them engaged.",
      },
      {
        name: "Sentiment Analytics",
        desc: "Social media listening that shows how people feel about your brand and your campaigns.",
      },
    ],
  },
  {
    id: "maint",
    title: "Maintenance and Support",
    icon: "wrench",
    summary: "Updates, backups and support to keep everything running.",
    ideal: "Your systems are live and you want someone accountable for keeping them healthy.",
    example: "An agency puts its sites and servers under a support agreement with defined response times and a dedicated contact.",
    items: [
      {
        name: "Application maintenance",
        desc: "Bug fixes, security patches, updates and small enhancements for your sites and apps.",
      },
      {
        name: "Infrastructure support",
        desc: "Routine checks, backups and troubleshooting for servers, networks and cloud environments.",
      },
      {
        name: "Support agreements",
        desc: "Service-level agreements with defined response times and dedicated contacts.",
      },
    ],
  },
];

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

export const PROJECTS = [
  {
    name: '10 Hours: HRIS',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/hris.jpg`,
    desc: 'Human resource information system for managing time, leave and payroll.',
    tags: ['Timesheet', 'Time in/out', 'Leave approvals', 'Payroll'],
  },
  {
    name: 'Customized POS',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/pos.jpg`,
    desc: 'A point-of-sale web app for food and beverage, with menu, order list and reports.',
    tags: ['Web app', 'POS', 'Orders'],
  },
  {
    name: 'Booking System',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/booking.jpg`,
    desc: 'Mobile booking platform connecting customers, agencies and service workers.',
    tags: ['Mobile', 'Booking', 'Payments'],
  },
  {
    name: 'Avatar 3D Lounge',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/avatar-lounge.jpg`,
    desc: 'A shared 3D space where people meet and explore virtual exhibitions as avatars.',
    tags: ['3D', 'Avatars', 'Virtual events'],
  },
  {
    name: 'AR Games: Number Touch',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/number-touch.jpg`,
    desc: 'A web-based AR game that tracks your movements and rewards quick, accurate touches.',
    tags: ['AR', 'Web game'],
  },
  {
    name: 'AR Games: Coin Catch',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/coin-catch.jpg`,
    desc: 'A web-based AR game about catching coins in the air with your hands.',
    tags: ['AR', 'Web game'],
  },
  {
    name: '2D/3D Games',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/game-candy.jpg`,
    desc: 'Casual mobile and web games, from bubble shooters to puzzle and platformers.',
    tags: ['2D', '3D', 'Mobile games'],
  },
  {
    name: 'NFT Concept Design',
    type: 'web',
    src: `${import.meta.env.BASE_URL}projects/nft-kaiju.jpg`,
    desc: 'Character and environment concept art for NFT collections, created by Dave Yap.',
    tags: ['NFT', 'Concept art', '3D models'],
  },
]

// PLACEHOLDER (preview site only): every quote and name below is made up. Replace with real, approved client quotes before going live.
// Shown in a slider, three at a time (two on tablets, one on phones); the arrows move a whole page. Nine fills three pages on desktop. `caseStudy` (a link) is optional: without it there is no "Read the case study" link.
export const TESTIMONIALS = [
  {
    quote: 'Our old system kept breaking. They rebuilt it on open-source tools and it has run smoothly ever since. Truly amazing work.',
    name: 'Juan Dela Cruz',
    role: 'Operations Head',
    company: 'Luzon Health Partners',
  },
  {
    quote: 'I have worked with the One Over Zero team on two projects now, and both times they were easy to work with, clear and always on time.',
    name: 'Maria Santos',
    role: 'IT Manager',
    company: 'Bayanihan Logistics Corp.',
  },
  {
    quote: 'They explained everything in plain language and never made us feel lost. Even after launch, they still answer us within the day.',
    name: 'Angelica Reyes',
    role: 'Project Director',
    company: 'Pinoy Insure Group',
  },
  { quote: 'They delivered ahead of schedule and the platform has scaled without a hitch.', name: 'Client Name', role: 'CTO', company: 'Company Name' },
  { quote: 'Security reviews used to be a fire drill. Now we have continuous visibility.', name: 'Client Name', role: 'IT Director', company: 'Company Name' },
  { quote: 'One team handled our cabling, cloud and applications. That simplicity is rare.', name: 'Client Name', role: 'Founder', company: 'Company Name' },
  { quote: 'Their team understood our systems from day one, and the handover was smooth.', name: 'Client Name', role: 'Head of IT', company: 'Company Name' },
  { quote: 'We moved our infrastructure to the cloud with almost no downtime.', name: 'Client Name', role: 'Operations Manager', company: 'Company Name' },
  { quote: 'Support is quick, and they fix the root cause, not just the symptom.', name: 'Client Name', role: 'Systems Administrator', company: 'Company Name' },
]


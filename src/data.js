// NOTE: Items marked PLACEHOLDER are sample content for layout purposes.
// Replace with real client names, quotes and verified metrics before launch.

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#work' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

const logo = (file) => `${import.meta.env.BASE_URL}logos/${file}`
export const CLIENT_LOGOS = [
  { name: 'Ayala Enterprise Circle', src: logo('ayala-enterprise-circle.png') },
  { name: 'Manila Doctors Hospital', src: logo('manila-doctors-hospital.png') },
  { name: 'DICT', src: logo('dict.png') },
  { name: 'UP Fighting Maroons', src: logo('fighting-maroons.png') },
  { name: '30th SEA Games 2019', src: logo('sea-games-2019.png') },
  { name: 'Municipality of Catarman', src: logo('catarman.png') },
  { name: 'Meralco', src: logo('meralco.png') },
  { name: 'Asia Select', src: logo('asia-select.png') },
  { name: 'Pacific Union Insurance', src: logo('pacific-union.png') },
  { name: 'Artkipelago', src: logo('artkipelago.png') },
  { name: 'Philippine Basketball Association', src: logo('pba.png') },
  { name: 'Inter-Ed', src: logo('inter-ed.png') },
  { name: 'Asia Peopleworks', src: logo('asia-peopleworks.png') },
  { name: 'Bughaw Digital', src: logo('bughaw-digital.png') },
  { name: 'Beebeelee', src: logo('beebeelee.png') },
  { name: '4th Wall', src: logo('4th-wall.png') },
  { name: 'myanteroom', src: logo('myanteroom.png') },
  { name: 'TNT Katropa', src: logo('tnt-katropa.png') },
  { name: 'Bacoor City Strikers', src: logo('bacoor-strikers.png') },
  { name: 'ZMG Ward Howell', src: logo('zmg-ward-howell.png') },
  { name: 'Outbound Asia', src: logo('outbound-asia.png') },
  { name: '11th Asian Age Group Championships', src: logo('new-clark-city.png') },
  { name: 'Live Philippines', src: logo('live-philippines.png') },
  { name: 'Vertere', src: logo('vertere.png') },
  { name: 'Vibal Group', src: logo('vibal.png') },
  { name: 'Phirst Park Homes', src: logo('phirst-park-homes.png') },
  { name: 'Phirst Editions', src: logo('phirst-editions.png') },
  { name: 'Phirst Centrale', src: logo('phirst-centrale.png') },
  { name: 'Phirst Sights', src: logo('phirst-sights.png') },
  { name: 'Shoot360 Philippines', src: logo('shoot360.png') },
  { name: 'A7 Recruitment', src: logo('a7-recruitment.png') },
  { name: 'Philcox Philippines', src: logo('philcox.png') },
]


export const STATS = [
  { value: 30, suffix: '+', label: 'Direct Clients Across Industries' },
  { value: 90, suffix: '%', label: 'Client Retention' },
  { value: 10, suffix: '', label: 'Years of Experience' },
  { value: 24, suffix: '/7', label: 'System Maintenance and Support' },
]

export const SERVICES = [
  {
    id: "web",
    title: "Software Development",
    icon: "code",
    summary: "Websites, web apps, mobile apps and online stores.",
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
      {
        name: "Analytics and Digital Marketing",
        desc: "Google and Facebook ads, SEO/SEM, social media campaigns and sentiment analytics.",
      },
    ],
  },
  {
    id: "dc",
    title: "Data Center Fit-out",
    icon: "server",
    summary: "Design and full build-out of data centers.",
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
    id: "maint",
    title: "Maintenance and Support",
    icon: "wrench",
    summary: "Updates, backups and support to keep everything running.",
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

// PLACEHOLDER: replace with real, approved client quotes
export const TESTIMONIALS = [
  { quote: 'They delivered ahead of schedule and the platform has scaled without a hitch.', name: 'Client Name', role: 'CTO, Company' },
  { quote: 'Security reviews used to be a fire drill. Now we have continuous visibility.', name: 'Client Name', role: 'IT Director, Company' },
  { quote: 'One team handled our cabling, cloud and applications. That simplicity is rare.', name: 'Client Name', role: 'Founder, Company' },
]

// NOTE: Items marked PLACEHOLDER are sample content for layout purposes.
// Replace with real client names, quotes and verified metrics before launch.

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Client Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

// PLACEHOLDER: set src to a real logo file (use `${import.meta.env.BASE_URL}logos/acme.svg` so it works under /oneoverzero/) to replace each placeholder glyph
export const CLIENT_LOGOS = Array.from({ length: 12 }, (_, i) => ({ name: `Client ${i + 1}`, src: null }))

export const STATS = [
  { value: 50, suffix: '+', label: 'Enterprise Clients & Tech Partners' },
  { value: 90, suffix: '%', label: 'Client Retention' },
  { value: 10, suffix: '+', label: 'Custom Enterprise Platforms Launched' },
  { value: 24, suffix: '/7', label: 'Managed Infrastructure & Security Operations' },
]

export const SERVICES = [
  {
    id: 'dev',
    title: 'Software Development',
    icon: 'code',
    summary:
      'Custom websites, mobile apps and games, built around how your business works.',
    items: [
      { name: 'Website Application', desc: 'Responsive web platforms, portals and internal tools with clean interfaces, secure back ends and integrations into your existing systems.' },
      { name: 'Mobile Application', desc: 'iOS and Android apps for customers and field teams, designed for speed, reliability and a smooth day-to-day experience.' },
      { name: 'Game Development', desc: 'Interactive 2D, 3D and AR experiences for marketing, training and entertainment, built to run well on phones and the web.' },
    ],
  },
  {
    id: 'cmd',
    title: 'Command Center',
    icon: 'radar',
    summary:
      'Round-the-clock monitoring and managed services for your systems.',
    items: [
      { name: 'Monitoring', desc: 'Continuous visibility into servers, networks, applications and sites, with dashboards and alerts that point to the real problem.' },
      { name: 'Managed Services', desc: 'We run day-to-day operations for you: patching, incident response, backups and routine maintenance, so your team can focus on the business.' },
    ],
  },
  {
    id: 'sec',
    title: 'Security',
    icon: 'shield',
    summary:
      'Vulnerability assessments, penetration testing and SIEM through Splunk or Elastic.',
    items: [
      { name: 'Vulnerability Assessment', desc: 'Systematic scanning of systems, applications and networks to uncover known weaknesses, ranked by severity with remediation guidance.' },
      { name: 'Penetration Testing', desc: 'Controlled, real-world attack simulations by our security engineers to prove what is exploitable and how far an intruder could get.' },
      { name: 'SIEM via Splunk or Elastic', desc: 'Centralized log collection and correlation that turns raw events into threat detection, investigation and compliance reporting.', sub: ['Splunk', 'Elastic'] },
    ],
  },
  {
    id: 'dc',
    title: 'Data Center',
    icon: 'server',
    summary:
      'Data center design and fit-out, structured cabling, aisle containment, CCTV and access control.',
    items: [
      { name: 'CCTV setup', desc: 'Camera planning, installation and recording for full coverage of racks, entrances and critical areas.' },
      { name: 'Door access control', desc: 'Role-based entry with audit trails, so you know who accessed which space and when.' },
      { name: 'NFC/Biometrics', desc: 'Card, fingerprint and similar credentials for fast, secure authentication at doors and cabinets.' },
      { name: 'Facial Recognition', desc: 'Hands-free identity verification for high-security zones, integrated with your access control.' },
      { name: 'Data Center Design and Fit out', desc: 'Layout, power and cooling planning through to full build-out of new or upgraded facilities.' },
      { name: 'Aisle containment', desc: 'Hot and cold aisle enclosures that improve airflow, cut cooling costs and keep equipment within safe temperatures.' },
      { name: 'Structured cabling', desc: 'Neatly routed, labeled and tested copper and fiber cabling that scales and is easy to troubleshoot.' },
    ],
  },
  {
    id: 'mkt',
    title: 'Analytics and Digital Marketing',
    icon: 'chart',
    summary:
      'Google and Facebook ads, SEO/SEM, social media campaigns and sentiment analytics.',
    items: [
      { name: 'Google/FB Ads, SEO/SEM', desc: 'Search and social advertising plus search optimization to bring qualified traffic to your site, with reporting tied to results.' },
      { name: 'Sentiments Analytics (Social Media)', desc: 'Analysis of public conversations about your brand and products to reveal trends, concerns and opportunities.' },
      { name: 'Social Media Campaigns', desc: 'Planned content and campaigns across major platforms that build awareness and keep your audience engaged.' },
    ],
  },
  {
    id: 'chat',
    title: 'Chatbox',
    icon: 'bot',
    summary:
      'Live agent chat and AI-powered chatbots for customer service.',
    items: [
      { name: 'Agent based customer service', desc: 'Live chat for your support team with routing, conversation history and handover, so customers reach a real person when they need one.' },
      { name: 'Chatbot with artificial intelligence', desc: 'An AI assistant trained on your content that answers questions, guides users and passes complex cases to your agents.' },
    ],
  },
  {
    id: 'net',
    title: 'Networking',
    icon: 'plug',
    summary:
      'Software-defined networking, network setup and configuration, and assessments.',
    items: [
      { name: 'Software Defined Networking', desc: 'Centrally managed, programmable networks that make changes faster and traffic policies easier to enforce.' },
      { name: 'Network Configuration and setup', desc: 'Switching, routing, wireless and firewall deployment, configured to best practice and documented for your team.' },
      { name: 'Network assessment', desc: 'A health check of your current network covering performance, security and capacity, with a clear list of recommendations.' },
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure',
    icon: 'cube',
    summary:
      'Server supply from Dell, HP and Lenovo, plus configuration, OS installation and diagnostics.',
    items: [
      { name: 'Server fulfillment', desc: 'Sourcing and delivery of enterprise servers sized for your workload.', sub: ['Dell', 'HP', 'Lenovo'] },
      { name: 'Server configuration', desc: 'Firmware, storage, RAID and network settings prepared to your specifications before go-live.' },
      { name: 'OS installation', desc: 'Operating system deployment and hardening so machines are ready for production use.' },
      { name: 'Diagnostic', desc: 'Hardware and system troubleshooting to find the root cause of faults and restore stable operation.' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Solution',
    icon: 'cloud',
    summary:
      'Private cloud on VMware and OpenStack, including Red Hat and HP Helion.',
    items: [
      { name: 'VMWare', desc: 'Virtualized environments for consolidating servers, improving availability and simplifying management.' },
      { name: 'Vanilla OpenStack', desc: 'Open-source private cloud built on upstream OpenStack for maximum flexibility and no vendor lock-in.' },
      { name: 'HP Helion OpenStack', desc: 'A supported, enterprise-ready OpenStack distribution from HP for production private clouds.' },
      { name: 'Red Hat OpenStack', desc: 'A commercially supported OpenStack platform from Red Hat, backed by a mature ecosystem and long-term support.' },
    ],
  },
  {
    id: 'bigdata',
    title: 'Big Data Solution',
    icon: 'target',
    summary:
      'Hadoop platforms on Cloudera, Hortonworks, MapR and GreenPlum.',
    items: [
      { name: 'Hadoop', desc: 'Distributed storage and processing for very large datasets, deployed on the distribution that suits your needs.', sub: ['Cloudera', 'Hortonworks', 'MapR', 'GreenPlum'] },
    ],
  },
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

// PLACEHOLDER: add app screenshots to public/projects/ and set src (use `${import.meta.env.BASE_URL}projects/hris.png` so it works under /oneoverzero/)
export const PROJECTS = [
  {
    name: '10 Hours: HRIS',
    type: 'web',
    src: null,
    desc: 'Human resource information system for managing time, leave and payroll.',
    tags: ['Timesheet', 'Time in/out', 'Leave approvals', 'Payroll'],
  },
  {
    name: '10 Hours: Sales Forecast Tool',
    type: 'web',
    src: null,
    desc: 'Tracks projects from onboarding to payment so the sales pipeline stays visible.',
    tags: ['Project status', 'Project history', 'Payment status'],
  },
  {
    name: 'Avatar 3D Lounge',
    type: 'web',
    src: null,
    desc: 'A shared 3D space where people meet and interact as avatars.',
    tags: ['3D', 'Avatars'],
  },
  {
    name: 'AR Games: Coin Catch',
    type: 'mobile',
    src: null,
    desc: 'An augmented reality mobile game about catching coins in the real world.',
    tags: ['AR', 'Mobile game'],
  },
  {
    name: 'AR Games: Number Touch',
    type: 'mobile',
    src: null,
    desc: 'An augmented reality number game that rewards quick, accurate taps.',
    tags: ['AR', 'Mobile game'],
  },
]

// PLACEHOLDER: replace with real, approved client quotes
export const TESTIMONIALS = [
  { quote: 'They delivered ahead of schedule and the platform has scaled without a hitch.', name: 'Client Name', role: 'CTO, Company' },
  { quote: 'Security reviews used to be a fire drill. Now we have continuous visibility.', name: 'Client Name', role: 'IT Director, Company' },
  { quote: 'One team handled our cabling, cloud and applications. That simplicity is rare.', name: 'Client Name', role: 'Founder, Company' },
]

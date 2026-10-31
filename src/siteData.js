// Plain data about what the company does, shared by the site and the build.
// No imports and no import.meta here: the build (vite.config.js, src/seo.js, src/prerender.js) reads this file in plain Node
// to write the structured data, the crawler-readable page text and llms.txt, so it all stays in step with what is on screen.


export const PROCESS_STEPS = [
  { icon: 'chat', title: 'Discuss', text: 'We listen to your goals, your challenges and your timeline, and ask the questions that shape the project.' },
  { icon: 'plan', title: 'Plan', text: 'We scope the work and send a clear proposal with the approach, timeline and cost.' },
  { icon: 'code', title: 'Build', text: 'Our team designs and develops your solution, sharing progress along the way so there are no surprises.' },
  { icon: 'rocket', title: 'Launch', text: 'We test, deploy and hand everything over, with training so your team is ready on day one.' },
  { icon: 'headset', title: 'Support', text: 'Once your project is live, we keep it running, fix issues quickly and add improvements as your needs grow.' },
]


// Each service is one flip card. The front shows `summary`; the back lists `items` (what we offer under it).
// An item is a name plus a short detail.
export const SERVICES = [
  {
    id: "web",
    title: "Software Development",
    icon: "code",
    summary: "Websites, CMS, web apps and mobile apps, launched on the platform that suits you.",
    items: [
      { name: "Websites and web apps", desc: "Business sites, portals, custom tools, dashboards and e-commerce built around how you work." },
      { name: "CMS websites", desc: "WordPress or a custom CMS your team can update, with migration and training." },
      { name: "Mobile apps", desc: "iOS and Android apps for customers and field teams." },
      { name: "Flexible deployment", desc: "WordPress, Vercel, cloud or on-premise: we deploy where you need it." },
    ],
  },
  {
    id: "hosting",
    title: "Managed Hosting",
    icon: "cloud",
    summary: "Hosting that we set up, watch over and keep running for you.",
    items: [
      { name: "Managed hosting solutions", desc: "Hosting plans such as Hostinger, chosen and configured for your site." },
      { name: "Setup and migration", desc: "Moving your site or app to its new home with minimal downtime." },
      { name: "Monitoring and backups", desc: "Uptime checks and regular backups, handled by us." },
    ],
  },
  {
    id: "dc",
    title: "Data Center Fit-out",
    icon: "server",
    summary: "Design and full build-out of data centers, with smart building controls.",
    items: [
      { name: "Design and fit-out", desc: "Layout, power and cooling planning through to full build-out." },
      { name: "Aisle containment", desc: "Hot and cold aisle enclosures that cut cooling costs." },
      { name: "Structured cabling", desc: "Neatly routed, labeled and tested copper and fiber." },
      { name: "CCTV and door access", desc: "Cameras plus NFC, biometric and facial recognition entry." },
      { name: "Building Management System (BMS)", desc: "Wireless IoT sensors and controls for power, cooling and environment." },
    ],
  },
  {
    id: "chain",
    title: "Blockchain",
    icon: "link",
    summary: "Smart contracts, e-wallets and NFT concept design.",
    items: [
      { name: "Smart contracts", desc: "Self-executing agreements, written and tested for your use case." },
      { name: "E-wallet systems", desc: "Digital wallets for holding, sending and receiving value." },
      { name: "NFT concept design", desc: "Character, environment and 3D model art for NFT collections." },
    ],
  },
  {
    id: "infra",
    title: "Infrastructure and Networking",
    icon: "plug",
    summary: "The hardware behind your systems, sourced, configured and delivered.",
    items: [
      { name: "Servers and storage", desc: "Sourced, configured and tested before go-live." },
      { name: "Networking and switches", desc: "Switching, routing and wireless, set up and health-checked." },
      { name: "Firewall and Network Detection and Response", desc: "Protect your network and spot threats inside it." },
    ],
  },
  {
    id: "game",
    title: "Custom Game Development",
    icon: "game",
    summary: "2D/3D, AR and web-based games, plus interactive 3D spaces.",
    items: [
      { name: "2D/3D games", desc: "Casual games built to run well on phones and computers." },
      { name: "Web-based games", desc: "Play straight from the browser, with nothing to install." },
      { name: "AR games", desc: "Augmented reality games such as Coin Catch and Number Touch." },
      { name: "Avatar 3D Lounge", desc: "A shared 3D space for meeting and virtual exhibitions." },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Implementation",
    icon: "cloud",
    summary: "Cloud on your premises or off them, with the data architecture to match.",
    items: [
      { name: "On-premise", desc: "Private cloud in your own facility, such as VMware or OpenStack." },
      { name: "Off-premise", desc: "Hosted and public cloud environments, moved and managed for you." },
      { name: "Data management architecture", desc: "Big data platforms that store, organize and serve your data." },
    ],
  },
  {
    id: "container",
    title: "Container Solutions",
    icon: "container",
    summary: "Containerized apps that deploy and scale consistently.",
    items: [
      { name: "Docker", desc: "Packaging apps so they run the same everywhere." },
      { name: "Migration", desc: "Moving existing apps and services into containers." },
      { name: "Building Docker systems", desc: "Images, registries and multi-container setups for your stack." },
      { name: "Container types", desc: "Application, database and service containers, from one host to a cluster." },
    ],
  },
  {
    id: "cs",
    title: "Customer Service",
    icon: "headset",
    summary: "Human agents, AI and bots, available around the clock.",
    items: [
      { name: "Agent-based (human)", desc: "Live agents with routing, history and handover." },
      { name: "AI-based", desc: "An AI assistant trained on your content that escalates complex cases." },
      { name: "Chatbots and call bots", desc: "Automated answers by chat and by phone, any hour." },
    ],
  },
  {
    id: "sec",
    title: "Cybersecurity",
    icon: "shield",
    summary: "Monitoring, testing and response, from one security team.",
    items: [
      { name: "Managed SOC", desc: "Round-the-clock security monitoring." },
      { name: "SIEM", desc: "Log collection and correlation, via Splunk or Elastic." },
      { name: "SOAR", desc: "Automated response to common threats." },
      { name: "VAPT", desc: "Vulnerability assessment and penetration testing." },
      { name: "EDR", desc: "Endpoint detection and response." },
      { name: "NDR", desc: "Network detection and response." },
    ],
  },
  {
    id: "marketing",
    title: "Analytics and Digital Marketing",
    icon: "chart",
    summary: "Campaigns that reach the right people, and analytics that show what works.",
    items: [
      { name: "Ads, SEO and SEM", desc: "Google and Facebook ads plus search optimization." },
      { name: "Social media campaigns", desc: "Planned content that grows and engages your audience." },
      { name: "Sentiment analysis", desc: "Reads comments and reviews to show how people feel about you." },
      { name: "Social analytics", desc: "Reach, engagement and growth reported across your channels." },
    ],
  },
  {
    id: "maint",
    title: "Maintenance and Support",
    icon: "wrench",
    summary: "Managed service, updates and backups to keep everything running.",
    items: [
      { name: "Managed service", desc: "We run it for you, 24/7: monitoring, upkeep and a team on call." },
      { name: "Application maintenance", desc: "Bug fixes, security patches and small enhancements." },
      { name: "Infrastructure support", desc: "Routine checks, backups and troubleshooting." },
      { name: "Support agreements", desc: "Defined response times and a dedicated contact." },
    ],
  },
];

// E-Government: shown as its own section under What We Offer (see EGov.jsx). It is also an option in the contact form.
// Three groups, one per tab. Each item is a name plus one line.
export const EGOV = {
  id: "egov",
  title: "E-Government Services",
  summary: "Digital systems that help local governments serve the Filipino people, from permits and taxes to citizen portals, backed by secure infrastructure.",
  groups: [
    {
      id: "operations",
      label: "Core operations",
      items: [
        { name: "Business Permits (BPLO)", desc: "Integrated with MENRO and Sanitary services for streamlined processing." },
        { name: "Building Official", desc: "Digital processing for permits, plans and inspections." },
        { name: "Civil Registry", desc: "Secure, accessible management of vital records like birth certificates." },
        { name: "Zoning and Land Use", desc: "Urban planning, land use applications and approvals." },
        { name: "Treasury Operations", desc: "Modernized systems for efficient tax and fee collection." },
        { name: "Real Property Tax", desc: "Simplified assessment and convenient payment options." },
        { name: "CEDULA Issuance", desc: "Faster issuance of community tax certificates through online portals." },
      ],
    },
    {
      id: "portals",
      label: "Citizen portals and systems",
      items: [
        { name: "Incident Response Systems", desc: "Crisis management and communication for public safety." },
        { name: "Rainfall and Flood Early Warning System", desc: "IoT-powered disaster management solution." },
        { name: "Senior Citizen Portal", desc: "Accessible digital services tailored to senior citizens' needs." },
        { name: "DSSD (Social Assistance)", desc: "Efficient, compassionate delivery of social welfare programs." },
        { name: "Digital Procurement System", desc: "More transparency and efficiency in government purchasing." },
        { name: "Inventory System", desc: "Resource tracking and stock management across departments." },
        { name: "Document Management", desc: "Centralized storage, retrieval and version control." },
        { name: "Waste Management", desc: "Digital tracking and management of waste collection and records." },
        { name: "HRIS", desc: "Human resource management, from onboarding to payroll." },
      ],
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      items: [
        { name: "Infrastructure Command Center", desc: "Centralized monitoring and management of digital services." },
        { name: "Data Center Configuration", desc: "Scalable, high-availability server architecture." },
        { name: "Networking and Cloud Security", desc: "Secure, high-performance network with advanced protection." },
        { name: "Disaster Recovery Site", desc: "Off-site replication for continuous service availability." },
        { name: "Fiber and Structured Cabling", desc: "High-bandwidth cabling built for future demand." },
        { name: "Power and Cooling Systems", desc: "Uninterrupted power and optimal environmental controls." },
      ],
    },
  ],
};

// The mission and vision, as plain text. The About page shows the same wording (with key phrases in bold, see MissionVision.jsx), so change both together.
export const MISSION =
  'To design, build, and secure technology solutions that turn our clients’ most ambitious ideas into reliable, compliant, and lasting outcomes, guided by engineering excellence, integrity, and an unwavering commitment to public and enterprise trust.'
export const VISION =
  'To be a globally trusted technology partner for government and enterprise transformation, recognized for turning complexity into secure, citizen-centered, and future-ready systems.'

// The products and projects shown on the Products page. `file` is the screenshot in public/projects (the site adds the base path, see data.js).
export const PROJECT_LIST = [
  { name: 'Just Be You', desc: 'An AI interviewer that helps companies find the right candidates faster by optimizing their candidate searches.', tags: ['AI', 'Talent search', 'Recruitment'], file: 'just-be-you.png' },
  { name: '10 Hours: HRIS', desc: 'Human resource information system for managing time, leave and payroll.', tags: ['Timesheet', 'Time in/out', 'Leave approvals', 'Payroll'], file: 'hris.jpg' },
  { name: 'Customized POS', desc: 'A point-of-sale web app for food and beverage, with menu, order list and reports.', tags: ['Web app', 'POS', 'Orders'], file: 'pos.jpg' },
  { name: 'Booking System', desc: 'Mobile booking platform connecting customers, agencies and service workers.', tags: ['Mobile', 'Booking', 'Payments'], file: 'booking.jpg' },
  { name: 'Avatar 3D Lounge', desc: 'A shared 3D space where people meet and explore virtual exhibitions as avatars.', tags: ['3D', 'Avatars', 'Virtual events'], file: 'avatar-lounge.jpg' },
  { name: 'Games Management System', desc: 'A platform for organizing games, schedules and results in one place.', tags: ['Management', 'Games', 'Web app'] },
]

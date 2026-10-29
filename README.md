# One Over Zero Innovations: Company Website

This is the official website of **One Over Zero Innovations, Inc.**, a technology company based in Makati, Philippines, founded in 2017. It presents the company's services, products, the industries it serves, client reviews and how it delivers, and has a contact form for project inquiries.

It is a React 19 + Vite 8 site with plain CSS split into small files, no UI framework and no backend. It is built into plain static files and hosted on Vercel.

## Contents

- [Pages](#pages)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [How the pages are built](#how-the-pages-are-built)
- [Editing content](#editing-content)
- [Styling](#styling)
- [Animations and interactions](#animations-and-interactions)
- [Contact form](#contact-form)
- [Privacy, cookies and consent](#privacy-cookies-and-consent)
- [SEO and link previews](#seo-and-link-previews)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Launch checklist](#launch-checklist)
- [Troubleshooting](#troubleshooting)

## Pages

| Address           | Page           | What it shows                                                                                                  |
| ----------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| `/`               | Home           | Hero, About, "Why Choose 1/0" (industries and stats), services (flip cards), how we deliver, products, reviews (slider), FAQ and the contact section. |
| `/about`          | About          | Company story, stats, scrolling industries, how we deliver and a closing call to action (formerly `/about-us`, which redirects here). |
| `/services`       | Services       | Every service as a card that flips: click a card to see when the service is ideal, with an example.            |
| `/work`           | Products       | Every product and project built by the team (formerly `/products`, which redirects here).                       |
| `/contact`        | Contact        | The inquiry form, a map and the contact details.                                                               |
| `/faq`            | FAQ            | Two-column accordion of common questions.                                                                      |
| `/privacy-policy` | Privacy Policy | Written for the Philippine Data Privacy Act of 2012 (RA 10173).                                                |
| `/cookie-policy`  | Cookie Policy  | The cookies used, consent, and a button that opens Cookie Settings.                                            |
| `/404`            | Not found      | Shown for any unknown address (a real 404 response on Vercel).                                                 |

The header links to Home, About, Services, Products and FAQ, plus a "Contact Us" button that goes to `/contact` (the footer links to every page, including Contact). On the home page the hero buttons go to `/services` and `/work`, and the "Book a Consultation" button under the products description goes to `/contact`. The legal pages are linked from the footer, the cookie banner and the contact form.

## Tech stack

- **React 19** for the interface, **Vite 8** for development and builds, **ESLint 10** for linting.
- **Plain CSS** in `src/styles/`, themed with CSS variables. There is no CSS framework.
- **Fonts** from Google Fonts: Orbitron (headings), Exo 2 and Montserrat (body).
- **Hosting:** Vercel, with clean URLs and no trailing slashes.
- No router, state library or backend. The page shown is chosen from the address in the browser (see below).

## Getting started

### 1. Install a patched Node.js

You need **Node.js 22.23.4** or newer 22.x, **24.22.1** or newer 24.x (recommended, see `.nvmrc`), or **26.12.1** and up. These are the versions that fix the October 21, 2026 Node.js security release (including the Brotli remote code execution flaw, CVE-2026-111497). Older versions, including all of Node 20, are not patched.

`package.json` lists the allowed versions under `engines` and `.npmrc` sets `engine-strict=true`, so installing refuses to run on an unpatched Node.

```bash
nvm install   # reads .nvmrc (24.22.1)
nvm use
node -v       # should print v24.22.1 or newer
```

When Node publishes a newer security release, raise the numbers in `package.json` (`engines`) and `.nvmrc`.

### 2. Get pnpm

The project uses **pnpm** (`pnpm-lock.yaml` is the lockfile). The easiest way is Corepack, which ships with Node:

```bash
corepack enable
pnpm -v
```

If `corepack` is not available, install pnpm with `npm install -g pnpm`.

### 3. Run the app

```bash
pnpm install   # once, and again whenever package.json changes
pnpm dev       # starts the dev server
```

Vite prints the local address (usually `http://localhost:5173`). Pages hot-reload as you edit. Stop the server with `Ctrl+C`.

To check the real production output:

```bash
pnpm build     # writes the site to dist/
pnpm preview   # serves dist/ locally (usually http://localhost:4173)
```

Before committing:

```bash
pnpm lint
pnpm build
```

> **npm works too.** Every `pnpm <script>` below can be run as `npm run <script>` (for example `npm install`, `npm run dev`). Stick to one tool per checkout so the lockfiles stay in sync.

> **Working from WSL on Windows?** Keep the project inside the Linux file system (for example `~/oneoverzero`) and run pnpm from a WSL terminal. Running Node from Windows against `\\wsl.localhost\...` paths is slow and unreliable.

## Scripts

| Command        | What it does                                                               |
| -------------- | -------------------------------------------------------------------------- |
| `pnpm dev`     | Starts the development server with hot reload.                             |
| `pnpm build`   | Builds the site into `dist/` and prints warnings about title/text lengths. |
| `pnpm preview` | Serves the built `dist/` folder locally.                                   |
| `pnpm lint`    | Runs ESLint over the whole project. Run it before every commit.            |

## Project structure

```
oneoverzero/
├── index.html              Template for every page (tokens are filled in at build time)
├── vite.config.js          Vite config plus the plugin that generates one HTML file per page
├── vercel.json             Clean URLs, no trailing slash, and redirects from old addresses (/products to /work, /about-us to /about)
├── eslint.config.js
├── public/                 Copied as-is: favicon, og-image.png, project images
│   └── projects/           Product / project screenshots
├── archive/                Old assets kept for reference, not used by the site (archive/logos/ holds the client logos: direct-clients/ and subcon-clients/)
└── src/
    ├── main.jsx            Entry point
    ├── App.jsx             Chooses the page, owns cookie-consent state and the cookie banner
    ├── routes.js           Reads the current address and lists the valid routes
    ├── pageMeta.js         Every page's address, title, description and share text (SEO)
    ├── seo.js              Structured data (JSON-LD) for search engines
    ├── data.js             Services, projects, stats, reviews, nav links, social links
    ├── faqData.js          The FAQ questions and answers
    ├── hooks.js            useReveal, useCountUp, useScrollProgress, readConsent, saveConsent
    ├── legalInfo.js        Company name, email, address and "last updated" date used by the legal pages
    ├── validateInquiry.js  Contact form validation rules
    ├── submitInquiry.js    Sends the contact form
    ├── index.css           Only @imports of the files in styles/, in cascade order
    ├── styles/             CSS grouped by area (base, header, footer, hero, services, work, contact, ...)
    ├── components/         Grouped by area: common, header, footer, hero, services, work, reviews,
    │                       logos-stats, contact, how-we-deliver, about, faq, cta, legal
    └── pages/              One file per page (HomePage, AboutPage, ServicesPage, WorkPage,
                            ContactPage, FaqPage, PrivacyPolicyPage, CookiePolicyPage, NotFoundPage)
```

## How the pages are built

This is a **multi-page static site generated from one template**, not a single-page app with a router.

1. `index.html` is a template. It contains tokens such as the page title, description and share text.
2. `src/pageMeta.js` lists every page with its own metadata.
3. A small plugin in `vite.config.js` runs at build time and writes **one HTML file per page** (`index.html`, `about.html`, `services.html`, `404.html`, and so on) with that page's title, description, canonical link, social preview tags and structured data filled in.
4. In the browser, `src/routes.js` reads `window.location.pathname` and `App.jsx` renders the matching page. Links inside the site switch pages without reloading (`useRoute` in `src/hooks.js`); a direct visit or refresh loads the page's own HTML file. Because each page is its own file, search engines and link previews see the correct metadata without running JavaScript.
5. Vercel serves `/about` from `about.html` (`cleanUrls`) and serves `404.html` with a real 404 status for unknown addresses. The old addresses `/products` and `/about-us` are redirected by `vercel.json` (this works on Vercel, not in `pnpm preview`, which only serves the `.html` files).

In dev mode the same plugin answers every address with the template, so all pages work locally.

The standalone pages get `class="inner"` on `<main>`. That class gives them one even gap between sections and between the banner and content. The landing page keeps its own spacing.

### Adding a new page

1. Add an entry to `PAGES` in `src/pageMeta.js` (`path`, `name`, `title`, `description`, and `share` if you want a link preview).
2. Create `YourPage.jsx` in `src/pages/` (use `PageHero` for the banner at the top).
3. Import it in `App.jsx` and add a line: `{route === '/your-page' && <YourPage />}`.
4. Link to it from `NAV_LINKS` in `src/data.js` (header and footer) or from wherever it belongs.

The route list, the generated HTML file and the sitemap entry follow automatically. Nothing else needs editing.

## Editing content

Most copy lives in data files, so you rarely need to touch components.

| To change...                                  | Edit                                                                    |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Services (the "What we offer" cards)          | `SERVICES` in `src/data.js`: `summary` is the front of the card, `ideal` and `example` are the back |
| Products and projects (the cards)             | `PROJECTS` in `src/data.js`; images go in `public/projects/`. (`PRODUCTS` in the same file is an older list that no page uses.) |
| Stats (60+ companies and organizations, 93% retention, ...)       | `STATS` in `src/data.js`                                                |
| Industries (the scrolling chips under the "Why Choose 1/0" heading) | `INDUSTRIES` in `src/components/logos-stats/IndustryRows.jsx`. The old client logos are in `archive/logos/`. To bring them back: move the folder to `public/logos/`, restore the `CLIENT_LOGOS` list in `src/data.js` (it was removed, see the git history), and use `ClientLogos` instead of `IndustryRows` |
| Reviews                                       | `TESTIMONIALS` in `src/data.js`. They show 3 at a time on desktop, 2 on tablets and 1 on phones; the arrows move a whole page. **All current quotes are placeholders.** |
| How We Deliver steps                             | `PROCESS_STEPS` in `src/data.js`                                        |
| Header / footer links                         | `NAV_LINKS` in `src/data.js` (the header leaves out Contact, because it has the "Contact Us" button) |
| The three "what we stand for" cards in About  | `PILLARS` in `src/components/about/AboutSection.jsx`                    |
| The constellation above the contact form      | `STARS` and `POLARIS` in `src/components/contact/Constellation.jsx`     |
| LinkedIn link                                 | `SOCIAL` in `src/data.js` (the footer shows it only when it is set)      |
| FAQ                                           | `src/faqData.js`                                                        |
| Page titles, descriptions, link previews      | `src/pageMeta.js`                                                       |
| Privacy Policy and Cookie Policy text         | `src/pages/PrivacyPolicyPage.jsx` and `CookiePolicyPage.jsx`; update `UPDATED` in `src/legalInfo.js` when you change them |
| Company address and email                     | `ORG` in `src/pageMeta.js`, the contact section and the footer, and `src/legalInfo.js` |
| Link preview image                            | Replace `public/og-image.png` (1200 x 630 works best)                    |

## Styling

Styles live in `src/styles/`, in one folder per area (for example `header/`, `hero/`, `contact/`) that matches the folders in `components/`. `src/index.css` only lists them with `@import`, and **the order of those lines is the cascade order**: later files override earlier ones, so keep the order when you move or add files. When a rule does not seem to apply, search for a later rule with the same selector.

- **Theme:** colors are CSS variables in `styles/base/base.css` (`--bg`, `--bg-2`, `--text`, `--muted`, `--accent`, `--accent-2`, ...). Change them there.
- **Fonts:** `--display` (Orbitron) for headings, `--head` (Exo 2) and `--body` (Montserrat).
- **Text sizes:** description text uses one shared size, `--desc-size` (hero paragraph, section subtitles, page intros, card descriptions, FAQ answers, legal text). `--desc-size-sm` is a step smaller, for dense cards (How we deliver steps, product cards) and the contact intro. Change them in `styles/base/base.css` and the whole site follows. Paragraph color is `--muted`.
- **Glass:** the `.glass` class gives the frosted-card look used across the site.
- **Gradient text:** wrap words in `<span className="grad">` for the animated gradient.
- **Section backgrounds:** the landing page sections each have their own tone (`base/section-backgrounds-final.css`, plus `work/products-background.css` for products). The standalone pages (About, Services, Products, FAQ and the legal pages) share one indigo, set in one rule in `pages/standalone-backgrounds-logos.css`.
- **Responsive:** the main breakpoints are 1000px, 860px and 720px, with smaller tweaks near 400px. The "What we offer" cards are 3 across, then 2, and stay 2 across on phones (1 below 360px).
- **Hover effects** are wrapped in `@media (hover: hover)` so touch screens never get a hover state stuck after a tap. Touch devices get a short press effect (`:active`) instead.

## Animations and interactions

- **Constellation:** `HeroCanvas` draws drifting dots that link when close and react to the pointer. It is used in the landing hero and in every inner-page banner, and pauses when off screen.
- **Scroll reveal:** `Reveal` and `useReveal` fade sections in as they enter the viewport.
- **Counters:** `useCountUp` animates the stat numbers.
- **Scroll progress bar** at the top of the page (`useScrollProgress`).
- **Cursor:** a custom cyan arrowhead (set inline in `index.html` so it is there from the first moment of every load). Over links and buttons it is brighter and a ring pops in around its tip (`HoverRing`); a left-click sends out a ripple (`ClickRipple`). Mouse only. Styles are in `styles/base/cursor.css`.
- **Header** hides while scrolling down and returns when scrolling up. An open mobile menu keeps it on screen.
- **Industry chips** scroll in two endless rows, opposite directions.
- **Reviews** are a slider: 3 cards at a time on desktop, 2 on tablets, 1 on phones. The arrows move a whole page and are disabled at either end, the dots jump to a page, and a swipe works on touch screens.
- **Flip cards (What we offer):** click or tap anywhere on a card, or press Enter or Space on it, and it turns over to show when the service is ideal and an example. The turned-away face is `visibility: hidden`, so only the visible one can be reached by keyboard or screen reader. The flipped state lives on an inner element because `Reveal` adds its own class to the outer one.
- **About (landing page)** has a logo that sits in slowly turning rings and glows when hovered, twinkling stars with an occasional shooting star, and cards with a light sweeping across their top edge.
- **Constellation (contact section):** Ursa Minor drawn from our products, ending in "Your project" with the logo as Polaris. Each star glows on hover, and the stars use the site's cursor and ring (`.constellation-node` is in the clickable list in `HoverRing.jsx` and `cursor.css`).
- **Jumping to a section:** `scroll-padding-top` is `0`, because the header slides away when the page scrolls down. A jump puts the section's top edge at the very top of the screen.
- **How We Deliver** has a space scene (stars, planet, rocket, comet), and each step's icon tilts a little on hover.
- **Cookie banner** slides up and fades in, then fades out after a choice. The hamburger icon turns as it swaps.
- Animations do **not** depend on `prefers-reduced-motion`.

## Contact form

Validation is in `src/validateInquiry.js`: required fields are checked, invalid fields get a red outline, and there is no error text under the fields. The send button shows a loading state, then an animated thank-you message with "within 3-5 business days". Delivery is in `src/submitInquiry.js`.

**The form does not deliver anywhere until you set `VITE_FORM_ENDPOINT`** (see [Environment variables](#environment-variables)). Until then it only pretends to send, so the page can be designed and tested. Set it before launch or inquiries will be lost.

Any service that accepts a JSON `POST` works, for example Formspree. The form sends: name, company, email, project details, preferred start date and how the visitor heard about us.

## Privacy, cookies and consent

- The cookie banner appears on the first visit with **Accept all**, **Reject optional** and **Customize**. Customize opens a settings popup with Analytics and Marketing switches.
- The choice is stored in the browser (`localStorage`, key `ooz-cookie-consent`) and can be changed at any time from **Cookie Settings** in the footer or from the Cookie Policy page.
- Functional cookies are always allowed. Analytics and marketing are optional.
- **No analytics or marketing scripts are loaded by this code yet.** The policies describe Google Analytics and Google Search Console as the services that will be used. When you add them, load them only after `readConsent()` shows the matching category is on.
- The Privacy Policy and Cookie Policy are written for RA 10173 and the National Privacy Commission. They are working drafts: have a lawyer or your data protection officer review them before launch.
- Images cannot be dragged or saved through the right-click menu. This only deters casual copying.

## SEO and link previews

- Every page gets its own `<title>`, description, canonical link, Open Graph and Twitter tags, and breadcrumbs.
- The home page also gets Organization structured data (name, address, email, founding year, LinkedIn).
- The build prints a warning if a title (aim for 60 characters or fewer), description (70 to 160) or share text (20 to 200) is outside the recommended length.
- **Indexing is switched off for now.** `NOINDEX` in `src/pageMeta.js` is `true`, which adds `<meta name="robots" content="noindex">` to every page and skips `sitemap.xml` and `robots.txt`.
- Set `NOINDEX = false` at launch. The build then removes the tag and generates `sitemap.xml` and `robots.txt` automatically.
- Link previews need an absolute image address. The build works it out from `SITE_URL`, then Vercel's production URL, then the deployment URL.

## Environment variables

Set these in Vercel under **Settings > Environment Variables**, then redeploy. Locally, put them in a `.env.local` file (it is not committed).

| Variable               | Needed        | What it does                                                                                   |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| `VITE_FORM_ENDPOINT`   | Before launch | Address of the form service that receives contact form messages.                              |
| `SITE_URL`             | At launch     | The public address with no trailing slash (for example your custom domain). Used for canonical links, link previews and the sitemap. |

Vercel also provides `VERCEL_PROJECT_PRODUCTION_URL` and `VERCEL_URL` automatically, which the build uses as fallbacks for `SITE_URL`.

## Deployment

The site is deployed on Vercel from the `main` branch.

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **`vercel.json`:** `cleanUrls: true` and `trailingSlash: false`, so `/about.html` redirects to `/about`. It also redirects the old addresses `/products` to `/work` and `/about-us` to `/about` (permanent redirects). If you rename a page again, add a redirect for its old address here.

Pushing to `main` deploys to production. Other branches get preview deployments, which are also useful for checking link previews.

## Launch checklist

- [ ] Set `VITE_FORM_ENDPOINT` and send a real test inquiry.
- [ ] Set `SITE_URL` to the final domain.
- [ ] Set `NOINDEX = false` in `src/pageMeta.js`.
- [ ] Confirm the LinkedIn URL in `ORG` (`src/pageMeta.js`) and `SOCIAL` (`src/data.js`). It is a temporary, unconfirmed link.
- [ ] Shorten the home page `share` text to 200 characters or fewer (the build warns it is 241).
- [ ] Replace the placeholder reviews (`TESTIMONIALS` in `src/data.js`) with real, approved client quotes. Most are generic "Client Name / Company Name" entries.
- [ ] Have the Privacy Policy and Cookie Policy reviewed, and update their dates.
- [ ] Add the analytics scripts behind the consent check, or remove Google Analytics from the policies if unused.
- [ ] Check every page on a real phone (iPhone Safari and Android Chrome) and in dark and light device settings.
- [ ] Check link previews on Discord, Facebook and LinkedIn after the final domain is live.
- [ ] Open `/products` and `/about-us` on the deployed site and check they redirect to `/work` and `/about`.
- [ ] Run `pnpm lint` and `pnpm build` with no errors.

## Troubleshooting

- **A page shows the wrong title in a link preview:** previews are cached by Discord, Facebook and LinkedIn. Use their debugger tools to refresh, or wait.
- **A new page returns 404 on Vercel:** make sure it has an entry in `PAGES` in `src/pageMeta.js`; the HTML file is generated from that list.
- **`/products` or `/about-us` shows the 404 page locally:** the redirects are in `vercel.json` and only run on Vercel. Locally, use `/work` and `/about`.
- **The build warns about text length:** shorten the title, description or share text named in the warning.
- **A hover effect does nothing on a phone:** that is intended; hover styles only apply on devices that can hover.
- **A style change has no effect:** a later file in `src/styles/` probably overrides it. Search for the selector and edit the last match.
- **`pnpm dev` or `build` is very slow on Windows:** move the project into the WSL file system (see Getting started).

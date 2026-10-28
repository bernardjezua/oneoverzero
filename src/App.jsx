import { useEffect, useRef, useState } from 'react'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import { CookieBanner, CookieDialog } from './components/legal/Legal.jsx'
import HomePage from './pages/HomePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import CookiePolicyPage from './pages/CookiePolicyPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { readConsent, saveConsent, useScrollProgress } from './hooks.js'
import { ROUTES, currentRoute } from './routes.js'

export default function App() {
  const route = currentRoute()
  const progress = useScrollProgress()
  const [cookiesOpen, setCookiesOpen] = useState(false)
  const [consent, setConsent] = useState(() => readConsent())

  // Discourage saving images: block the right-click menu and dragging on pictures. This only deters casual copying.
  useEffect(() => {
    const block = (e) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault()
    }
    document.addEventListener('contextmenu', block)
    document.addEventListener('dragstart', block)
    return () => {
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('dragstart', block)
    }
  }, [])

  // The banner stays on screen for a moment after a choice so it can fade out instead of vanishing
  const [bannerShown, setBannerShown] = useState(!consent)
  const leaveTimer = useRef(0)
  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const choose = (c) => {
    saveConsent(c)
    setConsent(c)
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setBannerShown(false), 320)
  }

  return (
    <>
      <div className="progress" style={{ '--p': progress }} aria-hidden="true" />
      <Header route={route} />
      {/* The standalone pages share one section spacing (see "inner" in index.css); the landing page keeps its own */}
      <main className={route !== '/' && ROUTES.includes(route) ? 'inner' : undefined}>
        {route === '/' && <HomePage />}
        {route === '/services' && <ServicesPage />}
        {route === '/products' && <ProductsPage />}
        {route === '/about-us' && <AboutPage />}
        {route === '/faq' && <FaqPage />}
        {route === '/contact' && <ContactPage />}
        {route === '/privacy-policy' && <PrivacyPolicyPage />}
        {route === '/cookie-policy' && <CookiePolicyPage onCookies={() => setCookiesOpen(true)} />}
        {!ROUTES.includes(route) && <NotFoundPage />}
      </main>
      <Footer onCookies={() => setCookiesOpen(true)} />
      {bannerShown && (
        <CookieBanner
          leaving={!!consent}
          onAccept={() => choose({ analytics: true, marketing: true })}
          onReject={() => choose({ analytics: false, marketing: false })}
          onCustomize={() => setCookiesOpen(true)}
        />
      )}
      <CookieDialog open={cookiesOpen} onClose={() => setCookiesOpen(false)} onSave={choose} />
    </>
  )
}

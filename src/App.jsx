import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrackRecord from './components/TrackRecord.jsx'
import Services from './components/Services.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import Work from './components/Work.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'
import { CookieBanner, CookieDialog, PrivacyDialog } from './components/Legal.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { readConsent, saveConsent, useScrollProgress } from './hooks.js'
import { ROUTES, currentRoute } from './routes.js'

export default function App() {
  const route = currentRoute()
  const progress = useScrollProgress()
  const [privacyOpen, setPrivacyOpen] = useState(false)
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

  const choose = (c) => {
    saveConsent(c)
    setConsent(c)
  }

  return (
    <>
      <div className="progress" style={{ '--p': progress }} aria-hidden="true" />
      <Header route={route} />
      {/* The standalone pages share one section spacing (see "inner" in index.css); the landing page keeps its own */}
      <main className={route !== '/' && ROUTES.includes(route) ? 'inner' : undefined}>
        {route === '/' && (
          <>
            <Hero />
            <TrackRecord />
            <Services />
            <HowWeWork />
            <Work />
            <Reviews />
            <Contact onPrivacy={() => setPrivacyOpen(true)} />
          </>
        )}
        {route === '/services' && (
          <Services page>
            <CtaBand />
          </Services>
        )}
        {route === '/products' && (
          <Work page>
            <CtaBand />
          </Work>
        )}
        {route === '/about-us' && <AboutPage />}
        {route === '/faq' && <FaqPage />}
        {route === '/contact' && <Contact page onPrivacy={() => setPrivacyOpen(true)} />}
        {!ROUTES.includes(route) && <NotFoundPage />}
      </main>
      <Footer onPrivacy={() => setPrivacyOpen(true)} onCookies={() => setCookiesOpen(true)} />
      {!consent && (
        <CookieBanner
          onAccept={() => choose({ analytics: true, marketing: true })}
          onReject={() => choose({ analytics: false, marketing: false })}
          onCustomize={() => setCookiesOpen(true)}
          onPrivacy={() => setPrivacyOpen(true)}
        />
      )}
      <PrivacyDialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <CookieDialog open={cookiesOpen} onClose={() => setCookiesOpen(false)} onSave={choose} />
    </>
  )
}

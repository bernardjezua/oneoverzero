import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrackRecord from './components/TrackRecord.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { CookieBanner, CookieDialog, PrivacyDialog } from './components/Legal.jsx'
import { readConsent, saveConsent, useScrollProgress } from './hooks.js'

export default function App() {
  const progress = useScrollProgress()
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [cookiesOpen, setCookiesOpen] = useState(false)
  const [consent, setConsent] = useState(() => readConsent())

  const choose = (c) => {
    saveConsent(c)
    setConsent(c)
  }

  return (
    <>
      <div className="progress" style={{ '--p': progress }} aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <TrackRecord />
        <Services />
        <Work />
        <Reviews />
        <Contact onPrivacy={() => setPrivacyOpen(true)} />
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

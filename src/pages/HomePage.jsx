import Hero from '../components/hero/Hero.jsx'
import TrackRecord from '../components/logos-stats/TrackRecord.jsx'
import Services from '../components/services/Services.jsx'
import HowWeDeliver from '../components/how-we-deliver/HowWeDeliver.jsx'
import Work from '../components/work/Work.jsx'
import Reviews from '../components/reviews/Reviews.jsx'
import Faq from '../components/faq/Faq.jsx'
import Contact from '../components/contact/Contact.jsx'
import AboutSection from '../components/about/AboutSection.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TrackRecord />
      <Services />
      <HowWeDeliver />
      <Work />
      <Reviews />
      <Faq />
      <Contact />
    </>
  )
}

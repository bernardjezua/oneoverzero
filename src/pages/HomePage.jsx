import Hero from '../components/hero/Hero.jsx'
import TrackRecord from '../components/logos-stats/TrackRecord.jsx'
import Services from '../components/services/Services.jsx'
import HowWeWork from '../components/how-we-work/HowWeWork.jsx'
import Work from '../components/work/Work.jsx'
import Reviews from '../components/reviews/Reviews.jsx'
import Contact from '../components/contact/Contact.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrackRecord />
      <Services />
      <HowWeWork />
      <Work />
      <Reviews />
      <Contact />
    </>
  )
}

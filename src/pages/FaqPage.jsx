import PageHero from '../components/common/PageHero.jsx'
import CtaBand from '../components/cta/CtaBand.jsx'
import FaqList from '../components/faq/FaqList.jsx'

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Frequently Asked <span className="grad">Questions</span>
          </>
        }
      >
        Quick answers about working with us. Can&rsquo;t find yours? Just ask.
      </PageHero>

      <section className="section faq">
        <div className="wrap">
          <FaqList />
        </div>
        <CtaBand />
      </section>
    </>
  )
}

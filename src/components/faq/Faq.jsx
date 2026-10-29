import SectionHead from '../common/SectionHead.jsx'
import FaqList from './FaqList.jsx'

// The landing page's FAQ section, just above the contact form
export default function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="wrap">
        <SectionHead
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked <span className="grad">Questions</span>
            </>
          }
          sub="Quick answers about working with us. Can&rsquo;t find yours? Just ask."
        />
        <FaqList headingLevel="h3" />
      </div>
    </section>
  )
}

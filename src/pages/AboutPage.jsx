import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import Stat from '../components/logos-stats/Stat.jsx'
import HowWeDeliver from '../components/how-we-deliver/HowWeDeliver.jsx'
import CtaBand from '../components/cta/CtaBand.jsx'
import IndustryRows from '../components/logos-stats/IndustryRows.jsx'
import MissionVision from '../components/about/MissionVision.jsx'
import Pillars from '../components/about/Pillars.jsx'
import { STATS } from '../data.js'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Defining infinite possibilities through <span className="grad">intelligent tech</span>
          </>
        }
      >
        One Over Zero Innovations is a technology company in the Philippines,
        that provides development and system integration services.
      </PageHero>

      <section className="section about-story">
        <div className="wrap about-grid">
          <Reveal>
            <span className="eyebrow">Our History</span>
            <h2>
              Built on <span className="grad">open-source technology</span>, since 2017
            </h2>
            <p>
              We founded One Over Zero in 2017 to help organizations get real
              value from technology. Our work is built around open-source
              technologies and enterprise solutions, which gives our clients
              flexibility, control and room to grow.
            </p>
            <p>
              Today we work with more than 60 clients across government,
              healthcare, sports, insurance, publishing and more. We build
              websites, apps and platforms, set up the infrastructure and
              security behind them, and stay on to maintain and support what we
              deliver.
            </p>
            <p>
              Whatever the project, the goal is the same: dependable technology
              that helps your organization run more efficiently.
            </p>
          </Reveal>
          <div className="about-stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <Stat {...s} />
              </Reveal>
            ))}
          </div>
        </div>
        <MissionVision />
        <Pillars />
        <IndustryRows />
      </section>

      <HowWeDeliver>
        <CtaBand />
      </HowWeDeliver>
    </>
  );
}

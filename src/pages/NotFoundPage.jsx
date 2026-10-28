import HeroCanvas from '../components/hero/HeroCanvas.jsx'
import Icon from '../components/common/Icon.jsx'

export default function NotFoundPage() {
  return (
    <section className="notfound">
      <HeroCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap notfound-inner">
        <span className="notfound-code grad" aria-hidden="true">
          404
        </span>
        <h1>This page can&rsquo;t be found</h1>
        <p className="lead">The page you are looking for may have moved, or the link may be mistyped.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="/">
            Back to home <Icon name="arrow" size={16} />
          </a>
          <a className="btn btn-glass" href="/contact">
            Contact us
          </a>
        </div>
      </div>
    </section>
  )
}

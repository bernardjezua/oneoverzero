// Top banner for the inner pages (About, FAQ, 404): same grid and glow as the landing hero, without the animation.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap page-hero-inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children && <p className="lead">{children}</p>}
      </div>
    </section>
  )
}

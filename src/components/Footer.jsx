import Logo from './Logo.jsx'

export default function Footer({ onPrivacy, onCookies }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Logo />
        <div className="legal-links">
          <button className="textbtn" onClick={onPrivacy}>
            Privacy Policy
          </button>
          <button className="textbtn" onClick={onCookies}>
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  )
}

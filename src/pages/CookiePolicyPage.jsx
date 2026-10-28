import { LegalShell, Mail, Section } from '../components/legal/LegalShell.jsx'
import { ADDRESS, COMPANY } from '../legalInfo.js'

export default function CookiePolicyPage({ onCookies }) {
  return (
    <LegalShell
      eyebrow="Legal"
      title={
        <>
          Cookie <span className="grad">Policy</span>
        </>
      }
      intro="What cookies are, which ones this website uses and how you can control them."
    >
      <Section n={1} title="Introduction">
        <p>
          This website uses cookies and other related technologies (for convenience, all referred to as &ldquo;cookies&rdquo;). Some cookies are
          placed by third parties we have engaged. This policy explains how they are used on our website, in line with the Data Privacy Act of 2012
          (Republic Act No. 10173) of the Philippines. For how we handle personal information more generally, see our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </Section>

      <Section n={2} title="What are cookies?">
        <p>
          A cookie is a small file that is sent along with the pages of this website and stored by your browser on your computer or another device.
          The information stored in it may be returned to our servers, or to the servers of the relevant third parties, during a later visit.
        </p>
      </Section>

      <Section n={3} title="What are scripts?">
        <p>
          A script is a piece of program code that makes our website work properly and interactively. This code is executed on our server or on
          your device.
        </p>
      </Section>

      <Section n={4} title="What is a web beacon?">
        <p>
          A web beacon (or pixel tag) is a small, invisible piece of text or image on a website that is used to monitor traffic. Various data about
          you may be stored using web beacons.
        </p>
      </Section>

      <Section n={5} title="Cookies we use">
        <h3>5.1 Technical or functional cookies</h3>
        <p>
          Some cookies make sure that parts of the website work properly and that your preferences are remembered, such as your cookie choice. We
          may place these cookies without your consent.
        </p>
        <h3>5.2 Statistics cookies</h3>
        <p>
          We use statistics cookies to understand how the website is used so we can improve it. We ask your permission before placing them.
        </p>
        <h3>5.3 Marketing and tracking cookies</h3>
        <p>
          Marketing and tracking cookies are cookies, or any other form of local storage, used to measure the results of our campaigns or to track
          visitors across websites for similar marketing purposes. We ask your permission before placing them.
        </p>
      </Section>

      <Section n={6} title="Placed cookies">
        <p>The cookies on this website come only from the following services:</p>
        <ul>
          <li>
            <b>Google Analytics</b> (Statistics)
          </li>
          <li>
            <b>Google Search Console</b> (Statistics)
          </li>
          <li>
            <b>Miscellaneous</b> (purpose pending investigation)
          </li>
        </ul>
      </Section>

      <Section n={7} title="Consent">
        <p>
          When you visit our website for the first time, we show you a banner with an explanation about cookies. As soon as you accept, reject or
          save your preferences, we use only the categories of cookies you chose, as described in this policy. You can also disable cookies in
          your browser, but please note that the website may no longer work properly.
        </p>
        <h3>7.1 Manage your consent settings</h3>
        <p>
          Functional cookies are always active. You can change your Statistics (Analytics) and Marketing choices at any time.
        </p>
        <button type="button" className="btn btn-primary" onClick={onCookies}>
          Open Cookie Settings
        </button>
      </Section>

      <Section n={8} title="Enabling, disabling and deleting cookies">
        <p>
          You can use your internet browser to delete cookies automatically or manually. You can also specify that certain cookies may not be
          placed, or change your browser settings so that you receive a message each time a cookie is placed. For more information, see the Help
          section of your browser.
        </p>
        <p>
          Please note that the website may not work properly if all cookies are disabled. If you delete the cookies in your browser, they will be
          placed again, after your consent, when you visit our website again.
        </p>
      </Section>

      <Section n={9} title="Your rights with respect to personal data">
        <p>Under the Data Privacy Act, you have the right to:</p>
        <ul>
          <li>know why your personal data is needed, what will happen to it and how long it will be kept;</li>
          <li>access your personal data that is known to us;</li>
          <li>correct, suspend, block or request the removal of your personal data whenever you wish;</li>
          <li>withdraw your consent and have your personal data deleted, where you gave consent;</li>
          <li>data portability, where applicable;</li>
          <li>object to the processing of your data. We comply, unless there are justified grounds for processing.</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the details below. If you have a complaint about how we handle your data, we would like
          to hear from you, but you also have the right to file a complaint with the National Privacy Commission (
          <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer">
            privacy.gov.ph
          </a>
          ).
        </p>
      </Section>

      <Section n={10} title="Contact details">
        <p>For questions or comments about this Cookie Policy, please contact:</p>
        <p>
          {COMPANY}
          <br />
          {ADDRESS}
          <br />
          Email: <Mail />
        </p>
      </Section>
    </LegalShell>
  )
}

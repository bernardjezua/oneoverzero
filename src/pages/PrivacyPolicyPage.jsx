import { LegalShell, Mail, Section } from '../components/legal/LegalShell.jsx'
import { ADDRESS, COMPANY } from '../legalInfo.js'

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title={
        <>
          Privacy <span className="grad">Policy</span>
        </>
      }
      intro="How we collect, use and protect your personal information, in line with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines."
    >
      <Section n={1} title="Who we are">
        <p>{COMPANY} is a technology company registered in the Philippines.</p>
        <ul>
          <li>Address: {ADDRESS}</li>
          <li>
            Email: <Mail />
          </li>
        </ul>
        <p>
          {COMPANY} is the personal information controller for the information collected through this website, except where otherwise stated.
        </p>
      </Section>

      <Section n={2} title="What information we collect">
        <p>Depending on how you use this website, we may collect:</p>
        <ul>
          <li>
            <b>Inquiry information:</b> your name, company, email address, project details, preferred start date and how you heard about us,
            when you send us a message through the contact form or by email.
          </li>
          <li>
            <b>Website information:</b> your browser and device information, pages viewed and referral source, collected through
            analytics only if you accept analytics cookies.
          </li>
          <li>
            <b>Cookie preferences:</b> one item stored in your browser to remember the choice you made on the cookie banner.
          </li>
        </ul>
        <p>
          Please don&rsquo;t include sensitive personal information (such as government IDs, health or financial details) in your message. We use
          cookies and similar technologies; please see our <a href="/cookie-policy">Cookie Policy</a> for details.
        </p>
      </Section>

      <Section n={3} title="How we use your information">
        <p>We use personal information to:</p>
        <ul>
          <li>reply to your inquiry and prepare proposals or quotations;</li>
          <li>manage our relationship with you if we work together;</li>
          <li>operate, secure and improve our website;</li>
          <li>understand how visitors use the website, where you have agreed to analytics;</li>
          <li>keep records that the law requires us to keep.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for automated decision-making.</p>
      </Section>

      <Section n={4} title="Legal basis">
        <p>Under the Data Privacy Act, we process personal information on the basis of:</p>
        <ul>
          <li>
            <b>your consent</b>, such as when you submit the contact form or accept optional cookies;
          </li>
          <li>
            <b>steps taken at your request</b> before entering into a contract with you;
          </li>
          <li>
            <b>our legitimate interests</b>, such as keeping the website secure and running our business, where these are not overridden by your
            rights and freedoms;
          </li>
          <li>
            <b>legal obligations</b> that require us to process information.
          </li>
        </ul>
        <p>Where processing is based on consent, you may withdraw it at any time.</p>
      </Section>

      <Section n={5} title="Analytics and cookies">
        <p>
          We use Google Analytics and Google Search Console to understand website usage and improve our services. Optional analytics and marketing
          cookies are used only in accordance with your cookie preferences, which you can change at any time in Cookie Settings.
        </p>
        <p>
          For more information, please see our <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </Section>

      <Section n={6} title="Who we share information with">
        <p>We may share personal information with trusted service providers that help us run our business and website, including providers of:</p>
        <ul>
          <li>website hosting and technical infrastructure;</li>
          <li>email and communication tools;</li>
          <li>analytics;</li>
          <li>security and IT support.</li>
        </ul>
        <p>
          We only share what is necessary for these purposes, and our providers must protect it. We may also disclose information to government
          bodies or courts when the law requires. We do not sell personal information to third parties.
        </p>
      </Section>

      <Section n={7} title="International transfers">
        <p>
          Some of our service providers, such as Google, may process personal information outside the Philippines. Where this happens, we take
          reasonable steps, including contractual safeguards, so that your information stays protected as required by the Data Privacy Act.
        </p>
      </Section>

      <Section n={8} title="How long we keep information">
        <p>
          We keep personal information only for as long as needed for the purposes it was collected for, including legal, accounting and security
          requirements. After that, we delete or anonymize it. Retention periods vary with the type of information and our legal obligations.
        </p>
      </Section>

      <Section n={9} title="How we protect information">
        <p>
          We use reasonable organizational, physical and technical measures to protect personal information against loss, misuse, unauthorized
          access, disclosure and alteration. If a personal data breach occurs that requires it, we will notify the National Privacy Commission and
          the affected individuals as required by law.
        </p>
      </Section>

      <Section n={10} title="Your rights">
        <p>Under the Data Privacy Act, you have the right to:</p>
        <ul>
          <li>be informed about how your personal information is processed;</li>
          <li>access your personal information;</li>
          <li>correct inaccurate or outdated information;</li>
          <li>object to processing, or withdraw your consent;</li>
          <li>request the suspension, blocking, removal or destruction of your information;</li>
          <li>data portability, where applicable;</li>
          <li>claim compensation for damages caused by inaccurate, incomplete, unlawfully obtained or unauthorized use of your information.</li>
        </ul>
        <p>
          To exercise these rights, email <Mail />. If you have a complaint about how we handle your information, we would like to hear from you
          first, but you also have the right to file a complaint with the National Privacy Commission (
          <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer">
            privacy.gov.ph
          </a>
          ).
        </p>
      </Section>

      <Section n={11} title="Third-party content">
        <p>
          This website loads fonts from Google Fonts and shows an embedded Google Map, and it links to our LinkedIn page. These services may
          receive your IP address and set their own cookies, according to their own privacy policies.
        </p>
      </Section>

      <Section n={12} title="Changes to this policy">
        <p>
          We may update this Privacy Policy when our services, technology or legal requirements change. The latest version will always be published
          on this page, with the date above.
        </p>
      </Section>

      <Section n={13} title="Contact">
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

// Sends the contact form. It resolves when the message is delivered and throws if it isn't, so the form can show
// "Sending..." until the real answer comes back.
//
// To deliver messages, set VITE_FORM_ENDPOINT in the Vercel project settings (Settings > Environment Variables) to the
// address of a form service that accepts a JSON POST, such as Formspree, then redeploy.
//
// Until that is set, nothing is actually sent: the form only pretends to, after a short pause, so the page can be
// designed and tested. Set the endpoint before launch or inquiries will be lost.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export async function submitInquiry(data) {
  if (!ENDPOINT) {
    console.warn('Contact form: VITE_FORM_ENDPOINT is not set, so this message was NOT sent anywhere.')
    await new Promise((resolve) => setTimeout(resolve, 1400))
    return
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`The form service answered with status ${response.status}`)
}

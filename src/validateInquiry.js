// Rules for the contact form. Each one returns an error message, or '' when the value is fine.
// Whitespace-only answers count as empty, so "   " can't get through.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// The order here is the order of the fields on the page, so the first error is the first field to fix
export const RULES = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
  company: (v) => (v.trim().length >= 2 ? '' : 'Please enter your company or organization.'),
  email: (v) => (EMAIL.test(v.trim()) ? '' : 'Please enter a valid email address, like name@company.com.'),
  service: (v) => (v ? '' : 'Please choose what you are looking for.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Please tell us a little more about what you need (at least 10 characters).'),
  timeframe: (v) => (v ? '' : 'Please choose when you would like to start.'),
  source: (v) => (v ? '' : 'Please tell us where you heard about us.'),
}

export const validateField = (name, value) => RULES[name]?.(value ?? '') ?? ''

// Returns { fieldName: message } for every field that needs fixing (empty object when the form is fine)
export function validateInquiry(data) {
  const errors = {}
  for (const name of Object.keys(RULES)) {
    const message = validateField(name, data[name])
    if (message) errors[name] = message
  }
  return errors
}

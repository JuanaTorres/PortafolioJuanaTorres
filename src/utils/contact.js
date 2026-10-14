export const CONTACT_EMAIL = "juanavtp0216@gmail.com";

export const FIELD_LIMITS = { name: 100, email: 254, message: 2000 };

/** Minimum time between two successful submissions from the same tab. */
export const SUBMIT_COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = "portfolio-contact-last-sent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Control characters (keeps \t and \n, which are legitimate in a message).
// oxlint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B-\u001F\u007F]/g;
// Single-line fields must not contain any line breaks or control characters.
// oxlint-disable-next-line no-control-regex
const SINGLE_LINE_CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

/**
 * Normalises user input before validating or sending it: trims whitespace
 * and strips control characters (e.g. CR/LF in single-line fields, which
 * could be abused to tamper with email headers).
 */
export function sanitizeContactForm({ name = "", email = "", message = "" }) {
  return {
    name: String(name).replace(SINGLE_LINE_CONTROL_CHARS, " ").trim(),
    email: String(email).replace(SINGLE_LINE_CONTROL_CHARS, "").trim(),
    message: String(message).replace(/\r\n?/g, "\n").replace(CONTROL_CHARS, "").trim(),
  };
}

/**
 * Strips control characters from a single field while the user types, so
 * the DOM values read by `emailjs.sendForm` are always clean.
 */
export function cleanFieldInput(field, value) {
  return field === "message"
    ? value.replace(CONTROL_CHARS, "")
    : value.replace(SINGLE_LINE_CONTROL_CHARS, "");
}

/**
 * Validates the contact form fields.
 * Returns an object whose keys are the invalid field names mapped to an
 * i18n key describing the error. An empty object means the form is valid.
 */
export function validateContactForm(formData) {
  const { name, email, message } = sanitizeContactForm(formData);
  const errors = {};

  if (!name) {
    errors.name = "contact.errors.nameRequired";
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = "contact.errors.nameTooLong";
  }

  if (!email) {
    errors.email = "contact.errors.emailRequired";
  } else if (email.length > FIELD_LIMITS.email) {
    errors.email = "contact.errors.emailTooLong";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "contact.errors.emailInvalid";
  }

  if (!message) {
    errors.message = "contact.errors.messageRequired";
  } else if (message.length > FIELD_LIMITS.message) {
    errors.message = "contact.errors.messageTooLong";
  }

  return errors;
}

/**
 * Returns the milliseconds left before another message may be sent, based
 * on the timestamp saved by `markMessageSent`. This is a UX/anti-spam
 * courtesy only; the real rate limit is enforced by the email provider.
 */
export function getCooldownRemaining(now = Date.now()) {
  try {
    const lastSent = Number(window.sessionStorage.getItem(LAST_SENT_KEY));
    if (!Number.isFinite(lastSent) || lastSent <= 0) return 0;
    return Math.max(0, lastSent + SUBMIT_COOLDOWN_MS - now);
  } catch {
    return 0;
  }
}

export function markMessageSent(now = Date.now()) {
  try {
    window.sessionStorage.setItem(LAST_SENT_KEY, String(now));
  } catch {
    // Storage unavailable: the cooldown simply won't persist across reloads.
  }
}

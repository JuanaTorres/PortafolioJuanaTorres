import emailjs from "@emailjs/browser";

/**
 * Sends the contact form through EmailJS (https://www.emailjs.com/) so the
 * message reaches the inbox directly, without opening the visitor's mail
 * client.
 *
 * `emailjs.sendForm` reads the form's fields by their `name` attribute, so
 * the EmailJS template must use the same names: {{user_name}},
 * {{user_email}} and {{message}}.
 *
 * Security notes:
 * - The EmailJS *public* key is designed to live in the browser. Protect it
 *   in the EmailJS dashboard: Account → Security → "Allowed origins" (only
 *   your domain). Never put the *private* key in a VITE_ variable —
 *   everything prefixed with VITE_ ends up in the bundle.
 * - The destination address is configured in the EmailJS template
 *   ("To Email"), not sent from here, so the form cannot be abused to email
 *   arbitrary people.
 * - `blockHeadless` rejects submissions from headless browsers (bots).
 * - The template must use double braces ({{message}}), which EmailJS
 *   HTML-escapes, never triple braces.
 */

export class EmailServiceError extends Error {
  constructor(code, cause) {
    super(`Email service error: ${code}`);
    this.name = "EmailServiceError";
    this.code = code;
    this.cause = cause;
  }
}

export function getEmailConfig(env = import.meta.env) {
  const serviceId = env.VITE_EMAILJS_SERVICE_ID;
  const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, publicKey };
}

/**
 * @param {HTMLFormElement} formElement - the form (e.g. `form.current` from a ref).
 * @param {{ config?: object|null, client?: typeof emailjs }} [options]
 */
export async function sendContactForm(e,
  formElement,
  { config = getEmailConfig(), client = emailjs } = {}
) {
  if (!config) throw new EmailServiceError("not-configured");

  const { serviceId, templateId, publicKey } = config;
  client.init({
  publicKey: publicKey,
});
console.log(formElement)

  try {
    e.preventDefault();
    await client.sendForm(serviceId, templateId, formElement);
  } catch (error) {
console.log(error);    throw new EmailServiceError(error?.status ? `http-${error.status}` : "network", error);
  }
}

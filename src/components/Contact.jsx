import { useRef, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { sendContactForm } from "../services/email";
import {
  CONTACT_EMAIL,
  FIELD_LIMITS,
  cleanFieldInput,
  getCooldownRemaining,
  markMessageSent,
  validateContactForm,
} from "../utils/contact";
import "./Contact.css";

const INITIAL_FORM = { name: "", email: "", message: "", website: "" };

export default function Contact() {
  const { language, t } = useTranslation();
  const form = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  // idle | sending | success | invalid | send-error | cooldown
  const [status, setStatus] = useState("idle");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const isSending = status === "sending";

  const handleChange = (event) => {
    // State is keyed by the field id; the `name` attribute is the EmailJS
    // template variable (user_name, user_email, message).
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: cleanFieldInput(id, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return;

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("invalid");
      return;
    }

    // Honeypot: real visitors never see this field, bots usually fill it.
    // Pretend it worked so the bot gets no signal, but send nothing.
    if (formData.website) {
      setStatus("success");
      setFormData(INITIAL_FORM);
      return;
    }

    const remaining = getCooldownRemaining();
    if (remaining > 0) {
      setCooldownSeconds(Math.ceil(remaining / 1000));
      setStatus("cooldown");
      return;
    }

    setStatus("sending");
    try {
      await sendContactForm(form.current);
      markMessageSent();
      setStatus("success");
      setFormData(INITIAL_FORM);
      form.current.reset();
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
      setStatus("send-error");
    }
  };

  const fieldError = (field) =>
    errors[field] ? t(errors[field], { max: FIELD_LIMITS[field] }) : null;

  return (
    <section id="contacto" className="section contact">
      <div className="container contact-inner">
        <div className="contact-intro">
          <span className="section-eyebrow">{t("contact.eyebrow")}</span>
          <h2 className="section-heading">{t("contact.heading")}</h2>
          <p>{t("contact.intro")}</p>

          <ul className="contact-social" aria-label={t("contact.socialLabel")}>
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contact.githubAria")}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/juana-valentina-torres-p-91b89b273"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contact.linkedinAria")}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label={t("contact.emailAria")}>
                {t("contact.emailLink")}
              </a>
            </li>
          </ul>
        </div>

        <form ref={form} className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={isSending}>
          <div className="form-field">
            <label htmlFor="name">{t("contact.fields.name")}</label>
            <input
              id="name"
              name="user_name"
              type="text"
              autoComplete="name"
              maxLength={FIELD_LIMITS.name}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="form-error" role="alert">
                {fieldError("name")}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">{t("contact.fields.email")}</label>
            <input
              id="email"
              name="user_email"
              type="email"
              autoComplete="email"
              maxLength={FIELD_LIMITS.email}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="form-error" role="alert">
                {fieldError("email")}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="message">{t("contact.fields.message")}</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              maxLength={FIELD_LIMITS.message}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="form-error" role="alert">
                {fieldError("message")}
              </span>
            )}
          </div>

          <input type="hidden" name="language" value={language} />

          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="website">{t("contact.fields.honeypot")}</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSending}>
            {isSending ? t("contact.sending") : t("contact.submit")}
          </button>

          {status === "success" && (
            <p className="form-status form-status-success" role="status">
              {t("contact.status.success")}
            </p>
          )}
          {status === "invalid" && (
            <p className="form-status form-status-error" role="alert">
              {t("contact.status.invalid")}
            </p>
          )}
          {status === "send-error" && (
            <p className="form-status form-status-error" role="alert">
              {t("contact.status.sendError")}
            </p>
          )}
          {status === "cooldown" && (
            <p className="form-status form-status-error" role="alert">
              {t("contact.status.cooldown", { seconds: cooldownSeconds })}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

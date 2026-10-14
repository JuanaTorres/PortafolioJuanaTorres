import { useTranslation } from "../context/LanguageContext";
import { certifications, degrees } from "../data/education";
import { localize } from "../i18n/translate";
import "./Education.css";

export default function Education() {
  const { language, t } = useTranslation();

  return (
    <section id="formacion" className="section education">
      <div className="container">
        <span className="section-eyebrow">{t("education.eyebrow")}</span>
        <h2 className="section-heading">{t("education.heading")}</h2>

        <h3 className="education-subheading">{t("education.academic")}</h3>
        <ul className="degrees-grid">
          {degrees.map((degree) => (
            <li key={degree.id} className="degree-card">
              <span className="degree-icon" aria-hidden="true">
                🎓
              </span>
              <div>
                <h4 className="degree-title">{localize(degree.title, language)}</h4>
                <p className="degree-institution">{degree.institution}</p>
                <p className="degree-period">
                  {localize(degree.period, language)}
                  {degree.inProgress && (
                    <span className="degree-badge">{t("education.inProgress")}</span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="education-subheading">{t("education.certifications")}</h3>
        <ul className="certs-grid">
          {certifications.map((cert) => {
            const issuer = localize(cert.issuer, language);
            const details = [issuer, cert.year, cert.hours && t("education.hours", { hours: cert.hours })]
              .filter(Boolean)
              .join(" · ");

            return (
              <li key={cert.name} className="cert-card">
                <h4 className="cert-name">
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}
                </h4>
                <p className="cert-details">{details}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

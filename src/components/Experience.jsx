import { useTranslation } from "../context/LanguageContext";
import { experience } from "../data/experience";
import { localize } from "../i18n/translate";
import "./Experience.css";

export default function Experience() {
  const { language, t } = useTranslation();

  return (
    <section id="experiencia" className="section experience">
      <div className="container">
        <span className="section-eyebrow">{t("experience.eyebrow")}</span>
        <h2 className="section-heading">{t("experience.heading")}</h2>

        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.id} className={`timeline-item ${job.current ? "is-current" : ""}`}>
              <span className="timeline-dot" aria-hidden="true" />
              <article className="timeline-card">
                <header className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{localize(job.role, language)}</h3>
                    <p className="timeline-company">{localize(job.company, language)}</p>
                  </div>
                  <div className="timeline-meta">
                    {job.current && (
                      <span className="timeline-badge">{t("experience.current")}</span>
                    )}
                    <span className="timeline-period">{localize(job.period, language)}</span>
                  </div>
                </header>

                <ul className="timeline-highlights">
                  {job.highlights.map((highlight, index) => (
                    <li key={index}>{localize(highlight, language)}</li>
                  ))}
                </ul>

                <ul className="project-tags" aria-label={t("experience.techLabel")}>
                  {job.tags.map((tag) => (
                    <li key={tag} className="project-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { localize } from "../i18n/translate";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const { language, t } = useTranslation();
  const { image, gif, tags, demoUrl, codeUrl } = project;
  const title = localize(project.title, language);
  const description = localize(project.description, language);

  const canPlayGif = Boolean(gif);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoadedGif, setHasLoadedGif] = useState(false);

  const startPreview = () => {
    if (!canPlayGif) return;
    setHasLoadedGif(true);
    setIsPlaying(true);
  };
  const stopPreview = () => setIsPlaying(false);

  return (
    <li
      className="project-card"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
    >
      <div
        className={`project-image ${isPlaying ? "is-playing" : ""}`}
        role="img"
        aria-label={t("projects.preview", { title })}
      >
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <span className="project-image-placeholder">＋</span>
        )}
        {canPlayGif && hasLoadedGif && (
          <img className="project-gif" src={gif} alt="" aria-hidden="true" />
        )}
        {canPlayGif && (
          <span className="project-gif-badge" aria-hidden="true">
            GIF
          </span>
        )}
      </div>

      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>

        <ul className="project-tags">
          {tags.map((tag) => (
            <li key={tag} className="project-tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="project-actions">
          {demoUrl && (
            <a
              href={demoUrl}
              className="btn btn-primary btn-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("projects.demo")}
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              className="btn btn-secondary btn-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("projects.code")}
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

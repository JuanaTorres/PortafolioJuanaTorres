import { useTranslation } from "../context/LanguageContext";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="proyectos" className="section projects">
      <div className="container">
        <span className="section-eyebrow">{t("projects.eyebrow")}</span>
        <h2 className="section-heading">{t("projects.heading")}</h2>
        <ul className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

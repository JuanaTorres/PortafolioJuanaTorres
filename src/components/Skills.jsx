import { useTranslation } from "../context/LanguageContext";
import { skills } from "../data/skills";
import "./Skills.css";

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="habilidades" className="section skills">
      <div className="container">
        <span className="section-eyebrow">{t("skills.eyebrow")}</span>
        <h2 className="section-heading">{t("skills.heading")}</h2>
        <ul className="skills-grid">
          {skills.map((skill) => (
            <li key={skill.name} className="skill-card">
              <span className="skill-icon" aria-hidden="true">
                {skill.logo ? <img src={skill.logo} alt="" width="24" height="24" /> : skill.icon}
              </span>
              <span className="skill-name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

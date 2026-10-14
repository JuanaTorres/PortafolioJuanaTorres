import { useTranslation } from "../context/LanguageContext";
import { skills } from "../data/skills";
import "./TechWheel.css";

/**
 * Slowly rotating ring of technology logos. Each logo is placed around the
 * circle by angle and counter-rotates so it always stays upright.
 */
export default function TechWheel() {
  const { t } = useTranslation();
  const items = skills.filter((skill) => skill.logo);
  const step = 360 / items.length;

  return (
    <div className="tech-wheel-container">
      <div className="tech-wheel">
        <div className="tech-wheel-hub" aria-hidden="true">
          &lt;/&gt;
        </div>
        <ul className="tech-wheel-ring" aria-label={t("about.wheelLabel")}>
          {items.map((skill, index) => (
            <li
              key={skill.name}
              className="tech-wheel-item"
              style={{ "--angle": `${index * step}deg` }}
            >
              <span className="tech-wheel-logo" title={skill.name}>
                <img src={skill.logo} alt={skill.name} width="40" height="40" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

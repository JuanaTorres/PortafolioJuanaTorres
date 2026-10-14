import { useTranslation } from "../context/LanguageContext";
import TechWheel from "./TechWheel";
import "./About.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="sobre-mi" className="section about">
      <div className="container about-inner">
        <div>
          <span className="section-eyebrow">{t("about.eyebrow")}</span>
          <h2 className="section-heading">{t("about.heading")}</h2>
          <p className="about-text">{t("about.text")}</p>
        </div>
        <TechWheel />
      </div>
    </section>
  );
}

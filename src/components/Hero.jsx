import { useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { CONTACT_EMAIL } from "../utils/contact";
import profilePhoto from "./Foto/ME.webp";
import "./Hero.css";

const PROFILE_NAME = "Juana Valentina Torres Parrado";

// Intro sequence: the photo floats in inside a bubble, the bubble pops and
// the photo settles next to the text. Durations match Hero.css keyframes.
const BUBBLE_PHASES = {
  floating: { next: "popping", duration: 2400 },
  popping: { next: "settled", duration: 650 },
};
const DROPLET_COUNT = 8;

export default function Hero() {
  const { t } = useTranslation();
  const [bubblePhase, setBubblePhase] = useState("floating");
  const phase =  bubblePhase;

  useEffect(() => {
    const step = BUBBLE_PHASES[phase];
    if (!step) return;
    const timeoutId = setTimeout(() => setBubblePhase(step.next), step.duration);
    return () => clearTimeout(timeoutId);
  }, [phase]);

  return (
    <section id="inicio" className="hero">
      <div className="container hero-inner">
        <div className={`hero-photo is-${phase}`}>
          <div className="hero-photo-frame">
            <img
              src={profilePhoto}
              alt={t("hero.photoAlt")}
              width="640"
              height="768"
              fetchPriority="high"
            />
          </div>
          {phase !== "settled" && (
            <span className="hero-bubble" aria-hidden="true">
              {Array.from({ length: DROPLET_COUNT }, (_, index) => (
                <span key={index} className="hero-droplet" />
              ))}
            </span>
          )}
        </div>

        <div className="hero-window">
          <div className="hero-window-bar" aria-hidden="true">
            <span className="hero-window-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="hero-window-url">{t("hero.windowUrl")}</span>
          </div>

          <div className="hero-window-body">
            <p className="hero-greeting">{t("hero.greeting")}</p>
            <h1 className="hero-name">{PROFILE_NAME}</h1>
            <h2 className="hero-role">{t("hero.role")}</h2>
            <p className="hero-tagline">{t("hero.tagline")}</p>

            <a
              className="hero-email"
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={t("hero.emailAria", { email: CONTACT_EMAIL })}
            >
              <span aria-hidden="true">✉</span>
              {CONTACT_EMAIL}
            </a>

            <div className="hero-actions">
              <a href="#contacto" className="btn btn-primary">
                {t("hero.ctaContact")}
              </a>
              <a href={t("hero.cv")} className="btn btn-secondary" download>
                <span aria-hidden="true">↓</span>
                {t("hero.ctaCv")}
              </a>
              <a href="#proyectos" className="btn btn-secondary">
                {t("hero.ctaProjects")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

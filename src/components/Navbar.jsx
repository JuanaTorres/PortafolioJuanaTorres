import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#inicio", labelKey: "nav.home" },
  { href: "#sobre-mi", labelKey: "nav.about" },
  { href: "#habilidades", labelKey: "nav.skills" },
  { href: "#proyectos", labelKey: "nav.projects" },
  { href: "#experiencia", labelKey: "nav.experience" },
  { href: "#formacion", labelKey: "nav.education" },
  { href: "#contacto", labelKey: "nav.contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#inicio" className="navbar-brand" onClick={handleLinkClick}>
          JVTP
        </a>

        <nav
          id="navbar-nav"
          className={`navbar-nav ${isMenuOpen ? "is-open" : ""}`}
          aria-label={t("nav.mainNav")}
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleLinkClick}>
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="navbar-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="navbar-nav"
            aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}

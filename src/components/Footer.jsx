import { useTranslation } from "../context/LanguageContext";
import { CONTACT_EMAIL } from "../utils/contact";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>{t("footer.rights", { year })}</p>
        <ul className="footer-links" aria-label={t("contact.socialLabel")}>
          <li>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/juana-valentina-torres-p-91b89b273"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>{t("contact.emailLink")}</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

import { useTranslation } from "../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { t, toggleLanguage } = useTranslation();

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={t("language.switch")}
      title={t("language.switch")}
    >
      <span aria-hidden="true">{t("language.code")}</span>
    </button>
  );
}

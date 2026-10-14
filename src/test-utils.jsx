import { render } from "@testing-library/react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

/**
 * Renders `ui` inside the app providers. Defaults to Spanish so tests don't
 * depend on the language of the machine running them.
 */
export function renderWithProviders(ui, { language = "es" } = {}) {
  return render(
    <LanguageProvider initialLanguage={language}>
      <ThemeProvider>{ui}</ThemeProvider>
    </LanguageProvider>
  );
}

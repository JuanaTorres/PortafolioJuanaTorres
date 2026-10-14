import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import en from "../i18n/locales/en";
import es from "../i18n/locales/es";
import { localize, translate } from "../i18n/translate";

function collectKeys(node, prefix = "") {
  return Object.entries(node).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "object" ? collectKeys(value, path) : [path];
  });
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("locales", () => {
  it("Spanish and English define exactly the same keys", () => {
    expect(collectKeys(en).sort()).toEqual(collectKeys(es).sort());
  });
});

describe("translate", () => {
  it("interpolates values", () => {
    expect(translate("en", "footer.rights", { year: 2026 })).toContain("© 2026");
  });

  it("falls back to the key when a translation is missing", () => {
    expect(translate("en", "does.not.exist")).toBe("does.not.exist");
  });

  it("localizes per-language content values", () => {
    expect(localize({ es: "Hola", en: "Hello" }, "en")).toBe("Hello");
    expect(localize("Texto plano", "en")).toBe("Texto plano");
  });
});

describe("language switch", () => {
  it("switches the whole page to English and persists the choice", async () => {
    window.localStorage.setItem("portfolio-language", "es");
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("link", { name: "Sobre Mí" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /cambiar idioma a inglés/i }));

    expect(screen.getByRole("link", { name: "About Me" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toMatch(/portfolio/i);
    expect(window.localStorage.getItem("portfolio-language")).toBe("en");
  });

  it("ignores unsupported values stored in localStorage", () => {
    window.localStorage.setItem("portfolio-language", "<script>");
    render(<App />);

    expect(["es", "en"]).toContain(document.documentElement.lang);
  });
});

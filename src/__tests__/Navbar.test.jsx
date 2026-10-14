import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Navbar from "../components/Navbar";
import { renderWithProviders } from "../test-utils";

function renderNavbar() {
  return renderWithProviders(<Navbar />);
}

describe("Navbar", () => {
  it("renders a link for every navigation section", () => {
    renderNavbar();

    ["Inicio", "Sobre Mí", "Habilidades", "Proyectos", "Experiencia", "Formación", "Contacto"].forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });

  it("toggles the mobile menu open state when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggleButton = screen.getByRole("button", { name: /abrir menú/i });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveAccessibleName(/cerrar menú/i);
  });
});

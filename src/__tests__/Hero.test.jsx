import { act, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Hero from "../components/Hero";
import { renderWithProviders } from "../test-utils";

afterEach(() => {
  vi.useRealTimers();
});

describe("Hero", () => {
  it("shows the email and the three main actions", () => {
    renderWithProviders(<Hero />);

    expect(screen.getByRole("link", { name: /escribir un correo/i })).toHaveAttribute(
      "href",
      "mailto:juanavtp0216@gmail.com"
    );
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "#contacto");
    expect(screen.getByRole("link", { name: /descargar cv/i })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
      "href",
      "#proyectos"
    );
  });

  it("pops the bubble and settles the photo after the intro", () => {
    vi.useFakeTimers();
    const { container } = renderWithProviders(<Hero />);
    const photo = container.querySelector(".hero-photo");

    expect(photo).toHaveClass("is-floating");
    act(() => vi.advanceTimersByTime(2400));
    expect(photo).toHaveClass("is-popping");
    act(() => vi.advanceTimersByTime(650));
    expect(photo).toHaveClass("is-settled");
    expect(container.querySelector(".hero-bubble")).toBeNull();
    expect(screen.getByAltText(/foto de juana/i)).toBeInTheDocument();
  });
});

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "../components/ThemeToggle";
import { renderWithProviders } from "../test-utils";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("ThemeToggle", () => {
  it("defaults to light mode and reflects it on the html element", () => {
    renderWithProviders(<ThemeToggle />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to dark mode when clicked and updates the html attribute", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("persists the selected theme to localStorage", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    await user.click(screen.getByRole("button"));

    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
  });
});

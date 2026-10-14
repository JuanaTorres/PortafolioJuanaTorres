import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TechWheel from "../components/TechWheel";
import { skills } from "../data/skills";
import { renderWithProviders } from "../test-utils";

describe("TechWheel", () => {
  it("shows the logo of every skill in a labelled list", () => {
    renderWithProviders(<TechWheel />);

    const wheel = screen.getByRole("list", { name: /tecnologías que manejo/i });
    skills.forEach((skill) => {
      expect(within(wheel).getByAltText(skill.name)).toBeInTheDocument();
    });
  });
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Education from "../components/Education";
import Experience from "../components/Experience";
import { certifications, degrees } from "../data/education";
import { experience } from "../data/experience";
import { renderWithProviders } from "../test-utils";

describe("Experience", () => {
  it("renders every job and marks the current one", () => {
    renderWithProviders(<Experience />);

    expect(screen.getAllByRole("article")).toHaveLength(experience.length);
    expect(screen.getByText("Desarrolladora Contratista Junior Frontend")).toBeInTheDocument();
    expect(screen.getAllByText("Actual")).toHaveLength(
      experience.filter((job) => job.current).length
    );
  });

  it("translates roles and periods to English", () => {
    renderWithProviders(<Experience />, { language: "en" });

    expect(screen.getByText("Junior Frontend Contract Developer")).toBeInTheDocument();
    expect(screen.getByText("March 2025 – Present")).toBeInTheDocument();
  });
});

describe("Education", () => {
  it("renders the degrees and all certifications", () => {
    renderWithProviders(<Education />);

    expect(screen.getByText("Pregrado en Ingeniería de Sistemas")).toBeInTheDocument();
    expect(screen.getByText("En curso")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(
      degrees.length + certifications.length
    );
    expect(screen.getByText(/google · 2023 · 40 horas/i)).toBeInTheDocument();
  });
});

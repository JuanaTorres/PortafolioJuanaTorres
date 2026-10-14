import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProjectCard from "../components/ProjectCard";
import { renderWithProviders } from "../test-utils";

const project = {
  id: "demo-project",
  title: "Proyecto Demo",
  description: "Una descripción breve de prueba.",
  image: "",
  tags: ["React", "Vitest"],
  demoUrl: "https://demo.example.com",
  codeUrl: "https://github.com/example/demo",
};

describe("ProjectCard", () => {
  it("renders the project title, description and tags", () => {
    renderWithProviders(<ProjectCard project={project} />);

    expect(screen.getByText("Proyecto Demo")).toBeInTheDocument();
    expect(screen.getByText("Una descripción breve de prueba.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vitest")).toBeInTheDocument();
  });

  it("links the demo and code buttons to the right URLs", () => {
    renderWithProviders(<ProjectCard project={project} />);

    expect(screen.getByRole("link", { name: /ver demo en vivo/i })).toHaveAttribute(
      "href",
      "https://demo.example.com"
    );
    expect(screen.getByRole("link", { name: /código en github/i })).toHaveAttribute(
      "href",
      "https://github.com/example/demo"
    );
  });

  it("shows the English title of a localized project", () => {
    renderWithProviders(
      <ProjectCard project={{ ...project, title: { es: "Proyecto", en: "Project" } }} />,
      { language: "en" }
    );

    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view live demo/i })).toBeInTheDocument();
  });

  it("loads and plays the GIF only while the card is hovered", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <ProjectCard project={{ ...project, image: "/demo.webp", gif: "/demo.gif" }} />
    );

    expect(container.querySelector(".project-gif")).toBeNull();

    await user.hover(screen.getByText("Proyecto Demo"));
    expect(container.querySelector(".project-gif")).toHaveAttribute("src", "/demo.gif");
    expect(container.querySelector(".project-image")).toHaveClass("is-playing");

    await user.unhover(screen.getByText("Proyecto Demo"));
    expect(container.querySelector(".project-image")).not.toHaveClass("is-playing");
  });
});

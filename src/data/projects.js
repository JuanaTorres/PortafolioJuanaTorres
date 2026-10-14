/**
 * Placeholder project entries for the Projects section.
 * Replace `image`, `gif`, `demoUrl` and `codeUrl` with real values per project.
 * - `image`: static preview (e.g. "/projects/mi-proyecto.webp").
 * - `gif`: animation played while hovering the card (e.g. "/projects/mi-proyecto.gif").
 *   Put both files in `public/projects/`. Leave `gif` empty to disable it.
 * `title` and `description` accept either a plain string or an object with
 * one entry per language ({ es, en }).
 */
const PLACEHOLDER_1 = {
  es: "Desarrollo de una landing page comercial en React para una maquilladora profesional independiente, con secciones de servicios, galería y contacto.",
  en: "Built a commercial landing page in React for an independent professional makeup artist, with services, gallery and contact sections.",
};
const PLACEHOLDER_2 = {
  es: "Diseño de la propuesta UX/UI en Figma para Info-Click, una plataforma web para buscar, comparar y conectar con proveedores de servicios.",
  en: "Designed the UX/UI proposal in Figma for Info-Click, a web platform to search, compare, and connect with service providers."
};
const PLACEHOLDER_3 = {
  es: "Este proyecto es un juego de Pong hecho con Python y Pygame. La pala izquierda aprende a jugar sola con machine learning, en lugar de seguir reglas programadas a mano.",
  en: "This project is a Pong game built with Python and Pygame. The left paddle learns to play on its own using machine learning instead of following hard-coded rules."
};

export const projects = [
  {
    id: "project-one",
    title: { es: "Pagina Web Maquilladora", en: "Website for a Makeup Artist " },
    description: PLACEHOLDER_1,
    image: "/projects/pr1.png",
    gif: "/projects/Git1.gif",
    tags: ["React"],
    demoUrl: "https://anamariatmaqullaje.up.railway.app/#inicio",
    codeUrl: "https://github.com/JuanaTorres/WebSiteMakeup",
  },
  {
    id: "project-two",
    title: { es: "Diseño UX/UI y Requerimientos —  Info-Click (Prototipo)", en: "UX/UI Design & Requirements — Info-Click (Prototype)" },
    description: PLACEHOLDER_2,
    image: "/projects/p2.png",
    gif: "/projects/Git2.gif",
    tags: ["Figma"]
  },
  {
    id: "project-three",
    title: { es: "Pong con Inteligencia Artificial y Machine Learning", en: "AI Pong with Machine Learning" },
    description: PLACEHOLDER_3,
    image: "/projects/p3.png",
    gif: "/projects/Git3.gif",
    tags: ["Python", "Pygame", "scikit-learn"],
    codeUrl: "https://github.com/JuanaTorres/Intelligent-Systems-Work/blob/master/Ball_Original.py",
  },
];

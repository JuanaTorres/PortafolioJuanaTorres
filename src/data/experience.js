/**
 * Professional experience, newest first (taken from the CV).
 * Text fields accept a plain string or { es, en }; `current: true` shows the
 * "Current" badge.
 */
export const experience = [
  {
    id: "cnsc",
    role: { es: "Desarrolladora Contratista Junior Frontend", en: "Junior Frontend Contract Developer" },
    company: "Comisión Nacional del Servicio Civil",
    period: { es: "Marzo 2025 – Actualidad", en: "March 2025 – Present" },
    current: true,
    highlights: [
      {
        es: "Desarrollo de la nueva versión del sistema web SIMO (Sistema de Apoyo para la Igualdad, el Mérito y la Oportunidad) utilizando Angular 20.",
        en: "Developed the new version of the SIMO web system (Support System for Equality, Merit, and Opportunity) using Angular 20.",
      },
      {
        es: "Gestión del ciclo de vida del código y colaboración en equipo mediante GitLab para control de versiones y flujos de CI/CD.",
        en: "Managed code lifecycle and collaborated with the team using GitLab for version control and CI/CD pipelines.",
      },
    ],
    tags: ["Angular 20", "TypeScript", "GitLab", "CI/CD"],
  },
  {
    id: "makeup-artist",
    role: { es: "Página Web para Maquilladora Independiente", en: "Website for an Independent Makeup Artist" },
    company: { es: "Proyecto freelance", en: "Freelance project" },
    period: { es: "Agosto 2026", en: "August 2026" },
    highlights: [
      {
        es: "Desarrollo de una landing page comercial en React para una maquilladora profesional independiente, con secciones de servicios, galería y contacto.",
        en: "Developed a commercial landing page in React for an independent professional makeup artist, including services, gallery, and contact sections.",
      },
      {
        es: "Control de versiones con Git y despliegue en producción mediante Railway.",
        en: "Used Git for version control and deployed the application to production using Railway.",
      },
      {
        es: "Proyecto individual, desde el levantamiento de requerimientos con la clienta hasta la puesta en producción.",
        en: "Individual project covering the full cycle, from gathering requirements with the client to production deployment.",
      },
    ],
    tags: ["React", "Git", "Railway"],
  },
  {
    id: "ibm-full-stack",
    role: { es: "Desarrolladora Full Stack", en: "Full Stack Developer" },
    company: "IBM Colombia",
    period: { es: "Febrero 2024 – Julio 2024", en: "February 2024 – July 2024" },
    highlights: [
      {
        es: "Colaboración en la entrega del primer MVP de un Sistema de Gestión de Contenidos (CMS), utilizando Angular en el frontend y Node.js con MongoDB en el backend.",
        en: "Collaborated on delivering the first MVP of a Content Management System (CMS), using Angular for the frontend and Node.js with MongoDB for the backend.",
      },
      {
        es: "Aplicación de metodología ágil y herramientas como GitHub, Postman e Insomnia para el desarrollo y pruebas de servicios.",
        en: "Applied Agile methodology and tools such as GitHub, Postman, and Insomnia for service development and testing.",
      },
      {
        es: "Acompañamiento y guía a practicantes del SENA en su proceso de aprendizaje y desarrollo profesional.",
        en: "Mentored and guided SENA trainees throughout their learning and professional development process.",
      },
    ],
    tags: ["Angular", "Node.js", "MongoDB", "Scrum"],
  },
  {
    id: "ibm-android",
    role: { es: "Desarrolladora Mobile Android", en: "Android Mobile Developer" },
    company: "IBM Colombia",
    period: { es: "Mayo 2024 – Julio 2024", en: "May 2024 – July 2024" },
    highlights: [
      {
        es: "Corrección de bugs y resolución de errores de código, mejorando la estabilidad y el rendimiento de la aplicación móvil Android.",
        en: "Fixed bugs and resolved code errors, improving the stability and performance of the Android mobile application.",
      },
      {
        es: "Identificación y solución de Code Smells mediante herramientas de análisis estático como SonarQube.",
        en: "Identified and resolved code smells using static analysis tools such as SonarQube.",
      },
      {
        es: "Colaboración estrecha con equipos multifuncionales de QA, DevOps y desarrollo para garantizar entregas de alta calidad.",
        en: "Worked closely with cross-functional QA, DevOps, and development teams to ensure high-quality delivery.",
      },
      {
        es: "Uso de Watsonx.AI para pruebas base de generación automatizada de documentación de código.",
        en: "Used Watsonx.AI to build baseline tests for automated code documentation generation.",
      },
      {
        es: "Integración de la interfaz de usuario (frontend) con servicios de backend, asegurando la fluidez de datos y funcionalidades.",
        en: "Integrated the frontend user interface with backend services, ensuring smooth data flow and functionality.",
      },
    ],
    tags: ["Android", "SonarQube", "watsonx.ai"],
  },
  {
    id: "info-click",
    role: { es: "Diseño UX/UI y Requerimientos — Info-Click", en: "UX/UI Design & Requirements — Info-Click" },
    company: "Freelance",
    period: "2024",
    highlights: [
      {
        es: "Diseño de la propuesta UX/UI en Figma para Info-Click, una plataforma web para buscar, comparar y conectar con proveedores de servicios.",
        en: "Designed the UX/UI proposal in Figma for Info-Click, a web platform to search, compare, and connect with service providers.",
      },
      {
        es: "Definición de los requerimientos funcionales del producto, incluyendo el modelo de proveedores por recomendación y el límite de visualizaciones por usuario.",
        en: "Defined the product's functional requirements, including a referral-only provider model and a per-user limit on provider views.",
      },
      {
        es: "Trabajo freelance directo con el cliente, desde el entendimiento del problema de negocio hasta la propuesta de diseño final.",
        en: "Worked directly with the client as a freelancer, from understanding the business problem to the final design proposal.",
      },
    ],
    tags: ["Figma", "UX/UI"],
  },
];

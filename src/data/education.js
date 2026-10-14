/**
 * Academic background and certifications (taken from the CV).
 * Text fields accept a plain string or { es, en }.
 */
export const degrees = [
  {
    id: "systems-engineering",
    title: { es: "Pregrado en Ingeniería de Sistemas", en: "B.Sc. in Systems Engineering" },
    institution: "Universidad El Bosque",
    period: "2020 – 2024",
  },
  {
    id: "mathematics",
    title: { es: "Pregrado en Matemáticas", en: "B.Sc. in Mathematics" },
    institution: "Universidad El Bosque",
    period: { es: "2022 – Actualidad", en: "2022 – Present" },
    inProgress: true,
  },
];

/** `url` is optional: add the credential link (Credly, Coursera…) to make it clickable. */
export const certifications = [
  {
    name: "Using a Quantum Computer",
    issuer: "IBM",
    year: 2026,
    hours: 5,
  },
  {
    name: "Quantum Artificial Intelligence",
    issuer: { es: "Universidad del Rosario y Université du Québec à Trois-Rivières", en: "Universidad del Rosario and Université du Québec à Trois-Rivières" },
    year: 2025,
    hours: 25,
  },
  { name: "Google Cloud Computing Foundations Academy", issuer: "Google", year: 2023, hours: 40 },
  { name: "IBM watsonx Essentials", issuer: "IBM", year: 2024 },
  { name: "IBM Consulting Way", issuer: "IBM", year: 2024 },
  { name: "Quantum-Safe Encryption Essentials", issuer: "IBM", year: 2024 },
  { name: "IBM Agile Explorer", issuer: "IBM", year: 2024 },
  { name: "DevSecOps Essentials", issuer: "IBM", year: 2024 },
  { name: "Docker Essentials: A Developer Introduction", issuer: "IBM", year: 2024 },
  { name: "Angular - The Complete Guide", issuer: "O'Reilly", year: 2024 },
];

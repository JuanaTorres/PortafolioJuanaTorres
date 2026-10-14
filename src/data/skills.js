import angularLogo from "devicon/icons/angular/angular-original.svg";
import figmaLogo from "devicon/icons/figma/figma-original.svg";
import gitLogo from "devicon/icons/git/git-original.svg";
import githubLogo from "devicon/icons/github/github-original.svg";
import javaLogo from "devicon/icons/java/java-original.svg";
import nodeLogo from "devicon/icons/nodejs/nodejs-original.svg";
import pythonLogo from "devicon/icons/python/python-original.svg";
import rLogo from "devicon/icons/r/r-original.svg";
import reactLogo from "devicon/icons/react/react-original.svg";

/**
 * Tech stack shown in the Skills section and in the rotating wheel of the
 * About section. `logo` comes from the devicon package (bundled locally);
 * `icon` is a text fallback used when a technology has no logo.
 */
export const skills = [
  { name: "Angular", icon: "A", logo: angularLogo, category: "Frontend" },
  { name: "React", icon: "Re", logo: reactLogo, category: "Frontend" },
  { name: "Node.js", icon: "N", logo: nodeLogo, category: "Backend" },
  { name: "Java", icon: "J", logo: javaLogo, category: "Backend" },
  { name: "Python", icon: "Py", logo: pythonLogo, category: "Backend" },
  { name: "R", icon: "R", logo: rLogo, category: "Backend" },
  { name: "Figma", icon: "F", logo: figmaLogo, category: "Tools" },
  { name: "Git", icon: "G", logo: gitLogo, category: "Tools" },
  { name: "GitHub", icon: "Gh", logo: githubLogo, category: "Tools" },
];

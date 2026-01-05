export const APP_NAME = "Rahul Singh Portfolio";

export const APP_DESCRIPTION =
  "Portfolio of Rahul Singh – Software Engineer specializing in scalable systems, real-time applications, and AI-driven solutions.";

export const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
] as const;

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const ANIMATION = {
  STAGGER: 0.12,
  DURATION: 0.4,
  EASE: "easeOut",
} as const;

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

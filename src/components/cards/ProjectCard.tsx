import type { Project } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl surface-card transition-all hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-brand-soft"
      aria-label={`Project: ${project.title}`}
    >
      {/* Pink gradient header with emoji */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-brand-gradient">
        <span
          className="text-6xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          {project.emoji}
        </span>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.25))]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Pink "category modules" pill */}
        <div className="mb-4 flex items-center gap-2">
          <span className="pill pill-brand text-[11px] font-semibold uppercase tracking-wider">
            {project.category}
          </span>
          {project.year && (
            <span className="font-mono text-[11px] text-[color:var(--muted)]">
              {project.year}
            </span>
          )}
          {project.featured && (
            <span className="ml-auto inline-flex items-center rounded-full bg-brand-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="mt-1.5 text-sm text-brand-400">{project.tagline}</p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">
          {project.description}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <ul className="mt-5 grid gap-1.5 text-sm text-foreground">
            {project.metrics.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
                />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <li key={tech} className="pill text-[11px]">
              {tech}
            </li>
          ))}
        </ul>

        {(project.github || project.live) && (
          <footer className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/5 pt-4 text-sm">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-brand-400 transition-colors hover:text-brand-300"
              >
                <FiExternalLink aria-hidden="true" />
                Live demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[color:var(--muted)] transition-colors hover:text-foreground"
              >
                <FaGithub aria-hidden="true" />
                Source
              </a>
            )}
          </footer>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;

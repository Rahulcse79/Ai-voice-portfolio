import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white p-6
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Project: ${project.title}`}
    >
      <header>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
      </header>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ProjectCard;

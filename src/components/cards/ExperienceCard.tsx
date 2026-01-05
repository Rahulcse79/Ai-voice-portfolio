import type { Experience } from "@/data/experience";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white p-6
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Experience at ${experience.company}`}
    >
      <header>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {experience.role}
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">{experience.company}</span>
          <span className="mx-1">•</span>
          <span>{experience.duration}</span>
        </p>
      </header>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
        {experience.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
};

export default ExperienceCard;
